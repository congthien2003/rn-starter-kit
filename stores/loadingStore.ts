import { create } from "zustand";

interface LoadingState {
	isLoading: boolean;
	loadingText?: string;
	setLoading: (loading: boolean, text?: string) => void;
	showLoading: (text?: string) => void;
	hideLoading: () => void;
}

export const useLoadingStore = create<LoadingState>((set) => ({
	isLoading: false,
	loadingText: undefined,
	setLoading: (loading: boolean, text?: string) =>
		set({ isLoading: loading, loadingText: text }),
	showLoading: (text?: string) => set({ isLoading: true, loadingText: text }),
	hideLoading: () => set({ isLoading: false, loadingText: undefined }),
}));
