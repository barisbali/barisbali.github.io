/**
 * Retro-Futuristic Terminal interactions
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Text Glitch Effect on Hover
    const glitchTexts = document.querySelectorAll('.glitch-text');

    glitchTexts.forEach(el => {
        el.addEventListener('mouseover', () => {
            const originalText = el.getAttribute('data-text') || el.innerText;
            el.setAttribute('data-text', originalText);

            let iterations = 0;
            const interval = setInterval(() => {
                el.innerText = originalText.split('')
                    .map((letter, index) => {
                        if (index < iterations) {
                            return originalText[index];
                        }
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

    // 2. Typewriter Effect for System Status
    const sysStatuses = document.querySelectorAll('.sys-status');

    sysStatuses.forEach(status => {
        const text = status.innerText;
        status.innerText = '';

        // Add a slight delay before typing starts to simulate boot-up
        setTimeout(() => {
            let i = 0;
            const typeInterval = setInterval(() => {
                status.innerText += text.charAt(i);
                i++;
                if (i >= text.length) {
                    clearInterval(typeInterval);
                }
            }, 50); // 50ms per character
        }, Math.random() * 500 + 200);
    });

    // 3. Tactile Button Click Effect (Optional auditory illusion through visual snap)
    const tactileBtns = document.querySelectorAll('.tactile-btn');
    tactileBtns.forEach(btn => {
        btn.addEventListener('mousedown', () => {
            btn.style.transform = 'translateY(4px)';
        });
        btn.addEventListener('mouseup', () => {
            btn.style.transform = 'translateY(0)';
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translateY(0)';
        });
    });
});