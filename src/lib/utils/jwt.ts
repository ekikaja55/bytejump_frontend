// src/lib/utils/jwt.ts
import { jwtDecode } from 'jwt-decode';
import type { User } from '$lib/types/user';

export function parseUserFromJWT(token: string): User {
	const decoded = jwtDecode(token) as any;
	return {
		id: decoded.id,
		user_email: decoded.user_email,
		user_nama: decoded.user_nama,
		user_avatar: decoded.user_avatar,
		user_balance: decoded.user_balance,
		user_role: decoded.user_role
	};
}
