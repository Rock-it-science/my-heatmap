export interface StravaAuth {
	accessToken: {
		code: string;
		expiresAt: Date;
	};
	refreshToken: {
		code: string;
	};
	athlete: {
		id: number;
	};
}
