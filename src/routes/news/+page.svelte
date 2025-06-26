<!-- src/routes/news/+page.svelte -->
<!-- buat rico -->
<script lang="ts">
	import { getArticles, getArticleWithTag } from '$lib/api/news';
	import Footer from '$lib/components/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import { 
		Card, 
		Button, 
		Dropdown, 
		DropdownItem, 
		Badge,
		Avatar,
		Skeleton,
		TextPlaceholder,
		ImagePlaceholder
	} from 'flowbite-svelte';
	import { ChevronDownOutline, CalendarMonthOutline, UserOutline } from 'flowbite-svelte-icons';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	const dataArtikel = writable<any[]>([]);
	const tagsArtikel = writable<any[]>([]);
	const selectedTag = writable<string | null>(null);
	const selectedTagName = writable<string>('Semua Kategori');
	const isLoading = writable<boolean>(true);

	let filteredArticles = [];

	// Fetch data
	onMount(async () => {
		try {
			const result = await getArticles();
			const tags = await getArticleWithTag();

			dataArtikel.set(result.result);
			tagsArtikel.set(tags.result);
		} catch (error) {
			console.error('Error fetching data:', error);
		} finally {
			isLoading.set(false);
		}
	});

	// Update filteredArticles when articles or selected tag changes
	$: filteredArticles =
		$selectedTag && $selectedTag !== 'all'
			? $dataArtikel.filter((a) => a.tag_list.includes($selectedTag))
			: $dataArtikel;

	// Handle tag selection
	function selectTag(tagName: string | null, displayName: string) {
		selectedTag.set(tagName);
		selectedTagName.set(displayName);
	}

	// Format date helper
	function formatDate(dateString: string) {
		return new Date(dateString).toLocaleDateString('id-ID', {
			day: '2-digit',
			month: 'short',
			year: 'numeric'
		});
	}

	// Truncate text helper
	function truncateText(text: string, maxLength: number) {
		return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
	}
</script>

<Navbar />

