// ========================================================
// OG FITNESS - CENTRALIZED MODERN 3D NAV & FOOTER COMPONENT
// ========================================================

document.addEventListener("DOMContentLoaded", function () {
    const currentPath = window.location.pathname.split("/").pop() || "index.html";

    function navClass(pageName) {
        const isActive = (currentPath === pageName) || (pageName === 'index.html' && (currentPath === '' || currentPath === '/'));
        return isActive 
            ? 'text-white font-black border-b-2 border-brand pb-1 text-glow-red' 
            : 'text-zinc-400 hover:text-white hover:border-b-2 hover:border-zinc-700 pb-1 transition duration-200';
    }

    // 1. Centralized Navbar & Mobile Drawer HTML
    const navbarHTML = `
    <!-- Top Micro Announcement / VIP Banner Bar -->
    <div class="bg-gradient-to-r from-red-950 via-zinc-950 to-red-950 border-b border-red-900/40 text-white text-[11px] py-1.5 px-4 tracking-wider uppercase font-mono-tech flex items-center justify-between relative z-50">
        <div class="max-w-7xl mx-auto w-full flex items-center justify-between gap-4">
            <div class="flex items-center space-x-3">
                <span class="bg-brand text-white font-black text-[9px] px-2 py-0.5 tracking-widest animate-pulse">WINTER ARC</span>
                <span class="hidden sm:inline text-zinc-300">ANNUAL DUAL ADVANTAGE: PAY 6 MONTHS, GET 6 MONTHS FREE</span>
                <span class="sm:hidden text-zinc-300 text-[10px]">PAY 6 MO & GET 6 MO FREE ACCESS</span>
            </div>
            <div class="flex items-center space-x-4">
                <div class="live-arena-status hidden md:inline-flex items-center gap-1.5 text-[10px]"></div>
                <a href="membership.html" class="text-brand hover:text-white font-black text-[10px] tracking-widest underline decoration-brand underline-offset-4">
                    CLAIM ₹15,000 PASS &rarr;
                </a>
            </div>
        </div>
    </div>

    <!-- Main Floating Glass Header -->
    <header class="fixed top-8 left-0 right-0 z-40 bg-black/80 backdrop-blur-xl border-b border-white/10 transition-all duration-300">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
            <!-- Brand Logo -->
            <a href="index.html" class="flex items-center group py-2">
                <img src="og-logo-main.png" alt="OG Fitness" class="h-9 md:h-11 w-auto transition-transform duration-300 group-hover:scale-105 filter drop-shadow-[0_0_15px_rgba(255,30,39,0.35)]">
            </a>
            
            <!-- Desktop Nav Links -->
            <div class="flex items-center space-x-7">
                <nav class="hidden lg:flex items-center space-x-7 text-xs font-bold tracking-widest uppercase">
                    <a href="index.html" class="${navClass('index.html')}">Arena</a>
                    <a href="about.html" class="${navClass('about.html')}">Genesis</a>
                    <a href="training.html" class="${navClass('training.html')}">Programs</a>
                    <a href="trainers.html" class="${navClass('trainers.html')}">Syndicate</a>
                    <a href="membership.html" class="${navClass('membership.html')}">Tiers & Passes</a>
                    <a href="contact.html" class="${navClass('contact.html')}">Base & Contact</a>
                </nav>

                <!-- Audio SFX Toggle Button -->
                <button class="sound-toggle-btn border border-zinc-800 bg-zinc-950/80 hover:border-zinc-600 text-zinc-400 hover:text-white text-[11px] font-mono-tech px-3 py-1.5 rounded transition flex items-center gap-1.5" title="Toggle Hype Gym SFX">
                    <i class="fa-solid fa-volume-xmark text-zinc-500"></i>
                    <span class="hidden sm:inline">SFX: OFF</span>
                </button>

                <!-- Free Trial Pass Action Button -->
                <a href="freepass.html" class="hidden sm:inline-flex items-center gap-2 bg-brand hover:bg-red-700 text-white font-black px-5 py-2.5 uppercase tracking-widest text-xs transition duration-300 shadow-[0_0_25px_rgba(255,30,39,0.45)] group">
                    <span>Trial Pass</span>
                    <i class="fa-solid fa-arrow-right text-[10px] transform group-hover:translate-x-1 transition"></i>
                </a>

                <!-- Mobile Menu Button -->
                <button id="mobile-menu-open-btn" class="lg:hidden text-zinc-300 hover:text-white focus:outline-none p-2 border border-zinc-800 bg-zinc-900/60" aria-label="Open Navigation">
                    <i class="fa-solid fa-bars-staggered text-xl text-brand"></i>
                </button>
            </div>
        </div>
    </header>

    <!-- Mobile Drawer Overlay -->
    <div id="side-menu-overlay" class="fixed inset-0 bg-black/85 backdrop-blur-md z-50 opacity-0 pointer-events-none transition-opacity duration-300 lg:hidden"></div>

    <!-- Mobile Drawer Sidebar -->
    <aside id="side-menu" class="fixed top-0 right-0 h-full w-4/5 max-w-sm bg-zinc-950 border-l border-zinc-800 z-50 transform translate-x-full transition-transform duration-300 ease-in-out lg:hidden flex flex-col justify-between p-6">
        <div>
            <!-- Mobile Header -->
            <div class="flex items-center justify-between pb-6 border-b border-zinc-900">
                <img src="og-logo-main.png" alt="OG Fitness" class="h-8 w-auto">
                <button id="mobile-menu-close-btn" class="text-zinc-400 hover:text-white p-2 border border-zinc-800" aria-label="Close Navigation">
                    <i class="fa-solid fa-xmark text-xl"></i>
                </button>
            </div>

            <!-- Live Status in Mobile -->
            <div class="py-4 border-b border-zinc-900">
                <div class="live-arena-status text-xs"></div>
            </div>

            <!-- Mobile Navigation Links -->
            <nav class="flex flex-col space-y-5 pt-6 text-sm font-black tracking-widest uppercase">
                <a href="index.html" class="${navClass('index.html')} flex items-center justify-between">
                    <span>Home Arena</span>
                    <i class="fa-solid fa-angle-right text-xs text-brand"></i>
                </a>
                <a href="about.html" class="${navClass('about.html')} flex items-center justify-between">
                    <span>About Genesis</span>
                    <i class="fa-solid fa-angle-right text-xs text-brand"></i>
                </a>
                <a href="training.html" class="${navClass('training.html')} flex items-center justify-between">
                    <span>Training Programs</span>
                    <i class="fa-solid fa-angle-right text-xs text-brand"></i>
                </a>
                <a href="trainers.html" class="${navClass('trainers.html')} flex items-center justify-between">
                    <span>Syndicate Coaches</span>
                    <i class="fa-solid fa-angle-right text-xs text-brand"></i>
                </a>
                <a href="membership.html" class="${navClass('membership.html')} flex items-center justify-between">
                    <span>Membership Tiers</span>
                    <i class="fa-solid fa-angle-right text-xs text-brand"></i>
                </a>
                <a href="contact.html" class="${navClass('contact.html')} flex items-center justify-between">
                    <span>Location & Contact</span>
                    <i class="fa-solid fa-angle-right text-xs text-brand"></i>
                </a>
            </nav>
        </div>

        <!-- Mobile Drawer Bottom Actions -->
        <div class="pt-6 border-t border-zinc-900 space-y-3">
            <a href="tel:+919553706767" class="flex items-center justify-center gap-2 bg-zinc-900 border border-zinc-800 text-zinc-200 font-bold py-3 text-xs uppercase tracking-wider">
                <i class="fa-solid fa-phone text-brand"></i>
                <span>Call Desk: 095537 06767</span>
            </a>
            <a href="freepass.html" class="block text-center bg-brand hover:bg-red-700 text-white font-black py-3.5 uppercase tracking-widest text-xs transition shadow-lg shadow-red-950/60">
                Claim Free Trial Pass
            </a>
        </div>
    </aside>`;

    // 2. Centralized Modernized Footer HTML
    const footerHTML = `
    <!-- High-Impact Athletic Marquee Separator -->
    <div class="border-t border-b border-zinc-800 bg-zinc-950 py-3 overflow-hidden select-none">
        <div class="marquee-container">
            <div class="marquee-content flex items-center space-x-8 text-xs font-mono-tech font-black uppercase tracking-widest text-zinc-500">
                <span>⚡ THEY CALL HIM OG</span>
                <span class="text-brand">●</span>
                <span>VIJAYAWADA'S PREMIER ARENA</span>
                <span class="text-brand">●</span>
                <span>HEAVYWEIGHT ARSENAL</span>
                <span class="text-brand">●</span>
                <span>MON-SAT 5:00 AM – 10:00 PM</span>
                <span class="text-brand">●</span>
                <span>JOIN THE SYNDICATE</span>
                <span class="text-brand">●</span>
                <span>PAY 6 MONTHS GET 6 MONTHS FREE</span>
                <span class="text-brand">●</span>
                <span>UNCOMPROMISING RAW DISCIPLINE</span>
                <span class="text-brand">●</span>
                <span>⚡ THEY CALL HIM OG</span>
                <span class="text-brand">●</span>
                <span>VIJAYAWADA'S PREMIER ARENA</span>
                <span class="text-brand">●</span>
                <span>HEAVYWEIGHT ARSENAL</span>
                <span class="text-brand">●</span>
                <span>MON-SAT 5:00 AM – 10:00 PM</span>
            </div>
        </div>
    </div>

    <footer class="bg-black border-t border-zinc-900 text-zinc-400 pt-16 pb-12 text-sm relative overflow-hidden">
        <div class="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand/10 rounded-full blur-3xl pointer-events-none"></div>

        <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12 relative z-10">
            <!-- Brand Column -->
            <div class="lg:col-span-2 space-y-5">
                <a href="index.html" class="inline-block">
                    <img src="og-logo-main.png" alt="OG Fitness" class="h-10 w-auto filter drop-shadow-[0_0_12px_rgba(255,30,39,0.3)]">
                </a>
                <p class="text-xs text-zinc-400 leading-relaxed max-w-sm">
                    Uncompromising strength, elite biomechanical machinery, and a relentless iron atmosphere forged for those who rule their domain.
                </p>

                <!-- Socials & Direct Link -->
                <div class="flex items-center space-x-3 pt-2">
                    <a href="https://www.instagram.com/og.fitness___/" target="_blank" class="w-9 h-9 flex items-center justify-center bg-zinc-900 border border-zinc-800 hover:border-brand hover:text-brand transition text-sm" title="Instagram">
                        <i class="fa-brands fa-instagram"></i>
                    </a>
                    <a href="https://maps.app.goo.gl/a91huxmhqriDsu438" target="_blank" class="w-9 h-9 flex items-center justify-center bg-zinc-900 border border-zinc-800 hover:border-brand hover:text-brand transition text-sm" title="Google Maps Base">
                        <i class="fa-solid fa-location-dot"></i>
                    </a>
                    <a href="tel:+919553706767" class="w-9 h-9 flex items-center justify-center bg-zinc-900 border border-zinc-800 hover:border-brand hover:text-brand transition text-sm" title="Call Front Desk">
                        <i class="fa-solid fa-phone"></i>
                    </a>
                    <a href="https://youtube.com" target="_blank" class="w-9 h-9 flex items-center justify-center bg-zinc-900 border border-zinc-800 hover:border-brand hover:text-brand transition text-sm" title="YouTube Channel">
                        <i class="fa-brands fa-youtube"></i>
                    </a>
                </div>
            </div>

            <!-- Quick Navigation -->
            <div>
                <h4 class="text-white font-black uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
                    <span class="w-2 h-2 bg-brand"></span>
                    <span>Navigation</span>
                </h4>
                <ul class="space-y-2.5 text-xs">
                    <li><a href="index.html" class="hover:text-brand transition">Home Arena</a></li>
                    <li><a href="about.html" class="hover:text-brand transition">About Genesis</a></li>
                    <li><a href="training.html" class="hover:text-brand transition">Training Systems</a></li>
                    <li><a href="trainers.html" class="hover:text-brand transition">Syndicate Coaches</a></li>
                    <li><a href="membership.html" class="hover:text-brand transition">Membership Tiers</a></li>
                </ul>
            </div>

            <!-- Client Direct Access -->
            <div>
                <h4 class="text-white font-black uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
                    <span class="w-2 h-2 bg-brand"></span>
                    <span>Athlete Access</span>
                </h4>
                <ul class="space-y-2.5 text-xs">
                    <li><a href="freepass.html" class="hover:text-brand transition">Executive Trial Pass</a></li>
                    <li><a href="membership.html" class="hover:text-brand transition">Dual 6+6 Privilege</a></li>
                    <li><a href="contact.html" class="hover:text-brand transition">Base Location & Pin</a></li>
                    <li><a href="tel:+919553706767" class="hover:text-brand transition">Direct Hotline</a></li>
                </ul>
            </div>

            <!-- Arena Operations -->
            <div class="space-y-3">
                <h4 class="text-white font-black uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
                    <span class="w-2 h-2 bg-brand"></span>
                    <span>Arena Coordinates</span>
                </h4>
                <div class="text-xs text-zinc-400 space-y-1">
                    <p class="font-bold text-white">Mon – Sat:</p>
                    <p class="text-zinc-500 font-mono-tech">5:00 AM – 10:00 PM</p>
                    <p class="font-bold text-white pt-1">Sunday:</p>
                    <p class="text-zinc-500 font-mono-tech">6:00 AM – 12:00 PM</p>
                </div>
                <div class="pt-2">
                    <p class="text-[11px] text-zinc-500">Door No 24-25-60, Durgapuram, BRTS Road, Vijayawada.</p>
                </div>
            </div>
        </div>

        <!-- Sub Footer -->
        <div class="max-w-7xl mx-auto px-6 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
            <p>&copy; 2026 OG Fitness. All Rights Reserved. Engineered for Elite Performance.</p>
            <div class="flex items-center space-x-6 text-[11px] tracking-widest uppercase font-mono-tech">
                <span class="text-brand font-bold">THEY CALL HIM OG</span>
                <span class="text-zinc-700">|</span>
                <span class="text-zinc-400">VIJAYAWADA, AP</span>
            </div>
        </div>
    </footer>`;

    // Inject into placeholders
    const navPlaceholder = document.getElementById('navbar-placeholder');
    const footerPlaceholder = document.getElementById('footer-placeholder');

    if (navPlaceholder) navPlaceholder.innerHTML = navbarHTML;
    if (footerPlaceholder) footerPlaceholder.innerHTML = footerHTML;

    // Mobile menu toggle logic
    const openBtn = document.getElementById('mobile-menu-open-btn');
    const closeBtn = document.getElementById('mobile-menu-close-btn');
    const sideMenu = document.getElementById('side-menu');
    const overlay = document.getElementById('side-menu-overlay');

    if (openBtn && sideMenu && overlay) {
        function toggleMenu(show) {
            if (show) {
                sideMenu.classList.remove('translate-x-full');
                overlay.classList.remove('opacity-0', 'pointer-events-none');
                document.body.classList.add('overflow-hidden');
            } else {
                sideMenu.classList.add('translate-x-full');
                overlay.classList.add('opacity-0', 'pointer-events-none');
                document.body.classList.remove('overflow-hidden');
            }
        }

        openBtn.addEventListener('click', () => toggleMenu(true));
        if (closeBtn) closeBtn.addEventListener('click', () => toggleMenu(false));
        overlay.addEventListener('click', () => toggleMenu(false));
    }
});