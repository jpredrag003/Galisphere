const canvas = document.getElementById('spaceCanvas');
const ctx = canvas.getContext('2d');
const container = document.getElementById('game-container');
const langBtn = document.getElementById('lang-btn');

let currentLang = 'sr'; // Početni jezik: srpski

const translations = {
    sr: {
        langBtn: "EN",
        target: "🎯 CILJ",
        earth: "🌍 Zemlja",
        sun: "Sunce",
        mars: "Mars",
        jupiter: "Jupiter",
        saturn: "Saturn",
        uran: "Uran",
        hint: "Povuci mišem od Zemlje da naciljaš. Klikni tokom leta za impuls motora.",
        level: "Nivo",
        speed: "Brzina",
        fuelActive: "Gorivo (Impuls): 🔋 (1)",
        fuelEmpty: "Gorivo (Impuls): ❌ (Istrošeno)",
        statusInit: "Status: 🛰️ Namesti ugao i lansiraj!",
        statusFlight: "Status: 🚀 Letelica u letu!",
        statusLevel1: "Status: 🛰️ Nivo 1: Iskoristi Jupiterovu praćku!",
        statusLevel2: "Status: ⚠️ Nivo 2: Izbegavaj crveni asteroidni pojas!",
        statusLevel3: "Status: 💀 Nivo 3: Ekstremna gravitaciona lavirint misija!",
        crash: (name) => `Status: 💥 Srušila se na ${name}! Klikni za ponovni pokušaj.`,
        asteroidCrash: "Status: 💥 Asteroidi su razorili sondu! Klikni za restart.",
        success: (nextLvl) => `Status: 🎉 USPEH! Prelaziš na nivo ${nextLvl}...`,
        win: "Status: 🏆 ČESTITKE! Prešao si sve nivoe igre!",
        lost: "Status: ❌ Sonda se izgubila u svemiru. Klikni za restart."
    },
    en: {
        langBtn: "SR",
        target: "🎯 TARGET",
        earth: "🌍 Earth",
        sun: "Sun",
        mars: "Mars",
        jupiter: "Jupiter",
        saturn: "Saturn",
        uran: "Uranus",
        hint: "Drag with mouse from Earth to aim. Click during flight for engine boost.",
        level: "Level",
        speed: "Speed",
        fuelActive: "Fuel (Boost): 🔋 (1)",
        fuelEmpty: "Fuel (Boost): ❌ (Depleted)",
        statusInit: "Status: 🛰️ Set angle and launch!",
        statusFlight: "Status: 🚀 Craft in flight!",
        statusLevel1: "Status: 🛰️ Level 1: Use Jupiter's slingshot!",
        statusLevel2: "Status: ⚠️ Level 2: Avoid the red asteroid belt!",
        statusLevel3: "Status: 💀 Level 3: Extreme gravitational maze mission!",
        crash: (name) => `Status: 💥 Crashed into ${name}! Click to retry.`,
        asteroidCrash: "Status: 💥 Asteroids destroyed the probe! Click to restart.",
        success: (nextLvl) => `Status: 🎉 SUCCESS! Advancing to level ${nextLvl}...`,
        win: "Status: 🏆 CONGRATULATIONS! You beat all levels!",
        lost: "Status: ❌ Probe lost in space. Click to restart."
    }
};

const G = 0.6; 
const dt = 0.5;

const stars = [];
for(let i=0; i<60; i++) {
    stars.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height });
}

const sun = { x: 500, y: 325, radius: 38, mass: 5200, color: '#ffaa00', nameKey: 'sun' };
const earth = { x: 150, y: 500 };

let currentLevel = 1;
const totalLevels = 3;

let planets = [];
let asteroidBelt = { min: 245, max: 255, lethal: false };
let targetZone = { x: 900, y: 100, radius: 50 };

let lastStatusType = 'init';
let lastStatusParam = null;

function setStatus(type, param = null) {
    lastStatusType = type;
    lastStatusParam = param;
    const t = translations[currentLang];
    const statusText = document.getElementById('status-text');

    if (type === 'init') statusText.innerText = t.statusInit;
    else if (type === 'flight') statusText.innerText = t.statusFlight;
    else if (type === 'l1') statusText.innerText = t.statusLevel1;
    else if (type === 'l2') statusText.innerText = t.statusLevel2;
    else if (type === 'l3') statusText.innerText = t.statusLevel3;
    else if (type === 'crash') statusText.innerText = t.crash(t[param]);
    else if (type === 'asteroidCrash') statusText.innerText = t.asteroidCrash;
    else if (type === 'success') statusText.innerText = t.success(param);
    else if (type === 'win') statusText.innerText = t.win;
    else if (type === 'lost') statusText.innerText = t.lost;
}

