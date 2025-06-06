import { useState, FormEvent } from "react";
import "./globals.css";
import clsx from "clsx";

const apiKey = import.meta.env.MOVIE_API_KEY;

export default function App() {
	const [searchTerm, setSearchTerm] = useState("");
	const [result, setResult] = useState([]);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [cardId, setCardId] = useState("");

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
			setLoading(false);
		}
	};

	const handleCardClick = async (id: string) => {
		setCardId(id);
	};
	return (
		<div className="p-6 font-sans max-w-4xl mx-auto">
			<form onSubmit={handleSubmit} className="flex gap-4 mb-6">
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
					disabled={loading}
					className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
				>
					{loading ? "Searching..." : "Search"}
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
							handleCardClick={() => handleCardClick(imdbID)}
						/>
					))}
				</div>
			)}
		</div>
	);
}

type MovieItems = {
	id: string;
	title: string;
	year: string;
	type: string;
	poster: string;
};

type MovieCardProps = MovieItems & {
	isCard: boolean;
	setCardId: (id: string) => void;
	handleCardClick: () => void;
};

const MovieCard = ({
	id,
	title,
	year,
	type,
	poster,
	isCard,
	setCardId,
	handleCardClick,
}: MovieCardProps) => {
	return (
		<>
			<button
				type="button"
				key={id}
				className={clsx(
					"flex flex-col items-start gap-4 p-2 rounded-xl",
					isCard ? "border  border-blue-500" : ""
				)}
				onClick={handleCardClick}
			>
				{poster !== "N/A" && (
					<figure className="rounded-md w-full h-64 shadow overflow-hidden">
						<img src={poster} alt={`Poster for ${title}`} className="w-full object-cover h-full" />
					</figure>
				)}
				<div>
					<p className="text-lg font-semibold">{title}</p>
					<p className="text-gray-600">Type: {type}</p>
					<p className="text-gray-600">Year: {year}</p>
				</div>
			</button>
			{isCard && <Modal setCardId={setCardId} />}
		</>
	);
};

const Modal = ({ setCardId }: { setCardId: (id: string) => void }) => {
	return (
		<div
			className="inset-0 bg-gray-900/25 justify-items-center content-center fixed"
			onClick={() => setCardId("")}
		>
			<div className="bg-white size-2/3"></div>
		</div>
	);
};
