import { Link } from "react-router";

export default function Home() {
	return (
		<main className="flex flex-col items-center justify-center h-screen bg-gray-50 text-gray-900">
			<h1 className="text-3xl font-bold mb-6">Trivia Game</h1>
			<Link
				to="/quiz"
				className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
			>
				Get Started
			</Link>
		</main>
	);
}
