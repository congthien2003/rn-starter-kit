import { useAuth as useAuthContext } from "@/contexts/AuthContext";
import { useErrorStore } from "@/stores/errorStore";
import { useLoadingStore } from "@/stores/loadingStore";
import { useCallback } from "react";
import { authService } from "../services/api";

export const useAuth = () => {
	const { user, setUser, logout: contextLogout } = useAuthContext();
	const { addError } = useErrorStore();
	const { showLoading, hideLoading } = useLoadingStore();

	const login = useCallback(
		async (email: string, password: string): Promise<boolean> => {
			try {
				showLoading("Đang đăng nhập...");
				const result = await authService.login({ email, password });

				// Update context with user data
				setUser(result.user);

				addError("Đăng nhập thành công!", "info");
				return true;
			} catch (error) {
				const message =
					error instanceof Error
						? error.message
						: "Đăng nhập thất bại";
				addError(message, "error");
				return false;
			} finally {
				hideLoading();
			}
		},
		[setUser, addError, showLoading, hideLoading]
	);

	const register = useCallback(
		async (
			email: string,
			password: string,
			name: string
		): Promise<boolean> => {
			try {
				showLoading("Đang tạo tài khoản...");
				const result = await authService.register({
					email,
					password,
					name,
				});

				// Update context
				setUser(result.user);

				addError("Tạo tài khoản thành công!", "info");
				return true;
			} catch (error) {
				const message =
					error instanceof Error
						? error.message
						: "Tạo tài khoản thất bại";
				addError(message, "error");
				return false;
			} finally {
				hideLoading();
			}
		},
		[setUser, addError, showLoading, hideLoading]
	);

	const logout = useCallback(async (): Promise<void> => {
		try {
			showLoading("Đang đăng xuất...");
			await authService.logout();
			contextLogout();
			addError("Đăng xuất thành công!", "info");
		} catch (error) {
			// Logout errors are not critical
			console.warn("Logout error:", error);
			contextLogout(); // Still logout locally
		} finally {
			hideLoading();
		}
	}, [contextLogout, addError, showLoading, hideLoading]);

	return {
		user,
		login,
		register,
		logout,
		isAuthenticated: !!user,
	};
};
