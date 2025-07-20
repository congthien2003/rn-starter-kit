import { create } from "zustand";

export interface AppError {
	id: string;
	message: string;
	type: "error" | "warning" | "info" | "success";
	timestamp: number;
	autoHide?: boolean;
	duration?: number;
}

interface ErrorState {
	errors: AppError[];
	addError: (
		message: string,
		type?: "error" | "warning" | "info" | "success",
		autoHide?: boolean
	) => void;
	removeError: (id: string) => void;
	clearErrors: () => void;
	getLatestError: () => AppError | null;
}

export const useErrorStore = create<ErrorState>((set, get) => ({
	errors: [],

	addError: (
		message: string,
		type: "error" | "warning" | "info" | "success" = "error",
		autoHide = true
	) => {
		const newError: AppError = {
			id: Date.now().toString(),
			message,
			type,
			timestamp: Date.now(),
			autoHide,
			duration: autoHide ? 5000 : undefined,
		};

		set((state) => ({
			errors: [...state.errors, newError],
		}));

		// Auto hide after duration
		if (autoHide && newError.duration) {
			setTimeout(() => {
				get().removeError(newError.id);
			}, newError.duration);
		}
	},

	removeError: (id: string) => {
		set((state) => ({
			errors: state.errors.filter((error) => error.id !== id),
		}));
	},

	clearErrors: () => {
		set({ errors: [] });
	},

	getLatestError: () => {
		const { errors } = get();
		return errors.length > 0 ? errors[errors.length - 1] : null;
	},
}));
