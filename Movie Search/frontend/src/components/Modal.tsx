import { X } from "lucide-react";
import { useSummarizing, useSummary } from "../store/useStore";
import { motion } from "motion/react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

type ModalProps = {
	setCardId: (id: string) => void;
	title: string;
	year: string;
};

export const Modal = ({ setCardId, title, year }: ModalProps) => {
	const { summary } = useSummary();
	const { isSummarizing } = useSummarizing();
	const [isLoading, setIsLoading] = useState(false);
	const [lists, setLists] = useState([]);
	const [error, setError] = useState("");

	async function handleSearch() {
		setIsLoading(true);
		const prompt = `Get the list of actors in the format - Actor's name : Role title for this movie - ${title} & year - ${year}`;

		try {
			const res = await fetch("http://localhost:5000/actors", {
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

			const actorsLists = data
				.split("\n")
				.filter((l: string) => l.trim().startsWith("*"))
				.map((l: string) => {
					const cleaned = l.replace(/[*]/g, "").replace(/\*\*/g, "").trim();
					const [name, role] = cleaned.split(":").map((s: string) => s.trim());

					return {
						id: uuidv4(),
						name,
						role,
					};
				});
			setLists(actorsLists);
			console.log(actorsLists);
		} catch (err) {
			console.error("Issue fetching list of actors", err);
			setError("Something went wrong while fetching the cast list.");
		} finally {
			setIsLoading(false);
		}
	}

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

				{!isSummarizing && (
					<button
						type="submit"
						disabled={isLoading}
						className="px-5 py-2 mt-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
						onClick={handleSearch}
					>
						{isLoading ? "Searching..." : lists.length > 0 ? "Refetch Actors" : "Search Actors"}
					</button>
				)}
				{error && (
					<p className="mt-4 text-red-600 font-medium bg-red-100 p-3 rounded">⚠️ {error}</p>
				)}

				{error && lists.length === 0 && !isLoading && (
					<p className="mt-4 text-gray-500 italic">No actors found for this movie.</p>
				)}

				{lists.length > 0 && (
					<div className="mt-6 space-y-3">
						<h3 className="text-xl font-semibold text-gray-800 mb-2">Cast List</h3>
						<div className="divide-y divide-gray-200 border border-gray-500 rounded-lg overflow-hidden">
							{lists.map(({ id, name, role }) => (
								<div
									key={id}
									className="flex justify-between items-start p-3 bg-white hover:bg-gray-50"
								>
									<span className="font-medium text-gray-900">{name}</span>
									<span className="text-sm text-gray-600 text-right">{role}</span>
								</div>
							))}
						</div>
					</div>
				)}
			</motion.div>
		</motion.div>
	);
};
