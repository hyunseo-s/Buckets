import { google } from "googleapis";
import express from "express";
import open from "open";
import fs from "fs";
import { DateTime, Interval } from "luxon"; // Import Luxon for timezone handling

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
    const now = DateTime.now().setZone("Australia/Sydney");
    const freeSlots = [];

    for (let i = 0; i < 7; i++) {
        const dayStart = now.plus({ days: i }).startOf("day");
        const dayEnd = now.plus({ days: i }).endOf("day");

        const freeBusyResponse = await calendar.freebusy.query({
            auth,
            requestBody: {
                timeMin: dayStart.toISO(),
                timeMax: dayEnd.toISO(),
                timeZone: "Australia/Sydney",
                items: [{ id: "primary" }],
            },
        });

        const busyTimes = freeBusyResponse.data.calendars["primary"].busy.map(b => ({
            start: DateTime.fromISO(b.start, { zone: "Australia/Sydney" }),
            end: DateTime.fromISO(b.end, { zone: "Australia/Sydney" })
        }));

        const freeTimes = [];
        let startOfFreeSlot = dayStart;

        for (const { start, end } of busyTimes) {
            if (startOfFreeSlot < start) {
                freeTimes.push({
                    start: startOfFreeSlot.toISO(),
                    end: start.toISO()
                });
            }
            startOfFreeSlot = end > startOfFreeSlot ? end : startOfFreeSlot;
        }

        if (startOfFreeSlot < dayEnd) {
            freeTimes.push({
                start: startOfFreeSlot.toISO(),
                end: dayEnd.toISO()
            });
        }

        freeSlots.push({
            date: dayStart.toISODate(),
            free_at: freeTimes
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

function findCommonFreeTimes(people) {
    const commonAvailability = [];

    if (people.length === 0) return { people: [], common_free_times: [] };

    const dates = people[0].availability.map(entry => entry.date);

    for (const date of dates) {
        const allFreeTimes = people.map(person => {
            const dayAvailability = person.availability.find(entry => entry.date === date);
            return dayAvailability ? dayAvailability.free_at.map(slot => Interval.fromISO(`${slot.start}/${slot.end}`)) : [];
        });

        const commonFree = allFreeTimes.reduce((common, personFreeTimes) => {
            return common.filter(slot1 => personFreeTimes.some(slot2 => slot1.overlaps(slot2)))
                         .map(slot1 => {
                             const overlap = personFreeTimes.find(slot2 => slot1.overlaps(slot2));
                             return Interval.fromDateTimes(
                                 slot1.start > overlap.start ? slot1.start : overlap.start,
                                 slot1.end < overlap.end ? slot1.end : overlap.end
                             );
                         });
        }, allFreeTimes[0] || []);

        commonAvailability.push({
            date,
            free_at: commonFree.map(slot => ({ start: slot.start.toISO(), end: slot.end.toISO() }))
        });
    }

    return { people: people.map(p => p.name), common_free_times: commonAvailability };
}