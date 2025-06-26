<!-- src/routes/+page.svelte -->
<script lang="ts">
	import { Card, Button, Badge } from 'flowbite-svelte';
	import { 
		ArrowRightOutline, 
		BellOutline, 
		CodeBranchOutline, 
		UsersGroupOutline,
		CheckCircleOutline,
		BarsOutline,
		RocketOutline
	} from 'flowbite-svelte-icons';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';

	// Animation state for hero section
	let heroLoaded = false;
	
	// Simulate loading animation
	setTimeout(() => {
		heroLoaded = true;
	}, 500);

	const features = [
		{
			icon: BellOutline,
			title: "AI yang Cepat & Akurat",
			description: "Powered by Qwen.AI, dapatkan jawaban programming yang tepat dalam hitungan detik"
		},
		{
			icon: CodeBranchOutline,
			title: "Khusus Developer Indonesia",
			description: "Dioptimalkan untuk developer Indonesia dengan context programming yang relevan"
		},
		{
			icon: UsersGroupOutline,
			title: "Komunitas ByteJump",
			description: "Terintegrasi dengan komunitas developer terbesar di Indonesia"
		}
	];

	const benefits = [
		"Debugging code lebih cepat dengan AI assistant",
		"Belajar best practices dari expert AI",
		"Solusi coding dalam bahasa Indonesia",
		"24/7 available tanpa batas waktu",
		"Gratis untuk semua developer Indonesia"
	];

	const testimonials = [
		{
			name: "Ahmad Rizki",
			role: "Full Stack Developer",
			message: "Game changer! AI-nya ngerti banget context programming Indonesia. Debugging jadi lebih cepat!"
		},
		{
			name: "Sari Mentari",
			role: "Frontend Developer",
			message: "Akhirnya ada AI yang bisa jawab pertanyaan coding dalam bahasa Indonesia. Recommended!"
		},
		{
			name: "Budi Setiawan",
			role: "Backend Developer",
			message: "Kolaborasi ByteJump x Qwen.AI ini luar biasa. Productivity coding naik drastis!"
		}
	];
</script>

<svelte:head>
	<title>ByteJump x Qwen.AI - AI Assistant untuk Developer Indonesia</title>
	<meta name="description" content="Kolaborasi ByteJump dengan Qwen.AI menghadirkan AI assistant khusus untuk developer Indonesia. Chat dengan AI, debug code, dan tingkatkan skill programming Anda!" />
</svelte:head>

<Navbar />

