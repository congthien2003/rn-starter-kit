import { api } from "@/libs/axios";
import { LoginRequest, LoginResponse } from "../models/LoginRequest";
import {
	RegisterUserRequest,
	RegisterUserResponse,
} from "../models/RegisterUserRequest";

// Auth response types
export interface AuthResponse {
	user: {
		id: string;
		email: string;
		name: string;
	};
	token: string;
}

// Simple service - just call API and return data
export const authService = {
	login: async (data: LoginRequest): Promise<LoginResponse> => {
		return (await api.post("/auth/login", data)) as LoginResponse;
	},

	register: async (
		data: RegisterUserRequest
	): Promise<RegisterUserResponse> => {
		return (await api.post("/auth/register", data)) as RegisterUserResponse;
	},

	logout: async (): Promise<void> => {
		await api.post("/auth/logout");
	},

	refreshToken: async (): Promise<AuthResponse> => {
		return (await api.post("/auth/refresh")) as AuthResponse;
	},
};
