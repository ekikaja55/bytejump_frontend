// src/routes/+layout.ts
import { browser } from '$app/environment';
import { authStore } from '$lib/stores/authStore';

export const load = async ({ data }) => {
	 console.log("masuk // src/routes/+layout.ts");
	 
	if (browser && data?.user) {
		authStore.set({
			user: data.user,
			is_auth: true,
			loading: false,
			message: null
		});
	}

	authStore.subscribe((val) => {
			console.log("ini isi auth store dari // src/routes/+layout.ts",val);

	 })
};
