# Campañas de Google Ads

`campanas.csv` se importa en Google Ads Editor: Cuenta → Importar → Desde archivo. Contiene 11 campañas de búsqueda con sus grupos, palabras clave (concordancia de frase y exacta), anuncios responsivos de búsqueda y presupuestos diarios sugeridos (76 € al día en total; se puede empezar activando solo Automatización IA, Agentes IA y Local Sevilla, 39 € al día).

`negativas.csv` es la lista de palabras negativas a nivel de cuenta (Herramientas → Listas de palabras clave negativas).

Antes de activar:

1. Vincular Google Ads con GA4 e importar las conversiones `lead_submit`, `contact_submit` y `cal_click` (principales) y `analyze_result` (secundaria). En la web ya se envían con `VITE_GA4_ID` y `VITE_GADS_ID` configuradas en Netlify.
2. Añadir extensiones: enlaces de sitio (Servicios, Analiza tu empresa, Zonas, Precios), textos destacados (Precio cerrado, Un mes de soporte, Sin permanencia, Sede en Utrera), extensión de ubicación desde la ficha de Google Business Profile y extensión de llamada cuando haya teléfono.
3. Las campañas locales están segmentadas por provincia (presencia física o interés). Las genéricas, a toda España.
4. Puja: maximizar clics las dos primeras semanas; cambiar a maximizar conversiones al llegar a 30 conversiones en 30 días.
5. Revisar los términos de búsqueda cada semana durante el primer mes y ampliar la lista de negativas.
