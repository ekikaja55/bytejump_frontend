//src/lib/types/auth.ts
import type { User } from "./user";

export type AuthState = {
	user:User|null;
    is_auth:boolean;
    loading:boolean;
    message:string|null;
};

export type LoginPayload = {
    user_email:string,
    user_password:string
}


export type RegisterPayload = {
    user_email:string,
    user_password:string,
    user_nama:string,
    user_confirmation_password:string
}

//src/lib/types/auth.ts

export type AuthStateLocal = {
	user: User|null;
	message: string | null;
	loading: boolean;
    is_auth:boolean;
	isHydrated: boolean;
};

export const initialState: AuthStateLocal = {
	user: null,
	message: null,
	loading: false,
    is_auth:false,
	isHydrated: false
};