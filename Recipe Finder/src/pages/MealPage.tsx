import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import MealCard from "../components/MealCard";
import { MealType } from "../types";
import { fetchMealsByCategory } from "../services/api";

export default function MealPage() {
	const [searchParams] = useSearchParams();
	const query = searchParams.get("q");

	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["meals", query],
		queryFn: () => fetchMealsByCategory(query),
	});

	if (isLoading) return <p>Loading...</p>;
	if (isError) return <p>Error: {error.message}</p>;
	if (data?.meals?.length === 0 || data?.meals == null) {
		return <p className="text-center">No meals found for "{query}".</p>;
	}

	return (
		<main>
			<h1 className="text-3xl font-bold mb-6 text-center py-4 bg-gray-700 text-white">{query}</h1>
			<div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl mx-auto px-6 xl:px-0">
				{data?.meals.map((item: MealType) => (
					<MealCard key={item.idMeal} {...item} />
				))}
			</div>
		</main>
	);
}
