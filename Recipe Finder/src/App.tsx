import "./globals.css";
import { Routes, Route } from "react-router";
import Categories from "./pages/Categories";
import Meals from "./pages/Meals";

export default function App() {
	return (
		<Routes>
			<Route index element={<Categories />} />
			<Route path="/meals" element={<Meals />} />
		</Routes>
	);
}