function loadLevel(level) {
    currentLevel = level;
    document.getElementById('level-text').innerText = `${translations[currentLang].level}: ${currentLevel} / ${totalLevels}`;
    ship.x = earth.x;
    ship.y = earth.y;
    ship.vx = 0;
    ship.vy = 0;
    ship.active = false;
    ship.fuel = 1;
    ship.trailIndex = 0;
    ship.trailX.fill(earth.x);
    ship.trailY.fill(earth.y);

    if (level === 1) {
        planets = [
            { x: 0, y: 0, radius: 14, mass: 140, color: '#ff4500', nameKey: 'mars', angle: 1.0, distance: 210 },
            { x: 0, y: 0, radius: 26, mass: 650, color: '#e0a96d', nameKey: 'jupiter', angle: 3.5, distance: 290 },
            { x: 0, y: 0, radius: 22, mass: 480, color: '#f4e2bb', nameKey: 'saturn', angle: 5.2, distance: 380 }
        ];
        asteroidBelt = { min: 245, max: 255, lethal: false };
        targetZone = { x: 900, y: 100, radius: 55 };
        setStatus('l1');
    } 
    else if (level === 2) {
        planets = [
            { x: 0, y: 0, radius: 20, mass: 500, color: '#e0a96d', nameKey: 'jupiter', angle: 0.5, distance: 260 },
            { x: 0, y: 0, radius: 18, mass: 400, color: '#48cae4', nameKey: 'uran', angle: 4.0, distance: 340 }
        ];
        asteroidBelt = { min: 215, max: 235, lethal: true };
        targetZone = { x: 850, y: 550, radius: 45 };
        setStatus('l2');
    } 
    else if (level === 3) {
        planets = [
            { x: 0, y: 0, radius: 15, mass: 300, color: '#ff4500', nameKey: 'mars', angle: 2.0, distance: 180 },
            { x: 0, y: 0, radius: 24, mass: 600, color: '#e0a96d', nameKey: 'jupiter', angle: 5.0, distance: 270 },
            { x: 0, y: 0, radius: 18, mass: 450, color: '#f4e2bb', nameKey: 'saturn', angle: 1.2, distance: 360 }
        ];
        asteroidBelt = { min: 220, max: 240, lethal: true };
        targetZone = { x: 920, y: 80, radius: 35 };
        setStatus('l3');
    }

    updatePlanetsPositions();
    runMonteCarloSimulation();
}

function updatePlanetsPositions() {
    for(let i=0; i<planets.length; i++) {
        let p = planets[i];
        let orbitalSpeed = Math.sqrt((G * sun.mass) / Math.pow(p.distance, 3)) * 35;
        p.angle += orbitalSpeed * dt * 0.02;

        p.x = sun.x + Math.cos(p.angle) * p.distance;
        p.y = sun.y + Math.sin(p.angle) * p.distance;
    }
}

let ship = {
    x: earth.x, y: earth.y,
    vx: 0, vy: 0,
    mass: 1, radius: 5,
    active: false,
    fuel: 1,
    trailIndex: 0,
    trailLen: 50,
    trailX: new Float32Array(50),
    trailY: new Float32Array(50)
};

let isAiming = false;
let aimEndX = earth.x;
let aimEndY = earth.y;

let optimalPath = [];
function runMonteCarloSimulation() {
    let simX = earth.x, simY = earth.y;
    let simVx = 1.4, simVy = -2.1;
    optimalPath = [];
    
    let tempPlanets = JSON.parse(JSON.stringify(planets));
    
    for(let step = 0; step < 200; step++) {
        optimalPath.push({x: simX, y: simY});
        let dx = sun.x - simX, dy = sun.y - simY;
        let distSq = dx*dx + dy*dy;
        let dist = Math.sqrt(distSq);
        let f = (G * sun.mass * ship.mass) / (distSq + 500) * dt;
        simVx += (dx / dist) * f;
        simVy += (dy / dist) * f;

        tempPlanets.forEach(p => {
            let orbitalSpeed = Math.sqrt((G * sun.mass) / Math.pow(p.distance, 3)) * 35;
            p.angle += orbitalSpeed * dt * 0.02;
            p.x = sun.x + Math.cos(p.angle) * p.distance;
            p.y = sun.y + Math.sin(p.angle) * p.distance;
            
            let pdx = p.x - simX, pdy = p.y - simY;
            let pDistSq = pdx*pdx + pdy*pdy;
            let pDist = Math.sqrt(pDistSq);
            let pf = (G * p.mass * ship.mass) / (pDistSq + 100) * dt;
            simVx += (pdx / pDist) * pf;
            simVy += (pdy / pDist) * pf;
        });
        simX += simVx * dt;
        simY += simVy * dt;
    }
}

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
function playSound(freq) {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    let osc = audioCtx.createOscillator();
    let gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    let now = audioCtx.currentTime;
    osc.frequency.setValueAtTime(freq, now);
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.15);
    osc.start(now);
    osc.stop(now + 0.15);
}

