//src/utils/axios.ts
import { refreshToken } from '$lib/api/auth';
import axios from 'axios';

const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	withCredentials: true,
	
});

let isRefreshing = false;

api.interceptors.response.use(
	res => res,
	async err => {
		console.log("MASUK 1");

		console.log(err.message);

		const originalRequest = err.config;

		if (err.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;
			console.log("trigger interceptor 1 ");

			try {
				if (!isRefreshing) {
					isRefreshing = true;
					console.log("masuk triger interceptor 2");
					const res:any = await refreshToken(); 
					console.log("ini hasil dari refresh token pas trigger : ",res.result);
					
					console.log("triger interceptor 3");
					isRefreshing = false;
				}

				return api(originalRequest);
			} catch (refreshErr) {
				isRefreshing = false;

				if (typeof window !== 'undefined' && window.location.pathname !== '/auth/login') {
					console.log(refreshErr);
					
					// window.location.href = '/auth/login';
				}

				return Promise.reject(refreshErr);
			}
		}

		return Promise.reject(err);
	}
);


export default api;
