import fs from "fs";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const JWT_SECRET = "TOPSECRET";
const USERS_FILE = "users.json"

interface User {
    id: string;
    username: string;
    password: string;
    // groups: [Groups];
    // friends: [Friends];
    // buckets: [Buckets];
    groups: string;
    friends: string;
    buckets: string;
}

// Read user info from the json file
const readUsers = (): User[] => {

    if (!fs.existsSync(USERS_FILE)) {
        fs.writeFileSync(USERS_FILE, "[]", "utf-8");
    
    }
    const data = fs.readFileSync(USERS_FILE, "utf-8");
    return JSON.parse(data);
};

// Write user info into the json file
const writeUsers = (users: User[]) => {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), "utf-8");
};

// User register function
export const register = async (req: Request, res: Response) => {

    // Retrieve the input username and password
    const { username, password } = req.body;
    const users = readUsers();

    // Check if the user already exists
    if (users.some((user) => user.username === username)) {
        return res.status(400).json({ message: "Existing user" });
    }

    // Generate hashed password and create new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser: User = { id: Date.now().toString(), 
                            username, 
                            password: hashedPassword, 
                            groups: "", 
                            friends: "", 
                            buckets: "" };

    users.push(newUser);
    writeUsers(users);

    res.status(201).json({ message: "Registered" });
};

// User login function
export const login = async (req: Request, res: Response) => {

    // Fetch the input username and password
    const { username, password } = req.body;
    const users = readUsers();

    // Check if user exists
    const user = users.find((u) => u.username === username);
    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    
    // Check if the password matches
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token with TTL 1 hour
    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: "1h" });

    res.json({ token });
};

// Middleware to verify JWT token
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
        return res.status(403).json({ message: "Forbidden: Invalid token" });
        }
        (req as any).user = decoded;
        next();
    });
};

// // Get user profile (protected route)
// export const getProfile = (req: Request, res: Response) => {
//   res.json({ message: "Profile data", user: (req as any).user });
// };