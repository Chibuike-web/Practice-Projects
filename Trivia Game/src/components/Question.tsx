import { useRef } from "react";
import shuffleArray from "../utils/shuffleArray";
import { cn } from "../utils/cn";
import { useSelectContext } from "../context/selectContext";
import { useQuizContext } from "../context/quizContext";
import { CircleCheckBig, CircleX } from "lucide-react";

export default function Question() {
	const { selected, setSelected } = useSelectContext();
	const { quiz } = useQuizContext();
	const currentSelection = selected[quiz.question] ?? null;

	const handleSelect = (answer: string) => {
		setSelected((prev) => ({ ...prev, [quiz.question]: answer }));
	};

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
					const correctAnswer = quiz.correct_answer;
					const correctAnswerIndex = answers.findIndex((a) => a === correctAnswer);
					const isCurrentAnswerCorrect = correctAnswerIndex === index;
					const selectIndex = answers.findIndex((a) => a === currentSelection);
					const isSelectIndex = selectIndex === index;

					return (
						<li
							key={index}
							className="w-full animate-slideFadeIn"
							style={{ animationDelay: `${index * 100}ms` }}
						>
							<Button
								answer={answer}
								select={currentSelection}
								onSelect={handleSelect}
								correctAnswer={correctAnswer}
								isCorrectAnswer={isCurrentAnswerCorrect}
								isSelectIndex={isSelectIndex}
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
	correctAnswer,
	isCorrectAnswer,
	isSelectIndex,
	onSelect,
}: {
	answer: string;
	select: string | null;
	correctAnswer: string;
	isCorrectAnswer: boolean;
	isSelectIndex: boolean;
	onSelect: (value: string) => void;
}) => {
	const isCorrectButton = answer === correctAnswer;
	const isSelected = select !== null;
	const isCorrectSelection = isSelected && select === correctAnswer;
	const isWrongSelection = isSelected && select != correctAnswer;

	return (
		<div>
			<button
				onClick={() => onSelect(answer)}
				className={cn(
					"px-6 py-4 flex items-center justify-between text-start font-medium w-full border border-gray-200 rounded-full cursor-pointer ",
					isSelected &&
						isCorrectButton &&
						"text-green-900 border-green-500  bg-green-100 cursor-not-allowed",
					isSelected &&
						!isCorrectButton &&
						"text-red-500 border-red-500 bg-red-100 cursor-not-allowed",
					isSelected &&
						!isCorrectButton &&
						isSelectIndex &&
						"text-red-500 border-red-500 border-2 bg-red-100 cursor-not-allowed ring-4 ring-red-300"
				)}
				disabled={isSelected}
			>
				<span dangerouslySetInnerHTML={{ __html: answer }} />

				{isSelected && !isCorrectButton ? (
					<CircleX className="size-4" />
				) : isSelected && isCorrectButton ? (
					<CircleCheckBig className="size-4" />
				) : null}
			</button>
			{isWrongSelection && isSelectIndex && (
				<p className="mt-2 text-red-500 font-medium">Wrong, the answer is {correctAnswer}</p>
			)}
			{isCorrectSelection && isCorrectAnswer && (
				<p className="mt-2 text-green-700 font-medium">Correct, the answer is {correctAnswer}</p>
			)}
		</div>
	);
};
