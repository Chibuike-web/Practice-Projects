import { createContext, use, useEffect, useState, type ReactNode } from "react";

type SelectContextType = {
	selected: Record<string, string | null>;
	setSelected: React.Dispatch<React.SetStateAction<Record<string, string | null>>>;
};

const SelectContext = createContext<SelectContextType | null>(null);

export const useSelectContext = () => {
	const context = use(SelectContext);
	if (!context) throw new Error("useSelectContext must be used inside SelectContextProvider");
	return context;
};

export default function SelectContextProvider({ children }: { children: ReactNode }) {
	const [selected, setSelected] = useState<Record<string, string | null>>(() => {
		const raw = localStorage.getItem("selected");
		return raw ? JSON.parse(raw) : {};
	});

	useEffect(() => {
		localStorage.setItem("selected", JSON.stringify(selected));
	}, [selected]);

	return (
		<SelectContext.Provider value={{ selected, setSelected }}>{children}</SelectContext.Provider>
	);
}
