export interface LoginRequest {
	email: string;
	password: string;
}

export interface LoginResponse {
	user: {
		id: string;
		email: string;
		name: string;
		avatar?: string;
	};
	token: string;
	refreshToken?: string;
}
