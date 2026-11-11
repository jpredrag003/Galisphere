// Jezički rečnik
const translations = {
    sr: {
        langButton: "ENGLISH",
        main_title: "Symphony of the Spheres",
        main_desc: "KLIKNI NA PLANETU ZA TON • KLIKNI NA SUNCE ZA REMIX MODE",
        btn_audio_off: "Uključi Audio sistem",
        btn_audio_on: "Audio Aktivan 🎵",
        remix_off: "Remix Mode: OFF",
        remix_on: "Remix Mode: ON 🌟",
        planets: {
            Merkur: "Merkur",
            Venera: "Venera",
            Zemlja: "Zemlja",
            Mars: "Mars",
            Jupiter: "Jupiter",
            Saturn: "Saturn",
            Uran: "Uran",
            Neptun: "Neptun"
        }
    },
    en: {
        langButton: "SRPSKI",
        main_title: "Symphony of the Spheres",
        main_desc: "CLICK A PLANET FOR TONE • CLICK THE SUN FOR REMIX MODE",
        btn_audio_off: "Enable Audio System",
        btn_audio_on: "Audio Active 🎵",
        remix_off: "Remix Mode: OFF",
        remix_on: "Remix Mode: ON 🌟",
        planets: {
            Merkur: "Mercury",
            Venera: "Venus",
            Zemlja: "Earth",
            Mars: "Mars",
            Jupiter: "Jupiter",
            Saturn: "Saturn",
            Uran: "Uranus",
            Neptun: "Neptune"
        }
    }
};

let currentLang = 'sr';

let audioCtx = null;
let isRunning = false;
let remixMode = false;

const canvas = document.getElementById('solarSystem');
const ctx = canvas.getContext('2d');
const startBtn = document.getElementById('startAudioBtn');
const remixBtn = document.getElementById('remixBtn');

const centerX = 240;
const centerY = 240;

// Optimizovano zvezdano nebo
const stars = [];
for (let i = 0; i < 60; i++) {
    stars.push({
        x: Math.random() * 480,
        y: Math.random() * 480,
        radius: Math.random() * 1.2,
        alpha: Math.random() * 0.7 + 0.3
    });
}

const planets = [
    { id: "Merkur", distance: 40, radius: 3.5, freq: 293.66, color: "#8c8c8c", lightColor: "#d4d4d4", angle: 0, speed: 0.035, pulse: 0 },
    { id: "Venera", distance: 62, radius: 5.5, freq: 329.63, color: "#c28e38", lightColor: "#f3d18c", angle: 1, speed: 0.025, pulse: 0 },
    { id: "Zemlja", distance: 85, radius: 6, freq: 392.00, color: "#2b7bb9", lightColor: "#6ac0ff", angle: 2, speed: 0.018, pulse: 0 },
    { id: "Mars", distance: 110, radius: 4.5, freq: 440.00, color: "#bd3813", lightColor: "#ff734d", angle: 3, speed: 0.014, pulse: 0 },
    { id: "Jupiter", distance: 145, radius: 10, freq: 220.00, color: "#b88654", lightColor: "#e6c29c", angle: 4, speed: 0.009, pulse: 0 },
    { id: "Saturn", distance: 180, radius: 8, freq: 246.94, color: "#d9c391", lightColor: "#faeec8", angle: 5, speed: 0.007, hasRings: true, pulse: 0 },
    { id: "Uran", distance: 210, radius: 6.5, freq: 349.23, color: "#51a2c7", lightColor: "#93d7f5", angle: 6, speed: 0.005, pulse: 0 },
    { id: "Neptun", distance: 235, radius: 6.5, freq: 196.00, color: "#223fa3", lightColor: "#6c88ff", angle: 7, speed: 0.004, pulse: 0 }
];

let sunPulse = 0;

startBtn.addEventListener('click', () => {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    isRunning = true;
    startBtn.textContent = translations[currentLang].btn_audio_on;
    startBtn.style.borderColor = "#50fa7b";
    startBtn.style.color = "#50fa7b";
});

function playTone(freq, type = 'sine') {
    if (!audioCtx || !isRunning) return;

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.2);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 1.2);
}

