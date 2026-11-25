# Mantener los recursos de Alpa

Las guías se mantienen en `src/data/resources.ts`. Cada entrada tiene un identificador `slug`, título, resumen, categoría, introducción y secciones con párrafos y listas opcionales. El archivo también contiene los identificadores de servicios, sectores y casos relacionados. La web usa esos datos para generar la página, la sección de recursos, los enlaces relacionados y el sitemap.

Para añadir una guía, copia una entrada existente y cambia sus campos. Usa un `slug` único en minúsculas, con guiones y sin tildes; comprueba que las referencias relacionadas existen en `src/data/services.ts`, `src/data/sectors.ts` o `src/data/cases.ts`. Evita cambiar el `slug` de una guía ya publicada sin preparar la redirección correspondiente.

Antes de publicar, revisa que los ejemplos, cifras y afirmaciones se puedan respaldar, que el texto responda a una pregunta concreta y que sus enlaces sean útiles. Si hay información nueva o un cambio significativo, revisa la guía; no es necesario actualizar fechas por rutina. Ejecuta `npm run build` y `npm run lint`, comprueba la página en móvil y escritorio y solicita la revisión de otra persona del equipo. El contenido se publica cuando se despliega la web.

Los casos reales se editan en `src/data/cases.ts`. Mantén el anonimato acordado con cada cliente y no añadas resultados numéricos sin confirmar cómo se midieron.

El material y las decisiones pendientes del equipo se registran en [pendiente-alpa.md](./pendiente-alpa.md).