canvas.addEventListener('mousedown', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    if (!ship.active) {
        if (Math.hypot(mouseX - earth.x, mouseY - earth.y) < 45) {
            isAiming = true;
            aimEndX = mouseX;
            aimEndY = mouseY;
        }
    } else if (ship.active && ship.fuel > 0) {
        let angleToClick = Math.atan2(mouseY - ship.y, mouseX - ship.x);
        ship.vx += Math.cos(angleToClick) * 1.5;
        ship.vy += Math.sin(angleToClick) * 1.5;
        ship.fuel--;
        
        document.getElementById('fuel-text').innerText = translations[currentLang].fuelEmpty;
        playSound(300);
    }
});

canvas.addEventListener('mousemove', (e) => {
    if (isAiming) {
        const rect = canvas.getBoundingClientRect();
        aimEndX = e.clientX - rect.left;
        aimEndY = e.clientY - rect.top;
    }
});

canvas.addEventListener('mouseup', () => {
    if (isAiming) {
        isAiming = false;
        ship.x = earth.x;
        ship.y = earth.y;
        ship.vx = (earth.x - aimEndX) * 0.06;
        ship.vy = (earth.y - aimEndY) * 0.06;
        ship.active = true;
        ship.fuel = 1;
        ship.trailIndex = 0;
        ship.trailX.fill(earth.x);
        ship.trailY.fill(earth.y);
        setStatus('flight');
        document.getElementById('fuel-text').innerText = translations[currentLang].fuelActive;
        playSound(150);
    }
});

let frameCounter = 0;

