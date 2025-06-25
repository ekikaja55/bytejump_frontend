<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
import {
		Button,
		Card,
		Badge,
		Avatar,
	} from 'flowbite-svelte';
	import { onMount } from 'svelte';

		const features = [
		{
			title: 'Our Journey',
			description: 'Ikuti perjalanan pengembangan teknologi dan inovasi terbaru dari ByteJump',
			icon: '🚀',
			color: 'blue',
			gradient: 'from-blue-500 to-blue-600'
		},
		{
			title: 'Forums',
			description: 'Bergabung dengan komunitas developer untuk diskusi dan berbagi pengetahuan',
			icon: '💬',
			color: 'green',
			gradient: 'from-green-500 to-green-600'
		},
		{
			title: 'News',
			description: 'Dapatkan berita terkini seputar teknologi, programming, dan industri IT',
			icon: '📰',
			color: 'purple',
			gradient: 'from-purple-500 to-purple-600'
		},
		{
			title: 'Wiki',
			description: 'Akses dokumentasi lengkap dan panduan untuk berbagai teknologi',
			icon: '📚',
			color: 'yellow',
			gradient: 'from-yellow-500 to-yellow-600'
		},
		{
			title: 'AI Chatbot',
			description: 'Dapatkan bantuan instant dari AI assistant untuk coding dan troubleshooting',
			icon: '🤖',
			color: 'red',
			gradient: 'from-red-500 to-red-600'
		}
	];

	// Stats data
	const stats = [
		{ number: '10K+', label: 'Active Users' },
		{ number: '500+', label: 'Forum Posts' },
		{ number: '100+', label: 'Wiki Articles' },
		{ number: '24/7', label: 'AI Support' }
	];
	let isRegisterModalOpen = false;

	// Testimonials data for carousel
	const testimonials = [
		{
			name: 'Prima Fikri Salim',
			role: 'Full Stack Developer',
			avatar: '/foto1.jpg',
			message: 'ByteJump sangat membantu saya berkembang sebagai developer! Community yang supportif dan resources yang lengkap.',
			company: 'Tech Startup'
		},
		{
			name: 'Nanda Koin',
			role: 'Frontend Developer',
			avatar: '/foto2.jpg',
			message: 'Platform terbaik untuk belajar teknologi terbaru. AI chatbot-nya sangat membantu ketika stuck di coding.',
			company: 'Digital Agency'
		},
		{
			name: 'Rizki Arkant Pratama',
			role: 'Backend Developer',
			avatar: '/foto3.jpg',
			message: 'Forum diskusinya aktif banget dan selalu ada yang bantu. Wiki dokumentasinya juga lengkap dan mudah dipahami.',
			company: 'Fintech Company'
		},
		{
			name: 'Fabian Kurniawan Limanto',
			role: 'DevOps Engineer',
			avatar: '/foto4.jpg',
			message: 'News section-nya selalu up-to-date dengan teknologi terbaru. Perfect untuk stay informed di industri tech.',
			company: 'Cloud Provider'
		}
	];

	// Carousel logic for testimonials
	let current = 0;
	let interval: number;

	onMount(() => {
		interval = setInterval(() => {
			current = (current + 1) % testimonials.length;
		}, 5000);
		return () => clearInterval(interval);
	});

</script>



<!-- Navbar -->

<Navbar/>

