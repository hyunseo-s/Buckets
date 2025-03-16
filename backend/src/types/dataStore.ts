import fs from 'fs';
import { Database, FreeTime } from '../interface'

const DATABASE = "database.json"

let data: Database = {
	users: [],
	groups: [],
	buckets: [],
	items: [],
}

let calData : FreeTime[] = []

// Read the database file
export const readData = () => {
	if (!fs.existsSync(DATABASE)) {
		fs.writeFileSync(DATABASE, JSON.stringify({ users: [], groups: [], buckets: [], items: [] }, null, 2), "utf-8");
	}
	data = JSON.parse(fs.readFileSync(DATABASE, "utf-8"));
};

// Write to the database file 
export const writeData = () => {
	fs.writeFileSync(DATABASE, JSON.stringify(data, null, 2), "utf-8");
};

export const readCal = () => {
	if (!fs.existsSync("calData.json")) {
		fs.writeFileSync("calData.json", JSON.stringify([], null, 2), "utf-8");
	}
	
	calData = JSON.parse(fs.readFileSync("calData.json", "utf-8"));
};

// Write to the "calData.json" file 
export const writeCal = () => {
	fs.writeFileSync("calData.json", JSON.stringify(calData, null, 2), "utf-8");
};

export const clear = () => {
	data = {
		users: [],
		groups: [],
		buckets: [],
		items: [],
	}

	return {};
}

export function getData() {
  return data;
}

export function getCal() {
	return calData;
  }