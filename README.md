# Seven Barber Studio — Landing de alta conversión

Landing page para **Seven Barber Studio** (La Plata, Buenos Aires) con agenda de turnos
que confirma directo por **WhatsApp**. Estética negro + dorado, serif elegante, basada en
la identidad de la marca.

## 🚀 Cómo verla
Es un sitio estático (HTML/CSS/JS puro, sin build). Opciones:

1. **Doble clic** en `index.html` (abre en el navegador).
2. Servidor local (recomendado, para que el mapa y las fuentes carguen bien):
   ```bash
   npx serve .
   # o
   python -m http.server 8080
   ```
3. **Deploy gratis**: arrastrá la carpeta a [Netlify Drop](https://app.netlify.com/drop)
   o subila a Vercel / GitHub Pages. Funciona tal cual.

## 📁 Estructura
```
index.html              ← estructura y contenido
css/styles.css          ← estética negro/dorado + animaciones
js/script.js            ← agenda, WhatsApp, animaciones scroll
assets/cortes/          ← poné acá las fotos reales (ver instrucciones dentro)
CLAUDE_DESIGN_PROMPT.md ← prompt listo para pedir mejoras en Claude Design
```

## ✏️ Qué editar (todo en un solo lugar)
- **Número de WhatsApp / horarios** → arriba de `js/script.js` (`WHATSAPP_NUMBER`, `OPEN_HOUR`, `CLOSE_HOUR`).
- **Servicios y precios** → array `SERVICES` en `js/script.js` (se reflejan en la carta Y en la agenda).
- **Fotos** → carpeta `assets/cortes/` (nombres en el instructivo de ahí adentro).
- **Datos de contacto / dirección** → `index.html` (sección Ubicación y footer).

## ✅ Cómo funciona la agenda
El cliente elige servicio, día y horario → al confirmar se abre WhatsApp con el mensaje
ya escrito hacia el número de la barbería. Cero fricción, máxima conversión para un negocio local.
Los domingos quedan bloqueados automáticamente.

## ⚙️ Datos del negocio
- Dirección: Calle 9 N° 620, entre 44 y 45 — La Plata, BA
- Horario: Lun a Sáb, 12 a 20 hs
- Tel/WhatsApp: 0221 600-2246
- Instagram: @seven_barberstudio
- Google: 5.0 ★ (22 reseñas)
