document.addEventListener('DOMContentLoaded', () => {
    // 1. Reveal Animations
    function reveal() {
        var reveals = document.querySelectorAll(".reveal");
        for (var i = 0; i < reveals.length; i++) {
            var windowHeight = window.innerHeight;
            var elementTop = reveals[i].getBoundingClientRect().top;
            var elementVisible = 50; // trigger earlier

            if (elementTop < windowHeight - elementVisible || i === 0) {
                reveals[i].classList.add("active");
            }
        }
    }

    // Initial reveal
    setTimeout(reveal, 100);
    window.addEventListener("scroll", reveal);
    
    // Auto-activate all elements after 3 seconds as a fallback
    setTimeout(() => {
        var reveals = document.querySelectorAll(".reveal");
        reveals.forEach(el => el.classList.add("active"));
    }, 3000);

    // 2. Confetti Blast for 6 seconds
    const duration = 6 * 1000;
    const end = Date.now() + duration;

    (function frame() {
        // launch a few confetti from the left edge
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#ff007f', '#8a2be2', '#ffd700', '#ffffff', '#ff69b4']
        });
        // and launch a few from the right edge
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#ff007f', '#8a2be2', '#ffd700', '#ffffff', '#ff69b4']
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());

    // Periodic bigger bursts from the bottom center
    const interval = setInterval(() => {
        if (Date.now() > end) {
            return clearInterval(interval);
        }

        confetti({
            particleCount: 80,
            spread: 100,
            origin: { y: 0.9 },
            zIndex: 100,
            colors: ['#ff007f', '#8a2be2', '#ffd700', '#ffffff', '#ff69b4'],
            startVelocity: 45
        });
    }, 2500);
});
