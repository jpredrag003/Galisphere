// Kreiranje zvezda u pozadini
for(let t=0; t<60; t++){
  let tElem = document.createElement("div");
  tElem.className = "star";
  tElem.style.width = 3 * Math.random() + "px";
  tElem.style.height = tElem.style.width;
  tElem.style.top = Math.random() * window.innerHeight + "px";
  tElem.style.left = Math.random() * window.innerWidth + "px";
  tElem.style.opacity = Math.random();
  document.body.appendChild(tElem);
}

let currentReportText = "";
let planetAudio = new Audio();
planetAudio.volume = 0.25; 

let currentLang = "sr"; // Početni jezik
let activePlanetKey = null; // Pamti koja je planeta trenutno izabrana

const temePlaneta = {
  merkur: {
    type: "weather", 
    audioFile: "jingle/mercury.mp3", 
    bgColor: "#808080", 
    panelBg: "rgba(100, 100, 100, 0.85)", 
    borderColor: "#cccccc", 
    glowColor: "rgba(200, 200, 200, 0.4)", 
    textColor: "#e0e0e0", 
    data: {
      sr: {name:"MERKUR (Ekstremni Vreli Blizanac)", temp:"+430 °C / -180 °C", atmosphere:"Egzosfera (Ksenon, Helijum)", wind:"Solarni vetar direktno", report:"Pažnja! Na sunčanoj strani Merkura temperatura topi čelik, dok na noćnoj strani možete da se smrznete u sekundi. Ponesite i jaknu i šatorsko krilo sa solarnim štitom!"},
      en: {name:"MERCURY (Extreme Hot Twin)", temp:"+430 °C / -180 °C", atmosphere:"Exosphere (Xenon, Helium)", wind:"Direct solar wind", report:"Attention! On Mercury's sunlit side, temperatures melt steel, while on the night side you can freeze in a second. Bring both a jacket and a solar-shielded tent!"}
    }
  },
  venera: {
    type: "weather", 
    audioFile: "jingle/venus.mp3", 
    bgColor: "#2d1508", 
    panelBg: "rgba(70, 30, 10, 0.85)", 
    borderColor: "#f6ad55", 
    glowColor: "rgba(246, 173, 85, 0.5)", 
    textColor: "#f6ad55", 
    data: {
      sr: {name:"VENERA (Pakleni Resort)", temp:"+460 °C", atmosphere:"Sumporna kiselina, 92 bar", wind:"360 km/h", report:"Danas na Veneri imamo prelepu kišu od sumporne kiseline i prijatnih 460 stepeni Celzijusa – idealno vreme za pečenje pilića na otvorenom bez korišćenja rerne!"},
      en: {name:"VENUS (Hellish Resort)", temp:"+460 °C", atmosphere:"Sulfuric acid, 92 bar", wind:"360 km/h", report:"Today on Venus we have beautiful sulfuric acid rain and a pleasant 460 degrees Celsius – ideal weather for roasting chickens outdoors without using an oven!"}
    }
  },
  zemlja: {
    type: "weather", 
    audioFile: "jingle/earth.mp3", 
    bgColor: "#091f2c", 
    panelBg: "rgba(15, 60, 90, 0.8)", 
    borderColor: "#63b3ed", 
    glowColor: "rgba(99, 179, 237, 0.5)", 
    textColor: "#63b3ed", 
    data: {
      sr: {name:"ZEMLJA (Matična Kolevka)", temp:"+15 °C", atmosphere:"Azot, Kiseonik, 1 bar", wind:"15 km/h", report:"Uslovi na površini su izuzetno stabilni. Previše kiseonika, nema vanzemaljskih najezda u ovom sektoru. Preporučuje se šetnja bez skafandera."},
      en: {name:"EARTH (Home Cradle)", temp:"+15 °C", atmosphere:"Nitrogen, Oxygen, 1 bar", wind:"15 km/h", report:"Surface conditions are extremely stable. Too much oxygen, no alien invasions in this sector. A spacewalk without a suit is recommended."}
    }
  },
  mars: {
    type: "weather", 
    audioFile: "jingle/mars.mp3", 
    bgColor: "#2a1005", 
    panelBg: "rgba(80, 25, 10, 0.8)", 
    borderColor: "#fc8181", 
    glowColor: "rgba(252, 129, 129, 0.5)", 
    textColor: "#fc8181", 
    data: {
      sr: {name:"MARS (Crvena Dolina)", temp:"-60 °C", atmosphere:"Ugljen-dioksid (95%)", wind:"90 km/h", report:"Pažnja građani! Crvena prašina vam se već zavukla u zube. Očekujemo masivnu peščanu olujnu frontu uz topli čaj od rđe."},
      en: {name:"MARS (Red Valley)", temp:"-60 °C", atmosphere:"Carbon dioxide (95%)", wind:"90 km/h", report:"Attention citizens! The red dust has already gotten into your teeth. Expect a massive dust storm front along with warm rust tea."}
    }
  },
  jupiter: {
    type: "weather", 
    audioFile: "jingle/jupiter.mp3", 
    bgColor: "#21160e", 
    panelBg: "rgba(60, 40, 20, 0.8)", 
    borderColor: "#d6bcfa", 
    glowColor: "rgba(214, 188, 250, 0.5)", 
    textColor: "#d6bcfa", 
    data: {
      sr: {name:"JUPITER (Olujni Džin)", temp:"-110 °C", atmosphere:"Vodonik i Helijum", wind:"650 km/h", report:"Velika crvena mrlja pravi žurku vekovima. Ako izađete napolje, bićete kompresovani u dijamant brže nego što možete da kažete gasoviti džin."},
      en: {name:"JUPITER (Storm Giant)", temp:"-110 °C", atmosphere:"Hydrogen and Helium", wind:"650 km/h", report:"The Great Red Spot has been partying for centuries. If you step outside, you'll be compressed into a diamond faster than you can say gas giant."}
    }
  },
  saturn: {
    type: "weather", 
    audioFile: "jingle/saturn.mp3", 
    bgColor: "#1a1612", 
    panelBg: "rgba(45, 38, 30, 0.85)", 
    borderColor: "#ed8936", 
    glowColor: "rgba(237, 137, 54, 0.5)", 
    textColor: "#ed8936", 
    data: {
      sr: {name:"SATURN (Gospodar Prstenova)", temp:"-140 °C", atmosphere:"Vodonik, Metan", wind:"1.800 km/h", report:"Ledenice lete svuda oko prstenova. Pazite da vam ledeni asteroid ne okrzne krov svemirske letelice."},
      en: {name:"SATURN (Lord of the Rings)", temp:"-140 °C", atmosphere:"Hydrogen, Methane", wind:"1,800 km/h", report:"Icicles are flying all around the rings. Watch out that an icy asteroid doesn't graze the roof of your spacecraft."}
    }
  },
  uran: {
    type: "weather", 
    audioFile: "jingle/uranus.mp3", 
    bgColor: "#042024", 
    panelBg: "rgba(10, 50, 55, 0.8)", 
    borderColor: "#38b2ac", 
    glowColor: "rgba(56, 178, 172, 0.5)", 
    textColor: "#38b2ac", 
    data: {
      sr: {name:"URAN (Nagnuti Ledeni Svet)", temp:"-195 °C", atmosphere:"Vodonik, Helijum, Metan", wind:"900 km/h", report:"Planeta se kotrlja po svojoj orbiti kao pijan robot. Atmosfera miriše na pokvarena jaja zbog sumpor-vodonika."},
      en: {name:"URANUS (Tilted Icy World)", temp:"-195 °C", atmosphere:"Hydrogen, Helium, Methane", wind:"900 km/h", report:"The planet rolls along its orbit like a drunk robot. The atmosphere smells like rotten eggs due to hydrogen sulfide."}
    }
  },
  neptun: {
    type: "weather", 
    audioFile: "jingle/neptune.mp3", 
    bgColor: "#0d1b2a", 
    panelBg: "rgba(20, 40, 70, 0.8)", 
    borderColor: "#90cdf4", 
    glowColor: "rgba(144, 205, 244, 0.5)", 
    textColor: "#90cdf4", 
    data: {
      sr: {name:"NEPTUN (Ledena Grobnica)", temp:"-214 °C", atmosphere:"Vodonik, Helijum, Metan", wind:"2.100 km/h", report:"Spakujte se u tri sloja termalnog veša! Večeras nas očekuje jedinstvena kiša od tečnih dijamanata."},
      en: {name:"NEPTUNE (Icy Tomb)", temp:"-214 °C", atmosphere:"Hydrogen, Helium, Methane", wind:"2,100 km/h", report:"Pack three layers of thermal underwear! Tonight we expect a unique liquid diamond rain."}
    }
  }
};

