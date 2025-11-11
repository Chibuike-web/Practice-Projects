import { createContext, useContext, useState, type ReactNode } from "react";
import type { QuizQuestion } from "../pages/Quiz";

type SelectContextType = {
	selected: Record<string, string | null>;
	setSelected: React.Dispatch<React.SetStateAction<Record<string, string | null>>>;
	quiz: QuizQuestion;
};

const selectContext = createContext<SelectContextType | null>(null);

export const useSelectContext = () => {
	const context = useContext(selectContext);
	if (!context) throw new Error("selectContext not provided");
	return context;
};

export default function SelectContextProvider({
	children,
	quiz,
}: {
	children: ReactNode;
	quiz: QuizQuestion;
}) {
	const [selected, setSelected] = useState<Record<string, string | null>>({});

	return (
		<selectContext.Provider value={{ selected, setSelected, quiz }}>
			{children}
		</selectContext.Provider>
	);
}
