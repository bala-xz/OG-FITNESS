// ========================================================
// OG FITNESS - PREMIUM 3D WEBGL HERO EXPERIENCE (Three.js)
// ========================================================

(function () {
    const canvas = document.getElementById('webgl-hero-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    let scene, camera, renderer;
    let mainGroup = new THREE.Group();
    let currentModelGroup = new THREE.Group();
    let particlesMesh;
    let hudRingsGroup = new THREE.Group();
    let redSpotLight, keyLight, fillLight;

    let models = {
        dumbbell: null,
        kettlebell: null,
        plate: null
    };
    let currentModelType = 'dumbbell';

    let mouseX = 0, mouseY = 0;
    let targetRotX = 0.2, targetRotY = 0.4;
    let currentRotX = 0.2, currentRotY = 0.4;
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let dragVelocity = { x: 0, y: 0 };
    let spinImpulse = 0;
    let isVisible = true;
    let clock = new THREE.Clock();

    function init() {
        // Scene setup
        scene = new THREE.Scene();

        // Camera setup
        const aspect = canvas.clientWidth / canvas.clientHeight;
        camera = new THREE.PerspectiveCamera(42, aspect, 0.1, 100);
        camera.position.set(0, 0, 8.5);

        // Renderer setup
        renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: true,
            powerPreference: 'high-performance'
        });
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.25;

        // Lighting
        setupLighting();

        // Build procedural 3D models
        models.dumbbell = buildHeavyDumbbell();
        models.kettlebell = buildKettlebell();
        models.plate = buildOlympicPlate();

        // Build Particle Ember System
        particlesMesh = buildEmberParticles();
        scene.add(particlesMesh);

        // Build Holographic Tech HUD Rings
        hudRingsGroup = buildHudRings();
        scene.add(hudRingsGroup);

        // Add main model container
        mainGroup.add(currentModelGroup);
        scene.add(mainGroup);

        // Display default model
        switchModel('dumbbell');

        // Event listeners
        setupEventListeners();

        // Intersection observer to pause when off-screen
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                isVisible = entry.isIntersecting;
            });
        }, { threshold: 0.1 });
        observer.observe(canvas);

        // Start render loop
        animate();
    }

    // ----------------------------------------------------
    // Lighting Rig
    // ----------------------------------------------------
    function setupLighting() {
        const ambientLight = new THREE.AmbientLight(0x1a1a24, 1.8);
        scene.add(ambientLight);

        // High intensity white metallic key light
        keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
        keyLight.position.set(6, 8, 7);
        scene.add(keyLight);

        // Cool blue rim light from the back
        fillLight = new THREE.DirectionalLight(0x38bdf8, 1.2);
        fillLight.position.set(-6, -4, -5);
        scene.add(fillLight);

        // Intense dynamic crimson red spotlight tracking cursor
        redSpotLight = new THREE.PointLight(0xff1e27, 4.5, 18, 1.5);
        redSpotLight.position.set(0, 1, 4);
        scene.add(redSpotLight);

        // Warm secondary accent
        const redFill = new THREE.PointLight(0xdc2626, 2.0, 10);
        redFill.position.set(0, -3, 2);
        scene.add(redFill);
    }

    // ----------------------------------------------------
    // Procedural 3D Dumbbell (Heavy Hex Dumbbell)
    // ----------------------------------------------------
    function buildHeavyDumbbell() {
        const group = new THREE.Group();

        // Materials
        const chromeMaterial = new THREE.MeshStandardMaterial({
            color: 0xd4d4d8,
            metalness: 0.95,
            roughness: 0.22,
            envMapIntensity: 1.5
        });

        const darkIronMaterial = new THREE.MeshStandardMaterial({
            color: 0x16161a,
            metalness: 0.85,
            roughness: 0.35,
            flatShading: false
        });

        const redAnodizedMaterial = new THREE.MeshStandardMaterial({
            color: 0xff1e27,
            metalness: 0.75,
            roughness: 0.25
        });

        // 1. Central Knurled Handle
        const handleGeo = new THREE.CylinderGeometry(0.18, 0.18, 2.8, 32);
        const handle = new THREE.Mesh(handleGeo, chromeMaterial);
        handle.rotation.z = Math.PI / 2;
        group.add(handle);

        // Handle grip rings (tactile knurl dividers)
        for (let i = -0.7; i <= 0.7; i += 0.35) {
            if (Math.abs(i) < 0.1) continue;
            const ringGeo = new THREE.TorusGeometry(0.185, 0.012, 16, 32);
            const ring = new THREE.Mesh(ringGeo, redAnodizedMaterial);
            ring.rotation.y = Math.PI / 2;
            ring.position.x = i;
            group.add(ring);
        }

        // 2. Heavy Hex Heads on both ends
        [-1.8, 1.8].forEach((xPos, sideIndex) => {
            // Hexagon head
            const hexHeadGeo = new THREE.CylinderGeometry(1.2, 1.2, 0.8, 6);
            const hexHead = new THREE.Mesh(hexHeadGeo, darkIronMaterial);
            hexHead.rotation.z = Math.PI / 2;
            hexHead.position.x = xPos;
            group.add(hexHead);

            // Outer bevel plate
            const outerCapGeo = new THREE.CylinderGeometry(1.05, 1.15, 0.25, 6);
            const outerCap = new THREE.Mesh(outerCapGeo, darkIronMaterial);
            outerCap.rotation.z = Math.PI / 2;
            outerCap.position.x = xPos + (sideIndex === 0 ? -0.45 : 0.45);
            group.add(outerCap);

            // Red Anodized Accent Ring on Plate Face
            const accentRingGeo = new THREE.TorusGeometry(0.65, 0.04, 16, 6);
            const accentRing = new THREE.Mesh(accentRingGeo, redAnodizedMaterial);
            accentRing.rotation.y = Math.PI / 2;
            accentRing.position.x = xPos + (sideIndex === 0 ? -0.58 : 0.58);
            group.add(accentRing);

            // Center Steel Hub Cap
            const hubCapGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.1, 24);
            const hubCap = new THREE.Mesh(hubCapGeo, chromeMaterial);
            hubCap.rotation.z = Math.PI / 2;
            hubCap.position.x = xPos + (sideIndex === 0 ? -0.59 : 0.59);
            group.add(hubCap);

            // Collar ring next to handle
            const collarGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.2, 32);
            const collar = new THREE.Mesh(collarGeo, redAnodizedMaterial);
            collar.rotation.z = Math.PI / 2;
            collar.position.x = xPos + (sideIndex === 0 ? 0.45 : -0.45);
            group.add(collar);
        });

        group.scale.set(1.15, 1.15, 1.15);
        return group;
    }

    // ----------------------------------------------------
    // Procedural 3D Kettlebell (32KG Competition)
    // ----------------------------------------------------
    function buildKettlebell() {
        const group = new THREE.Group();

        const castIronMat = new THREE.MeshStandardMaterial({
            color: 0x141418,
            metalness: 0.85,
            roughness: 0.38
        });

        const redBandMat = new THREE.MeshStandardMaterial({
            color: 0xff1e27,
            metalness: 0.7,
            roughness: 0.3
        });

        const chromeGripMat = new THREE.MeshStandardMaterial({
            color: 0xe4e4e7,
            metalness: 0.95,
            roughness: 0.2
        });

        // 1. Bell Sphere body
        const bellGeo = new THREE.SphereGeometry(1.35, 36, 36);
        const bell = new THREE.Mesh(bellGeo, castIronMat);
        bell.position.y = -0.3;
        bell.scale.set(1, 0.95, 1);
        group.add(bell);

        // Flattened bottom
        const bottomGeo = new THREE.CylinderGeometry(0.75, 0.75, 0.1, 32);
        const bottom = new THREE.Mesh(bottomGeo, castIronMat);
        bottom.position.y = -1.45;
        group.add(bottom);

        // Red competition band
        const bandGeo = new THREE.TorusGeometry(1.36, 0.06, 16, 48);
        const band = new THREE.Mesh(bandGeo, redBandMat);
        band.rotation.x = Math.PI / 2;
        band.position.y = -0.3;
        group.add(band);

        // 2. Handle arch
        const handleCurve = new THREE.CurvePath();
        const handleTorusGeo = new THREE.TorusGeometry(0.85, 0.16, 24, 36, Math.PI);
        const handle = new THREE.Mesh(handleTorusGeo, chromeGripMat);
        handle.position.y = 1.05;
        group.add(handle);

        // Handle pillars connecting to body
        [-0.85, 0.85].forEach(x => {
            const pillarGeo = new THREE.CylinderGeometry(0.16, 0.22, 0.65, 24);
            const pillar = new THREE.Mesh(pillarGeo, chromeGripMat);
            pillar.position.set(x, 0.8, 0);
            group.add(pillar);

            // Red collar on base of pillars
            const ringCollarGeo = new THREE.TorusGeometry(0.24, 0.04, 16, 24);
            const ringCollar = new THREE.Mesh(ringCollarGeo, redBandMat);
            ringCollar.rotation.x = Math.PI / 2;
            ringCollar.position.set(x, 0.5, 0);
            group.add(ringCollar);
        });

        group.scale.set(1.1, 1.1, 1.1);
        return group;
    }

    // ----------------------------------------------------
    // Procedural 3D Olympic Bumper Plate (25KG)
    // ----------------------------------------------------
    function buildOlympicPlate() {
        const group = new THREE.Group();

        const plateMat = new THREE.MeshStandardMaterial({
            color: 0x111114,
            metalness: 0.8,
            roughness: 0.4
        });

        const redTrimMat = new THREE.MeshStandardMaterial({
            color: 0xff1e27,
            metalness: 0.65,
            roughness: 0.35
        });

        const brassHubMat = new THREE.MeshStandardMaterial({
            color: 0xf59e0b,
            metalness: 0.95,
            roughness: 0.2
        });

        const steelRingMat = new THREE.MeshStandardMaterial({
            color: 0xe4e4e7,
            metalness: 0.95,
            roughness: 0.2
        });

        // Main outer disk
        const outerDiskGeo = new THREE.CylinderGeometry(2.1, 2.1, 0.35, 64);
        const outerDisk = new THREE.Mesh(outerDiskGeo, plateMat);
        outerDisk.rotation.z = Math.PI / 2;
        group.add(outerDisk);

        // Raised outer rim lip
        const outerRimGeo = new THREE.TorusGeometry(2.05, 0.08, 16, 64);
        [-0.18, 0.18].forEach(x => {
            const rim = new THREE.Mesh(outerRimGeo, redTrimMat);
            rim.rotation.y = Math.PI / 2;
            rim.position.x = x;
            group.add(rim);
        });

        // Recessed inner dish
        const innerHubGeo = new THREE.CylinderGeometry(1.2, 1.2, 0.4, 48);
        const innerHub = new THREE.Mesh(innerHubGeo, plateMat);
        innerHub.rotation.z = Math.PI / 2;
        group.add(innerHub);

        // Olympic center steel sleeve insert (50mm bore)
        const centerSleeveGeo = new THREE.CylinderGeometry(0.45, 0.45, 0.42, 32);
        const centerSleeve = new THREE.Mesh(centerSleeveGeo, steelRingMat);
        centerSleeve.rotation.z = Math.PI / 2;
        group.add(centerSleeve);

        // Brass bushing core
        const brassBushingGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.44, 32);
        const brassBushing = new THREE.Mesh(brassBushingGeo, brassHubMat);
        brassBushing.rotation.z = Math.PI / 2;
        group.add(brassBushing);

        // Decorative radial cutouts/ribs
        for (let i = 0; i < 4; i++) {
            const angle = (i * Math.PI) / 2;
            const ribGeo = new THREE.BoxGeometry(0.08, 0.9, 0.4);
            const rib = new THREE.Mesh(ribGeo, redTrimMat);
            rib.position.set(0, Math.cos(angle) * 1.5, Math.sin(angle) * 1.5);
            group.add(rib);
        }

        group.scale.set(1.15, 1.15, 1.15);
        return group;
    }

    // ----------------------------------------------------
    // 3D Fiery Ember Dust Particle System
    // ----------------------------------------------------
    function buildEmberParticles() {
        const particleCount = 220;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const velocities = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);

        const colorRed = new THREE.Color(0xff1e27);
        const colorAmber = new THREE.Color(0xf59e0b);
        const colorDark = new THREE.Color(0xef4444);

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            positions[i3] = (Math.random() - 0.5) * 10;
            positions[i3 + 1] = (Math.random() - 0.5) * 8 - 1;
            positions[i3 + 2] = (Math.random() - 0.5) * 6;

            velocities[i3] = (Math.random() - 0.5) * 0.015;
            velocities[i3 + 1] = Math.random() * 0.025 + 0.008; // upward float
            velocities[i3 + 2] = (Math.random() - 0.5) * 0.015;

            // Pick particle color
            const chosen = Math.random() > 0.4 ? colorRed : (Math.random() > 0.5 ? colorAmber : colorDark);
            colors[i3] = chosen.r;
            colors[i3 + 1] = chosen.g;
            colors[i3 + 2] = chosen.b;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        // Create glowing circular particle texture
        const particleCanvas = document.createElement('canvas');
        particleCanvas.width = 64;
        particleCanvas.height = 64;
        const ctx = particleCanvas.getContext('2d');
        const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
        grad.addColorStop(0.3, 'rgba(255, 60, 60, 0.85)');
        grad.addColorStop(0.7, 'rgba(255, 20, 20, 0.2)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 64, 64);

        const texture = new THREE.CanvasTexture(particleCanvas);

        const material = new THREE.PointsMaterial({
            size: 0.2,
            map: texture,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            vertexColors: true
        });

        return new THREE.Points(geometry, material);
    }

    // ----------------------------------------------------
    // Holographic Tech HUD Rings
    // ----------------------------------------------------
    function buildHudRings() {
        const group = new THREE.Group();

        const hudMaterial = new THREE.MeshBasicMaterial({
            color: 0xff1e27,
            wireframe: true,
            transparent: true,
            opacity: 0.18
        });

        const thinLineMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            wireframe: true,
            transparent: true,
            opacity: 0.1
        });

        // Ring 1
        const ring1Geo = new THREE.TorusGeometry(3.2, 0.015, 16, 64);
        const ring1 = new THREE.Mesh(ring1Geo, hudMaterial);
        group.add(ring1);

        // Ring 2 - tilted
        const ring2Geo = new THREE.TorusGeometry(3.6, 0.012, 16, 48);
        const ring2 = new THREE.Mesh(ring2Geo, thinLineMaterial);
        ring2.rotation.x = Math.PI / 4;
        ring2.rotation.y = Math.PI / 6;
        group.add(ring2);

        // Octagon target ring
        const octGeo = new THREE.TorusGeometry(2.8, 0.02, 16, 8);
        const octRing = new THREE.Mesh(octGeo, hudMaterial);
        octRing.rotation.z = Math.PI / 8;
        group.add(octRing);

        group.position.set(0, 0, -0.5);
        return group;
    }

    // ----------------------------------------------------
    // Switch Active 3D Model
    // ----------------------------------------------------
    function switchModel(type) {
        if (!models[type]) return;
        currentModelType = type;

        // Clear existing
        while (currentModelGroup.children.length > 0) {
            currentModelGroup.remove(currentModelGroup.children[0]);
        }

        const model = models[type];
        model.scale.set(0.01, 0.01, 0.01);
        currentModelGroup.add(model);

        // Smooth scale-in bounce
        let scale = 0.01;
        const targetScale = 1.0;
        const animateIn = () => {
            scale += (targetScale - scale) * 0.15;
            model.scale.set(scale, scale, scale);
            if (Math.abs(targetScale - scale) > 0.01) {
                requestAnimationFrame(animateIn);
            } else {
                model.scale.set(targetScale, targetScale, targetScale);
            }
        };
        animateIn();

        // Trigger subtle iron audio feedback if available
        if (window.OGSound) {
            window.OGSound.playClank();
        }
    }

    // Expose global switch for UI buttons
    window.switch3DModel = function (type) {
        document.querySelectorAll('.model-btn').forEach(btn => {
            btn.classList.remove('bg-brand', 'text-white', 'border-brand');
            btn.classList.add('bg-zinc-900', 'text-zinc-400', 'border-zinc-800');
        });
        const activeBtn = document.getElementById(`btn-3d-${type}`);
        if (activeBtn) {
            activeBtn.classList.remove('bg-zinc-900', 'text-zinc-400', 'border-zinc-800');
            activeBtn.classList.add('bg-brand', 'text-white', 'border-brand');
        }
        switchModel(type);
    };

    // ----------------------------------------------------
    // Event Handlers (Mouse, Touch, Drag, Resize)
    // ----------------------------------------------------
    function setupEventListeners() {
        // Window Resize
        window.addEventListener('resize', onWindowResize, false);

        // Mouse Move (Parallax & Light Tracking)
        window.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

            if (!isDragging) {
                targetRotY = mouseX * 0.85 + 0.4;
                targetRotX = -mouseY * 0.5 + 0.2;
            }

            // Move red spotlight to follow cursor
            if (redSpotLight) {
                redSpotLight.position.x = mouseX * 4;
                redSpotLight.position.y = mouseY * 3 + 1;
            }
        });

        // Click / Drag Rotation on Canvas
        canvas.addEventListener('mousedown', (e) => {
            isDragging = true;
            previousMousePosition = { x: e.clientX, y: e.clientY };
            canvas.style.cursor = 'grabbing';
        });

        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            const deltaX = e.clientX - previousMousePosition.x;
            const deltaY = e.clientY - previousMousePosition.y;

            dragVelocity.x = deltaX * 0.008;
            dragVelocity.y = deltaY * 0.008;

            targetRotY += dragVelocity.x;
            targetRotX += dragVelocity.y;

            previousMousePosition = { x: e.clientX, y: e.clientY };
        });

        window.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                canvas.style.cursor = 'grab';
            }
        });

        // Click to trigger spin impulse & sound
        canvas.addEventListener('click', () => {
            spinImpulse = 0.35;
            if (window.OGSound) {
                window.OGSound.playWhoosh();
            }
        });

        // Touch support for mobile
        canvas.addEventListener('touchstart', (e) => {
            if (e.touches.length === 1) {
                isDragging = true;
                previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
            }
        }, { passive: true });

        canvas.addEventListener('touchmove', (e) => {
            if (!isDragging || e.touches.length !== 1) return;
            const deltaX = e.touches[0].clientX - previousMousePosition.x;
            const deltaY = e.touches[0].clientY - previousMousePosition.y;

            targetRotY += deltaX * 0.008;
            targetRotX += deltaY * 0.008;

            previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        }, { passive: true });

        canvas.addEventListener('touchend', () => {
            isDragging = false;
        });
    }

    function onWindowResize() {
        if (!canvas || !renderer || !camera) return;
        const width = canvas.parentElement.clientWidth;
        const height = canvas.parentElement.clientHeight;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    }

    // ----------------------------------------------------
    // Animation & Render Loop
    // ----------------------------------------------------
    function animate() {
        requestAnimationFrame(animate);
        if (!isVisible) return;

        const elapsedTime = clock.getElapsedTime();

        // Smooth damping interpolation
        currentRotX += (targetRotX - currentRotX) * 0.06;
        currentRotY += (targetRotY - currentRotY) * 0.06;

        // Continuous subtle cinematic floating
        const floatY = Math.sin(elapsedTime * 1.5) * 0.12;
        const gentleSpin = elapsedTime * 0.2;

        if (spinImpulse > 0.001) {
            targetRotY += spinImpulse;
            spinImpulse *= 0.92;
        }

        // Apply rotation to 3D model
        currentModelGroup.rotation.x = currentRotX;
        currentModelGroup.rotation.y = currentRotY + gentleSpin;
        currentModelGroup.position.y = floatY;

        // Animate Tech HUD Rings
        if (hudRingsGroup) {
            hudRingsGroup.rotation.z = elapsedTime * 0.15;
            hudRingsGroup.children[0].rotation.x = elapsedTime * 0.1;
            hudRingsGroup.children[1].rotation.y = -elapsedTime * 0.2;
        }

        // Animate Fiery Embers
        if (particlesMesh) {
            const positions = particlesMesh.geometry.attributes.position.array;
            const velocities = particlesMesh.geometry.attributes.velocity.array;

            for (let i = 0; i < positions.length; i += 3) {
                positions[i] += velocities[i] + Math.sin(elapsedTime + i) * 0.002;
                positions[i + 1] += velocities[i + 1];
                positions[i + 2] += velocities[i + 2];

                // Wrap particles when reaching top
                if (positions[i + 1] > 4) {
                    positions[i + 1] = -4;
                    positions[i] = (Math.random() - 0.5) * 10;
                }
            }
            particlesMesh.geometry.attributes.position.needsUpdate = true;
        }

        renderer.render(scene, camera);
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
