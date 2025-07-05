// src/lib/api/auth.ts
import type { LoginPayload, RegisterPayload } from '$lib/types/auth';
import api from '$lib/utils/axios';

export const login = async (payload: LoginPayload) => {
    try {
        const res = await api.post('/auth/login', payload);
        return res.data;
    } catch (error) {
        console.error('Login API error:', error);
        throw error;
    }
};
export const register = async (payload: RegisterPayload) => {
    try {
        const res = await api.post('/auth/register', payload);
        return res.data;
    } catch (error) {
        console.error('Login API error:', error);
        throw error;
    }
};
export const refreshToken = async () => {
    try {
        const res = await api.get('/auth/refreshtoken');
        //ini kembalian res.data 
        return res.data;

    } catch (error) {
        console.error('Login API error:', error);
        throw error;
    }

};
export const logout = async () => {
    try {
        const res = await api.get('/auth/logout');
        return res.data;
    } catch (error) {
        console.error('Login API error:', error);
        throw error;
    }

}
