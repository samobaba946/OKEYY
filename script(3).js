/* =========================================================
   Eşim Olur Musun?  —  script.js
   ========================================================= */
(function () {
  "use strict";

  /* ---- Arka plandaki uçuşan kalpler ---- */
  var bgHearts = document.getElementById("bgHearts");
  var bgChars = ["💖", "💕", "💗", "💓", "🩷", "💘"];
  function spawnBgHeart() {
    if (!bgHearts) return;
    var s = document.createElement("span");
    s.textContent = bgChars[(Math.random() * bgChars.length) | 0];
    s.style.left = (Math.random() * 100) + "vw";
    s.style.fontSize = (0.9 + Math.random() * 1.6).toFixed(2) + "rem";
    var dur = 7 + Math.random() * 8;
    s.style.animationDuration = dur.toFixed(2) + "s";
    s.style.animationDelay = (-(Math.random() * dur)).toFixed(2) + "s";
    bgHearts.appendChild(s);
  }
  for (var i = 0; i < 16; i++) spawnBgHeart();

  /* ---- Elemanlar ---- */
  var questionScreen = document.getElementById("questionScreen");
  var successScreen  = document.getElementById("successScreen");
  var questionText   = document.getElementById("questionText");
  var yesBtn = document.getElementById("yesBtn");
  var noBtn  = document.getElementById("noBtn");
  var card   = document.getElementById("card");
  var rain   = document.getElementById("rain");

  /* ---- "Hayır"a basınca sırayla çıkacak mesajlar ---- */
  var noMessages = [
    "Emin misin? 🥺",
    "Son kararın mı? 💔",
    "Yanlışlıkla mı bastın? 😳",
    "Bir daha düşün... 🙈",
    "Lütfeeen 🥹",
    "Kalbim kırılıyor 😭",
    "Bak Hayır küçülüyor 👀",
    "Pes etmeyeceğim 😤",
    "Sadece 'Evet'e bas artık 💕"
  ];

  var noCount = 0;
  var yesSize = 1.05; // rem
  var noSize  = 1.05; // rem

  noBtn.addEventListener("click", function () {
    questionText.textContent = noMessages[Math.min(noCount, noMessages.length - 1)];
    noCount++;

    // Evet butonu büyür, Hayır butonu küçülür
    yesSize = Math.min(yesSize + 0.28, 3.4);
    noSize  = Math.max(noSize - 0.08, 0.60);
    yesBtn.style.fontSize = yesSize.toFixed(2) + "rem";
    noBtn.style.fontSize  = noSize.toFixed(2) + "rem";

    // Kartı titret
    card.classList.remove("shake");
    void card.offsetWidth; // animasyonu yeniden başlatmak için
    card.classList.add("shake");
  });

  /* ---- "Evet"e basınca: ekran değişir + kalpler yağar ---- */
  var rainTimer = null;
  yesBtn.addEventListener("click", function () {
    questionScreen.hidden = true;
    successScreen.hidden = false;
    heartBurst();
    if (!rainTimer) rainTimer = setInterval(spawnFallingHeart, 140);
  });

  /* ---- Yukarıdan düşen kalpler ---- */
  var rainChars = ["💖", "💕", "💗", "❤️", "🩷", "💘", "💞", "🌸"];
  function spawnFallingHeart() {
    if (!rain) return;
    var s = document.createElement("span");
    s.textContent = rainChars[(Math.random() * rainChars.length) | 0];
    s.style.left = (Math.random() * 100) + "vw";
    s.style.fontSize = (1.2 + Math.random() * 2).toFixed(2) + "rem";
    var dur = 2.6 + Math.random() * 2.6;
    s.style.animationDuration = dur.toFixed(2) + "s";
    rain.appendChild(s);
    setTimeout(function () { s.remove(); }, dur * 1000 + 250);
  }
  function heartBurst() {
    for (var j = 0; j < 26; j++) setTimeout(spawnFallingHeart, j * 35);
  }
})();
