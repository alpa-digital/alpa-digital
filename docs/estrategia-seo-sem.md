# Estrategia SEO y SEM · Alpa Digital

Objetivo: que cuando una pyme española busque automatizar con inteligencia artificial, desarrollar una herramienta a medida o contratar consultoría de IA, Alpa Digital aparezca entre los primeros resultados, tanto en búsquedas genéricas como en las que llevan nombre de provincia o municipio.

Este documento define la estrategia y señala qué parte ya está implementada en la web y qué queda por hacer.

## 1. Posicionamiento y mensaje

- Dos líneas de servicio y así se comunican en toda la web: **Sistemas de herramientas y automatizaciones con IA** (lo que construimos: automatizaciones, agentes, apps corporativas y sistemas completos gobernados por IA, un mismo servicio a distintas escalas) y **Consultoría de IA** (cómo decidimos qué construir: diagnóstico, I+D, diseño de producto y roadmap corporativo). La consultoría tiene sección propia en la home, página pilar y aparece en cabecera y pie.
- Categoría a conquistar en buscadores: "automatización con IA para pymes" como puerta de entrada (búsqueda con intención de compra y poco disputada), y desde ahí "sistemas de IA para empresas", "apps corporativas con IA" y "consultoría de IA".
- Diferenciadores que deben aparecer en todas las páginas: alcance y plazo cerrados antes de empezar (sin importes en la web: el presupuesto se da en la primera llamada), empezar por un proceso, trabajar con las herramientas que la empresa ya usa, una persona decide, resultados medidos en horas.
- Prueba: el analizador de webs es el activo más diferencial. Cada página local y de servicio enlaza a él.

## 2. Palabras clave

Cuatro grupos, por intención. Los volúmenes exactos se validan en Google Keyword Planner y Search Console; aquí va la estructura.

| Grupo | Ejemplos | Intención | Página que responde |
|---|---|---|---|
| Sistemas de IA (transaccional) | automatización con IA para pymes, automatizar procesos empresa, agencia automatización IA, agentes de IA para empresas, apps corporativas con IA, software a medida con IA, IA corporativa pymes, sistemas de IA para empresas | Contratar | Pilar `/servicios/sistemas-ia` y sus tres páginas de detalle |
| Consultoría de IA (transaccional) | consultoría inteligencia artificial pymes, consultor IA empresas, diagnóstico automatización, roadmap IA empresa, estrategia inteligencia artificial pyme, prueba de concepto IA | Contratar | Pilar `/servicios/consultoria-ia-pymes` |
| Local | automatización IA Murcia, empresa de inteligencia artificial en Sevilla, agencia IA Zaragoza, automatizar empresa Cartagena | Contratar cerca | Páginas de provincia y municipio (`/automatizacion-ia/...`) |
| Sector | IA para clínicas dentales, automatizar presupuestos electricistas, chatbot WhatsApp restaurante, automatización facturas asesoría, pedidos por WhatsApp mayorista | Informarse y comparar | 11 páginas de sector (`/sectores/...`) y casos |
| Informacional | qué es un agente de IA, cuánto cuesta automatizar con IA, Kit Digital inteligencia artificial, cómo automatizar facturas | Aprender | Blog y guías (fase 2), FAQ de cada página |

Reglas de redacción: una intención por página, la palabra clave en título, H1, primer párrafo y URL, y siempre texto propio (los sectores y la nota económica de cada provincia existen para eso).

## 3. Arquitectura de la web

