// lib/api/post.ts

import type { PostPayload } from "$lib/types/post";
import api from "$lib/utils/axios";

export const getPost = async () => {
    try {
        const res = await api.get("/post")
        console.log("res dari api ", res.data);

        return res.data;
    } catch (error) {
        console.error('Login API error:', error);
        throw error;
    }
}
export const getPostByname = async (id: string) => {
    try {
        const res = await api.get(`/post/${id}`)
        return res.data;
    } catch (error) {
        console.error('Login API error:', error);
        throw error;
    }
}
export const getPostNewest = async () => {
    try {
        const res = await api.get('/post/newest')
        return res.data;
    } catch (error) {
        console.error('Login API error:', error);
        throw error;
    }
}

export const updateView = async (id: string) => {
    try {
        const res = await api.put(`/post/view/${id}`)
        return res.data;
    } catch (error) {
        console.error('Login API error:', error);
        throw error;
    }
}


export const addPost = async (payload: PostPayload) => {
    try {
        const res = await api.post('/post/', payload)
        return res.data
    } catch (error) {
        console.error('Login API error:', error);
        throw error;
    }
}