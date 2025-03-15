import fs from 'fs';
import path from 'path';
import { Database } from './interface'

const USERS_FILE = "dataStore.json"

let data: Database = {
	users: [],
	groups: [],
	buckets: [],
	items: [],
}


// Read user info from the json file
const readData = () => {
	if (!fs.existsSync(USERS_FILE)) {
		fs.writeFileSync(USERS_FILE, "[]", "utf-8");
	}

	const jsonData = fs.readFileSync(USERS_FILE, "utf-8");
	data = JSON.parse(jsonData);
};

// Write user info into the json file
const writeData = () => {
	fs.writeFileSync(USERS_FILE, JSON.stringify(data, null, 2), "utf-8");
};

function getData() {
  return data;
}


export {
	readData,
  getData,
	writeData,
}