<div class="min-h-screen bg-gray-900 py-8">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-[20vh]">
		<!-- Header Section -->
		<div class="text-center mb-12">
			<h1 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4 py-[20px]">
				Tech News & Updates
			</h1>
			<p class="text-gray-300 text-lg max-w-2xl mx-auto">
                Tetap update dengan tren teknologi terbaru, wawasan pemrograman, dan cerita pengembang dari seluruh dunia.
			</p>
		</div>

		<!-- Filter Section -->
		<div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
			<div class="flex items-center gap-4">
				<h2 class="text-xl font-semibold text-white">Filter Artikel</h2>
				
				<!-- Tag Dropdown -->
				<Button class="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white border-gray-600">
					{$selectedTagName}
					<ChevronDownOutline class="w-4 h-4" />
				</Button>
				<Dropdown class="bg-gray-800 border-gray-700">
					<DropdownItem 
						class="text-white hover:bg-gray-700"
						onclick={() => selectTag('all', 'Semua Kategori')}
					>
						<div class="flex items-center gap-2">
							<Badge color="amber">All</Badge>
							Semua Kategori
						</div>
					</DropdownItem>
					{#each $tagsArtikel as tag}
						<DropdownItem 
							class="text-white hover:bg-gray-700"
							onclick={() => selectTag(tag.name, tag.name)}
						>
							<div class="flex items-center gap-2">
								<Badge 
									style="background-color: {tag.bg_color_hex}; color: {tag.text_color_hex}"
								>
									{tag.name}
								</Badge>
								{tag.name}
							</div>
						</DropdownItem>
					{/each}
				</Dropdown>
			</div>
			
			<div class="text-sm text-gray-400">
				{#if !$isLoading}
					Menampilkan {filteredArticles.length} artikel
				{/if}
			</div>
		</div>

		<!-- Articles Grid -->
		{#if $isLoading}
			<!-- Skeleton Loading -->
			<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{#each Array(8) as _}
					<Card class="bg-gray-800 border-gray-700">
						<ImagePlaceholder class="h-48 mb-4" />
						<div class="space-y-3">
							<TextPlaceholder class="h-4" />
							<TextPlaceholder class="h-4 w-3/4" />
							<div class="flex items-center gap-2">
								<Skeleton class="w-8 h-8 rounded-full" />
								<TextPlaceholder class="h-3 w-20" />
							</div>
							<TextPlaceholder class="h-3 w-24" />
							<div class="space-y-2">
								<TextPlaceholder class="h-3" />
								<TextPlaceholder class="h-3" />
								<TextPlaceholder class="h-3 w-2/3" />
							</div>
						</div>
					</Card>
				{/each}
			</div>
		{:else if filteredArticles.length > 0}
			<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{#each filteredArticles as article}
					<Card class="bg-gray-800 border-gray-700 hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 flex flex-col h-full group">
						<!-- Cover Image -->
						<div class="relative overflow-hidden rounded-lg mb-4">
							<img 
								src={article.cover_image} 
								alt="Cover" 
								class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
							/>
							<!-- Language Badge -->
							<div class="absolute top-3 right-3">
								<Badge color="blue" class="text-xs font-medium">
									{article.language.toUpperCase()}
								</Badge>
							</div>
						</div>

						<div class="flex flex-col flex-1 space-y-3">
							<!-- Title -->
							<h3 class="text-lg font-semibold text-white line-clamp-2 group-hover:text-blue-400 transition-colors">
								{article.title}
							</h3>

							<!-- Author Info -->
							<div class="flex items-center gap-3">
								<Avatar 
									src={article.user.profile_image_90} 
									alt={article.user.name}
									size="sm"
									class="ring-2 ring-gray-600"
								/>
								<div class="flex-1 min-w-0">
									<p class="text-sm font-medium text-gray-300 truncate">
										{article.user.name}
									</p>
								</div>
							</div>

							<!-- Date -->
							<div class="flex items-center gap-2 text-sm text-gray-400">
								<CalendarMonthOutline class="w-4 h-4" />
								{formatDate(article.published_at)}
							</div>

							<!-- Description -->
							<p class="text-sm text-gray-300 line-clamp-3 flex-1">
								{truncateText(article.description, 120)}
							</p>

							<!-- Tags -->
							{#if article.tag_list && article.tag_list.length > 0}
								<div class="flex flex-wrap gap-1">
									{#each article.tag_list.slice(0, 3) as tag}
										{@const tagData = $tagsArtikel.find(t => t.name === tag)}
										{#if tagData}
											<Badge 
												size="large"
												style="background-color: {tagData.bg_color_hex}; color: {tagData.text_color_hex}"
											>
												{tag}
											</Badge>
										{:else}
											<Badge size="large" color="gray">{tag}</Badge>
										{/if}
									{/each}
									{#if article.tag_list.length > 3}
										<Badge size="large" color="gray">+{article.tag_list.length - 3}</Badge>
									{/if}
								</div>
							{/if}

							<!-- Read More Button -->
							<div class="pt-2 mt-auto">
								<Button
									color="blue"
									href={article.url}
									target="_blank"
									rel="noopener noreferrer"
									class="w-full bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
									size="sm"
								>
									Baca Selengkapnya
								</Button>
							</div>
						</div>
					</Card>
				{/each}
			</div>

			<!-- Load More Button (Optional) -->
			<div class="flex justify-center mt-12">
				<Button 
					color="alternative" 
					class="bg-gray-700 hover:bg-gray-600 text-white border-gray-600"
					size="lg"
				>
					Muat Lebih Banyak
				</Button>
			</div>
		{:else}
			<!-- Empty State -->
			<div class="text-center py-16">
				<div class="mb-4">
					<UserOutline class="w-16 h-16 text-gray-500 mx-auto" />
				</div>
				<h3 class="text-xl font-semibold text-gray-300 mb-2">Tidak Ada Artikel</h3>
				<p class="text-gray-500 mb-6">
					Tidak ada artikel yang ditemukan untuk kategori "{$selectedTagName}".
				</p>
				<Button 
					color="blue" 
					onclick={() => selectTag('all', 'Semua Kategori')}
				>
					Lihat Semua Artikel
				</Button>
			</div>
		{/if}
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

	:global(.group:hover .group-hover\:scale-105) {
		transform: scale(1.05);
	}

	:global(.group:hover .group-hover\:text-blue-400) {
		color: #60a5fa;
	}
</style>