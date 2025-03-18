import fs from 'fs';
import { Database, FreeTime } from '../interface'

const DATABASE = "database.json"
const calDB = "calData.json"

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
	if (!fs.existsSync(calDB)) {
		fs.writeFileSync(calDB, JSON.stringify([], null, 2), "utf-8");
	}
	
	calData = JSON.parse(fs.readFileSync(calDB, "utf-8"));
};

// Write to the calDB file 
export const writeCal = () => {
	fs.writeFileSync(calDB, JSON.stringify(calData, null, 2), "utf-8");
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