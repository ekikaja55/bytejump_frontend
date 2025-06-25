// src/lib/utils/authLocal.ts
import { authStore } from '$lib/stores/authStore';
import { get } from 'svelte/store';

export const saveAuthToLocal = () => {
	const auth = get(authStore);
	localStorage.setItem('dataUser', JSON.stringify(auth));
};

export const clearAuthLocal = () => {
	localStorage.removeItem('dataUser');
};

export const getAuthLocal = () => {
	try {
		const data = localStorage.getItem('dataUser');
		return data ? JSON.parse(data) : null;
	} catch (e) {
		console.warn("Gagal parsing dataUser", e);
		return null;
	}
};