```
/                                   Home: propuesta, flujos, analizador, servicios, FAQ
/servicios                          Índice: las dos líneas
/servicios/sistemas-ia              Pilar 1: sistemas de herramientas y automatizaciones con IA
/servicios/automatizacion-ia-pymes      detalle: automatizaciones
/servicios/agentes-ia-empresas          detalle: agentes de IA
/servicios/desarrollo-software-medida-ia  detalle: apps corporativas y software a medida
/servicios/consultoria-ia-pymes     Pilar 2: consultoría de IA (diagnóstico, I+D, diseño de producto, roadmap)
/zonas                              Índice por comunidad autónoma
/automatizacion-ia/{provincia}      52 páginas de provincia
/automatizacion-ia/{provincia}/{municipio}   423 páginas de municipio (capital + principales; más en nivel 1)
/sectores                           Índice de sectores
/sectores/{sector}                  11 sectores: instalaciones, construcción, clínicas, asesorías, distribución, comercio, hostelería, inmobiliarias, industria, transporte, agroalimentario
/blog/{articulo}                    Fase 2: guías y casos
```

Enlazado interno: cabecera (Sistemas de IA, Consultoría, Sectores, Zonas), pie con las dos líneas, los sectores y las 52 provincias, tira de sectores en la home, cada tarjeta de sector de una página de provincia enlaza a su página de sector y cada sector enlaza a sus provincias con más peso, migas de pan en todas las interiores, cada provincia enlaza a sus municipios y a las provincias de su comunidad, cada municipio a su provincia y al resto de municipios.

## 4. SEO local

Qué diferencia una página local útil de una "página puerta" que Google penaliza: datos propios de la zona. Cada página de provincia lleva sus sectores dominantes con la automatización típica de cada uno, una frase sobre el tejido empresarial, preguntas frecuentes localizadas y datos estructurados `Service` con `areaServed`.

Sede: Utrera (Sevilla). Nivel 1 con visita presencial: Sevilla, Cádiz, Huelva, Córdoba, Málaga y Badajoz. Estas seis provincias tienen más municipios en la web (Sevilla, 27), un bloque de "primera reunión presencial sin coste" en sus páginas, prioridad en el sitemap y campañas locales de Google Ads. El resto de España se trabaja en remoto.

Acciones fuera de la web, por orden:

1. Completar la dirección postal y el teléfono de la sede en `src/data/site.ts` cuando se publique la ficha de Google Business Profile. Por ahora los datos estructurados solo declaran Utrera (Sevilla), sin calle. Con el teléfono se activa además la extensión de llamada en los anuncios.
2. Crear y verificar la ficha de Google Business Profile en Utrera: categoría principal "Consultor informático" o "Empresa de software", secundarias "Consultoría empresarial" y "Servicio de automatización", zona de servicio con Sevilla, Cádiz, Huelva, Córdoba, Málaga y Badajoz, servicios, fotos del equipo y del despacho, y una publicación al mes. Enlazar la ficha a `https://alpa.digital/automatizacion-ia/sevilla/utrera`.
3. Reseñas: pedir una reseña al cerrar cada proyecto (el módulo de marketing de los flujos ya lo cuenta como práctica; aplicarlo a la propia agencia). Objetivo: 10 reseñas en 90 días.
4. Citas locales coherentes (mismo nombre, dirección y teléfono): Páginas Amarillas, Cylex, Europages, Infoempresa, directorio de la Cámara de Comercio y del ayuntamiento de la sede.
5. Prioridad por niveles: nivel 1 (Sevilla, Cádiz, Huelva, Córdoba, Málaga y Badajoz) con casos reales, fotos y campañas SEM; nivel 2 el resto, sin inversión SEM inicial. El campo `tier` en `locations.ts` ya lo refleja.
6. Presencia local en Utrera y la Campiña: asociaciones de empresarios de Utrera, Dos Hermanas y Alcalá de Guadaíra, Cámara de Comercio de Sevilla, CADE de Utrera (Andalucía Emprende) y polígonos de la zona. Una charla práctica de "qué automatizar en tu empresa" en cada uno es la mejor fuente de enlaces locales y de reseñas.
7. Vigilar en Search Console qué páginas de municipio reciben impresiones a los 90 días. Las que no, se consolidan en su provincia (canonical) para no diluir autoridad.

## 5. SEO técnico

Implementado:

