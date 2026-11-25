# Design

## Identity

Alpa conserva Plus Jakarta Sans, blanco, negro y azul primario HSL 217 100% 50%. La dirección es una agencia de automatización y desarrollo de software para pymes, startups y empresas. Claridad, confianza y cercanía profesional.

## Home: composición solicitada

Francisco ha pedido trasladar directamente la composición de VELOX y combinarla con la presentación de proyectos de Z1. Esta dirección sustituye las anteriores iteraciones de bloques editoriales y la demostración interactiva descartada.

- **Cabecera de la home:** barra negra flotante desde el inicio, marca blanca, tres rutas principales centradas respecto a la barra y contacto blanco. «Nosotros» se retira de la navbar de escritorio y móvil; la página sigue disponible desde el pie. El logo y los controles ocupan columnas laterales simétricas en escritorio, con alineación vertical común. Sectores, recursos y el resto de navegación siguen disponibles en el pie. Contacto, el índice y las fichas de servicios, metodología, trabajos y sus fichas usan esta misma cabecera negra; las demás páginas interiores conservan su cabecera anterior.
- **Hero propio de Alpa:** jerarquía tipográfica inspirada en Z1, con un titular negro en negrita: «Automatizamos procesos. Desarrollamos productos.». Subtítulo que concreta la oferta y un único botón para conocer Alpa en vídeo. Fondo gris neutro y azul reservado al botón. Sin tarjetas, carrusel, cinta ni capturas repetidas.
- **Vídeo:** el vídeo de marca original se monta y reproduce solo al pulsar el botón. Diálogo nativo con controles, cierre con Escape y devolución del foco. Sin vista previa automática ni descarga de vídeo antes de la interacción.
- **Servicios de VELOX:** propuesta principal a la izquierda, tres desplegables a la derecha. Automatización e IA en primer lugar; desarrollo de software y consultoría con sus propias rutas. Se retira la sección negra independiente de metodología.
- **Proyectos de Z1:** portadas grandes con tratamiento propio de cada producto, posiciones escalonadas y títulos destacados. La sección «De la idea a la solución» muestra dos destacados por carga y rota de forma cíclica entre MakerNotch, Boughtcast y BrandToAds dentro de la sesión de pestaña. Se utilizan capturas reales de MakerNotch y Boughtcast y el logo autorizado de BrandToAds. Los proyectos no destacados siguen enlazados, junto a Climbber. La selección permanece estable al cambiar de idioma o navegar y volver; no hay carrusel automático. Las capturas se concentran en el portfolio; las pantallas llevan identificación de datos de ejemplo.
- **Confianza:** una única franja de logos. Testimonios existentes, con extracto literal y opción de leer el texto completo; atribuciones sin cambios.
- **Preguntas y cierre:** preguntas nativas con presentación similar a VELOX. Cierre negro integrado con el pie, como Z1: «¿Lo ponemos en marcha? Hablemos.», con enlace de gran escala a la página de contacto.
- **Contacto:** ruta propia `/contacto/`, con hero negro, formulario azul de Alpa y columna de datos de contacto, siguiendo la estructura de VELOX. Los CTA de toda la web navegan aquí, sin modal; conservan el interés en `?tema=` y la página de origen en el estado de navegación. Campos con etiquetas, validación, confirmación y recuperación del mensaje ante errores.

## Página de servicios

La ruta `/servicios/` conserva la jerarquía de oferta de VELOX y la presentación de proyectos de Z1, con una composición abierta que sustituye las tres grandes tarjetas anteriores.

- Hero claro con «Automatización. Software.» en negrita, una explicación breve y tres accesos a la oferta. La cabecera negra compartida mantiene su centrado.
- Automatización e IA sobre blanco, con capacidades en desplegables animados exclusivos y enlaces a procesos, agentes y sistemas conectados. El caso ferroviario aparece junto a esta oferta, con un esquema conceptual de documentación, consulta e información de mantenimiento. También se enlaza el caso eléctrico.
- Desarrollo de software en una sección gris de ancho completo, alcance en una lista sencilla y portada real de MakerNotch con mayor escala. Se enlazan producto digital, software corporativo, Boughtcast y el catálogo de proyectos. No hay chips ni una segunda sección que repita las capturas.
- Consultoría sobre blanco, con diagnóstico, pruebas de concepto y hoja de ruta; presenta una forma de empezar antes de desarrollar.
- El proceso se resume en cuatro enlaces a las fases de `/como-trabajamos/`, donde vive la explicación completa. Cierre común hacia contacto; los CTA conservan el interés y el origen.
- Contenido ES/EN, ruta y metadatos conservados. Sin cifras, tecnologías, testimonios o proyectos nuevos. Se reutilizan la expansión animada y la portada de proyecto existentes.

