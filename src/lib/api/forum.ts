// lib/api/forum
import api from '$lib/utils/axios';

export const getAllForum = async () => {
    try {
        const res = await api.get('/forum')
        return res.data;
    } catch (error) {
        console.error('Login API error:', error);
        throw error;
    }
}