// src/lib/types/chatbot.ts
export type ChatMessage = {
	role: 'user' | 'bot';
	content: string;
};
