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

  /* ---- ORIGEN ÚNICO DE SERVICIOS (precios reales) ---- */
  const SERVICES = [
    { id: "corte",        name: "Corte",                 price: 15000, icon: "✂", desc: "Corte a tijera y máquina, lavado y peinado.", featured: false },
    { id: "corte-ceja",   name: "Corte y Ceja",          price: 16500, icon: "✂", desc: "Corte completo + perfilado de cejas.", featured: false },
    { id: "corte-barba",  name: "Corte y Barba",         price: 17500, icon: "✂", desc: "Corte + barba a navaja con toalla caliente.", featured: false },
    { id: "full",         name: "Corte, Barba y Cejas",  price: 19000, icon: "★", desc: "El combo completo. Tu cambio de imagen total.", featured: true },
    { id: "barba",        name: "Barba",                 price: 8000,  icon: "◗", desc: "Perfilado y diseño de barba a navaja.", featured: false },
    { id: "cejas",        name: "Cejas",                 price: 4000,  icon: "◠", desc: "Perfilado y limpieza de cejas.", featured: false },
    { id: "rapado",       name: "Rapado",                price: 10000, icon: "▮", desc: "Rapado completo y prolijo a máquina.", featured: false },
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
        <div class="service-card__icon">${s.icon}</div>
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

  // pre-seleccionar servicio al tocar "Reservar" en una card o en una galería
  document.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-service]");
    if (trigger && serviceSel) {
      serviceSel.value = trigger.getAttribute("data-service");
      updateSummary();
      setTimeout(() => $("#bk-name") && $("#bk-name").focus(), 600);
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