<!-- Main Content -->
<main class="min-h-screen bg-gray-900">
	<!-- Hero Section -->
	<section
		class="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
	>
		<div class="bg-grid-pattern absolute inset-0 opacity-10"></div>
		<div class="relative container mx-auto px-4 mt-[10vh] py-20 lg:py-32">
			<div class="mx-auto max-w-4xl text-center">
				<Badge class="mb-6 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
					🚀 Platform Developer Terpercaya di Indonesia
				</Badge>

				<h1 class="mb-6 text-4xl leading-tight font-bold text-white lg:text-6xl">
					Bergabung dengan
					<span class="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
						ByteJump
					</span>
					Community
				</h1>

				<p class="mx-auto mb-8 max-w-3xl text-xl leading-relaxed text-gray-300">
					Platform terlengkap untuk developer Indonesia. Akses forum diskusi, wiki dokumentasi,
					berita teknologi terkini, dan AI assistant yang siap membantu coding journey Anda.
				</p>

				<div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
					<Button
						size="lg"
						class="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-3 text-lg font-semibold hover:from-blue-600 hover:to-purple-700"
					>
						Mulai Sekarang
					</Button>
					<Button
						size="lg"
						color="alternative"
						class="border-gray-600 px-8 py-3 text-lg font-semibold text-white hover:bg-gray-700"
					>
						Pelajari Lebih Lanjut
					</Button>
				</div>
			</div>
		</div>
	</section>

	<!-- Stats Section -->
	<section class="bg-gray-800 py-16">
		<div class="container mx-auto px-4">
			<div class="grid grid-cols-2 gap-8 text-center lg:grid-cols-4">
				{#each stats as stat}
					<div class="space-y-2">
						<div class="text-3xl font-bold text-white lg:text-4xl">{stat.number}</div>
						<div class="text-sm text-gray-400 lg:text-base">{stat.label}</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Features Section - Improved -->
	<section class="bg-gray-900 py-20">
		<div class="container mx-auto px-4">
			<div class="mb-16 text-center">
				<h2 class="mb-4 text-3xl font-bold text-white lg:text-4xl">Fitur Unggulan ByteJump</h2>
				<p class="mx-auto max-w-2xl text-lg text-gray-400">
					Semua yang Anda butuhkan untuk mengembangkan skill programming dalam satu platform
				</p>
			</div>

			<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
				{#each features as feature, index}
					<Card
						class="group relative overflow-hidden border-gray-700 bg-gradient-to-br from-gray-800 to-gray-900 transition-all duration-500 hover:scale-105 hover:shadow-2xl"
					>
						<!-- Gradient overlay on hover -->
						<div class="absolute inset-0 bg-gradient-to-br {feature.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-10"></div>
						
						<!-- Animated border -->
						<div class="absolute inset-0 rounded-lg bg-gradient-to-r {feature.gradient} opacity-0 blur-sm transition-opacity duration-500 group-hover:opacity-20"></div>
						
						<div class="relative z-10 p-6">
							<!-- Icon with background -->
							<div class="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-r {feature.gradient} text-2xl shadow-lg">
								{feature.icon}
							</div>
							
							<h3 class="mb-4 text-xl font-bold text-white group-hover:bg-gradient-to-r group-hover:{feature.gradient} group-hover:bg-clip-text transition-all duration-300">
								{feature.title}
							</h3>
							
							<p class="mb-6 leading-relaxed text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
								{feature.description}
							</p>
							
							<Button 
								class="w-full bg-gradient-to-r {feature.gradient} hover:shadow-lg transform transition-all duration-300 hover:scale-105" 
								size="sm"
							>
								<span class="flex items-center justify-center gap-2">
									Explore
									<svg class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
									</svg>
								</span>
							</Button>
						</div>
					</Card>
				{/each}
			</div>
		</div>
	</section>

	<!-- Community Section with Carousel -->
	<section class="bg-gradient-to-r from-gray-800 to-gray-900 py-20">
		<div class="container mx-auto px-4">
			<div class="grid items-center gap-12 lg:grid-cols-2">
				<div>
					<h2 class="mb-6 text-3xl font-bold text-white lg:text-4xl">
						Bergabung dengan Developer Community Terbesar
					</h2>
					<p class="mb-6 text-lg leading-relaxed text-gray-300">
						Terhubung dengan ribuan developer Indonesia, berbagi pengalaman, dan berkembang bersama
						dalam ekosistem teknologi yang dinamis.
					</p>
					<ul class="space-y-3 text-gray-300">
						<li class="flex items-center gap-3">
							<span class="text-green-400">✓</span>
							Forum diskusi aktif 24/7
						</li>
						<li class="flex items-center gap-3">
							<span class="text-green-400">✓</span>
							Mentor berpengalaman dari industri
						</li>
						<li class="flex items-center gap-3">
							<span class="text-green-400">✓</span>
							Chatbot Ready 24/7
						</li>
					</ul>
				</div>
				<!-- Testimonials Carousel -->
				<div class="relative max-w-md mx-auto">
					<Card class="border-gray-700 bg-gray-800/90 backdrop-blur p-8 h-full transition-all duration-500">
						<div class="flex flex-col items-center text-center space-y-4">
							<Avatar src={testimonials[current].avatar} alt={testimonials[current].name} size="lg" />
							<div>
								<div class="text-lg font-semibold text-white">{testimonials[current].name}</div>
								<div class="text-sm text-blue-400">{testimonials[current].role}</div>
								<div class="text-xs text-gray-500">{testimonials[current].company}</div>
							</div>
							<blockquote class="text-gray-300 italic leading-relaxed">
								"{testimonials[current].message}"
							</blockquote>
							<div class="flex text-yellow-400">
								{#each Array(5) as _}
									<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
										<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
									</svg>
								{/each}
							</div>
						</div>
					</Card>
					<!-- Controls -->
					<div class="absolute inset-x-0 bottom-0 flex justify-between px-8 pb-4">
						<button
							onclick={() => current = (current - 1 + testimonials.length) % testimonials.length}
							class="rounded-full bg-gray-700/80 p-2 text-white hover:bg-gray-600 transition-colors pointer-events-auto"
							aria-label="Previous"
						>
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
							</svg>
						</button>
						<button
							onclick={() => current = (current + 1) % testimonials.length}
							class="rounded-full bg-gray-700/80 p-2 text-white hover:bg-gray-600 transition-colors pointer-events-auto"
							aria-label="Next"
						>
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
							</svg>
						</button>
					</div>
					<!-- Indicators -->
					<div class="flex justify-center mt-4 gap-2">
						{#each testimonials as _, i}
							<span
								class="inline-block w-3 h-3 rounded-full"
								class:bg-blue-500={i === current}
								class:bg-gray-500={i !== current}
							></span>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- CTA Section -->
	<section class="bg-gray-900 py-20">
		<div class="container mx-auto px-4 text-center">
			<h2 class="mb-6 text-3xl font-bold text-white lg:text-4xl">
				Siap untuk Memulai Journey Anda?
			</h2>
			<p class="mx-auto mb-8 max-w-2xl text-lg text-gray-300">
				Bergabunglah dengan ribuan developer lainnya dan mulai eksplorasi dunia teknologi bersama
				ByteJump
			</p>
            <a
                href="/auth/register"
                class="inline-block bg-gradient-to-r from-blue-500 to-purple-600 px-10 py-4 text-lg font-semibold rounded-lg text-white hover:from-blue-600 hover:to-purple-700 transition-colors"
            >
                Daftar Gratis Sekarang
            </a>
		</div>
	</section>
</main>

<!-- Footer -->
<Footer/>

<style>
	:global(body) {
		background-color: #111827;
	}
	.bg-grid-pattern {
		background-image:
			linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
			linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px);
		background-size: 50px 50px;
	}
</style>