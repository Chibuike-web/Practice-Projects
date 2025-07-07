import { useQuery } from "@tanstack/react-query";
import CategoryCard from "../components/CategoryCard";
import type { CategoryType } from "../types";
import { fetchCategories } from "../services/api";

export default function CategoryPage() {
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["categories"],
		queryFn: fetchCategories,
	});

	if (isLoading) return <p>Loading...</p>;
	if (isError) return <p>Error: {error.message}</p>;
	if (data?.categories?.length === 0 || data?.categories == null) {
		return <p className="text-center">No category found</p>;
	}

	return (
		<main>
			<h1 className="text-3xl font-bold mb-6 text-center py-4 bg-gray-700 text-white">
				Recipe Finder
			</h1>
			<div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl mx-auto px-6 xl:px-0">
				{data?.categories.map((item: CategoryType) => (
					<CategoryCard key={item.idCategory} {...item} />
				))}
			</div>
		</main>
	);
}
