// src/lib/stores/authDerived.ts
import { derived } from 'svelte/store';
import { authLocalStore } from './authLocalStore';
import type { User } from '$lib/types/user';

export const user:any = derived(authLocalStore, ($auth) => $auth.user as User);
export const isAuthenticated = derived(authLocalStore, ($auth) => $auth.is_auth);
export const isReady = derived(authLocalStore, ($auth) => $auth.isHydrated);
export const isLoading = derived(authLocalStore, ($auth) => $auth.loading);
