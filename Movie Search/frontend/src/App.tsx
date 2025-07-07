import { useState, FormEvent } from "react";
import "./globals.css";
import { useSummarizing, useSummary } from "./store/useStore";
import { MovieCard } from "./components/MovieCard";

const apiKey = import.meta.env.VITE_MOVIE_API_KEY;

export default function App() {
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [result, setResult] = useState([]);
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const { setIsSummarizing } = useSummarizing();
	const [cardId, setCardId] = useState("");
	const { setSummary } = useSummary();

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError("");
		setResult([]);

		if (searchTerm.trim().length < 3) {
			setError("Please enter at least 3 characters");
			return;
		}

		try {
			setIsLoading((prev) => !prev);
			const res = await fetch(
				`https://www.omdbapi.com/?s=${encodeURIComponent(searchTerm)}&apikey=${apiKey}`
			);

			const data = await res.json();

			if (data.Response === "False") {
				setError(data.Error || "No results found");
			} else {
				setResult(data.Search || []);
			}
		} catch (error) {
			console.log("Issue fetching movie lists", error);
			setError("Failed to fetch movies. Please try again.");
		} finally {
			setIsLoading((prev) => !prev);
			setSearchTerm("");
		}
	};

	const handleCardClick = async (id: string, title: string, year: string) => {
		setCardId(id);
		const prompt = `What is the plot summary for this movie: title - ${title} & year - ${year}`;

		try {
			setIsSummarizing();
			const res = await fetch("http://localhost:5000/plot-summary", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ text: prompt }),
			});

			if (!res.ok) {
				const errorData = await res.json();
				console.log(errorData.error);
				setError(errorData.error);
				return;
			}

			const data = await res.json();
			setSummary(data.plotSummary);
		} catch (error) {
			console.error("Issue fetching plot summary", error);
		} finally {
			setIsSummarizing();
		}
	};

	return (
		<div className="p-6 font-sans max-w-4xl mx-auto">
			<form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 mb-6">
				<input
					type="search"
					value={searchTerm}
					placeholder="Search any movie"
					className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
					onChange={(e) => {
						setSearchTerm(e.target.value);
						setError("");
					}}
				/>
				<button
					type="submit"
					disabled={isLoading}
					className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
				>
					{isLoading ? "Searching..." : "Search"}
				</button>
			</form>

			{error && <p className="text-red-600 mb-4">{error}</p>}

			{result.length > 0 && (
				<div className="grid grid-cols-[repeat(auto-fill,minmax(170px,1fr))] gap-4">
					{result.map(({ Title, Year, imdbID, Type, Poster }) => (
						<MovieCard
							key={imdbID}
							id={imdbID}
							title={Title}
							year={Year}
							type={Type}
							poster={Poster}
							isCard={cardId === imdbID}
							setCardId={setCardId}
							handleCardClick={handleCardClick}
						/>
					))}
				</div>
			)}
		</div>
	);
}
