// src/lib/api/auth.ts
import type { LoginPayload, RegisterPayload } from '$lib/types/auth';
import axios from '$lib/utils/axios';

export const login = async (payload: LoginPayload) => {
    try {
        const res = await axios.post('/auth/login', payload);
        return res.data;
    } catch (error) {
        console.error('Login API error:', error);
        throw error;
    }
};
export const register = async (payload: RegisterPayload) => {
    try {
        const res = await axios.post('/auth/register', payload);
        return res.data;
    } catch (error) {
        console.error('Login API error:', error);
        throw error;
    }
};
export const refreshToken = async () => {
    try {
        const res = await axios.get('/auth/refreshtoken');
        console.log(res.data);
        //ini kembalian res.data 
        return res.data;

    } catch (error) {
        console.error('Login API error:', error);
        throw error;
    }

};
export const logout = async () => {
    try {
        const res = await axios.get('/auth/logout');
        return res.data;
    } catch (error) {
        console.error('Login API error:', error);
        throw error;
    }

}
