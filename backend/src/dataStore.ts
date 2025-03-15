import fs from 'fs';
import path from 'path';
import { Database } from './interface'

const DATABASE = "database.json"

let data: Database = {
	users: [],
	groups: [],
	buckets: [],
	items: [],
}

// Read the database file
const readData = () => {
    if (!fs.existsSync(DATABASE)) {
        fs.writeFileSync(DATABASE, JSON.stringify({ users: [], group: [], buckets: [], items: [] }, null, 2), "utf-8");
    }
    return JSON.parse(fs.readFileSync(DATABASE, "utf-8"));
};

// Write to the database file 
const writeData = () => {
    fs.writeFileSync(DATABASE, JSON.stringify(data, null, 2), "utf-8");
};

function getData() {
  return data;
}

export {
	readData,
    getData,
	writeData,
}