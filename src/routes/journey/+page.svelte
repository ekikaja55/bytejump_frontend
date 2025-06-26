<!--/routes/journey/+page.svelte -->
<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
  import Navbar from '$lib/components/Navbar.svelte';
import { onMount } from 'svelte';
  
  let mounted = false;
  
  onMount(() => {
    mounted = true;
  });

  const timelineData = [
    {
      date: "Januari 2023",
      title: "ByteSpace Dilahirkan",
      description: "Rizki Arkant Pratama mendirikan ByteSpace sebagai komunitas belajar untuk developer Indonesia. Dimulai dengan workshop coding gratis dan sharing session mingguan.",
      side: "left"
    },
    {
      date: "Maret 2023", 
      title: "Tim Inti Terbentuk",
      description: "Fabian Kurniawan Limanto bergabung sebagai backend specialist, memperkuat infrastruktur teknis ByteSpace dan mengembangkan platform pembelajaran online.",
      side: "right"
    },
    {
      date: "Juli 2023",
      title: "Ekspansi Komunitas",
      description: "Alexander Rico Wong bergabung sebagai AI consultant. ByteSpace berkembang menjadi 500+ member aktif dengan berbagai program mentoring dan bootcamp.",
      side: "left"
    },
    {
      date: "November 2023",
      title: "Platform Learning Management",
      description: "Peluncuran LMS ByteSpace yang memungkinkan member mengakses course, track progress, dan berinteraksi dalam forum diskusi internal.",
      side: "right"
    },
    {
      date: "Februari 2024",
      title: "Partnership & Kolaborasi",
      description: "ByteSpace menjalin kerjasama dengan berbagai startup dan perusahaan tech untuk menyediakan program magang dan job placement bagi member.",
      side: "left"
    },
    {
      date: "Juni 2024",
      title: "Ide ByteJump Muncul",
      description: "Berdasarkan feedback komunitas, tim mulai mengembangkan konsep platform yang lebih luas - menggabungkan news, wiki, dan forum untuk developer Indonesia.",
      side: "right"
    },
    {
      date: "September 2024",
      title: "Development ByteJump",
      description: "Pengembangan intensif ByteJump dimulai. Platform dirancang dengan arsitektur scalable dan fitur-fitur modern seperti real-time discussion dan AI-powered recommendations.",
      side: "left"
    },
    {
      date: "Januari 2025",
      title: "ByteJump Beta Launch",
      description: "Soft launch ByteJump untuk member ByteSpace. Feedback positif mendorong tim untuk melakukan persiapan public launch dengan fitur yang lebih lengkap.",
      side: "right"
    },
    {
      date: "Maret 2025",
      title: "ByteJump Goes Public",
      description: "ByteJump resmi diluncurkan untuk publik sebagai platform terintegrasi untuk developer Indonesia - menggabungkan latest tech news, comprehensive wiki, dan vibrant community forum.",
      side: "left"
    }
  ];

  const teamMembers = [
    {
      name: "Rizki Arkant Pratama",
      role: "Founder ByteJump & ByteSpace",
      description: "Fullstack Developer dengan passion dalam membangun komunitas. Sebagai tenaga pengajar ByteSpace, Rizki telah membantu ratusan developer pemula memulai karir mereka di tech industry.",
      image: "/foto1.jpg",
      specialties: ["Community Building", "Full-stack Development", "Technical Education"]
    },
    {
      name: "Fabian Kurniawan Limanto", 
      role: "Backend Specialist & Security Consultant",
      description: "Expert dalam backend architecture dan web security. Fabian bertanggung jawab memastikan platform ByteJump aman, scalable, dan performant untuk melayani ribuan developer.",
      image: "/foto2.jpg",
      specialties: ["Backend Development", "Web Security", "System Architecture"]
    },
    {
      name: "Alexander Rico Wong",
      role: "AI Consultant & Frontend Specialist", 
      description: "Menggabungkan expertise dalam AI dan frontend development untuk menciptakan user experience yang intelligent dan intuitive di platform ByteJump.",
      image: "/foto3.jpg",
      specialties: ["Artificial Intelligence", "Frontend Development", "UX Engineering"]
    }
  ];
</script>

<!-- Hero Section -->
 <Navbar />
