export async function fetchCategories() {
	const res = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
	if (!res.ok) throw new Error("Network response was not ok");
	return res.json();
}

export async function fetchMealsByCategory(category: string | null) {
	const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
	if (!res.ok) throw new Error("Network response was not ok");
	return res.json();
}

export async function fetchRecipe(mealId: string) {
	const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
	if (!res.ok) throw new Error("Network response was not ok");
	return res.json();
}
