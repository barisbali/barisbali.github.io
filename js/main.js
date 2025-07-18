// Sayfanın tüm elemanlarının yüklendiğinden emin oluyoruz
document.addEventListener('DOMContentLoaded', () => {

  // 1. Easter Egg Butonunu Ayarla
  const easterEgg = document.getElementById('easterEgg');
  if (easterEgg) {
    easterEgg.addEventListener('click', () => {
      // Bu linki istediğiniz başka bir "sürpriz" link ile değiştirebilirsiniz
      window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
    });
  }

  // 2. Particles.js Animasyonunu Başlat
  // "particles-js" ID'li bir eleman varsa bu kodu çalıştır
  if (document.getElementById('particles-js')) {
    particlesJS("particles-js", {
      "particles": {
        "number": {
          "value": 60,
          "density": { "enable": true, "value_area": 800 }
        },
        "color": { "value": "#01ffff" },
        "shape": { "type": "circle" },
        "opacity": {
          "value": 0.5,
          "random": true,
          "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false }
        },
        "size": {
          "value": 3,
          "random": true,
          "anim": { "enable": true, "speed": 2, "size_min": 0.1, "sync": false }
        },
        "line_linked": {
          "enable": true,
          "distance": 150,
          "color": "#ff00a5",
          "opacity": 0.3,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 1,
          "direction": "none",
          "random": false,
          "straight": false,
          "out_mode": "bounce",
          "attract": { "enable": false, "rotateX": 600, "rotateY": 1200 }
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": { "enable": true, "mode": "repulse" },
          "onclick": { "enable": true, "mode": "push" },
          "resize": true
        },
        "modes": {
          "repulse": { "distance": 100, "duration": 0.4 },
          "push": { "particles_nb": 4 }
        }
      },
      "retina_detect": true
    });
  }

});