import { create } from "zustand";

type Store = {
	isSummarizing: boolean;
	setIsSummarizing: () => void;
};

const useSummarizingStateStore = create<Store>((set) => ({
	isSummarizing: false,
	setIsSummarizing: () => set((state) => ({ isSummarizing: !state.isSummarizing })),
}));

export const useSummarizing = () => {
	const isSummarizing = useSummarizingStateStore((state) => state.isSummarizing);
	const setIsSummarizing = useSummarizingStateStore((state) => state.setIsSummarizing);
	return { isSummarizing, setIsSummarizing };
};

type SummaryStore = {
	summary: string;
	setSummary: (text: string) => void;
};

const useSummaryStore = create<SummaryStore>((set) => ({
	summary: "",
	setSummary: (text: string) => set({ summary: text }),
}));

export const useSummary = () => {
	const summary = useSummaryStore((state) => state.summary);
	const setSummary = useSummaryStore((state) => state.setSummary);
	return { summary, setSummary };
};
