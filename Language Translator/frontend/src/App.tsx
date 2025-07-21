import { useState, type MouseEvent } from "react";

export default function App() {
	const [targetLang, setTargetLang] = useState("en");
	const [text, setText] = useState("");
	const [response, setResponse] = useState("");
	const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		console.log(targetLang);
		console.log(text);

		try {
			const res = await fetch("http://localhost:4000/api/translate", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ text: text, sourceLang: "en", targetLang: targetLang }),
			});

			if (!res.ok) {
				const errorData = await res.json();
				console.log(errorData.message);
				throw new Error("Issue fetching translation");
			}

			const { summary } = await res.json();
			setResponse(summary);
		} catch (err) {}
	};
	return (
		<div>
			<h1>What translation can we help you with today?</h1>

			<textarea
				name=""
				id=""
				value={text}
				onChange={(e) => setText((e.target as HTMLTextAreaElement).value)}
			/>
			<select value={targetLang} onChange={(e) => setTargetLang(e.target.value)}>
				<option value="en">English</option>
				<option value="es">Spanish</option>
				<option value="de">German</option>
			</select>
			<button onClick={handleSubmit}>Translate</button>
			<p>Translation: {response}</p>
		</div>
	);
}
