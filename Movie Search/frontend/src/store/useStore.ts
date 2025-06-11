import { create } from "zustand";
import { combine } from "zustand/middleware";

// 🔹 Types for loading-related state
type LoadingState = {
	isLoading: boolean;
	isSummarizing: boolean;
};

type LoadingActions = {
	setIsLoading: () => void;
	setIsSummarizing: () => void;
};

const useLoadingStateStore = create(
	combine<LoadingState, LoadingActions>({ isLoading: false, isSummarizing: false }, (set) => ({
		setIsLoading: () => set((state) => ({ isLoading: !state.isLoading })),
		setIsSummarizing: () => set((state) => ({ isSummarizing: !state.isSummarizing })),
	}))
);

export const useLoading = () => {
	const isLoading = useLoadingStateStore((state) => state.isLoading);
	const setIsLoading = useLoadingStateStore((state) => state.setIsLoading);
	return { isLoading, setIsLoading };
};

export const useSummarizing = () => {
	const isSummarizing = useLoadingStateStore((state) => state.isSummarizing);
	const setIsSummarizing = useLoadingStateStore((state) => state.setIsSummarizing);
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
