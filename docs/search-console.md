# Google Search Console: puesta en marcha e indexación

Orden de trabajo para que el SEO empiece a funcionar. Todo se hace en https://search.google.com/search-console con la cuenta de Google de la empresa. Antes de empezar, la web tiene que estar desplegada en https://alpa.digital con esta versión (la rama ya está fusionada en `main`).

## 1. Propiedad y verificación (una vez)

1. Añadir propiedad → tipo **Dominio** → `alpa.digital`. Cubre http, https, con y sin www.
2. Verificar por DNS: Search Console da un registro TXT; añadirlo en el DNS del dominio (donde esté gestionado: Netlify DNS, el registrador, etc.) y pulsar "Verificar". Puede tardar hasta unas horas.
3. Si el DNS no es accesible, alternativa: propiedad de **prefijo de URL** `https://alpa.digital` y verificar con la etiqueta HTML o con Google Analytics (el sitio ya carga GA4 si `VITE_GA4_ID` está en Netlify).

## 2. Sitemap (una vez)

Menú **Sitemaps** → añadir `https://alpa.digital/sitemap.xml` → Enviar. Contiene las 488 URL con sus prioridades. Es la vía principal de indexación: Google rastrea desde aquí sin pedir nada más.

Comprobar antes que responde: https://alpa.digital/sitemap.xml y https://alpa.digital/robots.txt (que referencia el sitemap).

## 3. Solicitar indexación manual (cuota: unas 10 URL al día)

Menú **Inspección de URL** → pegar la URL → "Solicitar indexación". Solo acelera; el sitemap hace el resto. Orden sugerido, unas diez por día:

**Día 1: home y servicios**
- https://alpa.digital/
- https://alpa.digital/servicios
- https://alpa.digital/servicios/sistemas-ia
- https://alpa.digital/servicios/automatizacion-ia-pymes
- https://alpa.digital/servicios/agentes-ia-empresas
- https://alpa.digital/servicios/desarrollo-software-medida-ia
- https://alpa.digital/servicios/consultoria-ia-pymes
- https://alpa.digital/sectores
- https://alpa.digital/zonas
- https://alpa.digital/automatizacion-ia/sevilla

**Día 2: sectores**
- https://alpa.digital/sectores/instalaciones-electricas
- https://alpa.digital/sectores/construccion-reformas
- https://alpa.digital/sectores/clinicas-salud
- https://alpa.digital/sectores/asesorias-gestorias-despachos
- https://alpa.digital/sectores/distribucion-mayoristas
- https://alpa.digital/sectores/comercio-ecommerce
- https://alpa.digital/sectores/hosteleria-restaurantes-hoteles
- https://alpa.digital/sectores/inmobiliarias-administracion-fincas
- https://alpa.digital/sectores/industria-talleres
- https://alpa.digital/sectores/transporte-logistica

**Día 3: sector restante y provincias presenciales**
- https://alpa.digital/sectores/agroalimentario-cooperativas
- https://alpa.digital/automatizacion-ia/sevilla/utrera
- https://alpa.digital/automatizacion-ia/sevilla/sevilla
- https://alpa.digital/automatizacion-ia/cadiz
- https://alpa.digital/automatizacion-ia/huelva
- https://alpa.digital/automatizacion-ia/cordoba
- https://alpa.digital/automatizacion-ia/malaga
- https://alpa.digital/automatizacion-ia/badajoz
- https://alpa.digital/automatizacion-ia/sevilla/dos-hermanas
- https://alpa.digital/automatizacion-ia/sevilla/alcala-de-guadaira

**Día 4: capitales de nivel 1 y municipios de la Campiña**
- https://alpa.digital/automatizacion-ia/cadiz/cadiz
- https://alpa.digital/automatizacion-ia/cadiz/jerez-de-la-frontera
- https://alpa.digital/automatizacion-ia/huelva/huelva
- https://alpa.digital/automatizacion-ia/cordoba/cordoba
- https://alpa.digital/automatizacion-ia/malaga/malaga
- https://alpa.digital/automatizacion-ia/badajoz/badajoz
- https://alpa.digital/automatizacion-ia/sevilla/los-palacios-y-villafranca
- https://alpa.digital/automatizacion-ia/sevilla/moron-de-la-frontera
- https://alpa.digital/automatizacion-ia/sevilla/carmona
- https://alpa.digital/automatizacion-ia/sevilla/ecija

A partir del día 5, no hace falta pedir más a mano: dejar que el sitemap trabaje y revisar **Páginas** (Indexación) cada semana. Las provincias fuera del nivel 1 y el resto de municipios entran solos.

## 4. Lo que hay que mirar las primeras semanas

- **Indexación → Páginas**: cuántas URL están indexadas y por qué se excluyen las que no. Normal ver "Descubierta, actualmente sin indexar" al principio; preocupa "Duplicada" o "Error de servidor".
- **Experiencia → Core Web Vitals** cuando haya datos: la home lleva animaciones; vigilar LCP en móvil.
- **Rendimiento**: a las 2 o 3 semanas empezarán a aparecer impresiones. Filtrar por consultas con "sevilla", "utrera" o nombre de sector para ver qué páginas locales funcionan.
- **Mejoras → Datos estructurados**: deben aparecer FAQ, migas de pan y organización sin errores.

## 5. Complementos

- **Bing Webmaster Tools** (https://www.bing.com/webmasters): "Importar desde Google Search Console" trae la propiedad y el sitemap en un clic.
- **Google Business Profile** de la sede en Utrera enlazando a https://alpa.digital/automatizacion-ia/sevilla/utrera. Es lo que más pesa en búsquedas locales.
- Cada vez que se publique una página nueva (un caso de éxito, un artículo), pedir su indexación a mano el mismo día.

Nota: la API de indexación de Google solo admite páginas de ofertas de empleo y eventos en directo, así que para esta web no hay forma automática de pedir indexación; el sitemap es el mecanismo correcto.
