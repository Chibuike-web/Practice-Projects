import { useState, FormEvent } from "react";
import "./globals.css";
import clsx from "clsx";
import { X } from "lucide-react";
import { useLoading, useSummarizing, useSummary } from "./store/useStore";
import { motion, AnimatePresence } from "motion/react";

const apiKey = import.meta.env.VITE_MOVIE_API_KEY;

export default function App() {
	const [searchTerm, setSearchTerm] = useState("");
	const [result, setResult] = useState([]);
	const [error, setError] = useState("");
	const { isLoading, setIsLoading } = useLoading();
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
			setIsLoading();
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
			setIsLoading();
		}
	};

	const handleCardClick = async (id: string, title: string, year: string) => {
		setCardId(id);
		const prompt = `What is the plot summary for this movie: title - ${title} & year - ${year}`;

		try {
			setIsSummarizing();
			const res = await fetch("http://localhost:5000/ai-response", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ text: prompt }), // ✅ send as object
			});

			if (!res.ok) {
				const errorData = await res.json();
				console.log(errorData);
				setError(errorData);
				return;
			}

			const data = await res.json();
			setSummary(data.summary);
		} catch (error) {
			console.error("Issue fetching summary", error);
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
	handleCardClick: (id: string, title: string, year: string) => void;
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
				onClick={() => {
					handleCardClick(id, title, year);
				}}
			>
				{poster !== "N/A" && (
					<figure className="rounded-md w-full h-64 shadow overflow-hidden">
						<img src={poster} alt={`Poster for ${title}`} className="w-full object-cover h-full" />
					</figure>
				)}
				<div className="text-left">
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
	const { summary } = useSummary();
	const { isSummarizing } = useSummarizing();

	return (
		<motion.div
			className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
			onClick={() => setCardId("")}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.2 }}
		>
			<motion.div
				className="bg-white w-[90%] md:w-2/3 max-h-[80vh] p-6 rounded-2xl shadow-xl overflow-y-auto relative"
				onClick={(e) => e.stopPropagation()}
				initial={{ scale: 0.8, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				exit={{ scale: 0.8, opacity: 0 }}
				transition={{ duration: 0.3, ease: "easeOut" }}
			>
				<div className="flex items-center w-full justify-between mb-4">
					<h2 className="text-2xl font-semibold text-blue-700">Plot Summary</h2>
					<button
						className="text-gray-500 hover:text-red-500"
						onClick={() => setCardId("")}
						aria-label="Close"
					>
						<X className="w-6 h-6" />
					</button>
				</div>
				{isSummarizing ? (
					<div>Loading...</div>
				) : (
					<p className="text-gray-800 leading-relaxed whitespace-pre-line">{summary}</p>
				)}
			</motion.div>
		</motion.div>
	);
};
