import { BrowserRouter as Router, Routes, Route } from "react-router";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";

export default function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/quiz" element={<Quiz />} />
				<Route path="/result" element={<Result />} />
			</Routes>
		</Router>
	);
}
