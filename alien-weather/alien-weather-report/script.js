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
planetAudio.volume = 0.25; // Normalna glasnoća muzike

const temePlaneta = {
  merkur: {type:"weather", audioFile: "../jingle/mercury.mp3", bgColor:"#808080",panelBg:"rgba(100, 100, 100, 0.85)",borderColor:"#cccccc",glowColor:"rgba(200, 200, 200, 0.4)",textColor:"#e0e0e0",hideStars:!0,data:{name:"MERKUR (Ekstremni Vreli Blizanac)",temp:"+430 °C / -180 °C",atmosphere:"Egzosfera (Ksenon, Helijum)",wind:"Solarni vetar direktno",report:"Pažnja! Na sunčanoj strani Merkura temperatura topi čelik, dok na noćnoj strani možete da se smrznete u sekundi. Ponesite i jaknu i šatorsko krilo sa solarnim štitom!"}},
  venera: {type:"weather", audioFile: "../jingle/venus.mp3", bgColor:"#2d1508",panelBg:"rgba(70, 30, 10, 0.85)",borderColor:"#f6ad55",glowColor:"rgba(246, 173, 85, 0.5)",textColor:"#f6ad55",hideStars:!0,data:{name:"VENERA (Pakleni Resort)",temp:"+460 °C",atmosphere:"Sumporna kiselina, 92 bar",wind:"360 km/h",report:"Danas na Veneri imamo prelepu kišu od sumporne kiseline i prijatnih 460 stepeni Celzijusa – idealno vreme za pečenje pilića na otvorenom bez korišćenja rerne!"}},
  zemlja: {type:"weather", audioFile: "../jingle/earth.mp3", bgColor:"#091f2c",panelBg:"rgba(15, 60, 90, 0.8)",borderColor:"#63b3ed",glowColor:"rgba(99, 179, 237, 0.5)",textColor:"#63b3ed",hideStars:!0,data:{name:"ZEMLJA (Matična Kolevka)",temp:"+15 °C",atmosphere:"Azot, Kiseonik, 1 bar",wind:"15 km/h",report:"Uslovi na površini su izuzetno stabilni. Previše kiseonika, nema vanzemaljskih najezda u ovom sektoru. Preporučuje se šetnja bez skafandera."}},
  mars: {type:"weather", audioFile: "../jingle/mars.mp3", bgColor:"#2a1005",panelBg:"rgba(80, 25, 10, 0.8)",borderColor:"#fc8181",glowColor:"rgba(252, 129, 129, 0.5)",textColor:"#fc8181",hideStars:!0,data:{name:"MARS (Crvena Dolina)",temp:"-60 °C",atmosphere:"Ugljen-dioksid (95%)",wind:"90 km/h",report:"Pažnja građani! Crvena prašina vam se već zavukla u zube. Očekujemo masivnu peščanu olujnu frontu uz topli čaj od rđe."}},
  jupiter: {type:"weather", audioFile: "../jingle/jupiter.mp3", bgColor:"#21160e",panelBg:"rgba(60, 40, 20, 0.8)",borderColor:"#d6bcfa",glowColor:"rgba(214, 188, 250, 0.5)",textColor:"#d6bcfa",hideStars:!0,data:{name:"JUPITER (Olujni Džin)",temp:"-110 °C",atmosphere:"Vodonik i Helijum",wind:"650 km/h",report:"Velika crvena mrlja pravi žurku vekovima. Ako izađete napolje, bićete kompresovani u dijamant brže nego što možete da kažete gasoviti džin."}},
  saturn: {type:"weather", audioFile: "../jingle/saturn.mp3", bgColor:"#1a1612",panelBg:"rgba(45, 38, 30, 0.85)",borderColor:"#ed8936",glowColor:"rgba(237, 137, 54, 0.5)",textColor:"#ed8936",hideStars:!0,data:{name:"SATURN (Gospodar Prstenova)",temp:"-140 °C",atmosphere:"Vodonik, Metan",wind:"1.800 km/h",report:"Ledenice lete svuda oko prstenova. Pazite da vam ledeni asteroid ne okrzne krov svemirske letelice."}},
  uran: {type:"weather", audioFile: "../jingle/uranus.mp3", bgColor:"#042024",panelBg:"rgba(10, 50, 55, 0.8)",borderColor:"#38b2ac",glowColor:"rgba(56, 178, 172, 0.5)",textColor:"#38b2ac",hideStars:!0,data:{name:"URAN (Nagnuti Ledeni Svet)",temp:"-195 °C",atmosphere:"Vodonik, Helijum, Metan",wind:"900 km/h",report:"Planeta se kotrlja po svojoj orbiti kao pijan robot. Atmosfera miriše na pokvarena jaja zbog sumpor-vodonika."}},
  neptun: {type:"weather", audioFile: "../jingle/neptune.mp3", bgColor:"#0d1b2a",panelBg:"rgba(20, 40, 70, 0.8)",borderColor:"#90cdf4",glowColor:"rgba(144, 205, 244, 0.5)",textColor:"#90cdf4",hideStars:!0,data:{name:"NEPTUN (Ledena Grobnica)",temp:"-214 °C",atmosphere:"Vodonik, Helijum, Metan",wind:"2.100 km/h",report:"Spakujte se u tri sloja termalnog veša! Večeras nas očekuje jedinstvena kiša od tečnih dijamanata."}}
};

function resetToInitial() {
  stopSpeech();
  planetAudio.pause();
  planetAudio.currentTime = 0;
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
    document.getElementById("w-name").innerText = t.data.name;
    document.getElementById("w-temp").innerText = t.data.temp;
    document.getElementById("w-atmosphere").innerText = t.data.atmosphere;
    document.getElementById("w-wind").innerText = t.data.wind;
    document.getElementById("w-report").innerText = t.data.report;
    currentReportText = t.data.report;

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

function speakReport() {
  if(currentReportText) {
    window.speechSynthesis.cancel();
    
    const t = new SpeechSynthesisUtterance(currentReportText);
    t.pitch = .5;
    t.rate = 1;
    t.volume = 1;
    
    const o = window.speechSynthesis.getVoices();
    var e = o.find(voice => voice.lang.includes("sr") || voice.lang.includes("hr") || voice.lang.includes("bs"));
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
}