document.addEventListener("DOMContentLoaded", () => {
  // Kreiranje zvezda u pozadini
  for (let t = 0; t < 60; t++) {
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

  let currentLang = "sr"; 
  let activePlanetKey = null; 

  // Specifične lude vesti prilagođene svakoj planeti ponaosob
  const temePlaneta = {
    merkur: {
      audioFile: "jingle/mercury.mp3", 
      bgColor: "#808080", 
      panelBg: "rgba(100, 100, 100, 0.85)", 
      borderColor: "#cccccc", 
      glowColor: "rgba(200, 200, 200, 0.4)", 
      textColor: "#e0e0e0", 
      data: {
        sr: {
          name: "MERKUR (Ekstremni Vreli Blizanac)", 
          temp: "+430 °C / -180 °C", 
          atmosphere: "Egzosfera (Ksenon, Helijum)", 
          wind: "Solarni vetar direktno",
          reports: [
            "Pažnja! Na sunčanoj strani Merkura temperatura topi čelik, dok na noćnoj strani možete da se smrznete u sekundi. Ponesite i jaknu i solarni štit!",
            "Danas sunčev vetar duva direktno u leđa svim šetačima. Preporučujemo da se sklonite u krater pre nego što vam se đonovi na skafanderu istope.",
            "Solarna pećnica radi na maksimumu! Idealna prilika da skuvate ručak držeći tiganj na prozoru broda."
          ]
        },
        en: {
          name: "MERCURY (Extreme Hot Twin)", 
          temp: "+430 °C / -180 °C", 
          atmosphere: "Exosphere (Xenon, Helium)", 
          wind: "Direct solar wind",
          reports: [
            "Attention! On Mercury's sunlit side, temperatures melt steel, while on the night side you can freeze in a second. Bring both a jacket and a solar shield!",
            "Today the solar wind is blowing straight at all pedestrians. Take cover in a crater before your spacesuit boots melt.",
            "The solar oven is running at maximum! Perfect opportunity to cook lunch by holding a pan out the spaceship window."
          ]
        }
      }
    },
    venera: {
      audioFile: "jingle/venus.mp3", 
      bgColor: "#2d1508", 
      panelBg: "rgba(70, 30, 10, 0.85)", 
      borderColor: "#f6ad55", 
      glowColor: "rgba(246, 173, 85, 0.5)", 
      textColor: "#f6ad55", 
      data: {
        sr: {
          name: "VENERA (Pakleni Resort)", 
          temp: "+460 °C", 
          atmosphere: "Sumporna kiselina, 92 bar", 
          wind: "360 km/h",
          reports: [
            "Danas na Veneri imamo prelepu kišu od sumporne kiseline i prijatnih 460 stepeni Celzijusa – idealno vreme za pečenje pilića na otvorenom bez rerne!",
            "Atmospheric pritisak od 92 bara vas drži pod savršenom 'dijetalnom' kompresijom. Ako izađete bez oklopa, bićete smanjeni na veličinu priveska.",
            "Uživajte u gustim oblacima ugljen-dioksida uz lokalni koktel od sumpora koji nagriza čašu!"
          ]
        },
        en: {
          name: "VENUS (Hellish Resort)", 
          temp: "+460 °C", 
          atmosphere: "Sulfuric acid, 92 bar", 
          wind: "360 km/h",
          reports: [
            "Today on Venus we have beautiful sulfuric acid rain and a pleasant 460 degrees Celsius – ideal weather for roasting chickens outdoors without an oven!",
            "The 92-bar atmospheric pressure keeps you under perfect 'dietary' compression. Step outside without armor and you'll be shrunk to keychain size.",
            "Enjoy the dense carbon dioxide clouds along with a local sulfur cocktail that eats right through the glass!"
          ]
        }
      }
    },
    zemlja: {
      audioFile: "jingle/earth.mp3", 
      bgColor: "#091f2c", 
      panelBg: "rgba(15, 60, 90, 0.8)", 
      borderColor: "#63b3ed", 
      glowColor: "rgba(99, 179, 237, 0.5)", 
      textColor: "#63b3ed", 
      data: {
        sr: {
          name: "ZEMLJA (Matična Kolevka)", 
          temp: "+15 °C", 
          atmosphere: "Azot, Kiseonik, 1 bar", 
          wind: "15 km/h",
          reports: [
            "Uslovi na površini su izuzetno dosadni. Previše kiseonika, nema vanzemaljskih najezda u ovom sektoru. Preporučuje se šetnja bez skafandera.",
            "Upozorenje: Saobraćajna gužva na autoputu i gužva u marketima. Nema opasnosti od topljenja čelika, samo od stresa na poslu.",
            "Danas pada obična, dosadna vodena kiša. Katastrofa za sve koji vole kiselinu i radioaktivne oluje."
          ]
        },
        en: {
          name: "EARTH (Home Cradle)", 
          temp: "+15 °C", 
          atmosphere: "Nitrogen, Oxygen, 1 bar", 
          wind: "15 km/h",
          reports: [
            "Surface conditions are extremely boring. Too much oxygen, no alien invasions in this sector. A spacewalk without a suit is recommended.",
            "Warning: Traffic jams on the highway and supermarket queues. No danger of melting steel, just workplace stress.",
            "Today brings ordinary, boring water rain. A disaster for anyone who loves acid and radioactive storms."
          ]
        }
      }
    },
    mars: {
      audioFile: "jingle/mars.mp3", 
      bgColor: "#2a1005", 
      panelBg: "rgba(80, 25, 10, 0.8)", 
      borderColor: "#fc8181", 
      glowColor: "rgba(252, 129, 129, 0.5)", 
      textColor: "#fc8181", 
      data: {
        sr: {
          name: "MARS (Crvena Dolina)", 
          temp: "-60 °C", 
          atmosphere: "Ugljen-dioksid (95%)", 
          wind: "90 km/h",
          reports: [
            "Pažnja građani! Crvena prašina se već zavukla svima u zube. Očekujemo masivnu peščanu oluju uz topli čaj od rđe.",
            "Roveri Curiosity i Perseverance javljaju da gužvaju sa miševima od prašine. Ponesite četkicu za zube sa dijamantskim vlaknima.",
            "Noćas se očekuje pad temperatura na -80 °C, savršeno vreme za zamrzavanje suza na obrazima."
          ]
        },
        en: {
          name: "Mars (Red Valley)", 
          temp: "-60 °C", 
          atmosphere: "Carbon dioxide (95%)", 
          wind: "90 km/h",
          reports: [
            "Attention citizens! Red dust has already gotten into everyone's teeth. Expect a massive dust storm along with warm rust tea.",
            "Rovers Curiosity and Perseverance report heavy dust mouse traffic. Bring a diamond-bristled toothbrush.",
            "Tonight temperatures are expected to drop to -80 °C, perfect weather for freezing tears on your cheeks."
          ]
        }
      }
    },
    jupiter: {
      audioFile: "jingle/jupiter.mp3", 
      bgColor: "#21160e", 
      panelBg: "rgba(60, 40, 20, 0.8)", 
      borderColor: "#d6bcfa", 
      glowColor: "rgba(214, 188, 250, 0.5)", 
      textColor: "#d6bcfa", 
      data: {
        sr: {
          name: "JUPITER (Olujni Džin)", 
          temp: "-110 °C", 
          atmosphere: "Vodonik i Helijum", 
          wind: "650 km/h",
          reports: [
            "Velika crvena mrlja pravi žurku vekovima. Ako izađete napolje, bićete kompresovani u dijamant brže nego što možete reći gasoviti džin.",
            "Sečivo munje iz megaburana pogađa tačno u centar vaše lokacije. Srećno sa traženjem skloništa u atmosferi bez čvrstog tla!",
            "Pritisak u dubinama je toliko jak da se čak i vaši najtvrđi snovi pretvaraju u tečni vodonik."
          ]
        },
        en: {
          name: "JUPITER (Storm Giant)", 
          temp: "-110 °C", 
          atmosphere: "Hydrogen and Helium", 
          wind: "650 km/h",
          reports: [
            "The Great Red Spot has been partying for centuries. Step outside and you'll be compressed into a diamond faster than you can say gas giant.",
            "Lightning bolts from mega-storms are targeting your exact location. Good luck finding shelter in an atmosphere with no solid ground!",
            "The pressure in the depths is so intense that even your hardest dreams turn into liquid hydrogen."
          ]
        }
      }
    },
    saturn: {
      audioFile: "jingle/saturn.mp3", 
      bgColor: "#1a1612", 
      panelBg: "rgba(45, 38, 30, 0.85)", 
      borderColor: "#ed8936", 
      glowColor: "rgba(237, 137, 54, 0.5)", 
      textColor: "#ed8936", 
      data: {
        sr: {
          name: "SATURN (Gospodar Prstenova)", 
          temp: "-140 °C", 
          atmosphere: "Vodonik, Metan", 
          wind: "1.800 km/h",
          reports: [
            "Ledenice lete svuda oko prstenova brzinom metka. Pazite da vam ledeni asteroid ne okrzne krov svemirske letelice.",
            "Vetar od 1.800 km/h vam frizuru stavlja u nulti položaj. Nema potrebe za gelom za kosu.",
            "Uživajte u pogledu na spektakularne ledene prstenove dok vam se čaj u šolji ledi u čvrsti blok."
          ]
        },
        en: {
          name: "SATURN (Lord of the Rings)", 
          temp: "-140 °C", 
          atmosphere: "Hydrogen, Methane", 
          wind: "1,800 km/h",
          reports: [
            "Icicles are flying all around the rings at bullet speed. Watch out that an icy asteroid doesn't graze your spacecraft roof.",
            "Winds of 1,800 km/h will lock your hairstyle into a permanent zero position. No hair gel needed.",
            "Enjoy the view of the spectacular icy rings while your tea freezes into a solid block."
          ]
        }
      }
    },
    uran: {
      audioFile: "jingle/uranus.mp3", 
      bgColor: "#042024", 
      panelBg: "rgba(10, 50, 55, 0.8)", 
      borderColor: "#38b2ac", 
      glowColor: "rgba(56, 178, 172, 0.5)", 
      textColor: "#38b2ac", 
      data: {
        sr: {
          name: "URAN (Nagnuti Ledeni Svet)", 
          temp: "-195 °C", 
          atmosphere: "Vodonik, Helijum, Metan", 
          wind: "900 km/h",
          reports: [
            "Planeta se kotrlja po svojoj orbiti kao pijan robot na bočnoj strani. Atmosfera miriše na pokvarena jaja zbog sumpor-vodonika.",
            "Zbog ekstremnog nagiba ose, polovi uživaju u 42 godine mraka. Idealno za dugačak zimski san.",
            "Ledena kiša od metana vam pere prozore na brodu, ali smrad pokvarenih jaja ostaje za sva vremena."
          ]
        },
        en: {
          name: "URANUS (Tilted Icy World)", 
          temp: "-195 °C", 
          atmosphere: "Hydrogen, Helium, Methane", 
          wind: "900 km/h",
          reports: [
            "The planet rolls along its orbit like a drunk robot on its side. The atmosphere smells like rotten eggs due to hydrogen sulfide.",
            "Due to the extreme axial tilt, the poles enjoy 42 years of darkness. Ideal for a very long winter nap.",
            "Methane ice rain is washing your spaceship windows, but the rotten egg smell is here to stay."
          ]
        }
      }
    },
    neptun: {
      audioFile: "jingle/neptune.mp3", 
      bgColor: "#0d1b2a", 
      panelBg: "rgba(20, 40, 70, 0.8)", 
      borderColor: "#90cdf4", 
      glowColor: "rgba(144, 205, 244, 0.5)", 
      textColor: "#90cdf4", 
      data: {
        sr: {
          name: "NEPTUN (Ledena Grobnica)", 
          temp: "-214 °C", 
          atmosphere: "Vodonik, Helijum, Metan", 
          wind: "2.100 km/h",
          reports: [
            "Spakujte se u tri sloja termalnog veša! Večeras nas očekuje jedinstvena kiša od tečnih dijamanata, idealna za brzu popravku budžeta.",
            "Najjači vetrovi u Sunčevom sistemu (preko 2.100 km/h) nose vaš brod pravo u duboku plavu tugu. Vežite se pojasom sa trostrukim kopčanjem!",
            "Ledeni okean ispod vas šapuće tajne starih galaksija, dok vam se brada ledi u kristalni stub."
          ]
        },
        en: {
          name: "NEPTUNE (Icy Tomb)", 
          temp: "-214 °C", 
          atmosphere: "Hydrogen, Helium, Methane", 
          wind: "2,100 km/h",
          reports: [
            "Pack three layers of thermal underwear! Tonight we expect a unique liquid diamond rain, perfect for a quick budget fix.",
            "The strongest winds in the Solar System (over 2,100 km/h) are carrying your ship straight into deep blue sorrow. Fasten your triple-lock seatbelt!",
            "The icy ocean below whispers secrets of ancient galaxies while your beard freezes into a crystal pillar."
          ]
        }
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
      langBtnText: "🌐 EN",
      randomBtn: "🎲 Nova luda vest"
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
      langBtnText: "🌐 SR",
      randomBtn: "🎲 New Crazy Report"
    }
  };

  // Funkcija koja uzima nasumičnu vest za *trenutnu* planetu
  function izvuciVestZaPlanetu(planetKey, jezik) {
    const planetObj = temePlaneta[planetKey];
    if (!planetObj) return "Nema izveštaja.";
    const izveštajiNiz = planetObj.data[jezik].reports;
    const nasumicanIndeks = Math.floor(Math.random() * izveštajiNiz.length);
    return izveštajiNiz[nasumicanIndeks];
  }

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

  window.promeniInterfejs = function(e) {
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
      let vest = izvuciVestZaPlanetu(e, currentLang);

      document.getElementById("w-name").innerText = planetData.name;
      document.getElementById("w-temp").innerText = planetData.temp;
      document.getElementById("w-atmosphere").innerText = planetData.atmosphere;
      document.getElementById("w-wind").innerText = planetData.wind;
      document.getElementById("w-report").innerText = vest;
      currentReportText = vest;

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
  };

  window.osveziVesti = function() {
    if (activePlanetKey) {
      let novaVest = izvuciVestZaPlanetu(activePlanetKey, currentLang);
      document.getElementById("w-report").innerText = novaVest;
      currentReportText = novaVest;
      stopSpeech();
    }
  };

  window.toggleLanguage = function() {
    currentLang = currentLang === "sr" ? "en" : "sr";
    
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
    document.getElementById("btn-random").innerText = u.randomBtn;

    if (activePlanetKey) {
      window.promeniInterfejs(activePlanetKey);
    }
  };

  window.speakReport = function() {
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
  };

  window.stopSpeech = function() {
    window.speechSynthesis.cancel();
    
    if (!planetAudio.paused) {
      planetAudio.volume = 0.25;
    }
  };

  resetToInitial();
});