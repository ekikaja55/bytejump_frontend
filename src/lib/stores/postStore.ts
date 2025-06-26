import { writable } from 'svelte/store';
import type { Post } from '$lib/types/post';

export const postList = writable<Post[]>([]);
export const selectedPost = writable<Post | null>(null);
export const isPostLoading = writable<boolean>(false);