- Prerenderizado estático de las 427 URL en el build (React renderizado en servidor y hidratado en el navegador). Google recibe HTML completo, no una SPA vacía.
- Título, meta descripción, canonical, Open Graph y datos estructurados propios en cada página: `ProfessionalService` (organización), `Service` con `areaServed`, `BreadcrumbList` y `FAQPage`.
- Sitemap generado con prioridades y `robots.txt` que lo referencia.
- Migas de pan, enlazado interno y URLs limpias en español.
- Actualización de título y canonical al navegar sin recargar.

Pendiente:

- Imagen `og-image.jpg` (1200×630) con el nuevo mensaje, referenciada ya en todas las páginas.
- Dar de alta el sitemap en Search Console y en Bing Webmaster Tools.
- Revisar Core Web Vitals tras el despliegue (la home carga animaciones; medir LCP en móvil).
- Página 404 con enlaces a servicios y zonas.

## 6. Contenido y autoridad

Calendario de los tres primeros meses (una pieza por semana, 600 a 1.200 palabras, con datos propios):

1. Cuánto cuesta automatizar un proceso con IA en una pyme (precios reales, tiempos).
2. Caso: certificaciones eléctricas desde WhatsApp (empresa de instalaciones).
3. Kit Digital e inteligencia artificial: qué se puede financiar en 2026.
4. Qué es un agente de IA y qué no es (frente a un chatbot).
5. Automatizar facturas de proveedores: guía para asesorías y administraciones.
6. Caso: clínica dental sin teléfono ocupado.
7. WhatsApp para empresas con IA: qué se puede hacer de verdad.
8. Presupuestos a partir de fotos: cómo funciona en reformas e instalaciones.
9. Errores al adoptar IA en una pyme (y cómo evitarlos).
10. Caso: distribuidor con pedidos por foto.
11. Fichaje y partes de horas por WhatsApp: cumplir la ley sin papeles.
12. Cómo elegir proveedor de automatización con IA: 10 preguntas.

Autoridad:

- Casos de éxito con nombre, cifras y cita del cliente (el testimonio de Womanhood ya existe; convertirlo en caso).
- Colaboraciones con asesorías, gestorías y despachos: son prescriptores naturales de pymes y fuente de enlaces.
- Alta como Agente Digitalizador del Kit Digital si no se está: enlace institucional y canal de captación.
- Ponencias en Cámaras de Comercio, asociaciones de empresarios y polígonos industriales de las provincias de nivel 1.
- Perfil de LinkedIn de la empresa y de sus responsables publicando los casos.

## 7. SEM (Google Ads y LinkedIn)

Estructura de Google Ads:

| Campaña | Grupos de anuncios | Palabras clave (concordancia de frase y exacta) | Página de destino |
|---|---|---|---|
| Búsqueda · Sistemas IA | automatización, agentes de IA, apps corporativas, IA corporativa | "automatización con IA para pymes", "agentes de IA para empresas", "chatbot whatsapp para empresas", "desarrollo software a medida pymes", "apps corporativas", "sistemas de ia para empresas" | Pilar y páginas de detalle de sistemas |
| Búsqueda · Consultoría IA | diagnóstico, roadmap y estrategia, I+D y pruebas de concepto | "consultoría inteligencia artificial pymes", "consultor ia empresas", "diagnóstico automatización", "roadmap ia", "prueba de concepto ia" | `/servicios/consultoria-ia-pymes` |
| Búsqueda · Sectores | instalaciones, clínicas, asesorías, distribución, hostelería, inmobiliarias | "automatización para electricistas", "software citas clínica dental whatsapp", "automatizar asesoría", "pedidos por whatsapp mayorista", "reservas por whatsapp restaurante", "ia para inmobiliarias" | `/sectores/{sector}` |
| Búsqueda · Local (Sevilla, Cádiz, Huelva, Córdoba, Málaga, Badajoz) | una por provincia, segmentada geográficamente | "automatización ia sevilla", "empresa inteligencia artificial sevilla", "chatbot whatsapp sevilla", "desarrollo software sevilla" | `/automatizacion-ia/{provincia}` |
| Búsqueda · Marca | alpa digital | "alpa digital", "alpa digital studio" | `/` |

