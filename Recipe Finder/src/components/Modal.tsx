import { X } from "lucide-react";
import { motion } from "motion/react";
import { fetchRecipe } from "../api";
import { useQuery } from "@tanstack/react-query";

type ModalProps = {
	cardId: string;
	setCardId: (id: string) => void;
};

export const Modal = ({ cardId, setCardId }: ModalProps) => {
	const { data, isLoading, isError, error } = useQuery({
		queryKey: [cardId],
		queryFn: () => fetchRecipe(cardId),
	});

	const content = data?.meals[0];

	return (
		<motion.div
			className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 py-12"
			onClick={() => setCardId("")}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.2 }}
		>
			<motion.div
				className="bg-white w-[90%] h-full p-6 rounded-[48px] shadow-xl overflow-y-auto relative"
				onClick={(e) => e.stopPropagation()}
				initial={{ scale: 0.8, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				exit={{ scale: 0.8, opacity: 0 }}
				transition={{ duration: 0.3, ease: "easeOut" }}
			>
				<button
					className="text-gray-500 hover:text-red-500 absolute right-[2rem] top-[2rem]"
					onClick={() => setCardId("")}
					aria-label="Close"
				>
					<X className="w-8 h-8" />
				</button>

				{isLoading && <p>Loading...</p>}
				{isError && <p>Error: {error.message}</p>}
				{!isLoading && !isError && content && (
					<div className="flex gap-4 mt-8">
						<figure className="size-1/2 overflow-hidden rounded-[32px]">
							<img
								src={content.strMealThumb}
								alt={content.strMeal}
								className="w-full h-full object-cover"
							/>
						</figure>
						<div>
							<span>{content.strCategory}</span>
							<h2>{content.strMeal}</h2>
							{content.strTags
								? content.strTags.split(",").map((item: string) => <span key={item}>{item}</span>)
								: null}
						</div>
					</div>
				)}
				{!isLoading && !isError && !content && <p>No recipe found</p>}
			</motion.div>
		</motion.div>
	);
};
