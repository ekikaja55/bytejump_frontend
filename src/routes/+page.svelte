<!-- src/routes/+page.svelte -->

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
			ref: 'journey',
			gradient: 'from-blue-500 to-blue-600'
		},
		{
			title: 'Forums',
			description: 'Bergabung dengan komunitas developer untuk diskusi dan berbagi pengetahuan',
			icon: '💬',
			color: 'green',
			ref: 'forums',
			gradient: 'from-green-500 to-green-600'
		},
		{
			title: 'News',
			description: 'Dapatkan berita terkini seputar teknologi, programming, dan industri IT',
			icon: '📰',
			color: 'purple',
			ref: 'news',
			gradient: 'from-purple-500 to-purple-600'
		},
		{
			title: 'Wiki',
			description: 'Akses dokumentasi lengkap dan panduan untuk berbagai teknologi',
			icon: '📚',
			color: 'yellow',
			ref: 'post',
			gradient: 'from-yellow-500 to-yellow-600'
		},
		{
			title: 'AI Chatbot',
			description: 'Dapatkan bantuan instant dari AI assistant untuk coding dan troubleshooting',
			icon: '🤖',
			color: 'red',
			ref: 'chatbot',
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

	// Animation states
	let heroVisible = false;
	let statsVisible = false;
	let featuresVisible = false;
	let communityVisible = false;
	let ctaVisible = false;

	// Carousel logic for testimonials
	let current = 0;
	let interval: number;
	let isTransitioning = false;

	// Floating particles
	let particles:any = [];

	onMount(() => {
		// Hero animation
		setTimeout(() => heroVisible = true, 200);
		
		// Generate floating particles
		particles = Array.from({ length: 20 }, (_, i) => ({
			id: i,
			x: Math.random() * 100,
			y: Math.random() * 100,
			size: Math.random() * 4 + 2,
			duration: Math.random() * 20 + 10
		}));

		// Intersection Observer for scroll animations
		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					const target = entry.target;
					if (target.classList.contains('stats-section')) statsVisible = true;
					if (target.classList.contains('features-section')) featuresVisible = true;
					if (target.classList.contains('community-section')) communityVisible = true;
					if (target.classList.contains('cta-section')) ctaVisible = true;
				}
			});
		}, { threshold: 0.1 });

		// Observe sections
		document.querySelectorAll('.stats-section, .features-section, .community-section, .cta-section').forEach(section => {
			observer.observe(section);
		});

		// Testimonial carousel with smooth transitions
		interval = setInterval(() => {
			if (!isTransitioning) {
				isTransitioning = true;
				setTimeout(() => {
					current = (current + 1) % testimonials.length;
					isTransitioning = false;
				}, 300);
			}
		}, 5000);

		return () => {
			clearInterval(interval);
			observer.disconnect();
		};
	});

	function changeTestimonial(index:any) {
		if (!isTransitioning && index !== current) {
			isTransitioning = true;
			setTimeout(() => {
				current = index;
				isTransitioning = false;
			}, 300);
		}
	}
</script>

<!-- Navbar -->
<Navbar/>