const uiTexts = {
  sr: {
    dTitle: "👽 DOBRODOŠLI NA INTERGALAKTIČKI RADAR! 📡",
    dSubtitle: "Izaberi planetu iznad da vidiš da li ti danas treba skafander, krema za sunčanje ili tvoj brod za spašavanje.",
    dFooter: "👇 Klikni na bilo koju lopticu gore i rizikuj život 👇",
    lblAtmosphere: "Atmosfera",
    lblWind: "Brzina vetra",
    lblNews: "📢 Vesti sa terena:",
    speakBtn: "🔊 Pokreni glas voditelja",
    stopBtn: "⏹ Zaustavi",
    langBtnText: "🌐 EN"
  },
  en: {
    dTitle: "👽 WELCOME TO THE INTERGALACTIC RADAR! 📡",
    dSubtitle: "Choose a planet above to see if you need a spacesuit, sunscreen, or your escape ship today.",
    dFooter: "👇 Click any ball above and risk your life 👇",
    lblAtmosphere: "Atmosphere",
    lblWind: "Wind speed",
    lblNews: "📢 Field Report:",
    speakBtn: "🔊 Start Host Voice",
    stopBtn: "⏹ Stop",
    langBtnText: "🌐 SR"
  }
};

function resetToInitial() {
  stopSpeech();
  planetAudio.pause();
  planetAudio.currentTime = 0;
  activePlanetKey = null;
  document.body.style.backgroundColor = "#121212";
  document.documentElement.style.setProperty("--panel-bg", "rgba(15, 35, 60, 0.5)");
  document.documentElement.style.setProperty("--border-color", "#4da6ff");
  document.documentElement.style.setProperty("--glow-color", "rgba(77, 166, 255, 0.2)");
  document.documentElement.style.setProperty("--text-color", "#4da6ff");
  document.querySelectorAll(".star").forEach(e => e.style.opacity = Math.random());
  document.querySelectorAll(".planet").forEach(e => e.classList.remove("selected"));
  const e = document.getElementById("default-view"), t = document.getElementById("weather-view");
  t.classList.remove("active");
  e.style.display = "flex";
}

