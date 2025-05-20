import { useState, FormEvent } from "react";
import "./globals.css";

export default function App() {
	const [searchTerm, setSearchTerm] = useState("");
	const [result, setResult] = useState([]);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError("");
		setResult([]);

		if (searchTerm.trim().length < 3) {
			setError("Please enter at least 3 characters");
			return;
		}

		try {
			setLoading(true);
			const res = await fetch(
				`https://www.omdbapi.com/?s=${encodeURIComponent(searchTerm)}&apikey=8b76ef00`
			);

			const data = await res.json();

			if (data.Response == "False") {
				setError(data.Error || "No results found");
			} else {
				setResult(data.Search || []);
			}
		} catch (error) {
			console.log("Issue fetching movie lists", error);
			setError("Failed to fetch movies. Please try again.");
		} finally {
			setLoading(false);
		}
	};
	return (
		<div className="p-6 font-sans max-w-3xl mx-auto">
			<form onSubmit={handleSubmit} className="flex gap-4 mb-6">
				<input
					type="search"
					value={searchTerm}
					placeholder="Search any movie"
					className="flex-1 border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
					onChange={(e) => {
						setSearchTerm(e.target.value);
						setError("");
					}}
				/>
				<button
					type="submit"
					disabled={loading}
					className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
				>
					{loading ? "Searching..." : "Search"}
				</button>
			</form>

			{error && <p className="text-red-600 mb-4">{error}</p>}

			{result.length > 0 && (
				<div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-6">
					{result.map(({ Title, Year, imdbID, Type, Poster }) => (
						<div key={imdbID} className="flex flex-col items-start gap-4">
							{Poster !== "N/A" && (
								<figure className="rounded-md w-full h-64 shadow overflow-hidden">
									<img
										src={Poster}
										alt={`Poster for ${Title}`}
										className="w-full object-cover h-full"
									/>
								</figure>
							)}
							<div>
								<p className="text-lg font-semibold">{Title}</p>
								<p className="text-gray-600">Type: {Type}</p>
								<p className="text-gray-600">Year: {Year}</p>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
