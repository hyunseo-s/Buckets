import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User, Database } from "../interface";
import { v4 } from 'uuid';
import { getData, readData, writeData } from "./dataStore";

const JWT_SECRET = "TOPSECRET";

// Register a new user
export const register = async (req: Request, res: Response) => {
    const { email, username, password } = req.body;
    console.log(email,username,password)
    
    const db: Database = getData();
  
    if (db.users.some((user) => user.email === email)) {
        throw new Error("User already exists");
    }
  
    // const hashedPassword = await bcrypt.hash(password, 10);
    const newUser: User = {
        id: String(v4()),
        username,
        email,
        password: password,
        groups: [],
        friends: [],
        buckets: [],
    };

    db.users.push(newUser);

  
    const user = db.users.find((u) => u.email === email);

    const token = jwt.sign({ user: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({ message: "Registration success", token });
}

// User login function
export const login = async (req: Request, res: Response) => {

    const { email, password } = req.body;
    const db = readData();
  
    const user = db.users.find((u: User) => u.email === email);
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