Ajustes:

- Negativas desde el primer día: gratis, curso, empleo, trabajo, máster, universidad, tutorial, pdf, plantilla, "qué es" (salvo en campañas informacionales).
- Anuncios responsivos con 12 títulos que combinen servicio, "alcance y plazo cerrados", "diagnóstico en 1 o 2 semanas", zona y llamada a la acción. Sin importes en los anuncios. Extensiones de enlaces (servicios, analizador, zonas), texto destacado (alcance y plazo cerrados, un mes de soporte, sin permanencia) y llamada.
- Puja: maximizar clics las dos primeras semanas; pasar a maximizar conversiones cuando haya 30 conversiones en 30 días.
- Presupuesto inicial sugerido: 52 € al día activando Sistemas IA (24 €, cuatro grupos), Consultoría IA (6 €), Sectores (10 €, seis grupos) y Local Sevilla (12 €). Las diez campañas completas suman 73 € al día. Revisar cada dos semanas con el coste por lead.
- Todo está preparado para importar en Google Ads Editor: `docs/google-ads/campanas.csv` (campañas, grupos, palabras clave y anuncios) y `docs/google-ads/negativas.csv`.
- Conversiones ya medidas en la web: `lead_submit` (informe del analizador), `contact_submit` (formulario), `cal_click` (reserva de llamada) y `analyze_result` (análisis completado, como conversión secundaria). Los parámetros UTM y el `gclid` viajan con cada lead.
- Remarketing: audiencia de GA4 "vio el analizador y no dejó email" y "vio una página de servicio", con anuncios de display y de YouTube de bajo coste.
- Performance Max solo cuando la búsqueda lleve tres meses estable.

LinkedIn Ads: anuncios de documento (el mapa de automatización de ejemplo) segmentados por cargo (gerente, director general, propietario) en empresas de 11 a 200 empleados y por sector (instalaciones, clínicas, distribución). Presupuesto de prueba: 300 € al mes.

## 8. Medición

- Google Search Console: impresiones, clics y posición por página y por consulta; vigilar las páginas locales.
- GA4 con Consent Mode v2 (implementado): páginas vistas, eventos de negocio, origen de campaña.
- Google Ads: coste por lead por campaña y por provincia.
- Panel mensual (Looker Studio): leads por canal, coste por lead, páginas locales con tráfico, posiciones de las 20 palabras clave principales.

Objetivos orientativos: a 3 meses, 100 páginas indexadas y 5 leads al mes; a 6 meses, primera página para las cuatro palabras de servicio en la provincia de la sede y 15 leads al mes; a 12 meses, primeras posiciones nacionales en "automatización con IA para pymes" y 30 leads al mes.

## 9. Plan de 90 días

Semanas 1 y 2: definir sede, ficha de Google Business Profile, Search Console y Analytics, imagen social, alta del sitemap, primeras campañas de búsqueda.
Semanas 3 a 6: cuatro artículos, dos casos de éxito, citas locales, petición de reseñas, ajuste de anuncios con datos.
Semanas 7 a 12: casos de éxito por sector, remarketing, colaboraciones con asesorías, revisión de páginas locales en Search Console y consolidación de las que no reciben impresiones.

## 10. Qué está hecho y qué falta

Hecho en la web: dos líneas de servicio con pilar y páginas de detalle, sección de consultoría en la home, arquitectura de zonas (476 páginas en total), prerenderizado, datos estructurados con la sede en Utrera (Sevilla), sitemap, medición con consentimiento, captura de campañas en los leads, enlazado interno, campañas de Google Ads listas para importar.

Falta y depende de decisiones de negocio: teléfono de la sede, ficha de Google Business Profile, identificadores de GA4 y Google Ads en las variables de entorno de Netlify, imagen social, contenido del blog y casos, activar las campañas.
