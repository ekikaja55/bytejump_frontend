import { initialState, type AuthStateLocal } from '$lib/types/auth';
import { getAuthLocal } from '$lib/utils/authToLocal';
import { writable } from 'svelte/store';

export const authLocalStore = writable<AuthStateLocal>(initialState);

if (typeof window !== 'undefined') {
    console.log(" Client-side hydration started");
    const stored = getAuthLocal();

    console.log(" Data from localStorage:", stored);

    if (stored) {
        authLocalStore.update((state) => ({
            ...state,
            user: stored.user,
            isHydrated: true
        }));
    } else {
        authLocalStore.update((state) => ({
            ...state,
            isHydrated: true
        }));
    }

    authLocalStore.subscribe((state) => {
        
        if (state.user) {
            
            console.log("update authLocalStore", state.user);

            localStorage.setItem('dataUser', JSON.stringify(state.user));
        }
        // if(!state.isHydrated) {
        // 	localStorage.removeItem('dataUser');
        // }
    });
}
