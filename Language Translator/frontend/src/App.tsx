import { useState } from "react";
import { Textarea } from "./components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Button } from "./components/ui/button";
import { Send } from "lucide-react";
import { cn } from "./lib/utils";

export default function App() {
	const [targetLang, setTargetLang] = useState("en");
	const [text, setText] = useState("");
	const [response, setResponse] = useState<{ role: string; content: string }[]>([]);

	const [isLoading, setIsLoading] = useState(false);
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(targetLang);
		console.log(text);
		setIsLoading(true);
		if (!text.trim()) return;

		setResponse((prev) => [...prev, { role: "Me", content: text }]);
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
			const bot = {
				role: "Bot",
				content: summary,
			};
			setResponse((prev) => [...prev, bot]);
		} catch (err) {
			console.error(err);
		} finally {
			setIsLoading(false);
			setText("");
		}
	};
	return (
		<main className="max-w-[650px] mx-auto py-12">
			<div className="flex flex-col gap-4">
				{response.map((res, index) => (
					<div
						className={cn(
							"flex items-center gap-2",
							res.role === "Me" ? " self-end" : "self-start"
						)}
					>
						<strong>{res.role}:</strong>
						<div
							key={index}
							className={cn(
								"flex gap-2 rounded-[18px] px-4 py-2 w-full max-w-[450px]",
								res.role === "Me" ? "bg-primary text-white" : "bg-accent"
							)}
						>
							{res.content}
						</div>
					</div>
				))}
			</div>
			<form
				onSubmit={handleSubmit}
				className="max-w-[650px] w-full overflow-hidden border bg-background shadow-sm rounded-[28px] fixed bottom-4"
			>
				<div className="flex w-full justify-between px-3 pt-3">
					<Textarea
						value={text}
						placeholder="What translation can we help you with today?"
						className="border-none shadow-none outline-none focus-visible:ring-0 resize-none max-h-[200px]"
						onChange={(e) => setText((e.target as HTMLTextAreaElement).value)}
					/>
					<Button className="size-8 rounded-full" disabled={isLoading}>
						<Send />
					</Button>
				</div>
				<div className="flex w-full justify-between px-2 py-2">
					<Select onValueChange={setTargetLang}>
						<SelectTrigger className="border-none shadow-none hover:bg-accent data-[state=open]:bg-accent transition-[color]">
							<SelectValue placeholder="Select target lang" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="en">English</SelectItem>
							<SelectItem value="es">Spanish</SelectItem>
							<SelectItem value="de">German</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</form>
		</main>
	);
}
