// ========================================================
// OG FITNESS - PREMIUM CORE INTERACTIVITY & AUDIO SYNTH
// ========================================================

// 1. Procedural Audio Synthesizer (Zero External MP3s Needed)
class OGSoundEngine {
    constructor() {
        this.ctx = null;
        this.enabled = localStorage.getItem('og_sound_enabled') === 'true';
    }

    init() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioContext();
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    toggle() {
        this.enabled = !this.enabled;
        localStorage.setItem('og_sound_enabled', this.enabled);
        if (this.enabled) {
            this.init();
            this.playBeep(880, 0.08);
        }
        this.updateButtonUI();
        return this.enabled;
    }

    updateButtonUI() {
        const btns = document.querySelectorAll('.sound-toggle-btn');
        btns.forEach(btn => {
            if (this.enabled) {
                btn.innerHTML = `<i class="fa-solid fa-volume-high text-brand"></i> <span class="hidden sm:inline">SFX: ON</span>`;
                btn.classList.add('border-brand', 'text-white');
            } else {
                btn.innerHTML = `<i class="fa-solid fa-volume-xmark text-zinc-500"></i> <span class="hidden sm:inline">SFX: OFF</span>`;
                btn.classList.remove('border-brand', 'text-white');
            }
        });
    }

    playClank() {
        if (!this.enabled) return;
        this.init();
        const now = this.ctx.currentTime;

        // Metal impact fundamental
        const osc1 = this.ctx.createOscillator();
        const osc2 = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc1.type = 'triangle';
        osc1.frequency.setValueAtTime(320, now);
        osc1.frequency.exponentialRampToValueAtTime(80, now + 0.15);

        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(940, now);
        osc2.frequency.exponentialRampToValueAtTime(140, now + 0.12);

        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(this.ctx.destination);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 0.22);
        osc2.stop(now + 0.22);
    }

    playWhoosh() {
        if (!this.enabled) return;
        this.init();
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(110, now);
        osc.frequency.exponentialRampToValueAtTime(45, now + 0.35);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.35);
    }

    playBeep(freq = 600, duration = 0.08) {
        if (!this.enabled) return;
        this.init();
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + duration);
    }
}

window.OGSound = new OGSoundEngine();

// ----------------------------------------------------
// 2. 3D Card Hover Perspective with Specular Glare
// ----------------------------------------------------
function init3DTiltCards() {
    const cards = document.querySelectorAll('.tilt-card');
    cards.forEach(card => {
        // Ensure glare element exists
        let glare = card.querySelector('.glare');
        if (!glare) {
            glare = document.createElement('div');
            glare.className = 'glare';
            card.appendChild(glare);
        }

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -9;
            const rotateY = ((x - centerX) / centerX) * 9;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
            glare.style.left = `${x}px`;
            glare.style.top = `${y}px`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
        });
    });
}

// ----------------------------------------------------
// 3. Live Indian Standard Time (IST) Arena Status
// ----------------------------------------------------
function initArenaStatus() {
    const statusBadges = document.querySelectorAll('.live-arena-status');
    if (statusBadges.length === 0) return;

    function update() {
        // Calculate Vijayawada / IST Time (UTC+5:30)
        const now = new Date();
        const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
        const ist = new Date(utc + (3600000 * 5.5));

        const day = ist.getDay(); // 0 is Sunday
        const hours = ist.getHours();
        const minutes = ist.getMinutes();
        const timeVal = hours + minutes / 60;

        let isOpen = false;
        let scheduleText = '';

        if (day === 0) {
            // Sunday: 6:00 AM - 12:00 PM
            isOpen = (timeVal >= 6 && timeVal < 12);
            scheduleText = 'Sun 6 AM – 12 PM';
        } else {
            // Mon - Sat: 5:00 AM - 10:00 PM
            isOpen = (timeVal >= 5 && timeVal < 22);
            scheduleText = 'Mon–Sat 5 AM – 10 PM';
        }

        statusBadges.forEach(badge => {
            if (isOpen) {
                badge.innerHTML = `
                    <span class="inline-flex items-center gap-1.5 text-emerald-400 font-bold">
                        <span class="relative flex h-2 w-2">
                            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span>ARENA ACTIVE NOW</span>
                    </span>
                    <span class="text-zinc-500 text-[10px]">(${scheduleText})</span>
                `;
            } else {
                badge.innerHTML = `
                    <span class="inline-flex items-center gap-1.5 text-amber-400 font-bold">
                        <span class="h-2 w-2 rounded-full bg-amber-400"></span>
                        <span>ARENA CLOSED</span>
                    </span>
                    <span class="text-zinc-500 text-[10px]">(Opens 5:00 AM)</span>
                `;
            }
        });
    }

    update();
    setInterval(update, 60000);
}

