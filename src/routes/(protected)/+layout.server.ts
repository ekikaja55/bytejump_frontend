// src/routes/(protected)/+layout.server.ts
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	console.log("masuk src/routes/(protected)/+layout.server.ts");
	console.log("ini isi locals user : ",locals);
	
	
	if (!locals.user) throw redirect(302, '/auth/login');

	return {
		user: locals.user
	};
};
