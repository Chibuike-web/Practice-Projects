import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelectContext } from "../context/selectContext";
import { fetchQuiz } from "../api/fetchQuiz";
import type { QuizQuestion } from "./Quiz";
import { useMemo } from "react";
import { useNavigate } from "react-router";

export default function Result() {
	const { selected, setSelected } = useSelectContext();
	const navigate = useNavigate();
	const queryClient = useQueryClient();

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
		return <div className="grid place-items-center min-h-screen">No quiz result found</div>;
	}

	const quizzes: QuizQuestion[] = data.results;

	const correctResults = useMemo(() => {
		return quizzes.filter((quiz) => {
			const picked = selected[quiz.question];
			return picked === quiz.correct_answer;
		});
	}, [quizzes, selected]);

	const score = correctResults.length;
	const total = quizzes.length;
	return (
		<main className="max-w-[600px] mx-auto px-6 py-20">
			<div className="text-center">
				<h1 className="text-3xl font-semibold mb-4">Your Result</h1>
				<p className="text-lg text-gray-600 mb-8">
					You scored {score} out of {total}
				</p>

				<div className="bg-gray-100 rounded-2xl p-6">
					<h2 className="text-xl font-medium mb-4">Breakdown</h2>

					<ul className="space-y-4">
						{quizzes.map((quiz, i) => {
							const picked = selected[quiz.question];
							const isCorrect = picked === quiz.correct_answer;

							return (
								<li key={i} className="p-4 rounded-xl border border-gray-200 bg-white">
									<p
										className="font-medium mb-2"
										dangerouslySetInnerHTML={{ __html: quiz.question }}
									/>
									<p className={isCorrect ? "text-green-600" : "text-red-600"}>
										{isCorrect ? "Correct" : "Wrong"}
									</p>

									{!isCorrect && (
										<p className="text-sm mt-1">
											Correct answer: <span className="font-medium">{quiz.correct_answer}</span>
										</p>
									)}
								</li>
							);
						})}
					</ul>
				</div>
			</div>
			<button
				className="mt-10 w-full flex bg-blue-500 text-white h-11 rounded-full items-center justify-center cursor-pointer"
				onClick={() => {
					setSelected({});
					localStorage.removeItem("selected");
					queryClient.invalidateQueries({ queryKey: ["quiz"] });
					navigate("/");
				}}
			>
				Start again
			</button>
		</main>
	);
}
