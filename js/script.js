/* =========================================================
   SEVEN BARBER STUDIO — interacción
   ========================================================= */
(function () {
  "use strict";

  /* ---- CONFIG: editá solo esto ---- */
  const WHATSAPP_NUMBER = "5492216002246"; // formato internacional sin "+" (AR 11 + 9)
  const OPEN_HOUR = 12;   // abre 12hs
  const CLOSE_HOUR = 20;  // cierra 20hs
  const SLOT_MINUTES = 30;

  /* ---- ÍCONOS SVG por tipo de servicio (heredan el color dorado) ---- */
  const ICONS = {
    scissors: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/></svg>',
    eyebrow:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 9.5c3.5-3.4 13.5-3.4 17 0"/><circle cx="12" cy="14.8" r="1.5" fill="currentColor" stroke="none"/></svg>',
    razor:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 15.5 13 5.5a3.5 3.5 0 0 1 5 5L9.5 19"/><path d="M3 15.5c0 2 1.5 3.5 3.5 3.5H10"/></svg>',
    crown:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8l3.6 3L12 5l5.4 6L21 8l-1.4 9H4.4z"/><path d="M5.5 20.5h13"/></svg>',
    beard:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4v6a6 6 0 0 0 12 0V4"/><path d="M9 8.5h.01M15 8.5h.01"/><path d="M9.5 13.5c.6 1 1.4 1.5 2.5 1.5s1.9-.5 2.5-1.5"/></svg>',
    clipper:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3v3M11 3v3M14 3v3"/><rect x="6" y="6" width="10" height="4.5" rx="1"/><path d="M9 10.5V20a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-9.5"/></svg>',
  };

  /* ---- ORIGEN ÚNICO DE SERVICIOS (precios reales) ---- */
  const SERVICES = [
    { id: "corte",        name: "Corte",                 price: 15000, icon: "scissors", desc: "Corte a tijera y máquina, lavado y peinado.", featured: false },
    { id: "corte-ceja",   name: "Corte y Ceja",          price: 16500, icon: "eyebrow",  desc: "Corte completo + perfilado de cejas.", featured: false },
    { id: "corte-barba",  name: "Corte y Barba",         price: 17500, icon: "razor",    desc: "Corte + barba a navaja con toalla caliente.", featured: false },
    { id: "full",         name: "Corte, Barba y Cejas",  price: 19000, icon: "crown",    desc: "El combo completo. Tu cambio de imagen total.", featured: true },
    { id: "barba",        name: "Barba",                 price: 8000,  icon: "beard",    desc: "Perfilado y diseño de barba a navaja.", featured: false }, // beard

    { id: "cejas",        name: "Cejas",                 price: 4000,  icon: "eyebrow",  desc: "Perfilado y limpieza de cejas.", featured: false },
    { id: "rapado",       name: "Rapado",                price: 10000, icon: "clipper",  desc: "Rapado completo y prolijo a máquina.", featured: false },
  ];

  const fmt = (n) => "$" + n.toLocaleString("es-AR");
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  /* =========================================================
     1) NAV: scroll, burger, smooth scroll, año
     ========================================================= */
  const nav = $("#nav");
  const onScroll = () => nav.classList.toggle("nav--scrolled", window.scrollY > 30);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const burger = $("#burger");
  const navMobile = $("#navMobile");
  const toggleMenu = (open) => {
    burger.classList.toggle("is-open", open);
    navMobile.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", String(open));
  };
  burger.addEventListener("click", () => toggleMenu(!burger.classList.contains("is-open")));
  $$("#navMobile a").forEach((a) => a.addEventListener("click", () => toggleMenu(false)));

  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* =========================================================
     2) SERVICIOS: render desde SERVICES
     ========================================================= */
  const grid = $(".services__grid");
  if (grid) {
    grid.innerHTML = SERVICES.map((s, i) => `
      <article class="service-card${s.featured ? " is-featured" : ""} reveal" data-reveal data-reveal-delay="${(i % 3) * 70}">
        ${s.featured ? '<span class="service-card__badge">Más elegido</span>' : ""}
        <div class="service-card__icon">${ICONS[s.icon] || s.icon}</div>
        <h3 class="service-card__name">${s.name}</h3>
        <p class="service-card__desc">${s.desc}</p>
        <div class="service-card__foot">
          <div class="service-card__price">${fmt(s.price)}</div>
          <a href="#agenda" class="service-card__book" data-service="${s.id}">Reservar →</a>
        </div>
      </article>
    `).join("");
  }

  /* =========================================================
     3) AGENDA: poblar selects, fecha mínima, resumen, WhatsApp
     ========================================================= */
  const serviceSel = $("#bk-service");
  const timeSel = $("#bk-time");
  const dateInput = $("#bk-date");
  const form = $("#bookingForm");
  const summary = $("#bookingSummary");
  const summaryText = $("#bookingSummaryText");

  if (serviceSel) {
    serviceSel.insertAdjacentHTML("beforeend",
      SERVICES.map((s) => `<option value="${s.id}">${s.name} — ${fmt(s.price)}</option>`).join(""));
  }

  // horarios cada 30' entre apertura y cierre
  if (timeSel) {
    const slots = [];
    for (let h = OPEN_HOUR; h < CLOSE_HOUR; h++) {
      for (let m = 0; m < 60; m += SLOT_MINUTES) {
        slots.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
      }
    }
    timeSel.insertAdjacentHTML("beforeend", slots.map((t) => `<option value="${t}">${t} hs</option>`).join(""));
  }

  // fecha: mínimo hoy, default mañana, bloquear domingos al elegir
  if (dateInput) {
    const today = new Date();
    const iso = (d) => d.toISOString().split("T")[0];
    dateInput.min = iso(today);
    const tomorrow = new Date(today); tomorrow.setDate(today.getDate() + 1);
    dateInput.value = iso(tomorrow);
    dateInput.addEventListener("change", () => {
      const d = new Date(dateInput.value + "T12:00:00");
      if (d.getDay() === 0) { // domingo cerrado
        alert("Los domingos estamos cerrados 🙏. Elegí un día de lunes a sábado.");
        dateInput.value = "";
      }
      updateSummary();
    });
  }

  const prettyDate = (val) => {
    if (!val) return "";
    const d = new Date(val + "T12:00:00");
    return d.toLocaleDateString("es-AR", { weekday: "long", day: "numeric", month: "long" });
  };

  function getState() {
    const svc = SERVICES.find((s) => s.id === serviceSel.value);
    return { svc, date: dateInput.value, time: timeSel.value, name: $("#bk-name").value.trim(), note: $("#bk-note").value.trim() };
  }

  function updateSummary() {
    const { svc, date, time } = getState();
    if (svc && date && time) {
      summary.hidden = false;
      summaryText.textContent = `${svc.name} · ${prettyDate(date)} · ${time} hs · ${fmt(svc.price)}`;
    } else {
      summary.hidden = true;
    }
  }
  [serviceSel, timeSel, dateInput].forEach((el) => el && el.addEventListener("change", updateSummary));

  // pre-seleccionar servicio y llevar a la agenda al tocar "Reservar"
  document.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-service]");
    if (trigger && serviceSel) {
      e.preventDefault();
      serviceSel.value = trigger.getAttribute("data-service");
      updateSummary();
      const agenda = document.getElementById("agenda");
      if (agenda) agenda.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => $("#bk-name") && $("#bk-name").focus({ preventScroll: true }), 700);
    }
  });

  // submit -> WhatsApp
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const { svc, date, time, name, note } = getState();
      if (!name) { $("#bk-name").focus(); return; }
      if (!svc) { serviceSel.focus(); return; }
      if (!date) { dateInput.focus(); return; }
      if (!time) { timeSel.focus(); return; }

      const lines = [
        "¡Hola Seven Barber Studio! 👋 Quiero reservar un turno:",
        "",
        `*Nombre:* ${name}`,
        `*Servicio:* ${svc.name} (${fmt(svc.price)})`,
        `*Día:* ${prettyDate(date)}`,
        `*Horario:* ${time} hs`,
      ];
      if (note) lines.push(`*Comentario:* ${note}`);
      lines.push("", "¿Me confirman disponibilidad? ¡Gracias!");

      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
      window.open(url, "_blank", "noopener");
    });
  }

  /* =========================================================
     4) REVEAL on scroll (IntersectionObserver)
     ========================================================= */
  const reveals = $$("[data-reveal]");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = parseInt(el.getAttribute("data-reveal-delay") || "0", 10);
          setTimeout(() => el.classList.add("is-visible"), delay);
          io.unobserve(el);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }

  /* =========================================================
     5) COUNT-UP del hero
     ========================================================= */
  const counters = $$(".count");
  const animateCount = (el) => {
    const target = parseInt(el.getAttribute("data-count"), 10);
    const dur = 1400; const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(eased * target);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if (counters.length && "IntersectionObserver" in window) {
    const co = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { animateCount(e.target); co.unobserve(e.target); } });
    }, { threshold: 0.6 });
    counters.forEach((c) => co.observe(c));
  } else {
    counters.forEach((c) => (c.textContent = c.getAttribute("data-count")));
  }
})();