<section class="py-16 px-4 ">
  <div class="max-w-6xl mx-auto text-center mt-[20vh]">
    <h1 class="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
      Our Journey
    </h1>
    <p class="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
      Dari komunitas kecil ByteSpace hingga menjadi platform ByteJump yang menghubungkan developer Indonesia. 
      Inilah perjalanan kami membangun ekosistem pembelajaran dan kolaborasi yang berkelanjutan.
    </p>
  </div>
</section>

<!-- Timeline Section -->
<section class="py-16 px-4">
  <div class="max-w-6xl mx-auto">
    <h2 class="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
      Timeline Perjalanan
    </h2>
    
    <div class="relative">
      <!-- Timeline Line -->
      <div class="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-400 to-purple-400 h-full rounded-full hidden md:block"></div>
      
      <!-- Timeline Items -->
      <div class="space-y-8 md:space-y-12">
        {#each timelineData as item, index}
          <div class="flex flex-col md:flex-row items-center {item.side === 'right' ? 'md:flex-row-reverse' : ''}">
            <!-- Timeline Dot -->
            <div class="flex-shrink-0 w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full z-10 hidden md:block"></div>
            
            <!-- Content -->
            <div class="w-full md:w-5/12 {item.side === 'left' ? 'md:pr-8 md:text-right' : 'md:pl-8'}">
              <div class="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:transform hover:-translate-y-1">
                <h3 class="text-2xl font-bold text-blue-400 mb-3">{item.date}</h3>
                <h4 class="text-xl font-semibold text-white mb-3">{item.title}</h4>
                <p class="text-gray-300 leading-relaxed">{item.description}</p>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>

<!-- Team Section -->
<section class="py-16 px-4">
  <div class="max-w-6xl mx-auto">
    <h2 class="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
      Tim di Balik ByteJump
    </h2>
    <p class="text-gray-300 text-center mb-16 max-w-3xl mx-auto">
      Meet the passionate individuals who transformed a simple idea into a thriving platform for the Indonesian developer community.
    </p>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each teamMembers as member, index}
        <div class="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:transform hover:-translate-y-2">
          <!-- Profile Image -->
          <div class="aspect-w-3 aspect-h-3 bg-gray-700">
            <img src={member.image} alt={member.name} class="w-full h-64 object-cover" />
          </div>
          
          <!-- Content -->
          <div class="p-6">
            <h3 class="text-2xl font-bold text-white mb-2">{member.name}</h3>
            <p class="text-blue-400 font-semibold mb-4">{member.role}</p>
            <p class="text-gray-300 leading-relaxed mb-4">{member.description}</p>
            
            <!-- Specialties -->
            <div class="flex flex-wrap gap-2">
              {#each member.specialties as specialty}
                <span class="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium">
                  {specialty}
                </span>
              {/each}
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- Vision Section -->
<section class="py-16 px-4">
  <div class="max-w-4xl mx-auto">
    <div class="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-8 md:p-12 border border-blue-500/20">
      <h2 class="text-3xl md:text-4xl font-bold text-center mb-6 text-white">
        Visi Ke Depan
      </h2>
      <p class="text-gray-300 text-center text-lg leading-relaxed mb-8">
        ByteJump bukan hanya platform, tapi ekosistem lengkap untuk developer Indonesia. 
        Kami berkomitmen terus berinovasi dan menghadirkan fitur-fitur yang mendukung pertumbuhan 
        komunitas tech Indonesia ke level internasional.
      </p>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div class="p-4">
          <div class="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
            10K+
          </div>
          <p class="text-gray-300">Target Active Users 2025</p>
        </div>
        <div class="p-4">
          <div class="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
            50+
          </div>
          <p class="text-gray-300">Companies Partnership</p>
        </div>
        <div class="p-4">
          <div class="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
            24/7
          </div>
          <p class="text-gray-300">Community Support</p>
        </div>
      </div>
    </div>
  </div>
</section>
<Footer/>
<style>
  :global(body) {
    background-color: #111827;
    font-family: 'Inter', sans-serif;
  }
  
  .aspect-w-3 {
    position: relative;
    width: 100%;
    padding-bottom: 75%;
  }
  
  .aspect-h-3 img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>