<!-- Main Content -->
<main class="min-h-screen bg-gray-900 overflow-hidden">
	<!-- Floating Particles -->
	<div class="fixed inset-0 pointer-events-none z-0">
		{#each particles as particle}
			<div 
				class="absolute rounded-full bg-blue-400/20 animate-float"
				style="
					left: {particle.x}%; 
					top: {particle.y}%; 
					width: {particle.size}px; 
					height: {particle.size}px;
					animation-duration: {particle.duration}s;
					animation-delay: {particle.id * 0.5}s;
				"
			></div>
		{/each}
	</div>

	<!-- Hero Section -->
	<section class="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
		<div class="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20"></div>
		<div class="absolute inset-0 bg-dot-pattern opacity-20"></div>
		<div class="bg-grid-pattern absolute inset-0 opacity-10"></div>
		
		<!-- Animated background shapes -->
		<div class="absolute inset-0">
			<div class="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
			<div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow" style="animation-delay: 2s;"></div>
		</div>

		<div class="relative container mx-auto px-4 mt-[20vh] py-20 lg:py-32 z-10">
			<div class="mx-auto max-w-4xl text-center">
				<div class="space-y-6 {heroVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}">
					<Badge class="mb-6 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 transform hover:scale-105 transition-transform duration-300">
						🚀 Platform Developer Terpercaya di Indonesia
					</Badge>

					<h1 class="mb-6 text-4xl leading-tight font-bold text-white lg:text-6xl {heroVisible ? 'animate-fade-in-up delay-200' : 'opacity-0 translate-y-10'}">
						Bergabung dengan
						<span class="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient-x">
							ByteJump
						</span>
						Community
					</h1>

					<p class="mx-auto mb-8 max-w-3xl text-xl leading-relaxed text-gray-300 {heroVisible ? 'animate-fade-in-up delay-400' : 'opacity-0 translate-y-10'}">
						Platform terlengkap untuk developer Indonesia. Akses forum diskusi, wiki dokumentasi,
						berita teknologi terkini, dan AI assistant yang siap membantu coding journey Anda.
					</p>

					<div class="flex flex-col items-center justify-center gap-4 sm:flex-row {heroVisible ? 'animate-fade-in-up delay-600' : 'opacity-0 translate-y-10'}">
						<Button
							href="/auth/register"
							size="lg"
							class="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-3 text-lg font-semibold hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 hover:shadow-2xl transition-all duration-300 animate-glow"
						>
							<span class="flex items-center gap-2">
								Mulai Sekarang
								<svg class="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
								</svg>
							</span>
						</Button>
						<Button
							size="lg"
							color="alternative"
							class="border-gray-600 px-8 py-3 text-lg font-semibold text-white hover:bg-gray-700 transform hover:scale-105 transition-all duration-300"
						>
							Pelajari Lebih Lanjut
						</Button>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Stats Section -->
	<section class="stats-section bg-gray-800 py-16 relative overflow-hidden">
		<div class="absolute inset-0 bg-gradient-to-r from-blue-900/5 to-purple-900/5"></div>
		<div class="container mx-auto px-4 relative z-10">
			<div class="grid grid-cols-2 gap-8 text-center lg:grid-cols-4">
				{#each stats as stat, index}
					<div class="space-y-2 transform transition-all duration-700 {statsVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}" style="animation-delay: {index * 150}ms;">
						<div class="text-3xl font-bold text-white lg:text-4xl hover:text-blue-400 transition-colors duration-300 cursor-default">
							{stat.number}
						</div>
						<div class="text-sm text-gray-400 lg:text-base">{stat.label}</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Features Section - Enhanced -->
	<section class="features-section bg-gray-900 py-20 relative">
		<div class="container mx-auto px-4">
			<div class="mb-16 text-center {featuresVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}">
				<h2 class="mb-4 text-3xl font-bold text-white lg:text-4xl">Fitur Unggulan ByteJump</h2>
				<p class="mx-auto max-w-2xl text-lg text-gray-400">
					Semua yang Anda butuhkan untuk mengembangkan skill programming dalam satu platform
				</p>
			</div>

			<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
				{#each features as feature, index}
					<div class="transform transition-all duration-700 {featuresVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}" style="animation-delay: {index * 100}ms;">
						<Card class="group relative overflow-hidden border-gray-700 bg-gradient-to-br from-gray-800 to-gray-900 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 h-full">
							<!-- Gradient overlay on hover -->
							<div class="absolute inset-0 bg-gradient-to-br {feature.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-10"></div>
							
							<!-- Animated border -->
							<div class="absolute inset-0 rounded-lg bg-gradient-to-r {feature.gradient} opacity-0 blur-sm transition-opacity duration-500 group-hover:opacity-20"></div>
							
							<!-- Floating icon animation -->
							<div class="absolute top-4 right-4 text-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-300 animate-bounce-slow">
								{feature.icon}
							</div>
							
							<div class="relative z-10 p-6">
								<!-- Icon with background -->
								<div class="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-r {feature.gradient} text-2xl shadow-lg transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-300">
									{feature.icon}
								</div>
								
								<h3 class="mb-4 text-xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:{feature.gradient} group-hover:bg-clip-text transition-all duration-300">
									{feature.title}
								</h3>
								
								<p class="mb-6 leading-relaxed text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
									{feature.description}
								</p>
								
								<a 
									href="/{feature.ref}"
									class="w-full inline-flex justify-center items-center bg-gradient-to-r {feature.gradient} hover:shadow-lg transform transition-all duration-300 hover:scale-105 group-hover:animate-glow px-4 py-2 rounded-lg text-white text-sm font-medium"
								>
									<span class="flex items-center justify-center gap-2">
										Explore
										<svg class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
										</svg>
									</span>
								</a>
							</div>
						</Card>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Community Section with Enhanced Carousel -->
	<section class="community-section bg-gradient-to-r from-gray-800 to-gray-900 py-20 relative overflow-hidden">
		<div class="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-purple-900/10"></div>
		<div class="container mx-auto px-4 relative z-10">
			<div class="grid items-center gap-12 lg:grid-cols-2">
				<div class="transform transition-all duration-700 {communityVisible ? 'animate-fade-in-left' : 'opacity-0 -translate-x-10'}">
					<h2 class="mb-6 text-3xl font-bold text-white lg:text-4xl">
						Bergabung dengan Developer Community Terbesar
					</h2>
					<p class="mb-6 text-lg leading-relaxed text-gray-300">
						Terhubung dengan ribuan developer Indonesia, berbagi pengalaman, dan berkembang bersama
						dalam ekosistem teknologi yang dinamis.
					</p>
					<ul class="space-y-3 text-gray-300">
						{#each ['Forum diskusi aktif 24/7', 'Mentor berpengalaman dari industri', 'Chatbot Ready 24/7'] as item, index}
							<li class="flex items-center gap-3 transform transition-all duration-500 {communityVisible ? 'animate-fade-in-left' : 'opacity-0 translate-x-10'}" style="animation-delay: {(index + 1) * 200}ms;">
								<span class="text-green-400 animate-pulse">✓</span>
								{item}
							</li>
						{/each}
					</ul>
				</div>
				
				<!-- Enhanced Testimonials Carousel -->
				<div class="relative max-w-md mx-auto transform transition-all duration-700 {communityVisible ? 'animate-fade-in-right' : 'opacity-0 translate-x-10'}">
					<div class="relative overflow-hidden">
						<Card class="border-gray-700 bg-gray-800/90 backdrop-blur p-8 h-full transition-all duration-500 {isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}">
							<div class="flex flex-col items-center text-center space-y-4">
								<div class="relative">
									<Avatar src={testimonials[current].avatar} alt={testimonials[current].name} size="lg" class="transform hover:scale-110 transition-transform duration-300" />
									<div class="absolute -top-1 -right-1 w-6 h-6 bg-green-400 rounded-full animate-ping"></div>
									<div class="absolute -top-1 -right-1 w-6 h-6 bg-green-400 rounded-full"></div>
								</div>
								<div>
									<div class="text-lg font-semibold text-white">{testimonials[current].name}</div>
									<div class="text-sm text-blue-400">{testimonials[current].role}</div>
									<div class="text-xs text-gray-500">{testimonials[current].company}</div>
								</div>
								<blockquote class="text-gray-300 italic leading-relaxed">
									"{testimonials[current].message}"
								</blockquote>
								<div class="flex text-yellow-400">
									{#each Array(5) as _, index}
										<svg class="w-5 h-5 animate-star-twinkle" style="animation-delay: {index * 100}ms;" fill="currentColor" viewBox="0 0 20 20">
											<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
										</svg>
									{/each}
								</div>
							</div>
						</Card>
					</div>
					
					<!-- Enhanced Controls -->
					<div class="absolute inset-x-0 bottom-0 flex justify-between px-8 pb-4">
						<button
							onclick={() => changeTestimonial((current - 1 + testimonials.length) % testimonials.length)}
							class="rounded-full bg-gray-700/80 p-3 text-white hover:bg-gray-600 hover:scale-110 transition-all duration-300 backdrop-blur"
							aria-label="Previous"
						>
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
							</svg>
						</button>
						<button
							onclick={() => changeTestimonial((current + 1) % testimonials.length)}
							class="rounded-full bg-gray-700/80 p-3 text-white hover:bg-gray-600 hover:scale-110 transition-all duration-300 backdrop-blur"
							aria-label="Next"
						>
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
							</svg>
						</button>
					</div>
					
					<!-- Enhanced Indicators -->
					<div class="flex justify-center mt-4 gap-2">
						{#each testimonials as _, i}
							<button
								aria-label="btn"
								onclick={() => changeTestimonial(i)}
								class="w-3 h-3 rounded-full transition-all duration-300 hover:scale-125"
								class:bg-blue-500={i === current}
								class:bg-gray-500={i !== current}
								class:animate-pulse={i === current}
							></button>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Enhanced CTA Section -->
	<section class="cta-section bg-gray-900 py-20 relative overflow-hidden">
		<div class="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20"></div>
		<div class="absolute inset-0">
			<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
		</div>
		<div class="container mx-auto px-4 text-center relative z-10">
			<div class="transform transition-all duration-700 {ctaVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}">
				<h2 class="mb-6 text-3xl font-bold text-white lg:text-4xl">
					Siap untuk Memulai Journey Anda?
				</h2>
				<p class="mx-auto mb-8 max-w-2xl text-lg text-gray-300">
					Bergabunglah dengan ribuan developer lainnya dan mulai eksplorasi dunia teknologi bersama
					ByteJump
				</p>
				<a
					href="/auth/register"
					class="inline-block bg-gradient-to-r from-blue-500 to-purple-600 px-10 py-4 text-lg font-semibold rounded-lg text-white hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 hover:shadow-2xl transition-all duration-300 animate-glow"
				>
					<span class="flex items-center gap-2">
						Daftar Gratis Sekarang
						<svg class="w-5 h-5 animate-bounce-x" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
						</svg>
					</span>
				</a>
			</div>
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

	.bg-dot-pattern {
		background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
	}

	/* Enhanced Animations */
	@keyframes fade-in-up {
		from {
			opacity: 0;
			transform: translateY(30px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes fade-in-left {
		from {
			opacity: 0;
			transform: translateX(-30px);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	@keyframes fade-in-right {
		from {
			opacity: 0;
			transform: translateX(30px);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	@keyframes float {
		0%, 100% {
			transform: translateY(0px) rotate(0deg);
		}
		33% {
			transform: translateY(-20px) rotate(120deg);
		}
		66% {
			transform: translateY(10px) rotate(240deg);
		}
	}

	@keyframes gradient-x {
		0%, 100% {
			background-size: 200% 200%;
			background-position: left center;
		}
		50% {
			background-size: 200% 200%;
			background-position: right center;
		}
	}

	@keyframes glow {
		0%, 100% {
			box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
		}
		50% {
			box-shadow: 0 0 30px rgba(147, 51, 234, 0.7);
		}
	}

	@keyframes pulse-slow {
		0%, 100% {
			opacity: 0.3;
			transform: scale(1);
		}
		50% {
			opacity: 0.6;
			transform: scale(1.1);
		}
	}

	@keyframes bounce-slow {
		0%, 100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-10px);
		}
	}

	@keyframes bounce-x {
		0%, 100% {
			transform: translateX(0);
		}
		50% {
			transform: translateX(5px);
		}
	}

	@keyframes star-twinkle {
		0%, 100% {
			opacity: 1;
			transform: scale(1);
		}
		50% {
			opacity: 0.7;
			transform: scale(1.1);
		}
	}

	/* Animation Classes */
	.animate-fade-in-up {
		animation: fade-in-up 0.8s ease-out forwards;
	}

	.animate-fade-in-left {
		animation: fade-in-left 0.8s ease-out forwards;
	}

	.animate-fade-in-right {
		animation: fade-in-right 0.8s ease-out forwards;
	}

	.animate-float {
		animation: float linear infinite;
	}

	.animate-gradient-x {
		animation: gradient-x 8s ease infinite;
		background-size: 200% 200%;
	}

	.animate-glow {
		animation: glow 2s ease-in-out infinite;
	}

	.animate-pulse-slow {
		animation: pulse-slow 4s ease-in-out infinite;
	}

	.animate-bounce-slow {
		animation: bounce-slow 3s ease-in-out infinite;
	}

	.animate-bounce-x {
		animation: bounce-x 1s ease-in-out infinite;
	}

	.animate-star-twinkle {
		animation: star-twinkle 2s ease-in-out infinite;
	}

	/* Delay Classes */
	.delay-200 { animation-delay: 0.2s; }
	.delay-400 { animation-delay: 0.4s; }
	.delay-600 { animation-delay: 0.6s; }
	.delay-800 { animation-delay: 0.8s; }

	/* Enhanced Hover Effects */
	.group:hover .group-hover\:animate-glow {
		animation: glow 1s ease-in-out infinite;
	}

	/* Responsive adjustments */
	@media (max-width: 768px) {
		.animate-fade-in-left,
		.animate-fade-in-right {
			animation: fade-in-up 0.8s ease-out forwards;
		}
	}
</style>