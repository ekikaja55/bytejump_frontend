<!-- src/routes/post/[slug]/+page.svelte -->
<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { Card, Button, Spinner } from 'flowbite-svelte';
	import { EyeOutline, UserOutline, ArrowLeftOutline } from 'flowbite-svelte-icons';
	import { getPost, updateView } from '$lib/api/post';
	import { slugify } from '$lib/utils/slug';
	import type { Post } from '$lib/types/post';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let post: Post | null = null;
	let loading = true;
	let error = false;

	onMount(async () => {
		const slug = $page.params.slug;

		try {
			const res = await getPost();
			const found = res.result?.find((p: Post) => slugify(p.id) === slug);
			post = found || null;

			if (post?.id) {
				await updateView(post.id);
				// Update view count locally
				post.post_view = (post.post_view || 0) + 1;
			}
		} catch (err) {
			console.error('Gagal fetch post:', err);
			error = true;
		} finally {
			loading = false;
		}
	});
</script>

<svelte:head>
	{#if post}
		<title>{post.post_title} - ByteJump Wiki</title>
		<meta name="description" content={post.post_short_desc} />
	{:else}
		<title>ByteJump Wiki</title>
	{/if}
</svelte:head>

<Navbar />

<div class="min-h-screen" style="background-color: #111827;">
	<div class="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
		{#if loading}
			<!-- Loading Spinner -->
			<div class="flex justify-center items-center py-32">
				<div class="text-center">
					<Spinner size="12" color="purple" />
					<p class="text-gray-400 mt-4 text-lg">Memuat postingan...</p>
				</div>
			</div>
		{:else if error || !post}
			<!-- Error/Not Found State -->
			<div class="max-w-2xl mx-auto pt-20">
				<Card class="bg-gray-800 border-gray-700 text-center py-12">
					<div class="text-gray-400">
						<svg class="mx-auto h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
						</svg>
						<h2 class="text-2xl font-bold text-white mb-2">
							{error ? 'Terjadi Kesalahan' : 'Postingan Tidak Ditemukan'}
						</h2>
						<p class="text-gray-400 mb-6 max-w-md mx-auto">
							{error 
								? 'Maaf, terjadi kesalahan saat memuat postingan. Silakan coba lagi nanti.' 
								: 'Postingan yang Anda cari tidak dapat ditemukan atau mungkin telah dihapus.'
							}
						</p>
						<Button 
							href="/post" 
							class="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
						>
							<ArrowLeftOutline class="w-4 h-4 mr-2" />
							Kembali ke Daftar Postingan
						</Button>
					</div>
				</Card>
			</div>
		{:else}
			<!-- Post Detail Content -->
			<div class=" mx-auto pt-20">
				<!-- Back Button -->
				<div class="mb-6">
					<Button 
						href="/post" 
						class="bg-gray-700 hover:bg-gray-600 text-white border-gray-600"
						size="sm"
					>
						<ArrowLeftOutline class="w-4 h-4 mr-2" />
						Kembali ke Daftar
					</Button>
				</div>

				<!-- Main Content Card -->
				<Card size="xl" class="bg-gray-800 border-gray-700 mb-8 ">
					<!-- Banner Image -->
					<div class="mb-6 overflow-hidden rounded-lg">
						<iframe
							title={post.post_title}
							src={`https://drive.google.com/file/d/${post.post_banner.split('/d/')[1].split('/')[0]}/preview`}
							class="h-64 sm:h-80 lg:h-96 w-full border-0"
							allow="autoplay"
						></iframe>
					</div>

					<!-- Post Header -->
					<div class="mb-8">
						<h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
							{post.post_title}
						</h1>
						
						<!-- Meta Information -->
						<div class="flex flex-wrap gap-6 text-gray-400 text-sm">
							<div class="flex items-center gap-2">
								<UserOutline class="w-4 h-4" />
								<span>Ditulis oleh: <span class="text-blue-400 font-medium">{post.post_author}</span></span>
							</div>
							<div class="flex items-center gap-2">
								<EyeOutline class="w-4 h-4" />
								<span>{post.post_view || 0} kali dilihat</span>
							</div>
						</div>
					</div>

					<!-- Post Content -->
					<div class="prose prose-invert max-w-none">
						<div class="text-gray-300 text-base sm:text-lg leading-relaxed whitespace-pre-wrap border-t border-gray-700 pt-8">
							{post.post_long_desc}
						</div>
					</div>
				</Card>

				<!-- Call to Action Section -->
				<Card size="xl" class="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-800/30">

					<div class="text-center py-8">
						<h3 class="text-xl font-bold text-white mb-3">Selesai Membaca?</h3>
						<p class="text-gray-300 mb-6 max-w-md mx-auto">
							Jelajahi postingan menarik lainnya di ByteJump Wiki dan tingkatkan skill programming Anda
						</p>
						<div class="flex flex-col sm:flex-row gap-3 justify-center">
							<Button 
								href="/post" 
								class="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium"
							>
								Lihat Postingan Lainnya
							</Button>
							<Button 
								href="/" 
								class="bg-gray-700 hover:bg-gray-600 text-white border-gray-600"
							>
								Kembali ke Beranda
							</Button>
						</div>
					</div>
				</Card>
			</div>
		{/if}
	</div>
</div>

<Footer />

<style>
	:global(body) {
		background-color: #111827;
	}
</style>