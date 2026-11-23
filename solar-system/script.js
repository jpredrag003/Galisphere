    const I18N = {
      sr: {
        docTitle: "Sunčev sistem",
        title: "Sunčev sistem",
        subtitle: "Prevlačenje, zumiranje i dodir na planetu",
        menuOpen: "☰ Kontrole",
        menuClose: "✕ Zatvori",
        pause: "Pauza",
        resume: "Nastavi",
        orbitsOn: "Orbite: UKLJ",
        orbitsOff: "Orbite: ISKLJ",
        trailsOn: "Tragovi: UKLJ",
        trailsOff: "Tragovi: ISKLJ",
        labelsOn: "Oznake: UKLJ",
        labelsOff: "Oznake: ISKLJ",
        beltOn: "Asteroidi: UKLJ",
        beltOff: "Asteroidi: ISKLJ",
        cometOn: "Kometa: UKLJ",
        cometOff: "Kometa: ISKLJ",
        followOn: "Fokus: UKLJ",
        followOff: "Fokus: ISKLJ",
        infoOn: "Kartica: UKLJ",
        infoOff: "Kartica: ISKLJ",
        focusSelectLabel: "Planeta:",
        resetView: "Reset",
        scaleLabel: "Skala:",
        optVisual: "Vizuelna (pregledna)",
        optAu: "Proporcionalna AJ",
        speedLabel: "Brzina:",
        langToggle: "EN",
        clockPrefix: "Proteklo vreme:",
        daysUnit: "zemaljskih dana",
        yearsUnit: "god.",
        auUnit: "AJ",
        labelAu: "Velika poluosa:",
        labelDist: "Trenutna distanca:",
        labelDiameter: "Prečnik:",
        labelPeriod: "Orbitalni period:",
        labelEcc: "Ekscentricitet:",
        terrestrial: "Terestrička planeta",
        gasGiant: "Gasoviti džin",
        iceGiant: "Ledeni džin",
        daysShort: "d",
        daysWord: "dana",
        yearsShort: "god.",
        cometName: "Kometa Hale-Bopp (stil)",
        lgSun: "Sunce",
        lgPlanets: "Planete (8)",
        lgBelt: "Glavni pojas asteroida",
        lgComet: "Kometa"
      },
      en: {
        docTitle: "Solar System",
        title: "Solar System",
        subtitle: "Drag, pinch-zoom, and tap any planet",
        menuOpen: "☰ Controls",
        menuClose: "✕ Close",
        pause: "Pause",
        resume: "Resume",
        orbitsOn: "Orbits: ON",
        orbitsOff: "Orbits: OFF",
        trailsOn: "Trails: ON",
        trailsOff: "Trails: OFF",
        labelsOn: "Labels: ON",
        labelsOff: "Labels: OFF",
        beltOn: "Asteroids: ON",
        beltOff: "Asteroids: OFF",
        cometOn: "Comet: ON",
        cometOff: "Comet: OFF",
        followOn: "Follow: ON",
        followOff: "Follow: OFF",
        infoOn: "Card: ON",
        infoOff: "Card: OFF",
        focusSelectLabel: "Planet:",
        resetView: "Reset",
        scaleLabel: "Scale:",
        optVisual: "Visual (clear view)",
        optAu: "Proportional AU",
        speedLabel: "Speed:",
        langToggle: "SR",
        clockPrefix: "Elapsed time:",
        daysUnit: "Earth days",
        yearsUnit: "yrs",
        auUnit: "AU",
        labelAu: "Semi-major axis:",
        labelDist: "Current distance:",
        labelDiameter: "Diameter:",
        labelPeriod: "Orbital period:",
        labelEcc: "Eccentricity:",
        terrestrial: "Terrestrial planet",
        gasGiant: "Gas giant",
        iceGiant: "Ice giant",
        daysShort: "d",
        daysWord: "days",
        yearsShort: "yrs",
        cometName: "Hale-Bopp style comet",
        lgSun: "Sun",
        lgPlanets: "Planets (8)",
        lgBelt: "Main asteroid belt",
        lgComet: "Comet"
      }
    };

    const PLANETS = [
      { id: "mercury", name: { sr: "Merkur", en: "Mercury" }, typeKey: "terrestrial", desc: { sr: "Najmanja i Suncu najbliža planeta, sa velikim temperaturnim razlikama i kraterima.", en: "Smallest and innermost planet, marked by extreme temperature swings and impact craters." }, au: 0.387, periodDays: 87.97, eccentricity: 0.2056, diameterKm: "4,879 km", radiusPx: 5.2, visualOrbitPx: 54, palette: ["#d6d3d1", "#78716c", "#292524"], angle: 0.4 },
      { id: "venus", name: { sr: "Venera", en: "Venus" }, typeKey: "terrestrial", desc: { sr: "Obavijena gustim oblacima sumporne kiseline i jakim efektom staklene bašte.", en: "Shrouded in thick sulfuric acid clouds with a runaway greenhouse atmosphere." }, au: 0.723, periodDays: 224.70, eccentricity: 0.0068, diameterKm: "12,104 km", radiusPx: 8.5, visualOrbitPx: 85, palette: ["#fef08a", "#eab308", "#854d0e"], angle: 1.7 },
      { id: "earth", name: { sr: "Zemlja", en: "Earth" }, typeKey: "terrestrial", desc: { sr: "Treća planeta od Sunca i jedina poznata planeta sa tečnom vodom na površini i životom.", en: "Third planet from the Sun and the only known world with liquid surface water and life." }, au: 1.000, periodDays: 365.26, eccentricity: 0.0167, diameterKm: "12,742 km", radiusPx: 9.2, visualOrbitPx: 119, palette: ["#7dd3fc", "#2563eb", "#0f172a"], isEarth: true, angle: 3.1 },
      { id: "mars", name: { sr: "Mars", en: "Mars" }, typeKey: "terrestrial", desc: { sr: "„Crvena planeta“ bogata gvozdenim oksidom, sa ogromnim vulkanima i kanjonima.", en: "The 'Red Planet' rich in iron oxide, home to colossal volcanoes and deep canyons." }, au: 1.524, periodDays: 686.98, eccentricity: 0.0934, diameterKm: "6,779 km", radiusPx: 6.8, visualOrbitPx: 154, palette: ["#fca5a5", "#dc2626", "#450a0a"], angle: 4.5 },
      { id: "jupiter", name: { sr: "Jupiter", en: "Jupiter" }, typeKey: "gasGiant", desc: { sr: "Najveća planeta Sunčevog sistema, gasoviti džin sa pojasima oblaka i Velikom crvenom pegom.", en: "Largest planet in the Solar System, a gas giant with banded clouds and the Great Red Spot." }, au: 5.204, periodDays: 4332.59, eccentricity: 0.0489, diameterKm: "139,820 km", radiusPx: 18.8, visualOrbitPx: 212, palette: ["#fef3c7", "#d97706", "#451a03"], isJupiter: true, angle: 0.9 },
      { id: "saturn", name: { sr: "Saturn", en: "Saturn" }, typeKey: "gasGiant", desc: { sr: "Poznat po raskošnom sistemu ledenih i kamenih prstenova i maloj srednjoj gustini.", en: "Famed for its prominent icy and rocky ring system and low average density." }, au: 9.582, periodDays: 10759.22, eccentricity: 0.0565, diameterKm: "116,460 km", radiusPx: 15.6, visualOrbitPx: 270, palette: ["#fef9c3", "#eab308", "#713f12"], hasRings: true, angle: 2.4 },
      { id: "uranus", name: { sr: "Uran", en: "Uranus" }, typeKey: "iceGiant", desc: { sr: "Ledeni džin plavičaste nijanse usled metana u atmosferi, nagnute ose rotacije blizu ravni orbite.", en: "Cyan ice giant colored by atmospheric methane, rotating nearly on its side." }, au: 19.201, periodDays: 30688.5, eccentricity: 0.0463, diameterKm: "50,724 km", radiusPx: 12.2, visualOrbitPx: 324, palette: ["#cffafe", "#06b6d4", "#164e63"], hasTiltRing: true, angle: 5.1 },
      { id: "neptune", name: { sr: "Neptun", en: "Neptune" }, typeKey: "iceGiant", desc: { sr: "Najudaljenija velika planeta, tamnoplavi ledeni džin sa snažnim vetrovima.", en: "Most distant major planet, a deep-blue ice giant swept by supersonic winds." }, au: 30.047, periodDays: 60195.0, eccentricity: 0.0095, diameterKm: "49,244 km", radiusPx: 12, visualOrbitPx: 374, palette: ["#bfdbfe", "#2563eb", "#172554"], angle: 3.8 }
    ];

    const comet = { au: 6.5, periodDays: 2900, eccentricity: 0.78, visualOrbitPx: 245, radiusPx: 3.4, angle: 0.65 };

    const dom = {
      canvas: document.getElementById("solarCanvas"),
      controlsWrap: document.getElementById("controlsWrap"),
      menuToggleBtn: document.getElementById("menuToggleBtn"),
      quickPlayBtn: document.getElementById("quickPlayBtn"),
      infoCard: document.getElementById("infoCard"),
      togglePlayBtn: document.getElementById("togglePlayBtn"),
      toggleOrbitsBtn: document.getElementById("toggleOrbitsBtn"),
      toggleTrailsBtn: document.getElementById("toggleTrailsBtn"),
      toggleLabelsBtn: document.getElementById("toggleLabelsBtn"),
      toggleBeltBtn: document.getElementById("toggleBeltBtn"),
      toggleCometBtn: document.getElementById("toggleCometBtn"),
      toggleFollowBtn: document.getElementById("toggleFollowBtn"),
      toggleInfoBtn: document.getElementById("toggleInfoBtn"),
      closeCardBtn: document.getElementById("closeCardBtn"),
      planetSelect: document.getElementById("planetSelect"),
      scaleModeSelect: document.getElementById("scaleMode"),
      speedRange: document.getElementById("speedRange"),
      speedValue: document.getElementById("speedValue"),
      langBtn: document.getElementById("langBtn"),
      zoomInBtn: document.getElementById("zoomInBtn"),
      zoomOutBtn: document.getElementById("zoomOutBtn"),
      resetViewBtn: document.getElementById("resetViewBtn"),
      zoomLabel: document.getElementById("zoomLabel"),
      elapsedDays: document.getElementById("elapsedDays"),
      elapsedYears: document.getElementById("elapsedYears")
    };

    const ctx = dom.canvas.getContext("2d");

    const state = {
      lang: "sr",
      isPlaying: true,
      showOrbits: true,
      showTrails: true,
      showLabels: true,
      showBelt: true,
      showComet: true,
      followSelected: false,
      showInfoCard: true,
      scaleMode: "visual",
      speedMultiplier: 2.0,
      zoom: 1.0,
      panX: 0,
      panY: 0,
      simDays: 0,
      selectedPlanet: PLANETS[2],
      hoveredPlanet: null,
      lastTimestamp: null,
      lastCardSync: 0
    };

    const isMobileViewport = () => window.innerWidth <= 820;

    const stars = Array.from({ length: 240 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.35 + 0.25,
      alpha: Math.random() * 0.8 + 0.18,
      twinkleSpeed: Math.random() * 0.003 + 0.001,
      phase: Math.random() * Math.PI * 2
    }));

    const asteroids = Array.from({ length: 220 }, () => ({
      angle: Math.random() * Math.PI * 2,
      au: 2.2 + Math.random() * 1.1,
      r: Math.random() * 1.3 + 0.45,
      alpha: Math.random() * 0.48 + 0.15
    }));

    const planetScreenHits = [];

    function setZoom(newZoom) {
      state.zoom = Math.max(0.5, Math.min(3.0, newZoom));
      dom.zoomLabel.textContent = `${Math.round(state.zoom * 100)}%`;
    }

    function setInfoCardVisible(visible) {
      state.showInfoCard = visible;
      dom.infoCard.classList.toggle("hidden", !visible);
      dom.toggleInfoBtn.classList.toggle("active", visible);
      dom.toggleInfoBtn.textContent = visible ? I18N[state.lang].infoOn : I18N[state.lang].infoOff;
    }

    function setPlayState(playing) {
      state.isPlaying = playing;
      const label = playing ? I18N[state.lang].pause : I18N[state.lang].resume;
      dom.togglePlayBtn.textContent = label;
      dom.quickPlayBtn.textContent = label;
      dom.quickPlayBtn.classList.toggle("active", playing);
    }

    function resizeCanvas() {
      const rect = dom.canvas.parentElement.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
      dom.canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      dom.canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function getMaxOrbitRadius() {
      const w = dom.canvas.clientWidth;
      const h = dom.canvas.clientHeight;
      const mobileBias = isMobileViewport() ? 0.43 : 0.46;
      return Math.min(w, h) * mobileBias * state.zoom;
    }

    function getOrbitSemiMajorPx(body) {
      const maxAvailableRadius = getMaxOrbitRadius();
      if (state.scaleMode === "au") {
        const auToPx = maxAvailableRadius / 30.5;
        return Math.max(16 * state.zoom, body.au * auToPx);
      }
      const factor = Math.min(1.15, maxAvailableRadius / (378 * state.zoom)) * state.zoom;
      return body.visualOrbitPx * factor;
    }

    function getBodyPositionAtAngle(body, angle, sunX, sunY, eccScale = 1.35, maxEcc = 0.34) {
      const a = getOrbitSemiMajorPx(body);
      const e = Math.min(body.eccentricity * eccScale, maxEcc);
      const b = a * Math.sqrt(1 - e * e);
      const focalOffset = a * e;
      const x = sunX - focalOffset + a * Math.cos(angle);
      const y = sunY + b * Math.sin(angle);
      const currentAu = body.au * (1 - e * Math.cos(angle));
      return { x, y, a, b, focalOffset, currentAu };
    }

    function getCameraOrigin(width, height) {
      const offsetY = isMobileViewport() && state.showInfoCard ? -height * 0.09 : 0;
      const screenCx = width * 0.5 + state.panX;
      const screenCy = height * 0.5 + offsetY + state.panY;
      if (!state.followSelected || !state.selectedPlanet) {
        return { sunX: screenCx, sunY: screenCy };
      }
      const rawPos = getBodyPositionAtAngle(state.selectedPlanet, state.selectedPlanet.angle, 0, 0);
      return { sunX: screenCx - rawPos.x, sunY: screenCy - rawPos.y };
    }

    function populatePlanetSelect() {
      dom.planetSelect.innerHTML = "";
      PLANETS.forEach((p, idx) => {
        const opt = document.createElement("option");
        opt.value = String(idx);
        opt.textContent = p.name[state.lang];
        if (p === state.selectedPlanet) opt.selected = true;
        dom.planetSelect.appendChild(opt);
      });
    }

    function updateInfoCard(planet, openIfClosed = false) {
      const t = I18N[state.lang];
      state.selectedPlanet = planet;
      const idx = PLANETS.indexOf(planet);
      if (idx !== -1) dom.planetSelect.value = String(idx);
      if (openIfClosed && !state.showInfoCard) setInfoCardVisible(true);

      const dot = document.getElementById("planetDot");
      dot.style.background = planet.palette[1];
      dot.style.boxShadow = `0 0 12px ${planet.palette[1]}`;
      document.getElementById("planetName").textContent = planet.name[state.lang];
      document.getElementById("planetType").textContent = t[planet.typeKey];
      document.getElementById("planetDesc").textContent = planet.desc[state.lang];
      document.getElementById("planetAu").textContent = `${planet.au.toFixed(3)} ${t.auUnit}`;
      const pos = getBodyPositionAtAngle(planet, planet.angle, 0, 0);
      document.getElementById("planetDist").textContent = `${pos.currentAu.toFixed(3)} ${t.auUnit}`;
      document.getElementById("planetDiameter").textContent = planet.diameterKm;
      const years = planet.periodDays / 365.256;
      document.getElementById("planetPeriod").textContent = planet.periodDays > 1000
        ? `${planet.periodDays.toFixed(1)} ${t.daysShort} (${years.toFixed(2)} ${t.yearsShort})`
        : `${planet.periodDays.toFixed(2)} ${t.daysWord}`;
      document.getElementById("planetEcc").textContent = planet.eccentricity.toFixed(4);
    }

    function applyLanguage() {
      const t = I18N[state.lang];
      const isMenuOpen = dom.controlsWrap.classList.contains("open");
      document.documentElement.lang = state.lang;
      document.title = t.docTitle;
      document.getElementById("uiTitle").textContent = t.title;
      document.getElementById("uiSubtitle").textContent = t.subtitle;
      dom.menuToggleBtn.textContent = isMenuOpen ? t.menuClose : t.menuOpen;
      setPlayState(state.isPlaying);
      dom.toggleOrbitsBtn.textContent = state.showOrbits ? t.orbitsOn : t.orbitsOff;
      dom.toggleTrailsBtn.textContent = state.showTrails ? t.trailsOn : t.trailsOff;
      dom.toggleLabelsBtn.textContent = state.showLabels ? t.labelsOn : t.labelsOff;
      dom.toggleBeltBtn.textContent = state.showBelt ? t.beltOn : t.beltOff;
      dom.toggleCometBtn.textContent = state.showComet ? t.cometOn : t.cometOff;
      dom.toggleFollowBtn.textContent = state.followSelected ? t.followOn : t.followOff;
      dom.toggleInfoBtn.textContent = state.showInfoCard ? t.infoOn : t.infoOff;
      document.getElementById("uiFocusSelectLabel").textContent = t.focusSelectLabel;
      dom.resetViewBtn.textContent = t.resetView;
      document.getElementById("uiScaleLabel").textContent = t.scaleLabel;
      document.getElementById("optVisual").textContent = t.optVisual;
      document.getElementById("optAu").textContent = t.optAu;
      document.getElementById("uiSpeedLabel").textContent = t.speedLabel;
      dom.langBtn.textContent = t.langToggle;
      document.getElementById("uiClockPrefix").textContent = t.clockPrefix;
      document.getElementById("uiDaysUnit").textContent = t.daysUnit;
      document.getElementById("uiYearsUnit").textContent = t.yearsUnit;
      document.getElementById("uiLabelAu").textContent = t.labelAu;
      document.getElementById("uiLabelDist").textContent = t.labelDist;
      document.getElementById("uiLabelDiameter").textContent = t.labelDiameter;
      document.getElementById("uiLabelPeriod").textContent = t.labelPeriod;
      document.getElementById("uiLabelEcc").textContent = t.labelEcc;
      document.getElementById("lgSun").textContent = t.lgSun;
      document.getElementById("lgPlanets").textContent = t.lgPlanets;
      document.getElementById("lgBelt").textContent = t.lgBelt;
      document.getElementById("lgComet").textContent = t.lgComet;
      populatePlanetSelect();
      updateInfoCard(state.selectedPlanet);
    }

    function drawStars(width, height, timestamp) {
      for (const s of stars) {
        const twinkle = 0.72 + 0.28 * Math.sin(timestamp * s.twinkleSpeed + s.phase);
        ctx.fillStyle = `rgba(226, 232, 240, ${(s.alpha * twinkle).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(s.x * width, s.y * height, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function drawAsteroidBelt(sunX, sunY) {
      if (!state.showBelt) return;
      const maxAvailableRadius = getMaxOrbitRadius();
      const auToPx = maxAvailableRadius / 30.5;
      const factor = Math.min(1.15, maxAvailableRadius / (378 * state.zoom)) * state.zoom;
      for (const a of asteroids) {
        const radiusPx = state.scaleMode === "au" ? a.au * auToPx : (154 + (a.au - 2.2) * 44) * factor;
        const x = sunX + Math.cos(a.angle) * radiusPx;
        const y = sunY + Math.sin(a.angle) * radiusPx * 0.98;
        ctx.fillStyle = `rgba(148, 163, 184, ${a.alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, Math.max(0.5, a.r * Math.sqrt(state.zoom)), 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function drawSun(sunX, sunY, timestamp) {
      const baseR = (state.scaleMode === "au" ? 8 : 20) * state.zoom;
      const pulse = 1 + 0.025 * Math.sin(timestamp * 0.004);
      const sunRadius = baseR * pulse;
      const corona = ctx.createRadialGradient(sunX, sunY, sunRadius * 0.25, sunX, sunY, sunRadius * 4.5);
      corona.addColorStop(0, "rgba(254, 249, 195, 0.98)");
      corona.addColorStop(0.25, "rgba(250, 204, 21, 0.55)");
      corona.addColorStop(0.58, "rgba(249, 115, 22, 0.16)");
      corona.addColorStop(1, "rgba(234, 88, 12, 0)");
      ctx.fillStyle = corona;
      ctx.beginPath();
      ctx.arc(sunX, sunY, sunRadius * 4.5, 0, Math.PI * 2);
      ctx.fill();

      const bodyGrad = ctx.createRadialGradient(
        sunX - sunRadius * 0.28, sunY - sunRadius * 0.28, sunRadius * 0.1,
        sunX, sunY, sunRadius
      );
      bodyGrad.addColorStop(0, "#ffffff");
      bodyGrad.addColorStop(0.45, "#facc15");
      bodyGrad.addColorStop(1, "#ea580c");
      ctx.fillStyle = bodyGrad;
      ctx.beginPath();
      ctx.arc(sunX, sunY, sunRadius, 0, Math.PI * 2);
      ctx.fill();
    }

    function drawMotionTrail(planet, sunX, sunY) {
      if (!state.showTrails) return;
      const segments = 24;
      const arcSpan = 0.65;
      for (let i = 0; i < segments; i++) {
        const t0 = i / segments;
        const t1 = (i + 1) / segments;
        const a0 = planet.angle - arcSpan * (1 - t0);
        const a1 = planet.angle - arcSpan * (1 - t1);
        const p0 = getBodyPositionAtAngle(planet, a0, sunX, sunY);
        const p1 = getBodyPositionAtAngle(planet, a1, sunX, sunY);
        ctx.strokeStyle = planet.palette[1];
        ctx.globalAlpha = t1 * 0.36;
        ctx.lineWidth = Math.max(1, t1 * 2.6 * Math.sqrt(state.zoom));
        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    }

    function drawSaturnRingHalf(x, y, r, half) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(-0.34);
      const startAngle = half === "back" ? Math.PI : 0;
      const endAngle = half === "back" ? Math.PI * 2 : Math.PI;
      ctx.strokeStyle = "rgba(254, 240, 138, 0.32)";
      ctx.lineWidth = Math.max(1.6, r * 0.24);
      ctx.beginPath();
      ctx.ellipse(0, 0, r * 2.3, r * 0.7, 0, startAngle, endAngle);
      ctx.stroke();

      ctx.strokeStyle = "rgba(253, 224, 71, 0.68)";
      ctx.lineWidth = Math.max(1.2, r * 0.16);
      ctx.beginPath();
      ctx.ellipse(0, 0, r * 1.85, r * 0.56, 0, startAngle, endAngle);
      ctx.stroke();
      ctx.restore();
    }

    function drawPlanetSphere(x, y, r, planet, sunX, sunY) {
      if (planet.hasRings) drawSaturnRingHalf(x, y, r, "back");
      const toSunAngle = Math.atan2(sunY - y, sunX - x);
      const hx = x + Math.cos(toSunAngle) * r * 0.36;
      const hy = y + Math.sin(toSunAngle) * r * 0.36;

      if (planet.isEarth) {
        ctx.strokeStyle = "rgba(125, 211, 252, 0.38)";
        ctx.lineWidth = 2.4;
        ctx.beginPath();
        ctx.arc(x, y, r + 1.8, 0, Math.PI * 2);
        ctx.stroke();
      }

      const grad = ctx.createRadialGradient(hx, hy, r * 0.1, x, y, r * 1.18);
      grad.addColorStop(0, planet.palette[0]);
      grad.addColorStop(0.62, planet.palette[1]);
      grad.addColorStop(1, planet.palette[2]);

      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.clip();

      if (planet.isEarth && r >= 5) {
        ctx.fillStyle = "rgba(34, 197, 94, 0.45)";
        ctx.beginPath();
        ctx.ellipse(x - r * 0.25, y - r * 0.2, r * 0.48, r * 0.32, 0.4, 0, Math.PI * 2);
        ctx.ellipse(x + r * 0.35, y + r * 0.25, r * 0.35, r * 0.42, -0.3, 0, Math.PI * 2);
        ctx.fill();
      }

      if (planet.isJupiter && r >= 6) {
        ctx.fillStyle = "rgba(120, 53, 15, 0.3)";
        for (let offset = -r * 0.65; offset <= r * 0.65; offset += r * 0.34) {
          ctx.fillRect(x - r, y + offset, r * 2, r * 0.15);
        }
        ctx.fillStyle = "rgba(185, 28, 28, 0.55)";
        ctx.beginPath();
        ctx.ellipse(x + r * 0.22, y + r * 0.24, r * 0.24, r * 0.14, 0.1, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      if (planet.hasRings) drawSaturnRingHalf(x, y, r, "front");

      if (planet.hasTiltRing) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(1.25);
        ctx.strokeStyle = "rgba(165, 243, 252, 0.38)";
        ctx.lineWidth = 1.25;
        ctx.beginPath();
        ctx.ellipse(0, 0, r * 1.7, r * 0.46, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      if (planet === state.selectedPlanet || planet === state.hoveredPlanet) {
        ctx.strokeStyle = planet === state.selectedPlanet
          ? "rgba(255, 255, 255, 0.92)"
          : "rgba(125, 211, 252, 0.65)";
        ctx.lineWidth = planet === state.selectedPlanet ? 1.8 : 1.3;
        ctx.beginPath();
        ctx.arc(x, y, r + 4, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    function drawComet(sunX, sunY) {
      if (!state.showComet) return;
      const pos = getBodyPositionAtAngle(comet, comet.angle, sunX, sunY, 1.0, 0.62);
      if (state.showOrbits) {
        ctx.save();
        ctx.setLineDash([4, 6]);
        ctx.strokeStyle = "rgba(186, 230, 253, 0.18)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.ellipse(sunX - pos.focalOffset, sunY, pos.a, pos.b, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      const awayFromSunAngle = Math.atan2(pos.y - sunY, pos.x - sunX);
      const proximity = Math.max(0.25, Math.min(1.4, 2.5 / Math.max(0.4, pos.currentAu)));
      const tailLen = 36 * state.zoom * proximity;
      const tailX = pos.x + Math.cos(awayFromSunAngle) * tailLen;
      const tailY = pos.y + Math.sin(awayFromSunAngle) * tailLen;

      const tailGrad = ctx.createLinearGradient(pos.x, pos.y, tailX, tailY);
      tailGrad.addColorStop(0, "rgba(224, 242, 254, 0.75)");
      tailGrad.addColorStop(1, "rgba(56, 189, 248, 0)");
      ctx.strokeStyle = tailGrad;
      ctx.lineWidth = Math.max(1.5, 4.5 * Math.sqrt(state.zoom));
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
      ctx.lineTo(tailX, tailY);
      ctx.stroke();

      ctx.fillStyle = "#e0f2fe";
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, Math.max(2, comet.radiusPx * Math.sqrt(state.zoom)), 0, Math.PI * 2);
      ctx.fill();

      if (state.showLabels) {
        ctx.fillStyle = "#bae6fd";
        ctx.font = "11px system-ui, sans-serif";
        ctx.fillText(I18N[state.lang].cometName, pos.x + 8, pos.y - 6);
      }
    }

    function hitTestPlanet(px, py) {
      for (let i = planetScreenHits.length - 1; i >= 0; i--) {
        const h = planetScreenHits[i];
        const hitRadius = Math.max(h.r + 10, 18);
        const dx = px - h.x;
        const dy = py - h.y;
        if (dx * dx + dy * dy <= hitRadius * hitRadius) {
          return h.planet;
        }
      }
      return null;
    }

    function render(timestamp) {
      if (state.lastTimestamp === null) state.lastTimestamp = timestamp;
      const dtSeconds = Math.min((timestamp - state.lastTimestamp) / 1000, 0.1);
      state.lastTimestamp = timestamp;

      const daysPerSecAt1x = 30;
      if (state.isPlaying) {
        const deltaDays = dtSeconds * daysPerSecAt1x * state.speedMultiplier;
        state.simDays += deltaDays;
        for (const p of PLANETS) {
          p.angle += ((Math.PI * 2) / p.periodDays) * deltaDays;
        }
        comet.angle += ((Math.PI * 2) / comet.periodDays) * deltaDays;
      }

      const width = dom.canvas.clientWidth;
      const height = dom.canvas.clientHeight;
      const { sunX, sunY } = getCameraOrigin(width, height);

      ctx.clearRect(0, 0, width, height);
      drawStars(width, height, timestamp);
      drawAsteroidBelt(sunX, sunY);
      drawSun(sunX, sunY, timestamp);
      drawComet(sunX, sunY);

      planetScreenHits.length = 0;

      for (const p of PLANETS) {
        const pos = getBodyPositionAtAngle(p, p.angle, sunX, sunY);
        if (state.showOrbits) {
          const isSelected = p === state.selectedPlanet;
          ctx.strokeStyle = isSelected ? "rgba(56, 189, 248, 0.58)" : "rgba(148, 163, 184, 0.14)";
          ctx.lineWidth = isSelected ? 1.5 : 1;
          ctx.beginPath();
          ctx.ellipse(sunX - pos.focalOffset, sunY, pos.a, pos.b, 0, 0, Math.PI * 2);
          ctx.stroke();
        }

        drawMotionTrail(p, sunX, sunY);

        const r = Math.max(
          state.scaleMode === "au" ? 3.2 : 4.2,
          p.radiusPx * (state.scaleMode === "au" ? 0.65 : 1) * Math.sqrt(state.zoom)
        );
        drawPlanetSphere(pos.x, pos.y, r, p, sunX, sunY);
        planetScreenHits.push({ planet: p, x: pos.x, y: pos.y, r });

        if (state.showLabels) {
          ctx.fillStyle = p === state.selectedPlanet ? "#ffffff" : "#cbd5e1";
          ctx.font = p === state.selectedPlanet
            ? "600 11.5px system-ui, sans-serif"
            : "11px system-ui, sans-serif";
          ctx.fillText(p.name[state.lang], pos.x + r + 5, pos.y - r * 0.4);
        }
      }

      dom.elapsedDays.textContent = state.simDays.toFixed(1);
      dom.elapsedYears.textContent = (state.simDays / 365.256).toFixed(2);

      if (state.showInfoCard && state.selectedPlanet && timestamp - state.lastCardSync > 120) {
        state.lastCardSync = timestamp;
        const currentPos = getBodyPositionAtAngle(state.selectedPlanet, state.selectedPlanet.angle, 0, 0);
        document.getElementById("planetDist").textContent = `${currentPos.currentAu.toFixed(3)} ${I18N[state.lang].auUnit}`;
      }

      requestAnimationFrame(render);
    }

    // POINTER & TOUCH INTERACTION (PAN, PINCH-ZOOM, TAP/CLICK PLANET)
    let isDragging = false;
    let dragMoved = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let panStartX = 0;
    let panStartY = 0;
    let pinchStartDist = 0;
    let pinchStartZoom = 1;

    function getTouchDistance(t1, t2) {
      return Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
    }

    dom.canvas.addEventListener("pointerdown", (e) => {
      if (e.pointerType === "touch" && e.isPrimary === false) return;
      isDragging = true;
      dragMoved = false;
      dragStartX = e.clientX;
      dragStartY = e.clientY;
      panStartX = state.panX;
      panStartY = state.panY;
      dom.canvas.setPointerCapture(e.pointerId);
    });

    dom.canvas.addEventListener("pointermove", (e) => {
      const rect = dom.canvas.getBoundingClientRect();
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;

      if (!isDragging) {
        const hit = hitTestPlanet(px, py);
        state.hoveredPlanet = hit;
        dom.canvas.style.cursor = hit ? "pointer" : "grab";
        return;
      }

      const dx = e.clientX - dragStartX;
      const dy = e.clientY - dragStartY;
      if (Math.hypot(dx, dy) > 5) {
        dragMoved = true;
        if (state.followSelected) {
          state.followSelected = false;
          dom.toggleFollowBtn.classList.remove("active");
          dom.toggleFollowBtn.textContent = I18N[state.lang].followOff;
        }
        state.panX = panStartX + dx;
        state.panY = panStartY + dy;
      }
    });

    dom.canvas.addEventListener("pointerup", (e) => {
      if (!isDragging) return;
      isDragging = false;
      if (dom.canvas.hasPointerCapture(e.pointerId)) {
        dom.canvas.releasePointerCapture(e.pointerId);
      }
      if (!dragMoved) {
        const rect = dom.canvas.getBoundingClientRect();
        const hit = hitTestPlanet(e.clientX - rect.left, e.clientY - rect.top);
        if (hit) {
          updateInfoCard(hit, true);
        }
      }
    });

    dom.canvas.addEventListener("touchstart", (e) => {
      if (e.touches.length === 2) {
        isDragging = false;
        pinchStartDist = getTouchDistance(e.touches[0], e.touches[1]);
        pinchStartZoom = state.zoom;
      }
    }, { passive: true });

    dom.canvas.addEventListener("touchmove", (e) => {
      if (e.touches.length === 2 && pinchStartDist > 0) {
        const dist = getTouchDistance(e.touches[0], e.touches[1]);
        setZoom(pinchStartZoom * (dist / pinchStartDist));
      }
    }, { passive: true });

    dom.canvas.addEventListener("wheel", (e) => {
      e.preventDefault();
      setZoom(state.zoom * (e.deltaY < 0 ? 1.12 : 0.89));
    }, { passive: false });

    // CONTROLS EVENTS
    dom.menuToggleBtn.addEventListener("click", () => {
      const open = dom.controlsWrap.classList.toggle("open");
      dom.menuToggleBtn.setAttribute("aria-expanded", String(open));
      dom.menuToggleBtn.textContent = open ? I18N[state.lang].menuClose : I18N[state.lang].menuOpen;
    });

    const handlePlayToggle = () => {
      setPlayState(!state.isPlaying);
    };
    dom.togglePlayBtn.addEventListener("click", handlePlayToggle);
    dom.quickPlayBtn.addEventListener("click", handlePlayToggle);

    dom.speedRange.addEventListener("input", (e) => {
      state.speedMultiplier = parseFloat(e.target.value);
      dom.speedValue.textContent = `${state.speedMultiplier.toFixed(1)}x`;
    });

    dom.scaleModeSelect.addEventListener("change", (e) => {
      state.scaleMode = e.target.value;
    });

    dom.toggleOrbitsBtn.addEventListener("click", () => {
      state.showOrbits = !state.showOrbits;
      dom.toggleOrbitsBtn.classList.toggle("active", state.showOrbits);
      dom.toggleOrbitsBtn.textContent = state.showOrbits ? I18N[state.lang].orbitsOn : I18N[state.lang].orbitsOff;
    });

    dom.toggleTrailsBtn.addEventListener("click", () => {
      state.showTrails = !state.showTrails;
      dom.toggleTrailsBtn.classList.toggle("active", state.showTrails);
      dom.toggleTrailsBtn.textContent = state.showTrails ? I18N[state.lang].trailsOn : I18N[state.lang].trailsOff;
    });

    dom.toggleLabelsBtn.addEventListener("click", () => {
      state.showLabels = !state.showLabels;
      dom.toggleLabelsBtn.classList.toggle("active", state.showLabels);
      dom.toggleLabelsBtn.textContent = state.showLabels ? I18N[state.lang].labelsOn : I18N[state.lang].labelsOff;
    });

    dom.toggleBeltBtn.addEventListener("click", () => {
      state.showBelt = !state.showBelt;
      dom.toggleBeltBtn.classList.toggle("active", state.showBelt);
      dom.toggleBeltBtn.textContent = state.showBelt ? I18N[state.lang].beltOn : I18N[state.lang].beltOff;
    });

    dom.toggleCometBtn.addEventListener("click", () => {
      state.showComet = !state.showComet;
      dom.toggleCometBtn.classList.toggle("active", state.showComet);
      dom.toggleCometBtn.textContent = state.showComet ? I18N[state.lang].cometOn : I18N[state.lang].cometOff;
    });

    dom.planetSelect.addEventListener("change", (e) => {
      const p = PLANETS[parseInt(e.target.value, 10)];
      if (p) {
        state.panX = 0;
        state.panY = 0;
        updateInfoCard(p, true);
      }
    });

    dom.toggleFollowBtn.addEventListener("click", () => {
      state.followSelected = !state.followSelected;
      if (state.followSelected) {
        state.panX = 0;
        state.panY = 0;
      }
      dom.toggleFollowBtn.classList.toggle("active", state.followSelected);
      dom.toggleFollowBtn.textContent = state.followSelected ? I18N[state.lang].followOn : I18N[state.lang].followOff;
    });

    dom.toggleInfoBtn.addEventListener("click", () => {
      setInfoCardVisible(!state.showInfoCard);
    });

    dom.closeCardBtn.addEventListener("click", () => {
      setInfoCardVisible(false);
    });

    dom.langBtn.addEventListener("click", () => {
      state.lang = state.lang === "sr" ? "en" : "sr";
      applyLanguage();
    });

    dom.zoomInBtn.addEventListener("click", () => setZoom(state.zoom * 1.2));
    dom.zoomOutBtn.addEventListener("click", () => setZoom(state.zoom / 1.2));
    dom.resetViewBtn.addEventListener("click", () => {
      setZoom(1.0);
      state.panX = 0;
      state.panY = 0;
    });

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("orientationchange", () => setTimeout(resizeCanvas, 120));

    resizeCanvas();
    applyLanguage();
    requestAnimationFrame(render);