### Subpáginas de servicios

Las seis rutas de detalle usan `ServiceDetailLayout`: cabecera negra compartida, hero claro con título en negrita, introducción breve y contacto, ancho de 1280 px, secciones abiertas y cierre negro común. Los textos completos de alcance siguen en el cuerpo, con capacidades, entregables, FAQ animadas y enlaces a servicios y recursos. Las tarjetas con borde y el CTA degradado anterior se retiran solo de estas rutas.

Software corporativo y producto digital presentan portadas reales de MakerNotch y Boughtcast. Automatización, agentes y sistemas enlazan a los casos anónimos existentes según su relación; no se inventan interfaces ni proyectos de consultoría. Se conservan rutas, metadatos, breadcrumbs y enlaces. La variante de recursos de servicios reutiliza esta composición sin cambiar las otras páginas.

## Trabajos y fichas de proyecto

La ruta `/casos/` y sus seis fichas siguen la composición de Z1 Work: entrada tipográfica clara sobre blanco, portadas grandes y detalle con identidad por proyecto. Se conservan las URLs existentes.

- Listado con filtros de producto y automatización y vistas de cuadrícula/lista. Los filtros y la vista viven en la URL y se conservan al regresar desde una ficha.
- Cuadrícula de dos columnas en escritorio y una en móvil. La lista mantiene miniatura y nombre legibles. No se fuerzan anchos mínimos ni desplazamientos horizontales.
- Fichas con nombre, titular, alcance, solución, resumen, secciones enlazadas, servicio relacionado, otros trabajos y navegación anterior/siguiente. Los casos anónimos mantienen la identidad del cliente protegida.
- Las capturas de MakerNotch y Boughtcast se muestran completas y se pueden ampliar en un diálogo nativo. El logo de BrandToAds se identifica como logo. Climbber y los dos casos anónimos usan portadas tipográficas, sin inventar interfaces o fotografías de clientes.
- Metadatos de presentación bilingües en `src/data/work.ts`, derivados de los hechos de `productCases.ts` y `cases.ts`. No añadir tecnologías, cifras o atribuciones sin confirmar.

## Cómo trabajamos

La ruta `/como-trabajamos/` adopta la composición de Z1 Process: hero negro, cuatro fases de gran escala sobre blanco, ilustración geométrica por fase y detalle ampliable a pantalla completa.

- Fases adaptadas a automatización y software: estrategia y alcance, diseño de la solución, desarrollo e integración, puesta en marcha y evolución. El trabajo y los entregables se comparten con el resumen de servicios para mantener la coherencia.
- Cada fase presenta un diagrama conceptual propio en blanco, negro y azul. Son explicaciones del método, no capturas ni documentos atribuidos a clientes.
- El detalle explica qué hacemos, qué queda preparado y cómo participa el cliente; permite avanzar y retroceder entre fases. Diálogo nativo con cierre por Escape, foco inicial en el título, bloqueo del fondo y devolución al botón de apertura.
- Principios de trabajo, dos referencias reales de producto y automatización, y cierre común hacia contacto. Contenido ES/EN en `src/data/process.ts`.
- Dos columnas en escritorio y una en móvil, sin animaciones de entrada ni dependencias nuevas. Las necesidades opcionales de documentación real permanecen en `docs/pendiente-alpa.md`.

## Accessibility and motion

Contenido y enlaces disponibles sin depender de animaciones de entrada. El botón de vídeo admite teclado; el diálogo mantiene el foco y lo devuelve al botón al cerrar. Respetar movimiento reducido y evitar reproducción automática con sonido. Mantener contraste, foco visible, navegación móvil y jerarquía de encabezados.

La home usa una entrada escalonada breve del titular y su apoyo, con contenido visible desde el primer fotograma. Los servicios y preguntas abren y cierran con animación de tamaño interrumpible; los servicios mantienen una sola selección. En escritorio el texto introductorio de servicios acompaña las tarjetas con posición sticky. Las dos portadas entran una vez y sus imágenes tienen un desplazamiento corto ligado al scroll, independiente del zoom de hover. Testimonios y vídeo suavizan sus cambios de estado. El desplazamiento de página sigue siendo nativo; no hay animaciones continuas en reposo ni librerías añadidas. Duraciones y verificación en `docs/animaciones-home.md`.

## SEO and maintenance

Conservar las rutas, canónicas y enlaces existentes. No inventar cifras, testimonios o proyectos. Las páginas interiores de servicios, metodología y casos siguen siendo el lugar para el detalle. El analizador continúa desplegable y conserva `/#analiza-tu-empresa`; sus resultados son estimaciones. Las necesidades de materiales se mantienen en `docs/pendiente-alpa.md`.
