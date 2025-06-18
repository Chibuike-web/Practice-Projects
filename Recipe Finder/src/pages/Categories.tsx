import { useQuery } from "@tanstack/react-query";
import CategoryCard from "../components/CategoryCard";
import type { CategoryType } from "../types";

export default function Categories() {
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["meals"],
		queryFn: async () => {
			const res = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
			if (!res.ok) {
				throw new Error("Network response was not ok");
			}
			return res.json();
		},
	});

	if (isLoading) return <p>Loading...</p>;
	if (isError) return <p>Error: {error.message}</p>;

	return (
		<main>
			<h1 className="text-3xl font-bold mb-6 text-center py-4 bg-gray-700 text-white">
				Recipe Finder
			</h1>
			<div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl mx-auto ">
				{data?.categories.map((item: CategoryType) => (
					<CategoryCard key={item.idCategory} {...item} />
				))}
			</div>
		</main>
	);
}
