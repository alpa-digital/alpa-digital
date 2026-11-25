# Página de servicios: composición abierta

Revisión del 27 de octubre de 2026 en `/servicios/`. Sustituye la primera adaptación con hero negro, tres grandes tarjetas, un proceso desplegable y una sección de proyectos independiente.

Se mantienen como referencias la jerarquía de [VELOX Servicios](https://www.somosvelox.es/servicios), la presentación de trabajo real de [Z1](https://www.z1.digital/work) y su [proceso](https://www.z1.digital/process). La composición utiliza la identidad de Alpa: Plus Jakarta Sans, blanco, negro y azul. No se copian textos, clientes ni resultados.

## Qué se corrige

La oferta anterior parecía un conjunto de fichas encerradas. El caso práctico quedaba separado de la capacidad que respaldaba, y el proceso duplicaba la página de metodología. La nueva versión reúne oferta y evidencia y reduce esa repetición.

- Hero claro con «Automatización. Software.» en negrita; explicación breve y tres accesos a las líneas de servicio.
- Automatización e IA sobre blanco, con capacidades desplegables exclusivas y enlaces a sus páginas. Se utiliza `AnimatedDetails`, con apertura y cierre interrumpibles y teclado nativo.
- Caso ferroviario junto a la oferta de automatización, con contexto confirmado y un esquema conceptual de manuales, consulta e información de mantenimiento. Se identifica como anonimizado; no se simula una interfaz del cliente. También se conserva el enlace al caso eléctrico.
- Software en una sección gris de ancho completo, una lista de alcance y una portada grande de MakerNotch con captura real identificada como datos de ejemplo. Se enlaza a Boughtcast y al catálogo, sin otra sección que repita las capturas.
- Consultoría con diagnóstico, prueba de concepto y hoja de ruta, presentada como una forma de empezar antes de desarrollar.
- Cuatro fases resumidas, enlazadas a sus secciones en `/como-trabajamos/`. El detalle del método vive allí. Cierre compartido y contacto con tema y origen conservados.

Las rutas, canónicas, metadatos y servicios de detalle se mantienen. La revisión de composición no demuestra por sí misma una mejora de SEO o conversión. No se añaden cifras, precios, tecnologías, garantías o resultados.

## Responsive y verificación

Revisado en navegador a 320, 375, 768, 1024, 1280 y 1440 px. Las columnas pasan a una a partir de 900 px; el proceso usa dos columnas en móvil, con espacio completo para los títulos. Se corrigieron el ajuste del hero a 1024 px y un título de fase a 320 px. Sin desbordamiento horizontal o de encabezados en esas comprobaciones. Inglés revisado a 320 px.

Comprobados anclas, expansión con teclado, contacto de producto hacia `?tema=producto`, ida y vuelta al proceso completo y carga de la captura real. La alternativa de movimiento reducido se conserva en CSS y en la expansión; no se ha emulado el ajuste del sistema. Sin errores en consola; aparecen los avisos de desarrollo existentes de React Router sobre su futura versión.

Validación de producción: TypeScript, ESLint de los componentes modificados y build de 504 páginas. HTML del índice con un H1, IDs únicos, canonical conservado y enlaces internos válidos. No se han enviado formularios ni desplegado cambios.

El material opcional para enriquecer los ejemplos sigue registrado en `pendiente-alpa.md`; la página funciona con lo ya disponible.
