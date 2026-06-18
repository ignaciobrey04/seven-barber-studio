# Prompt para Claude Design — Seven Barber Studio

> Copiá y pegá el bloque de abajo en Claude Design (o Claude.ai con artifacts).
> Si tenés las fotos reales, subilas junto al prompt para que las use en la galería y el hero.

---

## 🟡 PROMPT (copiar desde acá)

Actuá como un diseñador web de producto senior especializado en landing pages de **alta conversión** para negocios locales premium. Quiero que construyas una **single-page web totalmente funcional y animada** para una barbería real. Entregá HTML + CSS + JavaScript (puede ser un solo archivo o separado), production-ready, responsive y rápido.

### El negocio
- **Nombre:** Seven Barber Studio (monograma “SB” en serif, elegante).
- **Rubro:** Barbería premium / barber studio en La Plata, Buenos Aires, Argentina.
- **Eslogan:** “Más que un corte, un cambio de imagen.”
- **Prueba social:** 5.0 ★ en Google con 22 reseñas. Frases reales: “Excelente servicio, muy buena atención!!!”, “Muy recomendada, muy cómodo el lugar”, “La tienen re clara, sigan así”.
- **Horarios:** Lunes a Sábados, 12 a 20 hs (domingos cerrado).
- **Dirección:** Calle 9 N° 620, entre 44 y 45, La Plata, Buenos Aires.
- **Teléfono / WhatsApp:** 0221 600-2246 (internacional: 5492216002246).
- **Instagram:** @seven_barberstudio.

### Servicios y precios (mostrar tal cual, en pesos argentinos)
| Servicio | Precio |
|---|---|
| Corte | $15.000 |
| Corte y Ceja | $16.500 |
| Corte y Barba | $17.500 |
| Corte, Barba y Cejas | $19.000 *(destacar como “más elegido”)* |
| Barba | $8.000 |
| Cejas | $4.000 |
| Rapado | $10.000 |

### Identidad visual (respetala estrictamente)
- **Paleta:** negro profundo (#0A0A0A) como base, **dorado** elegante (#C9A24A → #E9CE8A, usado en gradientes), y crema (#F4EFE6) para texto. Look lujoso, masculino, sobrio.
- **Tipografía:** serif refinada para títulos (estilo Cormorant Garamond / Playfair Display) + sans geométrica liviana para texto (Jost / Montserrat). Mucho tracking en mayúsculas para los labels.
- **Texturas:** grano sutil sobre el fondo, líneas finas doradas divisorias, viñeteado oscuro. Estética de “barber studio premium”, NO genérica.

### Secciones requeridas (en este orden)
1. **Nav fija** translúcida que se opaca al hacer scroll, con monograma SB, links y botón dorado “Reservar turno”. Menú hamburguesa animado en mobile.
2. **Hero a pantalla completa:** título grande serif “Más que un corte, un cambio de imagen.”, subtítulo, badge de 5.0 ★ (22 reseñas), dos CTAs (“Reservá tu turno” dorado + “Ver cortes” fantasma) y una franja de métricas (reseñas, horario, ubicación). Fondo con glow dorado animado y un “poste de barbero” girando sutil. Indicador de scroll animado.
3. **Marquee** infinito horizontal con palabras: CORTE · BARBA · CEJAS · RAPADO · ESTILO · SEVEN BARBER STUDIO.
4. **Servicios:** grid de cards con ícono, nombre, descripción corta, precio grande dorado y link “Reservar →” que pre-selecciona ese servicio en la agenda. Card destacada para el combo completo.
5. **Galería de cortes:** grid de 4 fotos verticales (4:5) con hover zoom y caption que aparece. (Usá las fotos que te paso; si no hay, dejá placeholders elegantes con un ícono de tijera.)
6. **“Por qué elegirnos”:** 4 features con íconos circulares dorados (barberos con experiencia, 5.0 en Google, turnos sin esperas, ambiente premium).
7. **AGENDA / Booking (núcleo de conversión):** formulario en card con borde dorado degradado: nombre, select de servicio (con precio), día (date picker que bloquea domingos y fechas pasadas), horario (slots cada 30’ entre 12 y 20 hs), comentario opcional. Mostrá un **resumen en vivo** del turno. El submit **abre WhatsApp** (wa.me/5492216002246) con el mensaje del turno ya redactado y formateado. Sin backend.
8. **Reseñas:** 3 tarjetas con 5 estrellas y las frases reales de Google.
9. **Ubicación:** datos de contacto con íconos + Google Maps embebido (estilizado oscuro) + CTAs “Reservar” y “Cómo llegar”.
10. **CTA final** a pantalla con glow dorado + **botón flotante de WhatsApp** siempre visible con animación de pulso.
11. **Footer** con monograma, eslogan, links y copyright dinámico.

### Animaciones (importante — quiero que se sienta vivo y caro)
- **Reveal on scroll** con IntersectionObserver: los elementos suben y aparecen con stagger (delays escalonados) y easing suave (cubic-bezier(0.22,1,0.36,1)).
- **Count-up** del número de reseñas (0 → 22) al entrar en viewport.
- **Hover microinteracciones:** cards que se elevan, botón dorado con “shine” diagonal que cruza al pasar el mouse, links con subrayado que crece.
- **Hero:** glow flotante en loop, poste de barbero rotando, scroll indicator latente.
- **Marquee** y **pulso del botón de WhatsApp** en loop continuo.
- Respetá `prefers-reduced-motion` (desactivá animaciones si el usuario lo pide).
- Scroll suave entre secciones.

### Conversión (objetivo principal)
Todo empuja a **reservar el turno**. CTAs dorados visibles en todo momento, fricción mínima (el turno se confirma en 1 toque por WhatsApp), prueba social arriba del fold, precios transparentes, urgencia suave (“los mejores horarios se ocupan rápido”). El número de WhatsApp y los precios deben estar en un único lugar editable del código.

### Requisitos técnicos
- Mobile-first y 100% responsive (probá 360px, 768px, 1280px).
- Accesible: contraste correcto, labels en inputs, `alt` en imágenes, foco visible.
- SEO local: `<title>` y meta description optimizados, datos estructurados JSON-LD tipo `HairSalon` con dirección, horarios y aggregateRating.
- Performance: fuentes con preconnect, imágenes `loading="lazy"`, sin librerías pesadas (vanilla JS, nada de jQuery).
- Código limpio y comentado, fácil de editar para alguien no técnico (servicios y WhatsApp en un solo bloque de config).

Entregá la web completa y lista para publicar. Hacela sentir como una barbería premium de verdad: elegante, oscura, dorada, con movimiento y que dé ganas de reservar.

---

## 🟢 Tips de uso
- **Subí las 4 fotos** (los cortes y la fachada) junto al prompt → Claude Design las integra en hero y galería.
- Si querés variantes, pedile después: *“dame una versión con el hero a 2 columnas y un video de fondo”* o *“agregá una sección de equipo/barberos con fotos”*.
- Para iterar rápido: *“mantené todo igual pero hacé los dorados más cálidos y agrandá los precios”*.
