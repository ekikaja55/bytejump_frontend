// src/lib/utils/slug.ts
export function slugify(text: string): string {
	return text
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, '') // Hapus karakter aneh
		.replace(/\s+/g, '-')     // Ganti spasi dengan dash
		.replace(/--+/g, '-');    // Hapus double dash
}
