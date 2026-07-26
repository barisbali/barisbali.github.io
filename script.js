/**
 * BARIŞ BALI - TACTICAL DEFENSE HUD ENGINE
 * Audio Synthesizer, Interactive Radar Canvas, 3D Sheen Tilt, Lightbox & Command Palette
 */

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // 1. WEB AUDIO SYNTHESIZER FOR HUD SOUND EFFECTS
    // ----------------------------------------------------
    let audioCtx = null;
    let isMuted = localStorage.getItem('defense_hud_audio_muted') === 'true';

    function initAudio() {
        if (!audioCtx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                audioCtx = new AudioContext();
            }
        }
        if (audioCtx && audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
    }

    function playSound(type) {
        if (isMuted) return;
        try {
            initAudio();
            if (!audioCtx) return;

            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.connect(gain);
            gain.connect(audioCtx.destination);

            const now = audioCtx.currentTime;

            if (type === 'hover') {
                osc.type = 'sine';
                osc.frequency.setValueAtTime(880, now); // A5
                osc.frequency.exponentialRampToValueAtTime(1200, now + 0.04);
                gain.gain.setValueAtTime(0.02, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
                osc.start(now);
                osc.stop(now + 0.04);
            } else if (type === 'click') {
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(600, now);
                osc.frequency.exponentialRampToValueAtTime(200, now + 0.08);
                gain.gain.setValueAtTime(0.05, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
                osc.start(now);
                osc.stop(now + 0.08);
            } else if (type === 'filter') {
                osc.type = 'square';
                osc.frequency.setValueAtTime(440, now);
                osc.frequency.exponentialRampToValueAtTime(880, now + 0.06);
                gain.gain.setValueAtTime(0.02, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
                osc.start(now);
                osc.stop(now + 0.06);
            }
        } catch (e) {
            // Audio context error fallback
        }
    }

    // Audio Toggle Handler
    const audioToggleBtn = document.getElementById('audio-toggle-btn');
    if (audioToggleBtn) {
        updateAudioButtonState();
        audioToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            isMuted = !isMuted;
            localStorage.setItem('defense_hud_audio_muted', isMuted);
            updateAudioButtonState();
            if (!isMuted) playSound('click');
        });
    }

    function updateAudioButtonState() {
        if (!audioToggleBtn) return;
        const icon = audioToggleBtn.querySelector('i');
        const text = audioToggleBtn.querySelector('.audio-status');
        if (isMuted) {
            audioToggleBtn.classList.remove('active');
            if (icon) icon.className = 'fas fa-volume-mute';
            if (text) text.innerText = 'AUDIO: OFF';
        } else {
            audioToggleBtn.classList.add('active');
            if (icon) icon.className = 'fas fa-volume-up';
            if (text) text.innerText = 'AUDIO: ON';
        }
    }

    // Bind Sound Effects to UI Elements
    document.querySelectorAll('a, button, .project-card, .filter-btn, .cmd-item, .gallery-item').forEach(el => {
        el.addEventListener('mouseenter', () => playSound('hover'));
        el.addEventListener('click', () => {
            initAudio();
            playSound('click');
        });
    });

    // ----------------------------------------------------
    // 2. RADAR SCOPE & PARTICLE CANVAS ENGINE
    // ----------------------------------------------------
    const canvas = document.getElementById('radar-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        let sweepAngle = 0;
        let mouseX = width / 2;
        let mouseY = height / 2;

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Generate Particles
        const particles = Array.from({ length: 45 }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            size: Math.random() * 2 + 1,
            alpha: Math.random() * 0.5 + 0.2
        }));

        function drawRadar() {
            ctx.clearRect(0, 0, width, height);

            const centerX = width * 0.85;
            const centerY = height * 0.3;
            const radius = Math.min(width, height) * 0.35;

            // Draw Telemetry Radar Concentric Rings
            ctx.strokeStyle = 'rgba(0, 240, 255, 0.05)';
            ctx.lineWidth = 1;

            for (let r = 50; r < radius; r += 70) {
                ctx.beginPath();
                ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
                ctx.stroke();
            }

            // Radar Crosshairs
            ctx.beginPath();
            ctx.moveTo(centerX - radius, centerY);
            ctx.lineTo(centerX + radius, centerY);
            ctx.moveTo(centerX, centerY - radius);
            ctx.lineTo(centerX, centerY + radius);
            ctx.stroke();

            // Radar Sweep
            sweepAngle += 0.008;
            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(sweepAngle);

            const gradient = ctx.createConicGradient(0, 0, 0);
            gradient.addColorStop(0, 'rgba(0, 240, 255, 0.15)');
            gradient.addColorStop(0.1, 'rgba(0, 240, 255, 0.02)');
            gradient.addColorStop(0.2, 'transparent');
            gradient.addColorStop(1, 'transparent');

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(0, 0, radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();

            // Particles Update & Draw
            particles.forEach((p) => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0) p.x = width;
                if (p.x > width) p.x = 0;
                if (p.y < 0) p.y = height;
                if (p.y > height) p.y = 0;

                ctx.fillStyle = `rgba(0, 240, 255, ${p.alpha})`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            });

            // Target Crosshair at Mouse Position
            ctx.strokeStyle = 'rgba(0, 240, 255, 0.15)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(mouseX, mouseY, 15, 0, Math.PI * 2);
            ctx.stroke();

            requestAnimationFrame(drawRadar);
        }

        drawRadar();
    }

    // ----------------------------------------------------
    // 3. PROJECT FILTER TABS SYSTEM
    // ----------------------------------------------------
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            playSound('filter');
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.classList.remove('filtered-out');
                    card.style.opacity = '1';
                } else {
                    card.classList.add('filtered-out');
                }
            });
        });
    });

    // ----------------------------------------------------
    // 4. 3D CARD TILT & SPECULAR SHEEN EFFECT
    // ----------------------------------------------------
    projectCards.forEach(card => {
        let sheen = card.querySelector('.card-sheen');
        if (!sheen) {
            sheen = document.createElement('div');
            sheen.className = 'card-sheen';
            card.appendChild(sheen);
        }

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
            card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
            card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        });
    });

    // ----------------------------------------------------
    // 5. IMAGE LIGHTBOX MODAL HANDLER
    // ----------------------------------------------------
    const galleryItems = document.querySelectorAll('.gallery-item img');

    // Create Lightbox DOM if not present
    let lightboxModal = document.getElementById('lightbox-modal');
    if (!lightboxModal && galleryItems.length > 0) {
        lightboxModal = document.createElement('div');
        lightboxModal.id = 'lightbox-modal';
        lightboxModal.className = 'lightbox-modal';
        lightboxModal.innerHTML = `
            <div class="lightbox-content">
                <button class="lightbox-close" id="lightbox-close">&times;</button>
                <img id="lightbox-img" src="" alt="Screenshot Target">
            </div>
            <div class="lightbox-caption" id="lightbox-caption"></div>
        `;
        document.body.appendChild(lightboxModal);
    }

    if (lightboxModal) {
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxCaption = document.getElementById('lightbox-caption');
        const lightboxClose = document.getElementById('lightbox-close');

        galleryItems.forEach(img => {
            img.parentElement.addEventListener('click', () => {
                lightboxImg.src = img.src;
                lightboxCaption.innerText = img.alt || 'TECHNICAL SCREENSHOT METRICS';
                lightboxModal.classList.add('active');
                playSound('click');
            });
        });

        const closeLightbox = () => {
            lightboxModal.classList.remove('active');
        };

        if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) closeLightbox();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
                closeLightbox();
            }
        });
    }

    // ----------------------------------------------------
    // 6. COMMAND PALETTE SEARCH ENGINE (Ctrl+K / /)
    // ----------------------------------------------------
    const cmdBackdrop = document.getElementById('cmd-palette');
    const cmdInput = document.getElementById('cmd-input');
    const cmdResults = document.getElementById('cmd-results');
    const cmdTriggers = document.querySelectorAll('.cmd-trigger');

    if (cmdBackdrop && cmdInput) {
        const openCmd = () => {
            cmdBackdrop.classList.add('active');
            cmdInput.focus();
            cmdInput.value = '';
            renderCmdResults('');
            playSound('click');
        };

        const closeCmd = () => {
            cmdBackdrop.classList.remove('active');
        };

        cmdTriggers.forEach(t => t.addEventListener('click', openCmd));

        cmdBackdrop.addEventListener('click', (e) => {
            if (e.target === cmdBackdrop) closeCmd();
        });

        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                cmdBackdrop.classList.contains('active') ? closeCmd() : openCmd();
            } else if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
                e.preventDefault();
                openCmd();
            } else if (e.key === 'Escape' && cmdBackdrop.classList.contains('active')) {
                closeCmd();
            }
        });

        const cmdData = [
            { name: 'GamerLog - AI Recommendation Platform', url: 'projects/gamerlog.html', type: 'Django / ML' },
            { name: 'Rektonic - Minimalist Habit Tracker', url: 'projects/rektonic.html', type: 'iOS / SwiftUI' },
            { name: 'Legacy Runner - Procedural Endless Runner', url: 'projects/legacy-runner.html', type: 'Unity / C#' },
            { name: 'Personal Page - Vanilla JS Engineering', url: 'projects/portfolio.html', type: 'Web' },
            { name: 'Burning Letter - Cathartic Web App', url: 'projects/burning-letter.html', type: 'Web App' },
            { name: 'Main Portfolio Website', url: 'https://www.barisbali.com/', type: 'External' },
            { name: 'GitHub Developer Profile', url: 'https://github.com/barisbali', type: 'External' }
        ];

        function renderCmdResults(query) {
            cmdResults.innerHTML = '';
            const filtered = cmdData.filter(item => item.name.toLowerCase().includes(query.toLowerCase()) || item.type.toLowerCase().includes(query.toLowerCase()));

            if (filtered.length === 0) {
                cmdResults.innerHTML = `<div style="padding: 1rem; color: var(--text-dim); text-align: center; font-family: var(--font-mono);">NO MATCHING COMMAND TARGETS</div>`;
                return;
            }

            filtered.forEach(item => {
                const a = document.createElement('a');
                a.className = 'cmd-item';
                a.href = item.url;
                if (item.url.startsWith('http')) a.target = '_blank';
                a.innerHTML = `
                    <div class="cmd-item-label">
                        <i class="fas fa-terminal"></i>
                        <span>${item.name}</span>
                    </div>
                    <span class="cmd-item-type">${item.type}</span>
                `;
                cmdResults.appendChild(a);
            });
        }

        cmdInput.addEventListener('input', (e) => {
            renderCmdResults(e.target.value);
        });
    }

    // ----------------------------------------------------
    // 7. GLITCH TEXT & TELEMETRY CLOCK
    // ----------------------------------------------------
    const glitchTexts = document.querySelectorAll('.glitch-text');

    glitchTexts.forEach(el => {
        el.addEventListener('mouseover', () => {
            const originalText = el.getAttribute('data-text') || el.innerText;
            el.setAttribute('data-text', originalText);

            let iterations = 0;
            const interval = setInterval(() => {
                el.innerText = originalText.split('')
                    .map((letter, index) => {
                        if (index < iterations) return originalText[index];
                        return String.fromCharCode(65 + Math.floor(Math.random() * 26));
                    })
                    .join('');

                if (iterations >= originalText.length) {
                    clearInterval(interval);
                    el.innerText = originalText;
                }
                iterations += 1 / 3;
            }, 30);
        });
    });

    // Telemetry UTC Clock Updater
    const telemetryClock = document.getElementById('telemetry-clock');
    if (telemetryClock) {
        setInterval(() => {
            const now = new Date();
            telemetryClock.innerText = `UTC: ${now.toUTCString().slice(17, 25)}`;
        }, 1000);
    }
});