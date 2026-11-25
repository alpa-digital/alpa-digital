# Movimiento de la home

Revisión e implementación del 27 de octubre de 2026, tomando como referencia la fluidez de [VELOX](https://www.somosvelox.es/).

## Criterio

La referencia combina tarjetas con desaceleración, texto sticky junto a servicios y movimientos que acompañan el recorrido. Alpa conserva el hero tipográfico y su composición; se adapta el ritmo, sin volver al carrusel descartado ni añadir decoraciones o logos duplicados.

Presupuesto: móvil primero, sin dependencias nuevas, sin interceptar rueda o gestos y sin bucles de animación en reposo. No se promete una tasa de fotogramas medida: se revisan la interacción y la composición en navegador local; falta medir en dispositivos físicos de distintas prestaciones.

## Implementación

- Hero: dos líneas con 80 ms de separación, llegada de 800 ms y apoyo de 650 ms. Opacidad inicial parcial, nunca una sección oculta esperando JavaScript o un observador.
- Servicios: texto sticky desde 901 px y un único desplegable seleccionado. `AnimatedDetails` mantiene semántica nativa y teclado, mide el tamaño y anima apertura de 420 ms y cierre de 320 ms. Una nueva interacción cancela la anterior desde el tamaño actual; al terminar recupera tamaño natural y elimina el recorte temporal. La animación de tamaño se limita a estas interacciones de expansión.
- Preguntas y lectura del testimonio completo: mismo componente de expansión; las preguntas conservan su comportamiento de selección independiente.
- Portfolio: llegada única de las dos portadas, 760 ms y 80 ms de separación. Desplazamiento de las imágenes limitado a 22 px en escritorio y 10 px en móvil. Lecturas de geometría agrupadas, escrituras de transform después, un solo `requestAnimationFrame` pendiente y trabajo solo cuando el portfolio está cerca del viewport. La selección de proyectos por recarga sigue funcionando.
- Testimonios: transición de 350 ms al cambiar la cita, sin reproducción automática. El contenedor de anuncios para lectores de pantalla se conserva.
- Vídeo: entrada de 350 ms, salida de 180 ms y fondo atenuado coordinado. Escape y cierre detienen la reproducción y devuelven el foco; respaldo temporal para completar el cierre si se cancela la animación.
- Flechas y botón de vídeo: curvas comunes de desaceleración y feedback breve. No se añaden movimientos decorativos continuos.

## Accesibilidad y mantenimiento

`prefers-reduced-motion` desactiva entradas, desplazamiento de imágenes y microinteracciones; los desplegables cambian de estado inmediatamente. Los observadores y animaciones se limpian al salir y reaccionan si cambia la preferencia del sistema. No se cambia el desplazamiento nativo de la página. Sin JavaScript, el HTML mantiene los textos, enlaces y desplegables nativos; ninguna clase de revelado deja una sección oculta.

Fuentes principales: `src/hooks/useHomeMotion.ts`, `src/components/AnimatedDetails.tsx` y bloque «Home motion» de `src/index.css`.

## Verificación

Revisados hero, servicios, portadas, testimonios, preguntas y vídeo en navegador. Comprobadas apertura/cierre, cambio de tarjeta, interrupciones con teclado, finalización sin recorte residual y recorrido de imágenes con el scroll. El vídeo cierra con Escape, recupera foco y restaura el desplazamiento del fondo. Sin errores ni avisos en consola durante las pruebas.

Sin desbordamiento horizontal a 320, 375, 768, 1024, 1280 y 1440 px. Servicios en inglés revisados a 320 px. TypeScript y build de 504 páginas correctos; ESLint sin errores y con los 17 avisos previos. La alternativa de movimiento reducido se ha revisado en código; no se ha emulado el ajuste del sistema en esta sesión. No hay despliegue ni envíos de formulario.
