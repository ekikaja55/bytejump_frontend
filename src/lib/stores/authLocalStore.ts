// src/lib/stores/authLocalStore.ts
import { writable } from 'svelte/store';
import { getAuthLocal, saveAuthToLocal } from '$lib/utils/authToLocal';
import { initialState, type AuthStateLocal } from '$lib/types/auth';

export const authLocalStore = writable<AuthStateLocal>(initialState);

// hanya client
if (typeof window !== 'undefined') {
	const stored = getAuthLocal();
    console.log("stored", stored);
    
	authLocalStore.update((state) => ({
		...state,
		user: stored,
		is_auth: !!stored,
		isHydrated: true,
		loading: false
	}));

	authLocalStore.subscribe((state) => {
		if (!state.isHydrated) return;

		if (state.user && state.is_auth) {
			localStorage.setItem('dataUser', JSON.stringify(state.user));
		} else {
			localStorage.removeItem('dataUser');
		}
	});
}
