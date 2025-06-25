

# 🧪 sv – SvelteKit Project Starter

Ini adalah starter project lengkap untuk membangun aplikasi SvelteKit, dipersenjatai dengan [`sv`](https://github.com/sveltejs/cli) CLI resmi dari Svelte.

## 🚀 Membuat Proyek Baru

Jika kamu membaca ini, kemungkinan kamu sudah membuat project ini. Tapi kalau belum:

```bash
# Membuat project baru di folder saat ini
npx sv create

# Atau buat project di folder bernama "my-app"
npx sv create my-app
```

## 🛠 Development

Setelah project berhasil dibuat dan semua dependensi di-install (`npm install`, `pnpm install`, atau `yarn`), jalankan development server:

```bash
npm run dev
```

Atau langsung buka di browser:

```bash
npm run dev -- --open
```

## 🏗 Build untuk Produksi

Untuk membuat versi produksi aplikasi:

```bash
npm run build
```

Kamu bisa mem-preview hasil build produksi dengan:

```bash
npm run preview
```

> Untuk deploy aplikasi, kamu mungkin perlu memasang [adapter](https://kit.svelte.dev/docs/adapters) sesuai target deployment-mu (Vercel, Node, Static, dll).

---

## 📁 Struktur File Routing (`src/routes`)

SvelteKit pakai sistem file-based routing. Berikut daftar file khusus dan fungsinya:

| File                | Fungsi                                                          |
| ------------------- | --------------------------------------------------------------- |
| `+page.svelte`      | Komponen utama untuk halaman tertentu                           |
| `+page.ts`          | `load()` dari client, bisa fetch API atau local storage         |
| `+page.server.ts`   | `load()` dari server-only, cocok untuk data sensitif            |
| `+layout.svelte`    | Komponen layout global atau nested layout                       |
| `+layout.ts`        | Load data layout di sisi client                                 |
| `+layout.server.ts` | Load data layout di sisi server saja                            |
| `+error.svelte`     | Menangani dan menampilkan error pada route terkait              |
| `+server.ts`        | Membuat REST API endpoint dalam route tersebut (GET, POST, dsb) |

---

## 🧩 Contoh Struktur Routing

```bash
src/routes/
├── +layout.svelte       # layout global (navbar, footer, dsb)
├── +layout.ts           # ambil user info dari cookies/token
├── dashboard/
│   ├── +page.svelte     # halaman dashboard utama
│   └── +page.ts         # fetch data dari API (client-side)
├── login/
│   └── +page.svelte     # halaman login user
```

---

## ✅ Kelebihan Starter Ini

* Sudah siap pakai TailwindCSS, Flowbite/Skeleton UI, dan axios
* Struktur modular dan clean
* Siap di-deploy ke Vercel/Netlify
* Dukungan TypeScript penuh

---

## 📌 Tips Tambahan

* Gunakan prefix `VITE_` untuk semua variabel di `.env` agar bisa diakses dari client (`import.meta.env.VITE_XXX`)
* File di `/static` bisa diakses langsung via `/filename.ext`
* Middleware dan store disarankan diletakkan di `/lib`

---

Kalau mau, gue juga bisa buatin badge, section untuk contributing, lisensi, atau changelog juga. Mau dilengkapin?