// Ispravljen event listener sa skaliranjem za mobilne uređaje
canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    
    // Računanje skale između stvarne veličine platna (480) i prikazane veličine na ekranu
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (event.clientX - rect.left) * scaleX - centerX;
    const y = (event.clientY - rect.top) * scaleY - centerY;
    const distanceToCenter = Math.sqrt(x * x + y * y);

    if (distanceToCenter < 25) {
        remixMode = !remixMode;
        remixBtn.textContent = remixMode ? translations[currentLang].remix_on : translations[currentLang].remix_off;
        remixBtn.style.borderColor = remixMode ? '#ff79c6' : '#8be9fd';
        remixBtn.style.color = remixMode ? '#ff79c6' : '#8be9fd';
        return;
    }

    planets.forEach(planet => {
        const px = Math.cos(planet.angle) * planet.distance;
        const py = Math.sin(planet.angle) * planet.distance;
        const distToPlanet = Math.sqrt((x - px) ** 2 + (y - py) ** 2);

        if (distToPlanet < planet.radius + 12) { // Blago povećana tolerancija za lakši klik na mobilnom
            playTone(planet.freq, 'sine');
            planet.pulse = 15;
        }
    });
});

function toggleLanguage() {
    currentLang = currentLang === 'sr' ? 'en' : 'sr';
    document.documentElement.lang = currentLang;

    // Ažuriraj tekstualne elemente sa data-key
    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        if (key === 'btn_audio') {
            element.textContent = isRunning ? translations[currentLang].btn_audio_on : translations[currentLang].btn_audio_off;
        } else if (key === 'btn_remix') {
            element.textContent = remixMode ? translations[currentLang].remix_on : translations[currentLang].remix_off;
        } else if (translations[currentLang][key]) {
            element.textContent = translations[currentLang][key];
        }
    });

    // Ažuriraj dugme za jezik
    document.getElementById('langToggle').textContent = translations[currentLang].langButton;
}

function animate() {
    ctx.clearRect(0, 0, 480, 480);

    // Crtanje zvezda
    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();
    });

    ctx.save();
    ctx.translate(centerX, centerY);

    // Sunce
    sunPulse += 0.04;
    const currentSunRadius = remixMode ? 20 + Math.sin(sunPulse) * 5 : 17;
    
    ctx.beginPath();
    ctx.arc(0, 0, currentSunRadius, 0, Math.PI * 2);
    ctx.fillStyle = remixMode ? '#ff79c6' : '#ffb86c';
    ctx.shadowBlur = remixMode ? 25 : 15;
    ctx.shadowColor = remixMode ? '#ff79c6' : '#ffb86c';
    ctx.fill();
    ctx.shadowBlur = 0;

    if (remixMode && Math.random() < 0.07 && isRunning) {
        const randomPlanet = planets[Math.floor(Math.random() * planets.length)];
        playTone(randomPlanet.freq * 0.5, 'triangle');
    }

    planets.forEach(planet => {
        planet.angle += remixMode ? planet.speed * 2.5 : planet.speed;

        // Orbita
        ctx.beginPath();
        ctx.arc(0, 0, planet.distance, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(139, 233, 253, 0.06)';
        ctx.lineWidth = 1;
        ctx.stroke();

        const x = Math.cos(planet.angle) * planet.distance;
        const y = Math.sin(planet.angle) * planet.distance;

        // Saturnovi prstenovi
        if (planet.hasRings) {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(planet.angle);
            ctx.beginPath();
            ctx.ellipse(0, 0, planet.radius + 6, planet.radius + 2, 0.4, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(217, 195, 145, 0.6)';
            ctx.lineWidth = 1.5;
            ctx.stroke();
            ctx.restore();
        }

        // Planeta
        ctx.beginPath();
        ctx.arc(x, y, planet.radius, 0, Math.PI * 2);
        ctx.fillStyle = planet.color;
        ctx.fill();

        // Ime planete (prevodi se automatski prema aktivnom jeziku)
        ctx.fillStyle = 'rgba(160, 160, 192, 0.7)';
        ctx.font = '9px Inter, sans-serif';
        const localizedName = translations[currentLang].planets[planet.id] || planet.id;
        ctx.fillText(localizedName, x + planet.radius + 5, y + 3);

        if (planet.pulse > 0) {
            ctx.beginPath();
            ctx.arc(x, y, planet.radius + planet.pulse, 0, Math.PI * 2);
            ctx.strokeStyle = planet.lightColor;
            ctx.lineWidth = 1;
            ctx.stroke();
            planet.pulse -= 0.6;
        }
    });

    ctx.restore();
    requestAnimationFrame(animate);
}

animate();