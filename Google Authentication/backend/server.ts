import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 1234;

app.use(cors());
app.use(express.json());

interface Errors {
	name?: string;
	email: string;
	password: string;
	checked?: string;
}

interface User {
	id: string;
	name: string;
	email: string;
	password: string;
	checked: string;
}

const users: User[] = [];

// Register
app.post("/auth/register", (req: any, res: any) => {
	const { name, email, password, checked } = req.body;

	const existingUser = users.find((user) => user.email === email);
	if (existingUser) {
		return res.status(400).json({ message: "User already exists" });
	}

	users.push({ id: uuidv4(), name, email, password, checked });
	console.log(users);
	return res.status(200).json({ message: "User Registered" });
});

app.post("/auth/login", (req: any, res: any) => {
	const { email, password } = req.body;
	const errors: Errors = { email: "", password: "" };
	const user = users.find((user) => user.email === email);
	if (!user) {
		errors.email = "Email not found";
		return res.status(400).json({ errors });
	}

	if (user.password !== password) {
		errors.password = "Incorrect password";
		return res.status(400).json({ errors });
	}
	return res.status(200).json({ message: "User Authenticated" });
});

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
