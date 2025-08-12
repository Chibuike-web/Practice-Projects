import { Hono } from "hono";
import { cors } from "hono/cors";
import { ContentfulStatusCode } from "hono/utils/http-status";
import { serve } from "@hono/node-server";
import dotenv from "dotenv";

dotenv.config();
const app = new Hono();

app.use("*", cors());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
console.log(GEMINI_API_KEY);

app.post("/api/translate", async (c) => {
	try {
		const { text, sourceLang, targetLang } = await c.req.json();

		const res = await fetch(
			`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					contents: [
						{
							parts: [
								{
									text: `Translate ${text} from ${sourceLang} to ${targetLang}. Return only the translated sentence with no explanation or alternative versions`,
								},
							],
						},
					],
				}),
			}
		);

		if (!res.ok) {
			const errText = await res.text();
			const status = res.status;
			console.error(`Gemini API Error (${status}): ${errText}`);
			return c.json(
				{ error: "Failed to get summary from Gemini API", details: errText },
				status as ContentfulStatusCode
			);
		}

		const data = await res.json();
		const summary = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No summary found";
		return c.json({ summary });
	} catch (err) {
		console.error("Summarization error:", err);
		return c.json({ error: "Failed to summarize text" }, 500);
	}
});

const port = 4000;
console.log(`🚀 Server is running at http://localhost:${port}`);

serve({ fetch: app.fetch, port });
