import { api, ApiError } from "@/libs/axios";

// User types
export interface User {
	id: string;
	email: string;
	name: string;
	avatar?: string;
}

export interface UpdateUserRequest {
	name?: string;
	avatar?: string;
}

// Example user service
export const userService = {
	getProfile: async (): Promise<User> => {
		try {
			return await api.get<User>("/user/profile");
		} catch (error) {
			const apiError = error as ApiError;
			throw new Error(apiError.message);
		}
	},

	updateProfile: async (data: UpdateUserRequest): Promise<User> => {
		try {
			return await api.put<User>("/user/profile", data);
		} catch (error) {
			const apiError = error as ApiError;
			throw new Error(apiError.message);
		}
	},

	getUsers: async (): Promise<User[]> => {
		try {
			return await api.get<User[]>("/users");
		} catch (error) {
			const apiError = error as ApiError;
			throw new Error(apiError.message);
		}
	},
};
