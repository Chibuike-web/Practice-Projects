import { createContext, useContext, type ReactNode } from "react";
import type { QuizQuestion } from "../pages/Quiz";

type QuizContextType = {
	quiz: QuizQuestion;
};

const QuizContext = createContext<QuizContextType | null>(null);

export const useQuizContext = () => {
	const context = useContext(QuizContext);
	if (!context) throw new Error("useQuizContext must be used inside QuizContextProvider");
	return context;
};

export default function QuizContextProvider({
	children,
	quiz,
}: {
	children: ReactNode;
	quiz: QuizQuestion;
}) {
	return <QuizContext.Provider value={{ quiz }}>{children}</QuizContext.Provider>;
}
