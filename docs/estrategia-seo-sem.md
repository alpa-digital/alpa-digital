# Estrategia SEO y SEM · Alpa Digital

Objetivo: que cuando una pyme española busque automatizar con inteligencia artificial, desarrollar una herramienta a medida o contratar consultoría de IA, Alpa Digital aparezca entre los primeros resultados, tanto en búsquedas genéricas como en las que llevan nombre de provincia o municipio.

Este documento define la estrategia y señala qué parte ya está implementada en la web y qué queda por hacer.

## 1. Posicionamiento y mensaje

- Categoría a conquistar: "automatización con IA para pymes". Es una búsqueda con intención de compra, todavía poco disputada por agencias con enfoque en pequeña empresa, y encaja con la oferta (diagnóstico 490 €, automatización desde 1.500 €, acompañamiento 350 €/mes).
- Diferenciadores que deben aparecer en todas las páginas: precio cerrado, empezar por un proceso, trabajar con las herramientas que la empresa ya usa, una persona decide, resultados medidos en horas.
- Prueba: el analizador de webs es el activo más diferencial. Cada página local y de servicio enlaza a él.

## 2. Palabras clave

Cuatro grupos, por intención. Los volúmenes exactos se validan en Google Keyword Planner y Search Console; aquí va la estructura.

| Grupo | Ejemplos | Intención | Página que responde |
|---|---|---|---|
| Servicio (transaccional) | automatización con IA para pymes, automatizar procesos empresa, agencia automatización IA, agentes de IA para empresas, desarrollo software a medida con IA, consultoría inteligencia artificial pymes | Contratar | Páginas de servicio (`/servicios/...`) |
| Local | automatización IA Murcia, empresa de inteligencia artificial en Sevilla, agencia IA Zaragoza, automatizar empresa Cartagena | Contratar cerca | Páginas de provincia y municipio (`/automatizacion-ia/...`) |
| Sector | IA para clínicas dentales, automatizar presupuestos electricistas, chatbot WhatsApp restaurante, automatización facturas asesoría | Informarse y comparar | Páginas de sector (fase 2) y casos |
| Informacional | qué es un agente de IA, cuánto cuesta automatizar con IA, Kit Digital inteligencia artificial, cómo automatizar facturas | Aprender | Blog y guías (fase 2), FAQ de cada página |

Reglas de redacción: una intención por página, la palabra clave en título, H1, primer párrafo y URL, y siempre texto propio (los sectores y la nota económica de cada provincia existen para eso).

## 3. Arquitectura de la web

```
/                                   Home: propuesta, flujos, analizador, servicios, FAQ
/servicios                          Índice de servicios
/servicios/automatizacion-ia-pymes
/servicios/agentes-ia-empresas
/servicios/desarrollo-software-medida-ia
/servicios/consultoria-ia-pymes
/zonas                              Índice por comunidad autónoma
/automatizacion-ia/{provincia}      52 páginas de provincia
/automatizacion-ia/{provincia}/{municipio}   375 páginas de municipio (capital + principales)
/sectores/{sector}                  Fase 2: 8 a 12 sectores
/blog/{articulo}                    Fase 2: guías y casos
```

Enlazado interno: cabecera (Servicios, Automatizaciones, Zonas), pie con los cuatro servicios y las 52 provincias, migas de pan en todas las interiores, cada provincia enlaza a sus municipios y a las provincias de su comunidad, cada municipio a su provincia y al resto de municipios.

## 4. SEO local

Qué diferencia una página local útil de una "página puerta" que Google penaliza: datos propios de la zona. Cada página de provincia lleva sus sectores dominantes con la automatización típica de cada uno, una frase sobre el tejido empresarial, preguntas frecuentes localizadas y datos estructurados `Service` con `areaServed`.

Acciones fuera de la web, por orden:

