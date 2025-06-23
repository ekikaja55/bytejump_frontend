// src/lib/api/chatbot.ts
import axios from '$lib/utils/axios';

export const askChatbot = async (message: string) => {
	const res = await axios.post('/chatbot/chat', { message });
	return res.data;
};
