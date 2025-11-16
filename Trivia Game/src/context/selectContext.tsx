import { createContext, useContext, useState, type ReactNode } from "react";

type SelectContextType = {
	selected: Record<string, string | null>;
	setSelected: React.Dispatch<React.SetStateAction<Record<string, string | null>>>;
};

const SelectContext = createContext<SelectContextType | null>(null);

export const useSelectContext = () => {
	const context = useContext(SelectContext);
	if (!context) throw new Error("useSelectContext must be used inside SelectContextProvider");
	return context;
};

export default function SelectContextProvider({ children }: { children: ReactNode }) {
	const [selected, setSelected] = useState<Record<string, string | null>>({});

	return (
		<SelectContext.Provider value={{ selected, setSelected }}>{children}</SelectContext.Provider>
	);
}
