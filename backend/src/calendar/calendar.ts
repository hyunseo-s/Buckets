import { google } from "googleapis";
import express from "express";
import fs from "fs";
import { DateInput, DateTime, Interval } from "luxon";
import { exec } from 'child_process';
import path from "path";
import { getCal, writeCal } from "../types/dataStore";
import { FreeTime, FreeTimeDay, FreeTimeSlot, PersonAvailability } from "../interface";
import { getGroupID } from "../utilis";

const app = express();
const calendar = google.calendar("v3");
const SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];
const TOKEN_PATH = "token.json";
const PORT = 8000;

// Load client secrets
const credentials = JSON.parse(fs.readFileSync(path.join(process.cwd(), "/src/calendar/credentials.json"), "utf8"));
const { client_id, client_secret, redirect_uris } = credentials.web;
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

export const getCalendar = async (itemId: string) => {
    try {
        const token = JSON.parse(fs.readFileSync(TOKEN_PATH, "utf8"));
        oAuth2Client.setCredentials(token);
        getFreeTime(oAuth2Client, itemId);
    } catch (err) {
        console.log("No existing token found. Requesting new authentication...");
        getNewToken(oAuth2Client, itemId);
    }
};

function getNewToken(oAuth2Client: any, itemId: string) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: "offline",
        scope: SCOPES,
    });

    console.log("Authorize this app by visiting this URL:", authUrl);
    
        // Detect OS and open in Chrome accordingly
    const openChrome = () => {
        const platform = process.platform;
        
        if (platform === 'win32') {
            exec(`start chrome "${authUrl}"`);
        } else if (platform === 'darwin') {
            exec(`open -a "Google Chrome" "${authUrl}"`);
        } else if (platform === 'linux') {
            exec(`google-chrome "${authUrl}"`);
        } else {
            console.error('Unsupported OS');
        }
    };

    openChrome();

    app.get("/", async (req, res) => {
        const code = req.query.code as string | undefined;
        if (!code) {
            res.send("Missing authorization code.");
            return;
        }
        try {
            const { tokens } = await oAuth2Client.getToken(code);
            oAuth2Client.setCredentials(tokens);
            fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens));
            res.send("Authentication successful! You can close this tab.");
            getFreeTime(oAuth2Client, itemId);
        } catch (error) {
            console.error("Error retrieving access token", error);
            res.send("Authentication failed. Check console for details.");
        }
    });
}

async function getFreeTime(auth: any, itemId: string) {
    const now = DateTime.now().setZone("Australia/Sydney");
    const freeSlots: FreeTimeDay[] = [];

    for (let i = 0; i < 7; i++) {
			const dayStart = now.plus({ days: i }).startOf("day");
			const dayEnd = now.plus({ days: i }).endOf("day");

			const freeBusyResponse = await calendar.freebusy.query({
				auth,
				requestBody: {
					timeMin: dayStart.toISO()!,
					timeMax: dayEnd.toISO()!,
					timeZone: "Australia/Sydney",
					items: [{ id: "primary" }],
				},
			});

			const busyTimes = freeBusyResponse.data.calendars?.["primary"]?.busy?.map(b => ({
				start: b.start ? DateTime.fromISO(b.start, { zone: "Australia/Sydney" }) : null,
				end: b.end ? DateTime.fromISO(b.end, { zone: "Australia/Sydney" }) : null
			})).filter(b => b.start && b.end) as { start: DateTime; end: DateTime; }[] || [];

			const freeTimes: FreeTimeSlot[] = [];
			let startOfFreeSlot = dayStart;

			for (const { start, end } of busyTimes) {
				if (startOfFreeSlot < start) {
					freeTimes.push({
							start: startOfFreeSlot.toISO()!,
							end: start.toISO()!
					});
				}
				startOfFreeSlot = end > startOfFreeSlot ? end : startOfFreeSlot;
			}

			if (startOfFreeSlot < dayEnd) {
				freeTimes.push({
					start: startOfFreeSlot.toISO()!,
					end: dayEnd.toISO()!
				});
			}

			freeSlots.push({
				date: dayStart.toISODate()!,
				free_at: freeTimes
			});
	}


	const result: FreeTime = {
		itemId,
		groupId: getGroupID(itemId),
		availability: freeSlots,
	};

	const calData = getCal();
	calData.push(result);
	writeCal();

	return result;

}

