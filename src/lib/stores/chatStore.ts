// src/lib/stores/chatStore.ts
import { writable } from 'svelte/store';
import { askChatbot } from '$lib/api/chatbot';
import type { ChatMessage } from '$lib/types/chatbot';

function createChatStore() {
	const { subscribe, update } = writable<{
		messages: ChatMessage[];
		loading: boolean;
		error: string;
	}>({
		messages: [],
		loading: false,
		error: ''
	});

	return {
		subscribe,

		sendMessage: async (text: string) => {
			update(state => ({
				...state,
				messages: [...state.messages, { role: 'user', content: text }],
				loading: true,
				error: ''
			}));

			try {
				const res = await askChatbot(text);
				update(state => ({
					...state,
					messages: [...state.messages, { role: 'bot', content: res.reply }],
					loading: false
				}));
			} catch (err) {
				update(state => ({
					...state,
					error: 'Gagal menghubungi chatbot.',
					loading: false
				}));
			}
		}
	};
}

export const chatStore = createChatStore();
