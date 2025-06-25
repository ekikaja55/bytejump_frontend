// src/app.d.ts
// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces

// locals itu apa sih?
// locals di SvelteKit itu state yang hanya hidup di sisi server selama satu request/response cycle.

// Saat halaman di-refresh:
// Client akan kirim request baru ke server.
// Middleware JWT lo akan jalan, parsing cookie/token, dan set event.locals.user.
//  bisa ambil locals.user lagi di load() function server-side (atau pakai hooks).
// Tapi... state di client (misal: authStore) tetap kosong sampai inject ulang user-nya dari locals.

import type { User } from '$lib/types/user';
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: User | null;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export { };