const SYDNEY_TZ = 'Australia/Sydney';
  
function findOverlappingTimes(cal1: FreeTime, cal2: FreeTime): FreeTimeDay[] {
    const mapAvailability = (availability: FreeTimeDay[]) => {
        return availability.reduce((acc, entry) => {
        acc[entry.date] = entry.free_at;
        return acc;
        }, {} as Record<string, FreeTimeSlot[]>);
    };

    const cal1Map = mapAvailability(cal1.availability);
    const cal2Map = mapAvailability(cal2.availability);
    const overlapping: FreeTimeDay[] = [];

    for (const date of Object.keys(cal1Map)) {
        if (cal2Map[date]) {
        const overlaps: FreeTimeSlot[] = [];
        for (const slot1 of cal1Map[date]) {
            for (const slot2 of cal2Map[date]) {
            const overlapStart = DateTime.fromISO(slot1.start, { zone: SYDNEY_TZ }).toMillis();
            const overlapEnd = DateTime.fromISO(slot1.end, { zone: SYDNEY_TZ }).toMillis();
            const slot2Start = DateTime.fromISO(slot2.start, { zone: SYDNEY_TZ }).toMillis();
            const slot2End = DateTime.fromISO(slot2.end, { zone: SYDNEY_TZ }).toMillis();
            
            const startMillis = Math.max(overlapStart, slot2Start);
            const endMillis = Math.min(overlapEnd, slot2End);
            
            if (startMillis < endMillis) {
                overlaps.push({
                start: DateTime.fromMillis(startMillis, { zone: SYDNEY_TZ }).toISO() || '',
                end: DateTime.fromMillis(endMillis, { zone: SYDNEY_TZ }).toISO() || ''
                });
            }
            }
        }
        if (overlaps.length > 0) {
            overlapping.push({ date, free_at: overlaps });
        }
        }
    }
    return overlapping;
}

// function findCommonFreeTimes(people: PersonAvailability[]) {
// 	const commonAvailability: FreeTimeDay[] = [];

// 	if (people.length === 0) return { people: [], common_free_times: [] };

// 	const dates = people[0].availability.map((entry: { date: any; }) => entry.date);

// 	for (const date of dates) {
// 		const allFreeTimes = people.map(person => {
// 			const dayAvailability = person.availability.find((entry: { date: any; }) => entry.date === date);
// 			return dayAvailability ? dayAvailability.free_at.map((slot: { start: any; end: any; }) => Interval.fromISO(`${slot.start}/${slot.end}`)) : [];
// 		});

// 		const commonFree = allFreeTimes.reduce((common, personFreeTimes) => {
// 			return common.filter((slot1: { overlaps: (arg0: any) => any; }) => personFreeTimes.some((slot2: any) => slot1.overlaps(slot2)))
// 										.map((slot1: { overlaps: (arg0: any) => any; start: DateInput; end: DateInput; }) => {
// 											const overlap = personFreeTimes.find((slot2: any) => slot1.overlaps(slot2));
// 											return overlap ? Interval.fromDateTimes(
// 												slot1.start! > overlap.start! ? slot1.start! : overlap.start!,
// 												slot1.end! < overlap.end! ? slot1.end! : overlap.end!
// 											) : slot1;
// 										});
// 		}, allFreeTimes[0] || []);

// 		commonAvailability.push({
// 				date,
// 				free_at: commonFree.map((slot: { start: any; end: any; }) => ({ start: slot.start!.toISO()!, end: slot.end!.toISO()! }))
// 		});
// 	}

// 	return { people: people.map(p => p.username), common_free_times: commonAvailability };
// }

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
