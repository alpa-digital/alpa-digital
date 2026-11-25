# Cómo trabajamos: referencia Z1 Process

Implementación del 27 de octubre de 2026 en `/como-trabajamos/`.

Referencia revisada: [Z1 Process](https://www.z1.digital/process). Se adopta su composición: entrada oscura tipográfica, fases amplias con ilustración a la derecha, detalle ampliable, principios, trabajos y contacto. El contenido corresponde al proceso de automatización y desarrollo de software de Alpa. No se reproducen textos, clientes, personas ni resultados de Z1.

## Implementación

- Hero negro y navegación a las cuatro fases: estrategia y alcance, diseño, desarrollo e integración, puesta en marcha y evolución.
- Diagramas SVG propios de contexto, flujo, integración y mejora; identificados mediante pies explicativos como conceptos del método.
- Detalle nativo a pantalla completa con trabajo, entregables y participación del cliente. Navegación anterior/siguiente, cierre con Escape, devolución del foco y bloqueo del desplazamiento de fondo.
- Principios de trabajo y referencias de MakerNotch y del caso ferroviario anonimizado; cierre compartido hacia contacto.
- Copia ES/EN en `src/data/process.ts`. Trabajo y entregables derivados de `servicesPageCopy` para mantener coherencia con el resumen de servicios. Se conserva la ruta, canonical y metadatos existentes.

## Verificación local

Revisión visual de hero, fases, detalle, principios y trabajos. Sin desbordamiento horizontal en el contenido principal a 320, 375, 768, 1024, 1280 y 1440 px. Detalle revisado a 320, 375 y 1280 px. Hero y detalle en inglés comprobados a 320 px. Navegación entre fases, límites, Escape y restauración de foco y desplazamiento verificados.

TypeScript sin errores y ESLint completo sin errores, con los 17 avisos anteriores. Build de producción con 504 páginas y sitemap. No se han enviado formularios ni desplegado cambios.

Los mapas, prototipos y documentos reales que podrían enriquecer el método siguen registrados como material opcional en `pendiente-alpa.md`.
