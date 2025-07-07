import clsx from "clsx";
import { Modal } from "./Modal";

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

export const MovieCard = ({
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
					"flex flex-col items-start gap-4 p-2 rounded-xl hover:border border-blue-500",
					isCard ? "border border-blue-500" : ""
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
			{isCard && <Modal setCardId={setCardId} title={title} year={year} />}
		</>
	);
};
