import express from "express";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

const PORT = 5000;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

app.post("/plot-summary", async (req, res) => {
	const { text } = req.body;
	try {
		const geminiRes = await fetch(
			`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					contents: [
						{
							parts: [{ text: `\n\n${text}` }],
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
				.json({ error: "Failed to generate plot summary from Gemini API", details: errorText });
		}

		const data = await geminiRes.json();
		const plotSummary = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No plot summary found";
		res.json({ plotSummary });
	} catch (error) {
		console.error("Plot summarization error:", error);
		res.status(500).json({ error: "Failed to summarize plot" });
	}
});

app.post("/actors", async (req, res) => {
	const { text } = req.body;
	try {
		const geminiRes = await fetch(
			`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
			{
				method: "POST",
				headers: { "Content-Type": "applocation/json" },
				body: JSON.stringify({
					contents: [
						{
							parts: [{ text: `\n\n${text}` }],
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
				.json({ error: "Failed to generate list of actors from Gemini API", details: errorText });
		}
		const data = await geminiRes.json();
		const listOfActors =
			data?.candidates?.[0]?.content?.parts?.[0]?.text || "No list of actors found";

		res.json(listOfActors);
	} catch (err) {
		console.error("Fetching error", err);
		res.status(500).json({ error: "Failed to fetch actors" });
	}
});

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
