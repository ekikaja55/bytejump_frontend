// src/routes/+layout.server.ts
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	// Kalau middleware JWT kamu di backend udah inject ke res.locals.user,
	// dan kamu udah pass ke event.locals.user, maka:
	console.log("masuk layout server utama");
	console.log(locals);
	console.log(locals.user);
	
	
	return {
		user: locals.user ?? null
	};
};