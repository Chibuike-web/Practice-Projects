import express, { Request, Response } from "express";
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
	password?: string;
	checked: boolean;
	isVerified: boolean;
	otp?: string;
	authProvider: "local" | "google";
}
const users: User[] = [];

// Sending users
app.get("/auth/users/:id", async (req: any, res) => {
	const { id } = req.params;
	const user = users.find((u) => u.id === id);
	if (!user) {
		console.log("User does not exist");
		return res.status(400).json({ message: "user does not exist" });
	}
	return res.status(200).json({ user });
});

// Register
app.post("/auth/register", async (req, res) => {
	try {
		const { name, email, password, checked } = req.body;
		if (!name || !email || !password || !checked) {
			return res.status(400).json({ message: "Missing Inputs" });
		}

		const existingUser = users.find((user) => user.email === email);
		if (existingUser) {
			console.log("User exists:", existingUser.email);
			return res.status(409).json({ message: "user already exists", user: existingUser });
		}

		const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(password, saltRounds);

		const newUser: User = {
			id: uuidv4(),
			name,
			email,
			checked,
			password: hashedPassword,
			isVerified: false,
			authProvider: "local",
		};

		users.push(newUser);

		return res.status(200).json({ message: "User Registered", user: newUser });
	} catch (error) {
		console.error("Registration error:", error);
		return res.status(500).json({ message: "Something went wrong" });
	}
});

app.post("/auth/request-verification", async (req, res) => {
	const { id, method, phone } = req.body;
	if (!["email", "phone"].includes(method)) {
		return res.status(400).json({ message: "Invalid verification method" });
	}
	const user = users.find((u) => u.id === id);
	if (!user) return res.status(404).json({ message: "User not found" });

	if (user.isVerified) {
		return res.status(409).json({ message: "User has been verified" });
	}
	const email = user.email;
	if (method === "email") {
		try {
			const otp = generateOTP();
			user.otp = otp;
			console.log(`Email OTP for ${email}: ${otp} : ${id}`);
			await sendEmailOTP(email, otp);
			res.status(200).json({ message: "OTP sent", id: id, email: email });
		} catch (error) {
			console.error("Error sending email OTP:", error);
			res.status(500).json({ message: "Failed to send OTP" });
		}
	} else if (method === "phone") {
		try {
			const otp = generateOTP();
			user.otp = otp;
			console.log(`Phone OTP for ${phone}: ${otp}`);

			await sendPhoneOTP(phone, otp);
			res.status(200).json({ message: "OTP sent" });
		} catch (error) {
			console.error("Error sending phone OTP:", error);
			res.status(500).json({ message: "Failed to send OTP" });
		}
	}
});

app.post("/auth/otp", async (req, res) => {
	const { id, otp } = req.body;
	try {
		const user = users.find((u) => u.id === id);
		const isOtpExist = user?.otp;

		if (isOtpExist && isOtpExist !== otp) {
			res.status(400).json({ message: "The OTP you entered is incorrect. Please try again." });
		}
		if (user) {
			user.isVerified = true;
		}
		res.status(200).json({ message: "user verified", id: id });
	} catch (error) {
		console.error("Error verifying user:", error);
		res.status(500).json({ message: "Failed to verify" });
	}
});

app.post("/auth/login", async (req, res) => {
	try {
		const { email, password } = req.body;
		const errors: Errors = { email: "", password: "" };
		const user = users.find((user) => user.email === email);
		if (!user) {
			errors.email = "Email not found";
			return res.status(400).json({ errors });
		}

		if (!user.password) {
			if (user.authProvider === "google") {
				errors.email = "Please login using Google";
				return res.status(400).json({ errors });
			}
			return;
		}
		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			errors.password = "Incorrect password";
			return res.status(400).json({ errors });
		}
		if (!user.isVerified) {
			return res.status(409).json({ message: "User has not been verified", user: user });
		}

		return res.status(200).json({ message: "User Authenticated", user: user });
	} catch (error) {
		console.error("Login error:", error);
		return res.status(500).json({ message: "Something went wrong" });
	}
});

app.get("/auth/google", (req: Request, res: Response) => {
	const redirectUrl = process.env.REDIRECT_URL;
	const clientId = process.env.GOOGLE_CLIENT_ID;
	const scope = "openid profile email";
	const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${encodeURIComponent(
		scope
	)}`;
	res.redirect(authUrl);
});
app.get("/auth/google/callback", async (req, res) => {
	const code = req.query.code as string;

	const tokenRes = await fetch("https:/oauth2.googleapis.com/token", {
		method: "POST",
		headers: { "Content-Type": "application/x-www-form-urlencoded" },
		body: new URLSearchParams({
			code,
			client_id: process.env.GOOGLE_CLIENT_ID!,
			client_secret: process.env.GOOGLE_CLIENT_SECRET!,
			redirect_uri: process.env.REDIRECT_URL!,
			grant_type: "authorization_code",
		}),
	});
	const tokens = await tokenRes.json();
	const userRes = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
		headers: { Authorization: `Bearer ${tokens.access_token}` },
	});
	const user = await userRes.json();
	const newUser: User = {
		id: uuidv4(),
		name: user.name,
		email: user.email,
		isVerified: user.email_verified,
		checked: true,
		authProvider: "google",
	};
	users.push(newUser);

	const encodedUser = encodeURIComponent(JSON.stringify(newUser));
	return res.redirect(`http://localhost:5173/oauth-success?user=${encodedUser}`);
});

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
