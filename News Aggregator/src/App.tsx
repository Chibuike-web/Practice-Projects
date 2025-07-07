import { useState, FormEvent } from "react";
import "./globals.css";

const apiKey = import.meta.env.VITE_API_KEY;

export default function App() {
	const [searchTerm, setSearchTerm] = useState("");
	const [result, setResult] = useState([]);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError("");
		setResult([]);

		try {
			setLoading(true);
			const res = await fetch(
				`https://gnews.io/api/v4/search?q=${encodeURIComponent(
					searchTerm
				)}&lang=en&country=ng&max=10&apikey=${apiKey}`
			);

			const data = await res.json();

			if (!data.totalArticles) {
				setError(data.Error || "No results found");
			} else {
				setResult(data.articles || []);
			}
		} catch (error) {
			console.error("Issue fetching news", error);
			setError("Failed to fetch news. Please try again");
		} finally {
			setLoading(false);
			setSearchTerm("");
		}
	};
	return (
		<div className="p-6 font-sans max-w-6xl mx-auto flex flex-col items-center justify-center gap-12">
			<form onSubmit={handleSubmit} className="flex flex-col sm:flex-row w-full max-w-3xl gap-4">
				<input
					type="search"
					value={searchTerm}
					placeholder="Search any news"
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
					{loading ? "Search..." : "Search"}
				</button>
			</form>
			{error && <p className="text-red-600 mb-4">{error}</p>}

			{result.length > 0 && (
				<div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6">
					{result.map(({ title, description, url, image, source, publishedAt }, index) => (
						<NewsCard
							key={index}
							title={title}
							description={description}
							url={url}
							image={image}
							source={source}
							publishedAt={publishedAt}
						/>
					))}
				</div>
			)}
		</div>
	);
}

type NewsCardProps = {
	title: string;
	description: string;
	url: string;
	image: string;
	source: { name: string };
	publishedAt: string;
};

const NewsCard = ({ title, description, url, image, source, publishedAt }: NewsCardProps) => {
	const formattedDate = new Date(publishedAt).toLocaleDateString();

	return (
		<article className="flex flex-col">
			<figure className="w-full h-56 overflow-hidden rounded-2xl">
				<img src={image} alt={`A News Image`} className="w-full object-cover h-full" />
			</figure>
			<h2 className="text-xl leading-[1.3] font-semibold mt-4 mb-2">{title}</h2>
			<p className="text-sm text-gray-700 mb-3">{description}</p>
			<div className="flex items-center justify-between mt-auto">
				<a
					href={url}
					target="_blank"
					rel="noopener noreferrer"
					className="text-blue-600 hover:underline"
				>
					Read more
				</a>
				<div className="text-xs text-gray-500">
					{source?.name} • {formattedDate}
				</div>
			</div>
		</article>
	);
};
