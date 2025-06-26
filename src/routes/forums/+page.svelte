<!-- src/routes/forums/+page.svelte -->

<script lang="ts">
	import { onMount } from 'svelte';
	import { getAllForum } from '$lib/api/forum';
	import type { Forum } from '$lib/types/forum';
	import { forums } from '$lib/stores/forumStore';
	import { convertGDriveToEmbedUrl } from '$lib/utils/drive';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import dayjs from 'dayjs';

	let loading = true;

	onMount(async () => {
		try {
			const res = await getAllForum();
			forums.set(res.result || []);
		} catch (error) {
			console.error('Gagal fetch forum:', error);
		} finally {
			loading = false;
		}
	});
</script>

<svelte:head>
	<title>Forum Diskusi</title>
	<meta name="description" content="Forum diskusi untuk berbagi ide dan pengalaman" />
</svelte:head>

<Navbar />
<main class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
	<!-- Hero Section -->
	<section class="relative px-4 pt-24 pb-12 sm:px-6 lg:px-8 ">
		<div class="mx-auto max-w-4xl text-center">
			<h1 class="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl mt-[20vh]">
				Forum <span class="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Diskusi</span>
			</h1>
			<p class="mt-4 text-lg text-gray-300 sm:text-xl">
				Tempat berbagi ide, pengalaman, dan diskusi yang bermakna
			</p>
		</div>
	</section>

	<!-- Content Section -->
	<section class="px-4 pb-16 sm:px-6 lg:px-8">
		<div class="mx-auto max-w-4xl">
			{#if loading}
				<!-- Simple Loading State -->
				<div class="flex h-32 items-center justify-center">
					<div class="h-8 w-8 animate-spin rounded-full border-4 border-blue-400 border-t-transparent"></div>
				</div>
			{:else if $forums.length === 0}
				<!-- Empty State -->
				<div class="rounded-2xl bg-gray-800/50 p-12 text-center backdrop-blur-sm">
					<div class="mx-auto mb-4 h-16 w-16 rounded-full bg-gray-700/50 flex items-center justify-center">
						<svg class="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.955 8.955 0 01-4.906-1.471L3 21l2.471-5.094A8.955 8.955 0 011 12c0-4.418 3.582-8 8-8s8 3.582 8 8z" />
						</svg>
					</div>
					<h3 class="text-xl font-semibold text-white mb-2">Belum Ada Forum</h3>
					<p class="text-gray-400">Forum diskusi akan muncul di sini ketika tersedia.</p>
				</div>
			{:else}
				<!-- Forum Cards -->
				<div class="space-y-6">
					{#each $forums as forum, index}
						<article 
							class="group relative overflow-hidden rounded-2xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10"
							style="animation-delay: {index * 100}ms"
						>
							<!-- Forum Header -->
							<div class="p-6 pb-4">
								<div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
									<div class="flex-1">
										<h2 class="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-200 mb-2">
											{forum.forum_title}
										</h2>
										<div class="flex items-center text-sm text-gray-400 space-x-4">
											<span class="flex items-center space-x-1">
												<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
													<path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
												</svg>
												<span>{forum.forum_publisher}</span>
											</span>
											<span class="flex items-center space-x-1">
												<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
													<path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
												</svg>
												<span>{dayjs(forum.createdAt).format('DD MMM YYYY')}</span>
											</span>
										</div>
									</div>
									<a 
										href={`/forum/${forum.id}`} 
										class="inline-flex items-center space-x-2 rounded-lg bg-blue-600/20 px-4 py-2 text-sm font-medium text-blue-400 hover:bg-blue-600/30 hover:text-blue-300 transition-all duration-200 border border-blue-600/30 hover:border-blue-500/50"
									>
										<span>Lihat Detail</span>
										<svg class="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
										</svg>
									</a>
								</div>
							</div>

							<!-- Forum Image -->
							{#if forum.forum_img}
								<div class="px-6 pb-4">
									<div class="relative overflow-hidden rounded-xl bg-gray-900/50">
										<iframe
											class="w-full h-64 sm:h-80"
											src={convertGDriveToEmbedUrl(forum.forum_img)}
											title={forum.forum_title}
											frameborder="0"
											allow="autoplay"
											allowfullscreen
											loading="lazy"
										></iframe>
									</div>
								</div>
							{/if}

							<!-- Forum Description -->
							<div class="px-6 pb-4">
								<p class="text-gray-300 leading-relaxed">{forum.forum_desc}</p>
							</div>

							<!-- Forum Replies -->
							<div class="px-6 pb-6">
								{#if forum.forum_reply.length > 0}
									<div class="space-y-3">
										<div class="flex items-center space-x-2 text-sm text-gray-400">
											<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
												<path fill-rule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clip-rule="evenodd" />
											</svg>
											<span>{forum.forum_reply.length} Komentar</span>
										</div>
										
										{#each forum.forum_reply.slice(0, 2) as reply}
											<div class="rounded-xl bg-gray-700/50 p-4 border border-gray-600/30">
												<div class="flex items-center justify-between mb-2">
													<span class="font-medium text-blue-400">{reply.username}</span>
													<span class="text-xs text-gray-500">{dayjs(reply.date).format('DD MMM YYYY HH:mm')}</span>
												</div>
												<p class="text-sm text-gray-300 leading-relaxed">{reply.reply}</p>
											</div>
										{/each}
										
										{#if forum.forum_reply.length > 2}
											<div class="text-center">
												<a 
													href={`/forum/${forum.id}`}
													class="inline-flex items-center space-x-1 text-sm text-gray-400 hover:text-blue-400 transition-colors duration-200"
												>
													<span>+{forum.forum_reply.length - 2} komentar lainnya</span>
													<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
														<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
													</svg>
												</a>
											</div>
										{/if}
									</div>
								{:else}
									<div class="flex items-center justify-center py-8 text-gray-500">
										<div class="text-center">
											<svg class="mx-auto h-8 w-8 mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.955 8.955 0 01-4.906-1.471L3 21l2.471-5.094A8.955 8.955 0 011 12c0-4.418 3.582-8 8-8s8 3.582 8 8z" />
											</svg>
											<p class="text-sm">Belum ada komentar</p>
										</div>
									</div>
								{/if}
							</div>
						</article>
					{/each}
				</div>
			{/if}
		</div>
	</section>
</main>
<Footer />

<style>
	:global(body) {
		background-color: #111827;
	}
	
	article {
		animation: fadeInUp 0.6s ease-out forwards;
		opacity: 0;
		transform: translateY(20px);
	}
	
	@keyframes fadeInUp {
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
	
	iframe {
		transition: transform 0.3s ease;
	}
	
	article:hover iframe {
		transform: scale(1.02);
	}
</style>