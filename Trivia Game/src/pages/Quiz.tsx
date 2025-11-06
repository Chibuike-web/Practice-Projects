import { useQuery } from "@tanstack/react-query";
import { fetchQuiz } from "../api/fetchQuiz";
import { useState } from "react";
import Question from "../components/Question";

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

	const { data, isPending, isError } = useQuery({
		queryKey: ["quiz"],
		queryFn: fetchQuiz,
		staleTime: 1000 * 60 * 60,
		gcTime: 1000 * 60 * 60,
	});

	if (isPending) return <div className="grid place-items-center min-h-screen">Loading...</div>;

	if (isError)
		return <div className="grid place-items-center min-h-screen">Error loading images</div>;

	const quizzes: QuizQuestion[] = data.results;

	const quiz = quizzes[current];
	return (
		<main className="max-w-[600px] mx-auto flex items-center h-screen px-6 xl:px-0">
			<div className="w-full">
				<div className="flex items-center justify-between w-full">
					<button
						className="disabled:opacity-50 cursor-pointer"
						disabled={current <= 1}
						onClick={() => {
							const prev = Math.max(current - 1, 1);
							setCurrent(prev);
						}}
					>
						Back
					</button>
					<p>
						{current}/{quizzes.length}
					</p>
				</div>
				<div>
					<div>
						<div></div>
					</div>
				</div>
				<Question key={quiz.question} quiz={quiz} />

				<button
					className="mt-10 w-full flex bg-blue-500 text-white h-11 rounded-full items-center justify-center cursor-pointer"
					onClick={() => {
						const next = Math.min(current + 1, 10);
						setCurrent(next);
					}}
				>
					Next
				</button>
			</div>
		</main>
	);
}
