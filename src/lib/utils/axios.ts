//src/utils/axios.ts
import axios from 'axios';

const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	withCredentials: true
});

let isRefreshing = false;

api.interceptors.response.use(
	res => res,
	async err => {
		const originalRequest = err.config;

		if (err.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				if (!isRefreshing) {
					isRefreshing = true;

					await axios.get('/auth/refreshtoken', {
						baseURL: import.meta.env.VITE_API_URL,
						withCredentials: true
					});

					isRefreshing = false;
				}

				return api(originalRequest);
			} catch (refreshErr) {
				isRefreshing = false;

				//  Error terjadi di server, jangan pakai window
				if (typeof window !== 'undefined' && window.location.pathname !== '/auth/login') {
					window.location.href = '/auth/login';
				}


				return Promise.reject(refreshErr);
			}
		}

		return Promise.reject(err);
	}
);

export default api;
