import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 1234;

app.use(cors());
app.use(express.json());

interface Errors {
	name: string;
	email: string;
	password: string;
	checked: string;
}

app.post("/auth/register", (req: any, res: any) => {
	const { name, email, password, checked } = req.body;
	const errors: Errors = { name: "", email: "", password: "", checked: "" };
	if (!name) errors.name = "Name is required";
	if (!email) errors.email = "Email is required";
	else {
		const emailRegex = /^\S+@\S+\.\S+$/;
		if (!emailRegex.test(email)) {
			errors.email = "Invalid email address";
		}
	}
	if (!password) errors.password = "Password is required";
	if (!checked) errors.checked = "You must agree to terms";

	if (Object.keys(errors).length > 0) {
		return res.status(400).json({ errors });
	}

	return res.status(200).json({ message: "Authenticated" });
});

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