function promeniInterfejs(e) {
  activePlanetKey = e;
  stopSpeech();
  var t = temePlaneta[e];
  if(t) {
    document.querySelectorAll(".planet").forEach(el => el.classList.remove("selected"));
    document.getElementById("p-"+e).classList.add("selected");
    document.body.style.backgroundColor = t.bgColor;
    document.documentElement.style.setProperty("--panel-bg", t.panelBg);
    document.documentElement.style.setProperty("--border-color", t.borderColor);
    document.documentElement.style.setProperty("--glow-color", t.glowColor);
    document.documentElement.style.setProperty("--text-color", t.textColor);
    document.querySelectorAll(".star").forEach(el => el.style.opacity = "0");
    const o = document.getElementById("default-view"), a = document.getElementById("weather-view");
    o.style.display = "none";
    a.classList.add("active");
    
    let planetData = t.data[currentLang];
    document.getElementById("w-name").innerText = planetData.name;
    document.getElementById("w-temp").innerText = planetData.temp;
    document.getElementById("w-atmosphere").innerText = planetData.atmosphere;
    document.getElementById("w-wind").innerText = planetData.wind;
    document.getElementById("w-report").innerText = planetData.report;
    currentReportText = planetData.report;

    planetAudio.pause();
    if (t.audioFile) {
      planetAudio.src = t.audioFile;
      planetAudio.volume = 0.25;
      planetAudio.play().catch(error => {
        console.log("Audio play blocked by browser:", error);
      });
    } else {
      planetAudio.src = "";
    }
  }
}

function toggleLanguage() {
  currentLang = currentLang === "sr" ? "en" : "sr";
  
  // Ažuriraj tekstove statičnih elemenata
  let u = uiTexts[currentLang];
  document.getElementById("d-title").innerText = u.dTitle;
  document.getElementById("d-subtitle").innerText = u.dSubtitle;
  document.getElementById("d-footer").innerText = u.dFooter;
  document.getElementById("lbl-atmosphere").innerText = u.lblAtmosphere;
  document.getElementById("lbl-wind").innerText = u.lblWind;
  document.getElementById("lbl-news").innerText = u.lblNews;
  document.getElementById("speakBtn").innerText = u.speakBtn;
  document.getElementById("stopBtn").innerText = u.stopBtn;
  document.getElementById("langToggleBtn").innerText = u.langBtnText;

  // Ako je planeta već izabrana, osveži njen prikaz na novom jeziku
  if (activePlanetKey) {
    promeniInterfejs(activePlanetKey);
  }
}

function speakReport() {
  if(currentReportText) {
    window.speechSynthesis.cancel();
    
    const t = new SpeechSynthesisUtterance(currentReportText);
    t.pitch = .5;
    t.rate = 1;
    t.volume = 1;
    
    const o = window.speechSynthesis.getVoices();
    let langFilter = currentLang === "sr" ? ["sr", "hr", "bs"] : ["en"];
    var e = o.find(voice => langFilter.some(l => voice.lang.includes(l)));
    if (e) {
      t.voice = e;
    }
    
    if (!planetAudio.paused) {
      planetAudio.volume = 0.08;
    }
    
    t.onend = function() {
      if (!planetAudio.paused) {
        planetAudio.volume = 0.25;
      }
    };
    
    t.onerror = function() {
      if (!planetAudio.paused) {
        planetAudio.volume = 0.25;
      }
    };
    
    window.speechSynthesis.speak(t);
  }
}

function stopSpeech() {
  window.speechSynthesis.cancel();
  
  if (!planetAudio.paused) {
    planetAudio.volume = 0.25;
  }
}

window.onload = () => {
  resetToInitial();
};