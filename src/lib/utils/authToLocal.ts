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

// src/lib/utils/authToLocal.ts
export const getAuthLocal=()=> {
	try {
		const stored = localStorage.getItem('dataUser');
		if (!stored) return null;

		const user = JSON.parse(stored);
		return  user ;
	} catch (e) {
		console.error('Gagal parsing dataUser', e);
		return null;
	}
}

