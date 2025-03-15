import fs from "fs";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User, Database } from "./interface";
import { v4 } from 'uuid';
import { readData } from "./dataStore";

const JWT_SECRET = "TOPSECRET";
const DATABASE = "database.json"


// // Read the database file
// const readDatabase = () => {
//     if (!fs.existsSync(DATABASE)) {
//         fs.writeFileSync(DATABASE, JSON.stringify({ users: [], group: [], buckets: [], items: [] }, null, 2), "utf-8");
//     }

//     return JSON.parse(fs.readFileSync(DATABASE, "utf-8"));
//   };

// // Helper function to write to database
// const writeDatabase = (data: Database) => {
//     fs.writeFileSync(DATABASE, JSON.stringify(data, null, 2), "utf-8");
// };

// Register a new user
export const register = async (req: Request, res: Response) => {
    const { email, username, password } = req.body;
    
    const db: Database = readData();
  
    if (db.users.some((user) => user.email === email)) {
        throw new Error("User already exists");
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser: User = {
        id: String(v4()),
        username,
        email,
        password: hashedPassword,
        groups: [],
        friends: [],
        buckets: [],
    };

    db.users.push(newUser);
    writeDatabase(db);

    const dbnew = readDatabase();
  
    const user = dbnew.users.find((u) => u.email === email);

    const token = jwt.sign({ user: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({ message: "Registration success", token });
}

// User login function
export const login = async (req: Request, res: Response) => {

    const { email, password } = req.body;
    const db = readDatabase();
  
    const user = db.users.find((u) => u.email === email);
    if (!user) {
        throw new Error("Invalid credentials");
    }
  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid credentials");
    }
  
    const token = jwt.sign({ user: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });
  
    res.status(201).json({ message: "Login success", token });
};

// Middleware to verify JWT token
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        throw new Error("No token provided");
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            throw new Error("Invalid token");
        }
        (req as any).user = decoded;
        next();
    });
};

// // Get user profile (protected route)
// export const getProfile = (req: Request, res: Response) => {
//   res.json({ message: "Profile data", user: (req as any).user });
// };