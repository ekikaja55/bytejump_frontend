// src/lib/stores/postStores.ts
import { writable } from 'svelte/store';
import { postState, type PostType } from '$lib/types/post';
import * as postApi from '$lib/api/post'
export const postStore = writable<PostType>(postState)


export async function getPost() {
    postStore.update(state => ({ ...state, loading: true }))
    try {
        const res = await postApi.getPost()
        postStore.set({
            posts: res.result,
            message: res.message,
            loading: false,

        })

    } catch (error: any) {
        const msg = error.response?.data?.message || error.message || "error server bro"
        postStore.update(state => ({
            ...state,
            loading: false,
            message: msg
        }
        ))

    }


}
export async function addPost() {



}
export async function updatePost() {



}
export async function deletePost() {



}