import { X } from "lucide-react";
import { motion } from "motion/react";
import { fetchRecipe } from "../api";
import { useQuery } from "@tanstack/react-query";
import { Fragment } from "react/jsx-runtime";

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

	let ingredients: { ingredient: string; measure: string }[] = [];

	if (!isLoading && !isError && content) {
		for (let i = 1; i <= 20; i++) {
			const ingredient = content[`strIngredient${i}`];
			const measure = content[`strMeasure${i}`];

			if (ingredient.trim()) {
				ingredients.push({
					ingredient: ingredient.trim(),
					measure: measure ? measure.trim() : "",
				});
			}
		}
	}

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
				className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 py-12"
				onClick={() => setCardId("")}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.2 }}
			>
				<motion.div
					className="modal-scroll-container bg-white w-[90%] md:max-w-6xl h-[90%] md:h-[80%] p-6 rounded-[48px] shadow-xl overflow-y-auto relative"
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
						<div className="flex flex-col gap-4 mt-8">
							<div className="flex gap-6">
								<figure className="w-full h-[50%] overflow-hidden rounded-[32px]">
									<img
										src={content.strMealThumb}
										alt={content.strMeal}
										className="w-full h-full object-cover"
									/>
								</figure>
								<div className="w-full space-y-3">
									<span className="text-sm text-gray-500 uppercase tracking-wide">
										{content.strCategory}
									</span>

									<h2 className="text-3xl font-bold text-gray-900">{content.strMeal}</h2>

									{content.strTags && (
										<div className="flex flex-wrap gap-2">
											{content.strTags.split(",").map((item: string) => (
												<span
													key={item}
													className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
												>
													{item.trim()}
												</span>
											))}
										</div>
									)}
								</div>
							</div>
							<div className="my-6">
								<h3 className="text-lg font-semibold mb-4">Ingredients</h3>
								<div className="grid grid-cols-2 gap-y-2 gap-x-4">
									{ingredients.map(
										({ ingredient, measure }: { ingredient: string; measure: string }, idx) => (
											<Fragment key={idx}>
												<span className="text-gray-800">{ingredient}</span>
												<span className="text-gray-500">{measure}</span>
											</Fragment>
										)
									)}
								</div>
							</div>
						</div>
					)}
					{!isLoading && !isError && !content && <p>No recipe found</p>}
				</motion.div>
			</motion.div>
		</motion.div>
	);
};
