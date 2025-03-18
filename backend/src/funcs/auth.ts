import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User, Database, RegisterObj } from "../interface";
import { v4 } from 'uuid';
import { getData } from "./dataStore";
import { createGroup } from "./groups";

const JWT_SECRET = "TOPSECRET";

// Register a new user
export const register = async ({ email, username, password, profileImg } : RegisterObj) => {
	const db: Database = getData();

	if (db.users.some((user) => user.email === email)) {
		throw new Error("User already exists");
	}

	if (db.users.some((user) => user.username === username)) {
		throw new Error("Username already taken");
	}

	const id = v4()
	// const hashedPassword = await bcrypt.hash(password, 10);
	const newUser: User = {
		id,
		username,
		email,
		profileImg,
		password: password,
		groups: [],
		friends: [],
		buckets: [],
	};

	db.users.push(newUser);
	const user = db.users.find((u) => u.email === email);

	const token = jwt.sign({ user: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });

	createGroup("My", [id], []);

	return ({ message: "Registration success", token });
}

// User login function
export const login = async (email: string, password: string) => {
    const db = getData();
  
    const user = db.users.find((u: User) => u.email === email);
    if (!user) {
				console.log("1")
        throw new Error("Invalid credentials");
    }
    // const isMatch = await bcrypt.compare(password, user.password);
	const isMatch = password === user.password;

    if (!isMatch) {
        throw new Error("Invalid credentials");
    }
  
    const token = jwt.sign({ user: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });
  
    return { message: "Login success", token };
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

export const getAllUsers = () => {
	const data = getData();

	return { users: data.users }
}

// // Get user profile (protected route)
// export const getProfile = (req: Request, res: Response) => {
//   res.json({ message: "Profile data", user: (req as any).user });
// };