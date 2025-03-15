import fs from 'fs';
import { Database } from '../interface'

const DATABASE = "database.json"

let data: Database = {
	users: [],
	groups: [],
	buckets: [],
	items: [],
}

// Read the database file
export const readData = () => {
	console.log("red")
	if (!fs.existsSync(DATABASE)) {
		console.log("insd")
		fs.writeFileSync(DATABASE, JSON.stringify({ users: [], groups: [], buckets: [], items: [] }, null, 2), "utf-8");
	}
	data = JSON.parse(fs.readFileSync(DATABASE, "utf-8"));
};

// Write to the database file 
export const writeData = () => {
	fs.writeFileSync(DATABASE, JSON.stringify(data, null, 2), "utf-8");
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