<div class="min-h-screen bg-gray-900">
	<!-- Hero Section -->
	<section class="relative overflow-hidden">
		<!-- Background Effects -->
		<div class="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20"></div>
		<div class="absolute inset-0 bg-dot-pattern opacity-20"></div>
		
		<div class="relative container mx-auto px-4 py-20 sm:px-6 lg:px-8 mt-[20vh]">
			<div class="text-center max-w-4xl mx-auto">
				<!-- Collaboration Badge -->
				<div class="mb-8 {heroLoaded ? 'animate-fade-in-up' : 'opacity-0'}">
					<Badge color="blue" class="inline-flex items-center px-4 py-2 text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
						<RocketOutline class="w-4 h-4 mr-2" />
						Kolaborasi Eksklusif
					</Badge>
				</div>

				<!-- Main Heading -->
				<h1 class="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 {heroLoaded ? 'animate-fade-in-up delay-200' : 'opacity-0'}">
					<span class="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
						ByteJump
					</span>
					<span class="text-white"> × </span>
					<span class="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
						Qwen.AI
					</span>
				</h1>

				<!-- Subtitle -->
				<p class="text-xl sm:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed {heroLoaded ? 'animate-fade-in-up delay-400' : 'opacity-0'}">
					AI Assistant pintar khusus untuk <span class="text-blue-400 font-semibold">developer Indonesia</span>. 
					Chat dengan AI, debug code, dan tingkatkan skill programming Anda!
				</p>

				<!-- CTA Buttons -->
				<div class="flex flex-col sm:flex-row gap-4 justify-center mb-12 {heroLoaded ? 'animate-fade-in-up delay-600' : 'opacity-0'}">
					<Button 
						href="/dashboard" 
						size="xl"
						class="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 border-0"
					>
						<BarsOutline class="w-5 h-5 mr-2" />
						Mulai Chat dengan AI
						<ArrowRightOutline class="w-5 h-5 ml-2" />
					</Button>
					<Button 
						href="/post" 
						size="xl"
						color="alternative"
						class="bg-gray-800 hover:bg-gray-700 text-white border-gray-700 hover:border-gray-600 font-bold px-8 py-4 text-lg"
					>
						Lihat Tutorial
					</Button>
				</div>

				<!-- Stats -->
				<div class="grid grid-cols-2 md:grid-cols-4 gap-8 {heroLoaded ? 'animate-fade-in-up delay-800' : 'opacity-0'}">
					<div class="text-center">
						<div class="text-3xl font-bold text-blue-400 mb-2">10K+</div>
						<div class="text-gray-400 text-sm">Developer Aktif</div>
					</div>
					<div class="text-center">
						<div class="text-3xl font-bold text-purple-400 mb-2">24/7</div>
						<div class="text-gray-400 text-sm">AI Available</div>
					</div>
					<div class="text-center">
						<div class="text-3xl font-bold text-pink-400 mb-2">100%</div>
						<div class="text-gray-400 text-sm">Gratis</div>
					</div>
					<div class="text-center">
						<div class="text-3xl font-bold text-green-400 mb-2">5ms</div>
						<div class="text-gray-400 text-sm">Response Time</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Features Section -->
	<section class="py-20">
		<div class="container mx-auto px-4 sm:px-6 lg:px-8">
			<div class="text-center mb-16">
				<h2 class="text-3xl sm:text-4xl font-bold text-white mb-4">
					Kenapa Pilih <span class="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">ByteJump AI</span>?
				</h2>
				<p class="text-gray-400 text-lg max-w-2xl mx-auto">
					Kolaborasi terbaik antara komunitas developer Indonesia dengan teknologi AI terdepan
				</p>
			</div>

			<div class="grid md:grid-cols-3 gap-8 mb-16">
				{#each features as feature, index}
					<Card class="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-all duration-300 hover:scale-105 text-center" >
						<div class="mb-6">
							<div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto">
								<svelte:component this={feature.icon} class="w-8 h-8 text-white" />
							</div>
						</div>
						<h3 class="text-xl font-bold text-white mb-4">{feature.title}</h3>
						<p class="text-gray-400 leading-relaxed">{feature.description}</p>
					</Card>
				{/each}
			</div>
		</div>
	</section>

	<!-- Benefits Section -->
	<section class="py-20 bg-gradient-to-r from-blue-900/10 to-purple-900/10">
		<div class="container mx-auto px-4 sm:px-6 lg:px-8">
			<div class="grid lg:grid-cols-2 gap-12 items-center">
				<div>
					<h2 class="text-3xl sm:text-4xl font-bold text-white mb-6">
						Tingkatkan Produktivitas Coding Anda
					</h2>
					<p class="text-gray-400 text-lg mb-8">
						Dengan ByteJump AI, Anda bisa fokus pada hal yang penting - membangun aplikasi yang luar biasa. 
						Biarkan AI membantu Anda dengan task-task repetitif dan problem solving.
					</p>
					
					<div class="space-y-4 mb-8">
						{#each benefits as benefit}
							<div class="flex items-center gap-3">
								<CheckCircleOutline class="w-5 h-5 text-green-400 flex-shrink-0" />
								<span class="text-gray-300">{benefit}</span>
							</div>
						{/each}
					</div>

					<Button 
						href="/dashboard" 
						size="lg"
						class="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold border-0"
					>
						<RocketOutline class="w-5 h-5 mr-2" />
						Mulai Sekarang
					</Button>
				</div>

				<div class="relative">
					<!-- AI Chat Demo Mockup -->
					<Card class="bg-gray-800 border-gray-700 max-w-md mx-auto" >
						<div class="space-y-4">
							<div class="flex items-center gap-3 mb-4">
								<div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
									<span class="text-white text-sm font-bold">AI</span>
								</div>
								<span class="text-white font-medium">ByteJump AI Assistant</span>
								<div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
							</div>
							
							<!-- Chat Messages -->
							<div class="space-y-3">
								<div class="bg-gray-700 rounded-lg p-3 ml-8">
									<p class="text-gray-300 text-sm">Halo! Saya ByteJump AI. Ada yang bisa saya bantu dengan coding Anda hari ini?</p>
								</div>
								<div class="bg-blue-600 rounded-lg p-3 mr-8 text-right">
									<p class="text-white text-sm">Bisa bantu debug error React ini?</p>
								</div>
								<div class="bg-gray-700 rounded-lg p-3 ml-8">
									<p class="text-gray-300 text-sm">Tentu! Coba share code error-nya, saya akan bantu analisis dan berikan solusinya 🚀</p>
								</div>
							</div>
						</div>
					</Card>
				</div>
			</div>
		</div>
	</section>

	<!-- Testimonials Section -->
	<section class="py-20">
		<div class="container mx-auto px-4 sm:px-6 lg:px-8">
			<div class="text-center mb-16">
				<h2 class="text-3xl sm:text-4xl font-bold text-white mb-4">
					Apa Kata <span class="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Developer</span>?
				</h2>
				<p class="text-gray-400 text-lg">Ribuan developer Indonesia sudah merasakan manfaatnya</p>
			</div>

			<div class="grid md:grid-cols-3 gap-8">
				{#each testimonials as testimonial}
					<Card class="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-all duration-300" >
						<div class="mb-4">
							<p class="text-gray-300 italic">"{testimonial.message}"</p>
						</div>
						<div class="flex items-center gap-3">
							<div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
								<span class="text-white font-bold text-sm">{testimonial.name.charAt(0)}</span>
							</div>
							<div>
								<div class="text-white font-medium">{testimonial.name}</div>
								<div class="text-gray-400 text-sm">{testimonial.role}</div>
							</div>
						</div>
					</Card>
				{/each}
			</div>
		</div>
	</section>

	<!-- CTA Section -->
	<section class="py-20 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
		<div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
			<h2 class="text-3xl sm:text-4xl font-bold text-white mb-6">
				Siap Tingkatkan Skill Programming Anda?
			</h2>
			<p class="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
				Bergabunglah dengan ribuan developer Indonesia yang sudah merasakan manfaat ByteJump AI. 
				Mulai chat dengan AI sekarang, gratis!
			</p>
			
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<Button 
					href="/dashboard" 
					size="xl"
					class="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 border-0"
				>
					<BarsOutline class="w-5 h-5 mr-2" />
					Mulai Chat dengan AI
					<ArrowRightOutline class="w-5 h-5 ml-2" />
				</Button>
				<Button 
					href="/post" 
					size="xl"
					color="purple"
					class="bg-transparent border-2 border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white font-bold px-8 py-4 text-lg transition-all duration-300"
				>
					Pelajari Lebih Lanjut
				</Button>
			</div>
		</div>
	</section>
</div>

<Footer />

<style>
	:global(body) {
		background-color: #111827;
	}

	.bg-dot-pattern {
		background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
	}

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

	.animate-fade-in-up {
		animation: fade-in-up 0.6s ease-out forwards;
	}

	.delay-200 {
		animation-delay: 0.2s;
	}

	.delay-400 {
		animation-delay: 0.4s;
	}

	.delay-600 {
		animation-delay: 0.6s;
	}

	.delay-800 {
		animation-delay: 0.8s;
	}

	/* Ensure hover effects work properly */
	.hover\:bg-gray-750:hover {
		background-color: #374151;
	}
</style>