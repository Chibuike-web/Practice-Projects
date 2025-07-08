import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import { generateOTP } from "./utils";
import { sendEmailOTP } from "./emailOTP";
import { sendPhoneOTP } from "./phoneOTP";

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
	phone?: string;
	password: string;
	isEmailVerified: boolean;
	isPhoneVerified: boolean;
	emailOTP?: string;
	phoneOTP?: string;
}
const users: User[] = [];

// Register
app.post("/auth/register", async (req: any, res: any) => {
	try {
		const { name, email, password, checked } = req.body;

		const existingUser = users.find((user) => user.email === email);
		if (existingUser) {
			console.log("User exists");
			return res.status(400).json({ message: "user already exists" });
		}

		const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(password, saltRounds);

		const newUser: User = {
			id: uuidv4(),
			name,
			email,
			password: hashedPassword,
			isEmailVerified: false,
			isPhoneVerified: false,
		};

		users.push(newUser);
		console.log(users);
		return res.status(200).json({ message: "User Registered" });
	} catch (error) {
		console.error("Registration error:", error);
		return res.status(500).json({ message: "Something went wrong" });
	}
});

app.post("/auth/request-verification", async (req: any, res: any) => {
	const { email, method, phone } = req.body;
	const user = users.find((u) => u.email === email);
	if (!user) return res.status(404).json({ message: "User not found" });

	if (method === "email") {
		try {
			const otp = generateOTP();
			user.emailOTP = otp;
			console.log(`Email OTP for ${email}: ${otp}`);

			await sendEmailOTP(email, otp);
			res.status(200).json({ message: "OTP sent" });
		} catch (error) {
			console.error("Error sending email OTP:", error);
			res.status(500).json({ message: "Failed to send OTP" });
		}
	} else if (method === "phone") {
		try {
			const otp = generateOTP();
			user.phoneOTP = otp;
			console.log(`Phone OTP for ${phone}: ${otp}`);

			await sendPhoneOTP(phone, otp);
			res.status(200).json({ message: "OTP sent" });
		} catch (error) {
			console.error("Error sending email OTP:", error);
			res.status(500).json({ message: "Failed to send OTP" });
		}
	}
});

app.post("/auth/login", async (req: any, res: any) => {
	try {
		const { email, password } = req.body;
		const errors: Errors = { email: "", password: "" };
		const user = users.find((user) => user.email === email);
		if (!user) {
			errors.email = "Email not found";
			return res.status(400).json({ errors });
		}

		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			errors.password = "Incorrect password";
			return res.status(400).json({ errors });
		}
		return res.status(200).json({ message: "User Authenticated" });
	} catch (error) {
		console.error("Login error:", error);
		return res.status(500).json({ message: "Something went wrong" });
	}
});

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
