import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 1234;

app.use(cors());
app.use(express.json());

app.post("/validate", (req: any, res: any) => {
	const { name, email, password, checked } = req.body;
	if (name && email && password && checked) {
		return res.json({ message: "Authenticated" });
	}
	return res.status(400).json({ message: "Missing required fields" });
});

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
