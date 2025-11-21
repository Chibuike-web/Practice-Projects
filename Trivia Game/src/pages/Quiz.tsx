import { useQuery } from "@tanstack/react-query";
import { fetchQuiz } from "../api/fetchQuiz";
import { useState } from "react";
import Question from "../components/Question";
import { useNavigate } from "react-router";
import QuizContextProvider from "../context/quizContext";
import { useSelectContext } from "../context/selectContext";

export type QuizQuestion = {
	type: string;
	difficulty: string;
	category: string;
	question: string;
	correct_answer: string;
	incorrect_answers: string[];
};

export default function Quiz() {
	const [current, setCurrent] = useState(1);
	const navigate = useNavigate();
	const { selected } = useSelectContext();

	const { data, isPending, isError } = useQuery({
		queryKey: ["quiz"],
		queryFn: fetchQuiz,
		staleTime: Infinity,
		gcTime: Infinity,
	});

	if (isPending) return <div className="grid place-items-center min-h-screen">Loading...</div>;
	if (isError)
		return <div className="grid place-items-center min-h-screen">Error loading quiz</div>;

	if (!data || !data.results || data.results.length === 0) {
		return <div className="grid place-items-center min-h-screen">No quiz data found</div>;
	}

	const quizzes: QuizQuestion[] = data.results;

	const quiz = quizzes[current - 1];
	const select = selected[quiz.question];

	return (
		<main className="max-w-[600px] mx-auto flex items-center h-screen px-6 xl:px-0">
			<div className="w-full">
				<div className="flex items-center justify-between w-full">
					<button
						className="disabled:opacity-50 cursor-pointer"
						disabled={current <= 1}
						onClick={() => {
							current > 1 && setCurrent(current - 1);
						}}
					>
						Back
					</button>
					<p>
						{current}/{quizzes.length}
					</p>
				</div>
				<div className="w-full h-2 bg-gray-200 rounded-full mt-6">
					<div
						className="h-full bg-blue-500 rounded-full transition-[width] duration-300"
						style={{ width: `${(current / quizzes.length) * 100}%` }}
					/>
				</div>

				<div className="transition-opacity duration-300 opacity-100" key={quiz.question}>
					<QuizContextProvider quiz={quiz}>
						<Question />
					</QuizContextProvider>
				</div>
				<button
					className="mt-10 w-full flex bg-blue-500 text-white h-11 rounded-full items-center justify-center cursor-pointer disabled:opacity-50 active:scale-95 transition-transform"
					disabled={!select}
					onClick={() => {
						if (!select) return;
						if (current >= 10) {
							navigate("/result");
							return;
						}
						setCurrent(current + 1);
					}}
				>
					Next
				</button>
			</div>
		</main>
	);
}
