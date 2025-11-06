import { useRef, useState } from "react";
import type { QuizQuestion } from "../pages/Quiz";
import shuffleArray from "../utils/shuffleArray";
import { cn } from "../utils/cn";

export default function Question({ quiz }: { quiz: QuizQuestion }) {
	const [selected, setSelected] = useState<string | null>(null);

	const answersRef = useRef<string[]>([]);
	if (answersRef.current.length === 0) {
		answersRef.current = shuffleArray([...quiz.incorrect_answers, quiz.correct_answer]);
	}
	const answers = answersRef.current;

	return (
		<div className="mt-10 flex flex-col gap-4">
			{/* badges */}

			<div className="flex items-center flex-wrap gap-4 mt-4">
				{(["type", "difficulty", "category"] as const).map((item, i) => (
					<span
						key={i}
						className="px-2 py-1 text-xs font-medium bg-gray-200 text-gray-800 rounded-full"
					>
						{item === "category"
							? quiz[item].split(/[:;]/)[0].toLowerCase()
							: quiz[item].toLowerCase()}
					</span>
				))}
			</div>

			{/* question */}

			<h1
				className="text-[24px] font-semibold"
				dangerouslySetInnerHTML={{ __html: quiz.question }}
			/>
			<ul className="flex flex-col gap-4 items-start mt-4">
				{answers.map((answer, index) => {
					const correctAnswerIndex = answers.findIndex((a) => a === quiz.correct_answer);
					const isCurrentAnswerCorrect = correctAnswerIndex === index;
					return (
						<li key={index} className="w-full">
							<Button
								answer={answer}
								select={selected}
								onSelect={setSelected}
								quiz={quiz}
								isCorrectAnswer={isCurrentAnswerCorrect}
							/>
						</li>
					);
				})}
			</ul>
		</div>
	);
}

const Button = ({
	answer,
	select,
	quiz,
	isCorrectAnswer,
	onSelect,
}: {
	answer: string;
	select: string | null;
	quiz: QuizQuestion;
	isCorrectAnswer: boolean;
	onSelect: (value: string) => void;
}) => {
	const isCorrect = answer === quiz.correct_answer;
	const isSelected = select !== null;
	const isCorrectSelection = isSelected && select === quiz.correct_answer;
	const isWrongSelection = isSelected && select != quiz.correct_answer;

	return (
		<div>
			<button
				onClick={() => onSelect(answer)}
				className={cn(
					"px-6 py-4 flex items-center justify-between font-medium w-full border border-gray-200 rounded-full cursor-pointer disabled:opacity-50",
					isSelected && isCorrect && "text-green-900 border-green-500 bg-green-100",
					isSelected && !isCorrect && "text-red-500 border-red-500 bg-red-100 cursor-not-allowed"
				)}
				disabled={isSelected && !isCorrect}
			>
				<span>{answer}</span>
				<span className="size-4 rounded-full border border-gray-500 flex items-center justify-center" />
			</button>
			{isWrongSelection && isCorrectAnswer && (
				<p className="mt-2 text-red-500 font-medium">Wrong, the answer is {quiz.correct_answer}</p>
			)}
			{isCorrectSelection && isCorrectAnswer && (
				<p className="mt-2 text-green-700 font-medium">
					Correct, the answer is {quiz.correct_answer}
				</p>
			)}
		</div>
	);
};
