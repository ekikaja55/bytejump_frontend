<!-- src/routes/post/+page.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { Card, Button, Spinner } from 'flowbite-svelte';
	import { EyeOutline, UserOutline, ArrowRightOutline } from 'flowbite-svelte-icons';
	import { getPost } from '$lib/api/post';
	import type { Post } from '$lib/types/post';
	import { slugify } from '$lib/utils/slug';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let posts: (Post & { slug: string })[] = [];
	let loading = true;

	onMount(async () => {
		try {
			const res = await getPost();
			posts = (res.result || []).map((p: Post) => ({
				...p,
				slug: slugify(p.id)
			}));
		} catch (error) {
			console.error('Gagal fetch post:', error);
		} finally {
			loading = false;
		}
	});
</script>

<Navbar />

<div class="min-h-screen" style="background-color: #111827;">
	<div class="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
		<!-- Hero Section -->
		<div class="text-center mb-12 pt-20 mt-[20vh]">
			<h1 class="py-2 text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
				ByteJump Wiki
			</h1>
			<p class="text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto">
				Platform knowledge sharing untuk developer Indonesia. Temukan tutorial, tips, dan panduan programming terbaik untuk meningkatkan skill coding Anda.
			</p>
		</div>

		<!-- Posts Section -->
		<div class="mb-8">
			<h2 class="text-2xl sm:text-3xl font-bold text-white mb-6">Postingan Terbaru</h2>

			{#if loading}
				<!-- Loading Spinner -->
				<div class="flex justify-center items-center py-20">
					<div class="text-center">
						<Spinner size="12" color="purple" />
						<p class="text-gray-400 mt-4 text-lg">Memuat postingan...</p>
					</div>
				</div>
			{:else if posts.length === 0}
				<!-- Empty State -->
				<Card class="bg-gray-800 border-gray-700 text-center py-12">
					<div class="text-gray-400">
						<svg class="mx-auto h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
						</svg>
						<h3 class="text-xl font-bold text-white mb-2">Belum ada postingan tersedia</h3>
						<p class="text-gray-400">Postingan akan segera hadir. Pantau terus untuk update terbaru!</p>
					</div>
				</Card>
			{:else}
				<!-- Posts Grid -->
				<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{#each posts as post}
						<Card class="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-all duration-300 hover:scale-105 hover:shadow-xl group">
							<!-- Banner Image -->
							<div class="mb-4 overflow-hidden rounded-lg">
								<iframe
									title={post.post_title}
									src={`https://drive.google.com/file/d/${post.post_banner.split('/d/')[1].split('/')[0]}/preview`}
									class="h-48 w-full border-0 group-hover:scale-105 transition-transform duration-300"
									allow="autoplay"
								></iframe>
							</div>

							<!-- Content -->
							<div class="space-y-4 flex flex-col h-full">
								<h3 class="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-200 line-clamp-2">
									{post.post_title}
								</h3>
								
								<p class="text-gray-300 text-sm line-clamp-3 flex-grow">
									{post.post_short_desc}
								</p>

								<!-- Meta Info -->
								<div class="flex items-center gap-4 text-gray-400 text-xs">
									<div class="flex items-center gap-1">
										<UserOutline class="w-3 h-3" />
										<span class="truncate">{post.post_author}</span>
									</div>
									<div class="flex items-center gap-1">
										<EyeOutline class="w-3 h-3" />
										<span>{post.post_view ?? 0} views</span>
									</div>
								</div>

								<!-- Action Button -->
								<div class="pt-2 mt-auto">
									<Button 
										href={`/post/${post.slug}`}
										class="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium text-sm"
									>
										<span class="flex items-center justify-center gap-2">
											Baca Selengkapnya
											<ArrowRightOutline class="w-4 h-4" />
										</span>
									</Button>
								</div>
							</div>
						</Card>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</div>

<Footer />

<style>
	:global(body) {
		background-color: #111827;
	}
	
	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
	
	.line-clamp-3 {
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>