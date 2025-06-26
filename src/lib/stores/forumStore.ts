// lib/stores/forumStore.ts
import { writable } from 'svelte/store';
import type { Forum } from '$lib/types/forum';

export const forums = writable<Forum[]>([]);
