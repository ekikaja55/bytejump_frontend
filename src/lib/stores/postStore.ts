// src/lib/stores/postStores.ts
import { writable } from 'svelte/store';
import { postState, type PostPayload, type PostType } from '$lib/types/post';
import * as postApi from '$lib/api/post'
export const postStore = writable<PostType>(postState)


export async function getPost() {
    postStore.update(state => ({ ...state, loading: true }))
    try {
        const res = await postApi.getPost()
        postStore.set({
            posts: res.result,
            message:null,
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
export async function addPost(payload: PostPayload) {
    try {
        postStore.update((state) => ({ ...state, loading: true }))
        const res = await postApi.addPost(payload)
        postStore.update(state => ({
            ...state,
            loading: false,
            message: res.message
        }))
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
export async function updatePost() {



}
export async function deletePost() {



}