1. Definir la sede y rellenar `src/data/site.ts` (dirección y teléfono). Sin dirección no hay ficha de Google Business Profile.
2. Crear y verificar la ficha de Google Business Profile: categoría principal "Consultor informático" o "Empresa de software", categorías secundarias "Consultoría empresarial" y "Agencia de marketing" si aplica, zona de servicio con las provincias prioritarias, servicios con precios, fotos del equipo y publicaciones mensuales.
3. Reseñas: pedir una reseña al cerrar cada proyecto (el módulo de marketing de los flujos ya lo cuenta como práctica; aplicarlo a la propia agencia). Objetivo: 10 reseñas en 90 días.
4. Citas locales coherentes (mismo nombre, dirección y teléfono): Páginas Amarillas, Cylex, Europages, Infoempresa, directorio de la Cámara de Comercio y del ayuntamiento de la sede.
5. Prioridad por niveles: nivel 1 la provincia de la sede y las limítrofes (páginas ampliadas con casos reales y fotos, campañas SEM activas); nivel 2 el resto (páginas generadas, sin inversión SEM inicial). El campo `tier` en `locations.ts` está preparado para esto.
6. Vigilar en Search Console qué páginas de municipio reciben impresiones a los 90 días. Las que no, se consolidan en su provincia (canonical) para no diluir autoridad.

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
| Búsqueda · Automatización IA | automatización pymes, automatizar procesos, agencia automatización | "automatización con IA para pymes", "automatizar procesos empresa", "agencia de automatización" | `/servicios/automatizacion-ia-pymes` |
| Búsqueda · Agentes IA | agentes de IA, chatbot WhatsApp empresa, asistente IA | "agentes de IA para empresas", "chatbot whatsapp para empresas", "asistente virtual IA empresa" | `/servicios/agentes-ia-empresas` |
| Búsqueda · Software a medida | software a medida, CRM a medida, app a medida | "desarrollo software a medida pymes", "crm a medida", "desarrollo de aplicaciones para empresas" | `/servicios/desarrollo-software-medida-ia` |
| Búsqueda · Consultoría | consultoría IA, consultor IA | "consultoría inteligencia artificial pymes", "consultor ia empresas" | `/servicios/consultoria-ia-pymes` |
| Búsqueda · Local nivel 1 | una por provincia prioritaria | "automatización ia {provincia}", "empresa inteligencia artificial {provincia}", "desarrollo software {provincia}" | `/automatizacion-ia/{provincia}` |
| Búsqueda · Marca | alpa digital | "alpa digital", "alpa digital studio" | `/` |

Ajustes:

- Negativas desde el primer día: gratis, curso, empleo, trabajo, máster, universidad, tutorial, pdf, plantilla, "qué es" (salvo en campañas informacionales).
- Anuncios responsivos con 12 títulos que combinen servicio, precio cerrado, "desde 1.500 €", "diagnóstico 490 €", zona y llamada a la acción. Extensiones de enlaces (servicios, analizador, zonas), texto destacado (precio cerrado, un mes de soporte, sin permanencia) y llamada.
- Puja: maximizar clics las dos primeras semanas; pasar a maximizar conversiones cuando haya 30 conversiones en 30 días.
- Presupuesto inicial sugerido: 20 a 30 € al día repartidos entre Automatización IA y Agentes IA, más 10 € al día en la campaña local de la sede. Revisar cada dos semanas con el coste por lead.
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
Semanas 7 a 12: páginas de sector, remarketing, colaboraciones con asesorías, revisión de páginas locales en Search Console y consolidación de las que no reciben impresiones.

## 10. Qué está hecho y qué falta

Hecho en la web: arquitectura de servicios y zonas (427 páginas), prerenderizado, datos estructurados, sitemap, medición con consentimiento, captura de campañas en los leads, enlazado interno.

Falta y depende de decisiones de negocio: sede y teléfono, ficha de Google Business Profile, identificadores de GA4 y Google Ads en las variables de entorno de Netlify, imagen social, contenido del blog y casos, campañas.