// ----------------------------------------------------
// 4. Interactive 1RM Strength & Transformation Calculator
// ----------------------------------------------------
function initStrengthCalculator() {
    const weightInput = document.getElementById('calc-weight');
    const repsInput = document.getElementById('calc-reps');
    const exerciseSelect = document.getElementById('calc-exercise');

    const weightValDisplay = document.getElementById('calc-weight-val');
    const repsValDisplay = document.getElementById('calc-reps-val');
    const result1RM = document.getElementById('calc-result-1rm');
    const resultTier = document.getElementById('calc-result-tier');
    const resultBurn = document.getElementById('calc-result-burn');
    const resultSplit = document.getElementById('calc-result-split');
    const progressBar = document.getElementById('calc-tier-progress');

    if (!weightInput || !repsInput) return;

    function calculate() {
        const weight = parseFloat(weightInput.value);
        const reps = parseInt(repsInput.value);
        const exercise = exerciseSelect ? exerciseSelect.value : 'bench';

        if (weightValDisplay) weightValDisplay.textContent = `${weight} KG`;
        if (repsValDisplay) repsValDisplay.textContent = `${reps} REPS`;

        // Brzycki formula: 1RM = Weight / (1.0278 - (0.0278 * Reps))
        let oneRepMax = weight / (1.0278 - (0.0278 * reps));
        if (reps === 1) oneRepMax = weight;
        oneRepMax = Math.round(oneRepMax);

        if (result1RM) result1RM.textContent = `${oneRepMax} KG`;

        // Tier classification based on 1RM and exercise
        let tier = 'NOVICE ATHLETE';
        let tierColor = 'text-zinc-400';
        let progressPercent = 30;
        let burnEst = Math.round(weight * reps * 0.45 + 180);

        if (exercise === 'deadlift' || exercise === 'squat') {
            if (oneRepMax >= 200) {
                tier = '⚡ SYNDICATE TITAN (ELITE)';
                tierColor = 'text-brand';
                progressPercent = 100;
            } else if (oneRepMax >= 150) {
                tier = '🔥 HEAVYWEIGHT DIVISION';
                tierColor = 'text-amber-400';
                progressPercent = 78;
            } else if (oneRepMax >= 100) {
                tier = '💪 ADVANCED OPERATOR';
                tierColor = 'text-emerald-400';
                progressPercent = 55;
            } else {
                tier = '⚡ RISING BEAST';
                tierColor = 'text-zinc-300';
                progressPercent = 35;
            }
        } else {
            // Bench / OHP
            if (oneRepMax >= 140) {
                tier = '⚡ SYNDICATE TITAN (ELITE)';
                tierColor = 'text-brand';
                progressPercent = 100;
            } else if (oneRepMax >= 100) {
                tier = '🔥 HEAVYWEIGHT DIVISION';
                tierColor = 'text-amber-400';
                progressPercent = 80;
            } else if (oneRepMax >= 70) {
                tier = '💪 ADVANCED OPERATOR';
                tierColor = 'text-emerald-400';
                progressPercent = 55;
            } else {
                tier = '⚡ RISING BEAST';
                tierColor = 'text-zinc-300';
                progressPercent = 35;
            }
        }

        if (resultTier) {
            resultTier.textContent = tier;
            resultTier.className = `text-sm font-black uppercase italic ${tierColor}`;
        }
        if (resultBurn) resultBurn.textContent = `~${burnEst} kcal / 45m`;
        if (progressBar) progressBar.style.width = `${progressPercent}%`;

        if (resultSplit) {
            if (reps <= 5) {
                resultSplit.textContent = 'OG Power & Compound Hypertrophy (3-Day Heavy Split)';
            } else if (reps <= 10) {
                resultSplit.textContent = 'OG Mass Builder & Strength Conditioning (4-Day Push/Pull/Legs)';
            } else {
                resultSplit.textContent = 'OG Metabolic Shred & High Density Circuit (5-Day Shred)';
            }
        }
    }

    weightInput.addEventListener('input', () => {
        calculate();
        window.OGSound.playBeep(450, 0.03);
    });

    repsInput.addEventListener('input', () => {
        calculate();
        window.OGSound.playBeep(520, 0.03);
    });

    if (exerciseSelect) {
        exerciseSelect.addEventListener('change', () => {
            calculate();
            window.OGSound.playClank();
        });
    }

    calculate();
}

