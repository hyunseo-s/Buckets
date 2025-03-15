import { google } from "googleapis";
import express from "express";
import open from "open";
// import fs from "fs/promises";
import fs from 'fs';



const calendar = google.calendar("v3");


const app = express();
const PORT = 8000;

const SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];
const TOKEN_PATH = "token.json";

// Load client secrets
const credentials = JSON.parse(fs.readFileSync("./credentials.json", "utf8"));
const { client_id, client_secret, redirect_uris } = credentials.web; // Change from "installed" to "web"
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

// Check if token already exists
(async () => {
    try {
        const token = JSON.parse(await fs.readFile(TOKEN_PATH, "utf8"));
        oAuth2Client.setCredentials(token);
        listEvents(oAuth2Client);
    } catch (err) {
        console.log("No existing token found. Requesting new authentication...");
        getNewToken(oAuth2Client);
    }
})();

// Get new token if needed
function getNewToken(oAuth2Client) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: "offline",
        scope: SCOPES,
    });

    console.log("Authorize this app by visiting this URL:", authUrl);
    open(authUrl);

    app.get("/", async (req, res) => {
        const code = req.query.code;
        try {
            const { tokens } = await oAuth2Client.getToken(code);
            oAuth2Client.setCredentials(tokens);
            await fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens));
            res.send("Authentication successful! You can close this tab.");
            getFreeTime(oAuth2Client);
        } catch (error) {
            console.error("Error retrieving access token", error);
            res.send("Authentication failed. Check console for details.");
        }
    });
}

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

async function getFreeTime(auth) {
    const now = new Date();
    const freeSlots = [];
    
    for (let i = 0; i < 7; i++) {
        const dayStart = new Date();
        dayStart.setDate(now.getDate() + i);
        dayStart.setHours(0, 0, 0, 0);

        const dayEnd = new Date(dayStart);
        dayEnd.setHours(23, 59, 59, 999);

        const events = await calendar.events.list({
            calendarId: "primary",
            timeMin: dayStart.toISOString(),
            timeMax: dayEnd.toISOString(),
            singleEvents: true,
            orderBy: "startTime",
            auth,
        });

        const busyTimes = events.data.items.map(event => ({
            start: new Date(event.start.dateTime || event.start.date).getTime(),
            end: new Date(event.end.dateTime || event.end.date).getTime()
        }));
        
        const freeTimes = [];
        let startOfFreeSlot = dayStart.getTime();
        
        for (const { start, end } of busyTimes) {
            if (startOfFreeSlot < start) {
                freeTimes.push({
                    start: new Date(startOfFreeSlot).toISOString(),
                    end: new Date(start).toISOString()
                });
            }
            startOfFreeSlot = Math.max(startOfFreeSlot, end);
        }
        
        if (startOfFreeSlot < dayEnd.getTime()) {
            freeTimes.push({
                start: new Date(startOfFreeSlot).toISOString(),
                end: dayEnd.toISOString()
            });
        }

        freeSlots.push({ date: dayStart.toISOString().split("T")[0], free_at: freeTimes });
    }
    
    const result = {
        name: "Justin",
        availability: freeSlots
    };
    
    fs.writeFileSync("free_slots.json", JSON.stringify(result, null, 2));
    console.log("Free time slots saved to free_slots.json");
    
    return result;
}



// // Fetch Google Calendar Events
// async function listEvents(auth) {
//     const calendar = google.calendar({ version: "v3", auth });
//     try {
//         const res = await calendar.events.list({
//             calendarId: "primary",
//             timeMin: new Date().toISOString(),
//             maxResults: 10,
//             singleEvents: true,
//             orderBy: "startTime",
//         });

//         const events = res.data.items;
//         if (!events.length) {
//             console.log("No upcoming events found.");
//         } else {
//             console.log("Upcoming events:");
//             events.forEach((event) => {
//                 const start = event.start.dateTime || event.start.date;
//                 console.log(`${start} - ${event.summary}`);
//             });
//         }
//     } catch (err) {
//         console.error("The API returned an error:", err);
//     }
// }
