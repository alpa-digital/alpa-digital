# Home de Alpa: VELOX + Z1

Dirección solicitada por Francisco el 27 de octubre de 2026: «que me clones la home de velox combinada con la de z1». Sustituye las iteraciones anteriores y la demostración de pedidos, retirada por completo. Después, Francisco pidió dar personalidad propia al hero, con título, subtítulo y botón de vídeo como en Z1; esta revisión sustituye la pila de tarjetas de la primera adaptación.

Referencias revisadas visualmente en el navegador: [VELOX](https://www.somosvelox.es/) y [Z1](https://www.z1.digital/). La revisión describe composición y comportamiento; no atribuye resultados de SEO o conversión a estas decisiones.

## Traslado a Alpa

| Parte | Referencia | Implementación |
| --- | --- | --- |
| Cabecera | Barra negra flotante de VELOX | Marca blanca de Alpa, cuatro rutas principales, selector de idioma y contacto blanco. La home y contacto comparten esta cabecera. |
| Hero | Escala tipográfica y espacio de Z1 | Titular propio en negrita: «Automatizamos procesos. Desarrollamos productos.». Subtítulo concreto y botón azul para conocer Alpa en vídeo. Sin tarjetas ni cinta. |
| Vídeo | Acceso explícito a la presentación | Vídeo original en diálogo nativo, montado solo tras pulsar el botón. Controles de reproducción, Escape para cerrar y foco devuelto al botón. Sin reproducción automática en la home. |
| Clientes | Franja de marcas de VELOX | Una única franja con logos existentes de clientes de Alpa. |
| Servicios | Titular a la izquierda y servicio principal destacado a la derecha, como VELOX | Tres desplegables: automatización e IA, software y consultoría de IA. Se conservan las rutas de servicio. |
| Proyectos | Escala, dirección por producto y portadas escalonadas de Z1 | Dos destacados por carga, rotando entre MakerNotch, Boughtcast y BrandToAds. Capturas reales o logo del producto, portadas de distinto tratamiento y contribución confirmada. El resto de productos y los casos anónimos conservan sus enlaces. |
| Testimonios | Cita destacada y navegación manual de Z1 | Extracto literal del testimonio existente; atribución original y desplegable para leer el texto completo. |
| Preguntas | Columna de título y contacto, preguntas a la derecha, como VELOX | Controles nativos, contenido existente y acceso al contacto. |
| Cierre | Fondo negro, gran frase y enlace subrayado de Z1 | «¿Lo ponemos en marcha? Hablemos.», con enlace a `/contacto/`, integrado con el pie oscuro. |
| Contacto | Página dedicada de VELOX | Hero negro, formulario azul y datos de contacto en dos columnas. Sustituye al modal en toda la web y conserva el interés elegido desde los servicios. |

## Contenido y recursos

Se conserva la identidad de Alpa y su oferta de automatización y desarrollo de software. No se han copiado textos comerciales, marcas, proyectos ni material de clientes de las referencias. El hero explica las dos líneas de trabajo; el portfolio presenta las capturas y el contexto confirmado de los proyectos. Las cifras visibles en las capturas son datos de ejemplo y se identifican como tales.

El vídeo de marca completo se reproduce con sonido solo tras una acción del visitante. Se conserva su formato horizontal y se ha retirado el extracto usado por el carrusel anterior. No hace falta una versión vertical para este hero. Las necesidades de material para ampliar los casos siguen en `pendiente-alpa.md`.

## Comprobación local

La composición se revisa en escritorio y móvil. Se comprueban apertura y cierre del vídeo, recuperación del foco y ausencia de vídeo antes de la interacción. Build, TypeScript, ESLint y HTML prerenderizado forman parte de la verificación técnica. Esta revisión no equivale a una medición de percepción de marca o conversión.

Verificación del hero tipográfico: sin desbordamiento horizontal a 320, 375, 768, 1024, 1280 y 1440 px. Un solo H1. Revisadas las versiones española e inglesa, apertura del vídeo, cierre con Escape, recuperación del foco y ausencia de elementos de vídeo antes del clic. Build de 503 páginas y sitemap completado, TypeScript sin errores y ESLint sin errores (17 avisos previos).

La sección se titula «De la idea a la solución». Verificadas tres recargas consecutivas: BrandToAds + MakerNotch, MakerNotch + Boughtcast y Boughtcast + BrandToAds. La rotación se aplica después de la hidratación, conservando un HTML inicial estable y todos los enlaces a los casos.

Contacto revisado en las referencias: [VELOX contacto](https://www.somosvelox.es/contacto) y [cierre de Z1](https://www.z1.digital/). La adaptación conserva marca, servicios y datos de Alpa. Prueba del formulario sobre HTML prerenderizado con servicio local simulado: validación obligatoria y foco en el primer error, selección de producto desde URL, fallo 503 con mensaje conservado y correo de respaldo, y confirmación de éxito con foco. No se han enviado correos reales. Nueva ruta en el sitemap y canonical limpio, sin parámetros de interés.

Verificación final de contacto: build de 504 páginas, TypeScript sin errores y ESLint sin errores (17 avisos anteriores). HTML de contacto con un H1, canonical correcto, ruta en sitemap y sin enlaces internos inexistentes. Sin desbordamiento horizontal del formulario a 320, 375, 768, 1024 y 1280 px; revisadas las versiones ES/EN. Navegación comprobada desde cabecera, CTA final y CTA de desarrollo de producto, este último con `tema=producto` seleccionado. El envío real queda para el entorno configurado.
