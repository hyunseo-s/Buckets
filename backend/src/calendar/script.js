import { google } from "googleapis";
import express from "express";
import open from "open";
import fs from "fs";
import { DateTime } from "luxon"; // Import Luxon for timezone handling

const calendar = google.calendar("v3");
const app = express();
const PORT = 8000;

const SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];
const TOKEN_PATH = "token.json";

// Load client secrets
const credentials = JSON.parse(fs.readFileSync("./credentials.json", "utf8"));
const { client_id, client_secret, redirect_uris } = credentials.web;
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

// Check if token already exists
(async () => {
    try {
        const token = JSON.parse(fs.readFileSync(TOKEN_PATH, "utf8"));
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
            fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens));
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
    const now = DateTime.now().setZone("Australia/Sydney"); // Set to Sydney Time
    const freeSlots = [];
    const timeMin = now.toISO();
    const timeMax = now.plus({ days: 7 }).toISO();

    const freeBusyResponse = await calendar.freebusy.query({
        auth,
        requestBody: {
            timeMin,
            timeMax,
            timeZone: "Australia/Sydney", // Correct time zone setting
            items: [{ id: "primary" }],
        },
    });

    const busyTimes = freeBusyResponse.data.calendars["primary"].busy.map(b => ({
        start: DateTime.fromISO(b.start).setZone("Australia/Sydney").toMillis(),
        end: DateTime.fromISO(b.end).setZone("Australia/Sydney").toMillis()
    }));

    let startOfFreeSlot = now.toMillis();

    for (const { start, end } of busyTimes) {
        if (startOfFreeSlot < start) {
            freeSlots.push({
                start: DateTime.fromMillis(startOfFreeSlot).setZone("Australia/Sydney").toISO(),
                end: DateTime.fromMillis(start).setZone("Australia/Sydney").toISO()
            });
        }
        startOfFreeSlot = Math.max(startOfFreeSlot, end);
    }

    if (startOfFreeSlot < DateTime.fromISO(timeMax).setZone("Australia/Sydney").toMillis()) {
        freeSlots.push({
            start: DateTime.fromMillis(startOfFreeSlot).setZone("Australia/Sydney").toISO(),
            end: DateTime.fromISO(timeMax).setZone("Australia/Sydney").toISO()
        });
    }

    const result = {
        name: "Justin",
        availability: freeSlots,
    };

    fs.writeFileSync("free_slots.json", JSON.stringify(result, null, 2));
    console.log("Free time slots saved to free_slots.json");

    return result;
}
