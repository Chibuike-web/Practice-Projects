import { Link, useSearchParams } from "react-router";
import { CategoryType } from "../types";

export default function CategoryCard({
	idCategory,
	strCategory,
	strCategoryThumb,
	strCategoryDescription,
}: CategoryType) {
	const [, setSearchParams] = useSearchParams();

	return (
		<Link
			to={`/meals/?q=${strCategory}`}
			id={`category-${idCategory}`}
			onClick={() => setSearchParams({ q: strCategory })}
			className="bg-white flex flex-col gap-4 p-4 rounded-[24px] overflow-hidden border border-gray-900/10 hover:border-blue-500 transition-shadow"
		>
			<figure className="w-full h-48 overflow-hidden border bg-gray-200 border-gray-900/10 rounded-[12px]">
				<img src={strCategoryThumb} alt={strCategory} className="w-full h-full object-cover" />
			</figure>
			<div className="flex flex-col gap-1">
				<h3 className="text-[20px] font-bold">{strCategory}</h3>
				<p className="text-[14px] text-gray-600 line-clamp-3">{strCategoryDescription}</p>
			</div>
		</Link>
	);
}
