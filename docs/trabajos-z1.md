# Trabajos y detalle de proyecto: referencia Z1

Implementación del 27 de octubre de 2026 en `/casos/` y las seis rutas de detalle existentes.

Referencias revisadas en navegador: [Z1 Work](https://www.z1.digital/work) y [ficha de Gabby](https://www.z1.digital/work/gabby). Se toma la estructura visual: título y portadas de gran escala, catálogo filtrable, ficha con metadatos, resumen, narrativa y proyectos relacionados. Textos, proyectos, medios y datos pertenecen a Alpa. No se reproducen resultados, equipo, reconocimientos ni contenidos de clientes de Z1.

## Implementación

- Seis trabajos: MakerNotch, Boughtcast, BrandToAds, Climbber y los dos casos anónimos confirmados.
- Filtros por producto y automatización y vistas de cuadrícula y lista. Parámetros `tipo` y `vista` en la URL; la vuelta desde una ficha mantiene la selección.
- Cada ficha tiene tratamiento de color propio, contexto del proyecto, alcance confirmado, resumen y secciones; enlaces a servicios, trabajos relacionados y navegación anterior/siguiente.
- Capturas completas y ampliables de MakerNotch y Boughtcast, con identificación de datos de ejemplo. Diálogo nativo con Escape y devolución del foco. BrandToAds usa su logo; los proyectos sin captura disponible llevan portadas tipográficas.
- Contacto por página dedicada, con interés de producto o automatización según el caso. Se conserva el CTA final común.
- Copia bilingüe de presentación en `src/data/work.ts`; los hechos españoles se leen de los registros existentes. No se añaden tecnologías, fechas, métricas ni entregables sin respaldo.

## Responsive y verificación

Cuadrícula de dos columnas en escritorio y una en móvil; sin alturas fijas de capturas en las fichas. La información del proyecto y las secciones pasan a una columna en móvil, con navegación de contenido sin posición fija. Los nombres largos pueden envolver sin desbordar. La vista de lista usa una miniatura y texto legible en pantallas estrechas.

Comprobado el índice en cuadrícula a 320, 375, 768, 1024, 1280 y 1440 px, y en lista a 320, 768 y 1280 px. Las seis fichas se han comprobado a 320, 768 y 1280 px. Sin desbordamiento horizontal ni títulos desbordados en esas pruebas. Se han probado filtros, vista de lista, ida/vuelta desde una ficha y ampliación/cierre de una captura con recuperación de foco. La revisión corresponde a Alpa; no atribuye errores o rendimiento a la referencia.

El material adicional para ampliar las historias y galerías queda en `pendiente-alpa.md`. La estructura actual funciona con lo ya confirmado.

Verificación de producción: build de 504 páginas y sitemap. TypeScript sin errores; ESLint completo con los 17 avisos anteriores y sin errores. Las siete páginas de trabajos conservan un H1, canonical propio, IDs únicos y enlaces internos válidos. Carga directa del listado filtrado y recarga de la ficha con su estado de retorno comprobadas sobre HTML prerenderizado, sin errores de hidratación en consola. Índice y ficha de MakerNotch en inglés comprobados a 320 px sin desbordamiento.

Comprobados también el ancla de aportación con margen bajo la cabecera, el CTA de producto hacia contacto y la navegación de MakerNotch a Boughtcast. No se han enviado formularios ni desplegado cambios.
