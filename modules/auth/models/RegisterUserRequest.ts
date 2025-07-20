export interface RegisterUserRequest {
	name: string;
	email: string;
	password: string;
}

export interface RegisterUserResponse {
	user: {
		id: string;
		email: string;
		name: string;
		avatar?: string;
	};
	token: string;
	refreshToken?: string;
}
