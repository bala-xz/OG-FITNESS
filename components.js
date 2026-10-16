document.addEventListener("DOMContentLoaded", function () {
    // 1. Centralized Navbar & Mobile Drawer HTML
    const navbarHTML = `
    <header class="fixed top-0 left-0 right-0 z-40 bg-black/90 backdrop-blur-md border-b border-zinc-900">
        <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <a href="index.html" class="flex items-center">
                <img src="og-logo-main.png" alt="OG Fitness" class="h-8 md:h-10 w-auto">
            </a>
            
            <div class="flex items-center space-x-8">
                <nav class="hidden md:flex items-center space-x-8 text-sm font-semibold tracking-wider text-zinc-400 uppercase">
                    <a href="index.html" class="hover:text-brand transition">Home</a>
                    <a href="about.html" class="hover:text-brand transition">About</a>
                    <a href="training.html" class="hover:text-brand transition">Training</a>
                    <a href="trainers.html" class="hover:text-brand transition">Coaches</a>
                    <a href="membership.html" class="hover:text-brand transition">Membership</a>
                    <a href="contact.html" class="hover:text-brand transition">Location & Contact</a>
                </nav>
                <a href="freepass.html" class="hidden sm:inline-block bg-brand hover:bg-brand text-white font-black px-6 py-2.5 uppercase tracking-wider text-xs transition shadow-lg shadow-red-950/50">
                    Trial Pass
                </a>

                <button id="mobile-menu-open-btn" class="md:hidden text-zinc-300 hover:text-white focus:outline-none p-2" aria-label="Open Navigation">
                    <i class="fa-solid fa-bars text-2xl"></i>
                </button>
            </div>
        </div>
    </header>

    <div id="side-menu-overlay" class="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 opacity-0 pointer-events-none transition-opacity duration-300 md:hidden"></div>

    <aside id="side-menu" class="fixed top-0 right-0 h-full w-1/2 min-w-[240px] bg-zinc-950 border-l border-zinc-800 z-50 transform translate-x-full transition-transform duration-300 ease-in-out md:hidden flex flex-col justify-between p-6">
        <div>
            <div class="flex items-center justify-between pb-6 border-b border-zinc-900">
                <span class="text-xs font-black uppercase tracking-widest text-brand">OG FITNESS</span>
                <button id="mobile-menu-close-btn" class="text-zinc-400 hover:text-white p-2" aria-label="Close Navigation">
                    <i class="fa-solid fa-xmark text-2xl"></i>
                </button>
            </div>
            <nav class="flex flex-col space-y-5 pt-6 text-sm font-semibold tracking-wider uppercase text-zinc-300">
                <a href="index.html" class="hover:text-brand transition">Home</a>
                <a href="about.html" class="hover:text-brand transition">About</a>
                <a href="training.html" class="hover:text-brand transition">Training</a>
                <a href="trainers.html" class="hover:text-brand transition">Syndicate</a>
                <a href="membership.html" class="hover:text-brand transition">Membership</a>
                <a href="contact.html" class="hover:text-brand transition">Contact</a>
            </nav>
        </div>
        <div class="pt-6 border-t border-zinc-900">
            <a href="freepass.html" class="block text-center bg-brand hover:bg-brand text-white font-black py-3 uppercase tracking-wider text-xs transition shadow-lg shadow-red-950/50">
                Trial Pass
            </a>
        </div>
    </aside>`;

    // 2. Centralized Footer HTML
    const footerHTML = `
    <footer class="bg-black border-t border-zinc-900 text-zinc-400 py-16 text-sm">
        <div class="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12">
            <div class="col-span-2 sm:col-span-1 space-y-4">
                <img src="og-logo-main.png" alt="OG Fitness" class="h-8 w-auto">
                <p class="text-xs text-zinc-500 leading-relaxed">
                    Uncompromising strength, elite conditioning, and a relentless environment built for those who rule their domain.
                </p>
                <div class="flex space-x-4 text-zinc-400">
                    <a href="https://www.instagram.com/og.fitness___/" target="_blank" class="hover:text-brand transition" title="Instagram"><i class="fa-brands fa-instagram text-lg"></i></a>
                    <a href="https://youtube.com" target="_blank" class="hover:text-brand transition" title="YouTube"><i class="fa-brands fa-youtube text-lg"></i></a>
                    <a href="https://maps.app.goo.gl/a91huxmhqriDsu438" target="_blank" class="hover:text-brand transition" title="Google Maps"><i class="fa-solid fa-location-dot text-lg"></i></a>
                    <a href="tel:+9195537 06767" class="hover:text-brand transition" title="Call Front Desk"><i class="fa-solid fa-phone text-lg"></i></a>
                </div>
            </div>

            <div>
                <h4 class="text-white font-black uppercase tracking-widest text-xs mb-4">Navigation</h4>
                <ul class="space-y-2 text-xs">
                    <li><a href="index.html" class="hover:text-brand transition">Home Arena</a></li>
                    <li><a href="training.html" class="hover:text-brand transition">Workouts & Training</a></li>
                    <li><a href="trainers.html" class="hover:text-brand transition">Coaches</a></li>
                    <li><a href="membership.html" class="hover:text-brand transition">Membership </a></li>
                </ul>
            </div>

            <div>
                <h4 class="text-white font-black uppercase tracking-widest text-xs mb-4">Client Access</h4>
                <ul class="space-y-2 text-xs">
                    <li><a href="freepass.html" class="hover:text-brand transition">Claim Trial Pass</a></li>
                    <li><a href="contact.html" class="hover:text-brand transition">Location & Socials</a></li>
                </ul>
            </div>

            <div class="col-span-2 sm:col-span-1">
                <h4 class="text-white font-black uppercase tracking-widest text-xs mb-4">Arena Status</h4>
                <p class="text-xs text-zinc-500 mb-2">Mon – Sat: 5:00 AM – 10:00 PM</p>
                <p class="text-xs text-zinc-500 mb-4">Sun: 6:00 AM – 12:00 PM</p>
                <span class="inline-block bg-red-600/10 border border-red-600/30 text-brand text-[10px] font-bold uppercase tracking-widest px-2.5 py-1">WINTER ARC</span>
            </div>
        </div>

        <div class="max-w-7xl mx-auto px-6 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-600">
            <p>&copy; 2026 OG Fitness. All rights reserved. Designed for elite local performance.</p>
            <p class="mt-2 sm:mt-0 uppercase tracking-widest text-[10px]">They Call Him OG</p>
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