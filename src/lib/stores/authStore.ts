// src/lib/stores/authStore.ts
import { get, writable } from 'svelte/store';
import type { AuthState } from '$lib/types/auth';
import * as authApi from '$lib/api/auth';
import { parseUserFromJWT } from '$lib/utils/jwt';
import { clearAuthLocal, saveAuthToLocal } from '$lib/utils/authToLocal';

export const authStore = writable<AuthState>({
    //user disini ambil dari type  object user
    user: null,
    is_auth: false,
    loading: false,
    message: null
});

export async function login(email: string, password: string) {
    //ambil state saat ini ...state lalu dari salinannya set loadingnya jadi true
    authStore.update(state => ({ ...state, loading: true }));

    try {
        const res = await authApi.login({ user_email: email, user_password: password });
        console.log(res.result);

        const token = res.result;
        const user = parseUserFromJWT(token);
        console.log("ini data user setelah di parse", user);

        authStore.set({
            //disini user akan diiisi result berupa refresh token jwt dan menjadi data user
            user,
            is_auth: true,
            loading: false,
            //ambil dari message kiriman backend

            message: res.message + " redirecting... "
        });

        saveAuthToLocal()
        // const dataDariLokal = localStorage.setItem("dataUser", JSON.stringify(authStore.))

        // console.log(dataDariLokal);


    } catch (error: any) {
        console.log("ini error", error.message);

        authStore.set({
            user: null,
            is_auth: false,
            loading: false,
            message: 'Email Atau Password Salah'
        });
        clearAuthLocal()
    }
}

export async function register(
    email: string,
    password: string,
    nama: string,
    confirmation: string
) {
    authStore.update(state => ({ ...state, loading: true }));

    try {
        const res = await authApi.register({
            user_email: email,
            user_password: password,
            user_nama: nama,
            user_confirmation_password: confirmation
        });

        console.log("respon register", res);


        authStore.set({
            user: null,
            //sengaja ga aku true in is_auth nya karena aku ngerasa user hanya akan dianggap true jika  login
            is_auth: false,
            loading: false,
            message: res.message + " redirecting... "
        });
    } catch (error: any) {
        console.log("Error saat register:", error);

        let errorMessage = 'Terjadi kesalahan';

        // Coba ambil pesan dari backend
        if (error.response && error.response.data?.message) {
            errorMessage = error.response.data.message;
        } else if (error.message) {
            errorMessage = error.message;
        }

        authStore.set({
            user: null,
            is_auth: false,
            loading: false,
            message: errorMessage
        });
    }

}

export async function fetchUser() {
    authStore.update(state => ({ ...state, loading: true }));

    try {
        const res = await authApi.refreshToken();
        authStore.set({
            user: res.data.result,
            is_auth: true,
            loading: false,
            message: res.data.message
        });
    } catch (err: any) {
        if (err.response?.status !== 401) {
            console.error('Login API error:', err);
        }

        // Jangan anggap 401 sebagai "kesalahan", tapi sebagai sinyal belum login
        authStore.set({
            user: null,
            is_auth: false,
            loading: false,
            message: null
        });
    }
}

export async function logout() {
    authStore.update(state => ({ ...state, loading: true }));

    try {
        const res = await authApi.logout();
        resetAuth();

        authStore.update(state => ({
            ...state,
            message: res.message
        }));
        clearAuthLocal()
    } catch {
        resetAuth();
        authStore.update(state => ({
            ...state,
            message: 'Logout gagal.',
            loading: false
        }));
    }
}


export function resetAuth() {
    authStore.set({
        user: null,
        is_auth: false,
        loading: false,
        message: null
    });
}
