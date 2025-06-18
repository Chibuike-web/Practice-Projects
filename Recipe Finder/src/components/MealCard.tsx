import { MealType } from "../types";

type MealCardProps = MealType & {
	strCategoryDescription?: string;
};

export default function MealCard({ strMeal, strMealThumb, idMeal }: MealCardProps) {
	return (
		<div
			id={`category-${idMeal}`}
			className="bg-white flex flex-col gap-4 p-4 rounded-[24px] overflow-hidden border border-gray-900/10 hover:border-blue-500 transition-shadow"
		>
			<figure className="w-full h-48 overflow-hidden border bg-gray-200 border-gray-900/10 rounded-[12px]">
				<img src={strMealThumb} alt={strMeal} className="w-full h-full object-cover" />
			</figure>
			<h3 className="text-[20px] font-bold">{strMeal}</h3>
		</div>
	);
}
