# Subpáginas de servicios: diseño compartido

Implementación del 27 de octubre de 2026. Las seis fichas siguen la composición del índice `/servicios/`:

- `/servicios/sistemas-ia/`
- `/servicios/automatizacion-ia-pymes/`
- `/servicios/agentes-ia-empresas/`
- `/servicios/desarrollo-software-medida-ia/`
- `/servicios/consultoria-ia-pymes/`
- `/servicios/desarrollo-producto-digital/`

## Base común

`ServiceDetailLayout.tsx` reúne cabecera, breadcrumbs, hero claro, introducción breve, contacto, FAQ, proyectos y cierre compartido. `ServicePage.tsx` conserva los datos de las cinco fichas generales; `ProductPage.tsx` adapta la ficha de producto a la misma base. `servicePresentation.ts` aporta introducciones cortas; el alcance completo continúa en el cuerpo.

Se usan los mismos contenedores, tipografía, espacios y listas abiertas del índice. Las capacidades de los pilares se despliegan con selección exclusiva y animación interrumpible. Las FAQ conservan selección independiente. Se retiran las tarjetas repetidas y el CTA degradado de estas fichas. Las otras rutas que utilizan `PageShell` mantienen su diseño.

Software y producto reutilizan portadas reales de MakerNotch y Boughtcast con identificación de datos de ejemplo. Automatización y agentes presentan sus casos anónimos relacionados; sistemas enlaza a ambos como referencias de automatización. No se atribuyen estos proyectos a consultoría ni se inventan pantallas de clientes.

Los CTA conservan tema y ruta de origen. Se mantienen las rutas, metadatos, breadcrumbs, contenidos de alcance y enlaces a servicios, guías, proyectos y analizador. La variante de `RelatedResources` modifica únicamente su presentación dentro de servicios. Los textos españoles existentes se conservan; esta tarea no traduce el catálogo.

## Verificación

Las seis rutas se han comprobado a 320, 768 y 1280 px: un H1, cabecera compartida, sin desbordamiento horizontal o de títulos tras ajustar el título más largo a 320 px. Revisión visual del hero y cuerpo de software y producto, y del caso ferroviario en móvil a 375 px.

Comprobadas expansión con teclado, selección de capacidades, FAQ, ancla de entregables y contacto de software hacia `?tema=sistemas`. La alternativa de movimiento reducido se hereda y se conserva; no se ha emulado el ajuste del sistema.

TypeScript y ESLint de los archivos modificados sin errores. Build con 504 páginas y sitemap. Las seis páginas prerenderizadas mantienen canonical propio, un H1 e IDs únicos; 235 enlaces revisados, incluidos fragmentos, sin destinos internos inexistentes. No se han enviado formularios ni desplegado cambios.
