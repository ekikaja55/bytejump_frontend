// src/lib/api/auth.server.ts
import type { RequestEvent } from '@sveltejs/kit';
import { parseUserFromJWT } from '$lib/utils/jwt';

export const refreshTokenFromRequest = async (event: RequestEvent) => {
	console.log("[auth.server.ts] Memanggil API eksternal /auth/refreshtoken...");

	console.log( event.request.headers.get('cookie'));
	
	const backendUrl = import.meta.env.VITE_API_URL;

	const res = await fetch(`https://bytejumpbackend-production.up.railway.app/api/v1/auth/refreshtoken`, {
		method: 'GET',
		headers: {
			cookie: event.request.headers.get('cookie') || ''
		},
		credentials: 'include' // pastikan cookie ikut terkirim
	});

	console.log("Status dari API eksternal:", res.status);

	if (!res.ok) {
		console.error("Gagal refresh token:", res.status);
		throw new Error('Failed to refresh token');
	}

	const data = await res.json();
	const user = parseUserFromJWT(data.result);

	console.log("✅ User berhasil diparsing:", user);

	return user;
};
