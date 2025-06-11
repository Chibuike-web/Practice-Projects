import express from "express";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

const PORT = 5000;

app.post("/ai-response", async (req, res) => {
	const { text } = req.body;
	const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
	try {
		const geminiRes = await fetch(
			`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					contents: [
						{
							parts: [{ text: `Summarize the following:\n\n${text}` }],
						},
					],
				}),
			}
		);
		if (!geminiRes.ok) {
			const errorText = await geminiRes.text();
			console.error(`Gemini API Error (${geminiRes.status}): ${errorText}`);
			return res
				.status(res.status)
				.json({ error: "Failed to get summary from Gemini API", details: errorText });
		}

		const data = await geminiRes.json();
		const summary = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No summary found";
		res.json({ summary });
	} catch (error) {
		console.error("Summarization error:", error);
		res.status(500).json({ error: "Failed to summarize text" });
	}
});

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