// ----------------------------------------------------
// 5. Interactive 3D Virtual VIP Pass Hologram Preview
// ----------------------------------------------------
function initHolographicPass() {
    const nameInput = document.getElementById('preview-pass-name');
    const cardName = document.getElementById('holo-card-name');
    const cardId = document.getElementById('holo-card-id');
    const cardElement = document.getElementById('holo-pass-card');

    if (!cardElement) return;

    // Generate random member ID if not set
    if (cardId && !cardId.textContent.trim()) {
        const rand = Math.floor(1000 + Math.random() * 9000);
        cardId.textContent = `OG-2026-${rand}`;
    }

    if (nameInput && cardName) {
        nameInput.addEventListener('input', (e) => {
            const val = e.target.value.trim();
            cardName.textContent = val.length > 0 ? val.toUpperCase() : 'YOUR NAME HERE';
            window.OGSound.playBeep(700, 0.02);
        });
    }

    // 3D Parallax tilt on the holographic pass
    cardElement.addEventListener('mousemove', (e) => {
        const rect = cardElement.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotX = ((y - centerY) / centerY) * -14;
        const rotY = ((x - centerX) / centerX) * 14;

        cardElement.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.03, 1.03, 1.03)`;
    });

    cardElement.addEventListener('mouseleave', () => {
        cardElement.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
}

// ----------------------------------------------------
// 6. Interactive Training Zone Explorer
// ----------------------------------------------------
const ZONE_DATA = {
    freeweights: {
        title: "Olympic Barbell & Heavy Iron Arena",
        subtitle: "Uncompromising Free Weights Up To 50KG",
        desc: "Engineered for pure mechanical power. Includes calibrated Olympic steel bars, deadlift drop platforms with sound-absorbing shock rubber, and commercial dumbbell tiers spanning from 2.5kg to 50kg.",
        stats: [
            { label: "Dumbbells", value: "2.5kg – 50kg" },
            { label: "Olympic Racks", value: "6 Power Cages" },
            { label: "Platform", value: "Impact Deadlift Mats" }
        ],
        image: "og-equipment.webp",
        tag: "RAW STRENGTH"
    },
    combat: {
        title: "The Combat & Functional Turf",
        subtitle: "Striking, Agility & Core Conditioning",
        desc: "Equipped with heavy striking punching bags, Muay Thai kicking shields, speed ropes, and high-traction sled sprint turf for unstoppable cardiovascular conditioning and fight stamina.",
        stats: [
            { label: "Heavy Bags", value: "6ft Tear-Drop & Pro Bags" },
            { label: "Turf Track", value: "25-Meter Sprint Sled" },
            { label: "Gear", value: "Kettlebells & Plyo Boxes" }
        ],
        image: "og-artwork.webp",
        tag: "COMBAT CONDITIONING"
    },
    machines: {
        title: "Iso-Lateral Machinery Arsenal",
        subtitle: "Pinpoint Muscle Isolation & Hypertrophy",
        desc: "Precision plate-loaded leverage machines designed to match human biomechanics without joint strain. Hammer strength chest presses, leg presses, dual cable crossovers, and hack squats.",
        stats: [
            { label: "Machinery", value: "Commercial Iso-Lateral" },
            { label: "Cable Systems", value: "Dual Stack & Low Row" },
            { label: "Safety", value: "Fail-Safe Spotter Catches" }
        ],
        image: "og-equipment.webp",
        tag: "HYPERTROPHY FOCUS"
    },
    cardio: {
        title: "High-End Turbo Cardio Suite",
        subtitle: "Max Output Calorie Scorcher",
        desc: "Pre-programmed HIIT treadmills, Assault AirBikes, Concept2 rowers, and stair climbers designed to push aerobic VO2 max into overdrive and accelerate rapid shredding.",
        stats: [
            { label: "AirBikes", value: "High-Resistance Fan" },
            { label: "Concept2", value: "RowErg & SkiErg" },
            { label: "Treadmills", value: "Curved Speed Slats" }
        ],
        image: "image.jpg",
        tag: "METABOLIC SHRED"
    }
};

function initZoneExplorer() {
    const tabs = document.querySelectorAll('.zone-tab-btn');
    const titleEl = document.getElementById('zone-title');
    const subtitleEl = document.getElementById('zone-subtitle');
    const descEl = document.getElementById('zone-desc');
    const imgEl = document.getElementById('zone-img');
    const tagEl = document.getElementById('zone-tag');
    const statsContainer = document.getElementById('zone-stats');

    if (!titleEl || tabs.length === 0) return;

    window.switchZone = function(zoneKey) {
        const data = ZONE_DATA[zoneKey];
        if (!data) return;

        tabs.forEach(btn => {
            const isTarget = btn.getAttribute('data-zone') === zoneKey;
            btn.classList.toggle('bg-brand', isTarget);
            btn.classList.toggle('text-white', isTarget);
            btn.classList.toggle('border-brand', isTarget);
            btn.classList.toggle('bg-zinc-950', !isTarget);
            btn.classList.toggle('text-zinc-400', !isTarget);
            btn.classList.toggle('border-zinc-800', !isTarget);
        });

        if (titleEl) titleEl.textContent = data.title;
        if (subtitleEl) subtitleEl.textContent = data.subtitle;
        if (descEl) descEl.textContent = data.desc;
        if (tagEl) tagEl.textContent = data.tag;
        if (imgEl) {
            imgEl.style.opacity = '0';
            setTimeout(() => {
                imgEl.src = data.image;
                imgEl.style.opacity = '1';
            }, 180);
        }

        if (statsContainer && data.stats) {
            statsContainer.innerHTML = data.stats.map(s => `
                <div class="bg-zinc-900/80 border border-zinc-800 p-3.5">
                    <p class="text-[10px] uppercase tracking-widest text-zinc-500 mb-0.5">${s.label}</p>
                    <p class="text-sm font-black text-white italic">${s.value}</p>
                </div>
            `).join('');
        }

        window.OGSound.playClank();
    };

    tabs.forEach(btn => {
        btn.addEventListener('click', () => {
            const zoneKey = btn.getAttribute('data-zone');
            window.switchZone(zoneKey);
        });
    });
}

// ----------------------------------------------------
// 7. Limited VIP 6+6 Offer Countdown Timer
// ----------------------------------------------------
function initOfferCountdown() {
    const daysEl = document.getElementById('countdown-days');
    const hoursEl = document.getElementById('countdown-hours');
    const minsEl = document.getElementById('countdown-mins');
    const secsEl = document.getElementById('countdown-secs');

    if (!daysEl) return;

    // Set end date to end of current week or +4 days rolling
    let target = localStorage.getItem('og_offer_deadline');
    if (!target) {
        const d = new Date();
        d.setDate(d.getDate() + 4);
        d.setHours(23, 59, 59, 0);
        target = d.getTime();
        localStorage.setItem('og_offer_deadline', target);
    } else {
        target = parseInt(target);
        if (Date.now() > target) {
            const d = new Date();
            d.setDate(d.getDate() + 3);
            target = d.getTime();
            localStorage.setItem('og_offer_deadline', target);
        }
    }

    function tick() {
        const now = Date.now();
        const diff = Math.max(0, target - now);

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const mins = Math.floor((diff / (1000 * 60)) % 60);
        const secs = Math.floor((diff / 1000) % 60);

        if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minsEl) minsEl.textContent = String(mins).padStart(2, '0');
        if (secsEl) secsEl.textContent = String(secs).padStart(2, '0');
    }

    tick();
    setInterval(tick, 1000);
}

// ----------------------------------------------------
// 8. FAQ Interactive Accordion
// ----------------------------------------------------
function initAccordion() {
    const toggles = document.querySelectorAll('.faq-toggle');
    toggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const content = toggle.nextElementSibling;
            const icon = toggle.querySelector('.faq-icon');
            const isOpen = !content.classList.contains('hidden');

            // Close all
            document.querySelectorAll('.faq-content').forEach(c => c.classList.add('hidden'));
            document.querySelectorAll('.faq-icon').forEach(i => i.style.transform = 'rotate(0deg)');

            if (!isOpen) {
                content.classList.remove('hidden');
                if (icon) icon.style.transform = 'rotate(180deg)';
                window.OGSound.playBeep(500, 0.04);
            }
        });
    });
}

// ----------------------------------------------------
// DOM Ready Orchestrator
// ----------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    init3DTiltCards();
    initArenaStatus();
    initStrengthCalculator();
    initHolographicPass();
    initZoneExplorer();
    initOfferCountdown();
    initAccordion();

    // Hook sound toggle buttons
    document.querySelectorAll('.sound-toggle-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            window.OGSound.toggle();
        });
    });
    window.OGSound.updateButtonUI();
});
