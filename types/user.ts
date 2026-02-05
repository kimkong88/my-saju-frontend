export interface CreateUserData {
    fullName: string;
    gender: "male" | "female";
    birthDate: string; // ISO format without timezone: YYYY-MM-DDTHH:mm:ss
    birthLocation: string;
    birthTimezone: string;
    currentLocation: string;
    currentTimezone: string;
    isTimeKnown: boolean;
}

export interface User extends CreateUserData {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    isPrimary?: boolean;
}

export interface AuthResponse {
    user: User;
    tokens: {
        access: {
            token: string;
            expires: number;
        };
        refresh: {
            token: string;
            expires: number;
        };
    };
}