function update() {
    updatePlanetsPositions();

    if (ship.active) {
        let dx = sun.x - ship.x, dy = sun.y - ship.y;
        let distSq = dx*dx + dy*dy;
        let dist = Math.sqrt(distSq);
        let f = (G * sun.mass * ship.mass) / (distSq + 500) * dt;
        ship.vx += (dx / dist) * f;
        ship.vy += (dy / dist) * f;

        for(let i=0; i<planets.length; i++) {
            let p = planets[i];
            let pdx = p.x - ship.x, pdy = p.y - ship.y;
            let pDistSq = pdx*pdx + pdy*pdy;
            let pDist = Math.sqrt(pDistSq);

            if (pDist < p.radius + ship.radius) {
                setStatus('crash', p.nameKey);
                playSound(80);
                ship.active = false;
            }

            let pf = (G * p.mass * ship.mass) / (pDistSq + 100) * dt;
            ship.vx += (pdx / pDist) * pf;
            ship.vy += (pdy / pDist) * pf;
        }

        ship.x += ship.vx * dt;
        ship.y += ship.vy * dt;

        ship.trailX[ship.trailIndex] = ship.x;
        ship.trailY[ship.trailIndex] = ship.y;
        ship.trailIndex = (ship.trailIndex + 1) % ship.trailLen;

        frameCounter++;
        if (frameCounter % 20 === 0) {
            let speedVal = (Math.hypot(ship.vx, ship.vy) * 2.0).toFixed(1);
            document.getElementById('speed-text').innerText = `${translations[currentLang].speed}: ${speedVal} km/s`;
        }

        let distFromSun = Math.hypot(ship.x - sun.x, ship.y - sun.y);
        if (distFromSun > asteroidBelt.min && distFromSun < asteroidBelt.max) {
            if (asteroidBelt.lethal) {
                setStatus('asteroidCrash');
                playSound(60);
                container.classList.add('screen-shake');
                setTimeout(() => container.classList.remove('screen-shake'), 150);
                ship.active = false;
            }
        }

        if (Math.hypot(ship.x - targetZone.x, ship.y - targetZone.y) < targetZone.radius) {
            playSound(500);
            if (currentLevel < totalLevels) {
                setStatus('success', currentLevel + 1);
                ship.active = false;
                setTimeout(() => loadLevel(currentLevel + 1), 1500);
            } else {
                setStatus('win');
                ship.active = false;
            }
        }

        if (ship.x < -50 || ship.x > canvas.width + 50 || ship.y < -50 || ship.y > canvas.height + 50) {
            setStatus('lost');
            ship.active = false;
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#ffffff';
    for(let i=0; i<stars.length; i++) {
        ctx.fillRect(stars[i].x, stars[i].y, 1.5, 1.5);
    }

    if (!ship.active && !isAiming) {
        ctx.strokeStyle = 'rgba(0, 243, 255, 0.25)';
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        for(let i=0; i<optimalPath.length; i++) {
            let pt = optimalPath[i];
            if (i === 0) ctx.moveTo(pt.x, pt.y);
            else ctx.lineTo(pt.x, pt.y);
        }
        ctx.stroke();
        ctx.setLineDash([]);
    }

    ctx.fillStyle = 'rgba(0, 255, 100, 0.08)';
    ctx.strokeStyle = '#00ff66';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(targetZone.x, targetZone.y, targetZone.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#00ff66';
    ctx.font = '11px sans-serif';
    ctx.fillText(translations[currentLang].target, targetZone.x - 20, targetZone.y - targetZone.radius - 12);

    ctx.fillStyle = sun.color;
    ctx.beginPath();
    ctx.arc(sun.x, sun.y, sun.radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = asteroidBelt.lethal ? 'rgba(255, 69, 0, 0.35)' : 'rgba(130, 130, 160, 0.2)';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.arc(sun.x, sun.y, (asteroidBelt.min + asteroidBelt.max)/2, 0, Math.PI * 2);
    ctx.stroke();

    for(let i=0; i<planets.length; i++) {
        let p = planets[i];
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(sun.x, sun.y, p.distance, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ddddff';
        ctx.font = '10px sans-serif';
        ctx.fillText(translations[currentLang][p.nameKey], p.x + p.radius + 5, p.y + 3);
    }

    ctx.fillStyle = '#1d63ed';
    ctx.beginPath();
    ctx.arc(earth.x, earth.y, 9, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.fillText(translations[currentLang].earth, earth.x - 20, earth.y + 22);

    if (isAiming) {
        ctx.strokeStyle = '#00f3ff';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(earth.x, earth.y);
        ctx.lineTo(earth.x - (aimEndX - earth.x), earth.y - (aimEndY - earth.y));
        ctx.stroke();

        ctx.fillStyle = '#00f3ff';
        ctx.beginPath();
        ctx.arc(aimEndX, aimEndY, 6, 0, Math.PI * 2);
        ctx.fill();
    }

    if (ship.active) {
        ctx.strokeStyle = '#00f3ff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let i = 0; i < ship.trailLen; i++) {
            let idx = (ship.trailIndex + i) % ship.trailLen;
            let tx = ship.trailX[idx];
            let ty = ship.trailY[idx];
            if (i === 0) ctx.moveTo(tx, ty);
            else ctx.lineTo(tx, ty);
        }
        ctx.stroke();
    }

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(ship.x, ship.y, ship.radius, 0, Math.PI * 2);
    ctx.fill();
}

function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

canvas.addEventListener('click', () => {
    if (!ship.active && !isAiming) {
        loadLevel(currentLevel);
    }
});

// Prebacivanje jezika klikom na dugme
langBtn.addEventListener('click', () => {
    currentLang = currentLang === 'sr' ? 'en' : 'sr';
    langBtn.innerText = translations[currentLang].langBtn;
    
    // Ažuriranje statičnih tekstova u UI-ju
    document.getElementById('controls-hint').innerText = translations[currentLang].hint;
    document.getElementById('level-text').innerText = `${translations[currentLang].level}: ${currentLevel} / ${totalLevels}`;
    
    // Ažuriranje goriva u zavisnosti od stanja
    if (ship.fuel > 0 && !ship.active) {
        document.getElementById('fuel-text').innerText = translations[currentLang].fuelActive;
    } else if (ship.fuel <= 0) {
        document.getElementById('fuel-text').innerText = translations[currentLang].fuelEmpty;
    }

    // Ponovno postavljanje trenutnog statusa na izabranom jeziku
    setStatus(lastStatusType, lastStatusParam);
});

loadLevel(1);
loop();