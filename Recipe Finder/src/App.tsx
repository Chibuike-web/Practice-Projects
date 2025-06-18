import "./globals.css";
import { Routes, Route } from "react-router";
import CategoryPage from "./pages/CategoryPage";
import MealPage from "./pages/MealPage";

export default function App() {
	return (
		<Routes>
			<Route index element={<CategoryPage />} />
			<Route path="/meals" element={<MealPage />} />
		</Routes>
	);
}
