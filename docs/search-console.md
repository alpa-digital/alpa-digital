# Google Search Console: seguimiento de Alpa Digital

## Punto de partida

La propiedad de dominio `alpa.digital` ya está verificada. El 27 de octubre de 2026, el informe de búsqueda web mostraba 27 clics y aproximadamente 3.360 impresiones entre el 28 de septiembre y el 25 de octubre, frente a 15 clics y 3.070 impresiones en los 28 días anteriores. La posición media pasó de 28,9 a 27,6. Son volúmenes pequeños; comparar también por página y consulta.

El informe de indexación, actualizado el 23 de octubre, mostraba 345 páginas indexadas y 261 no indexadas: 256 redirecciones, 3 alternativas con canónica adecuada, un error de redirección y una página rastreada sin indexar. Una exclusión no implica por sí sola un problema: revisar su motivo y la URL concreta.

## Oportunidades observadas por página y consulta

En el mismo periodo de 28 días, la página de consultoría de IA registró 193 impresiones y 1 clic; instalaciones eléctricas, 96 impresiones y 2 clics; inmobiliarias, 80 impresiones y 1 clic; Alcoy, 63 impresiones y 1 clic; y Nerja, 3 impresiones y 2 clics. Son muestras pequeñas y no prueban por sí mismas que un cambio aumente el tráfico.

Entre las consultas visibles estaban «agencia ia sevilla» (139 impresiones), «consultoría digital para pymes» (91), «soluciones ia para empresas malaga» (61) y «automatización instalaciones» (55). Los totales de una consulta y una URL no implican que correspondan entre sí: para confirmarlo hay que filtrar por página y consulta.

En la versión local se ha mejorado la explicación de consultoría, la introducción de instalaciones y los ejemplos de Nerja y Estepona. Las páginas de Sevilla, Málaga y Alcoy ya tienen bloques editoriales propios. Se recomienda conservarlas y volver a medir después del despliegue; no se han aplicado redirecciones ni consolidaciones.

El informe de Core Web Vitals, actualizado el 21 de octubre, indicaba que no había suficientes datos reales de uso en los últimos 90 días para móvil ni ordenador. Esto no equivale a una evaluación positiva o negativa del rendimiento.

## Sitemap y URL preferidas

El sitemap de producción consultado el 27 de octubre de 2026 respondía con 488 URL. Search Console mostraba una lectura histórica con solo dos URL descubiertas. Revisar la fecha de lectura y reenviar el sitemap después del despliegue si sigue sin actualizarse. El sitemap ayuda a descubrir las URL, pero no garantiza su rastreo ni su indexación.

Netlify respondía con redirección permanente para `/servicios`, `/automatizacion-ia/malaga` y `/automatizacion-ia/alicante/alcoy` hacia sus versiones con barra final, que devolvían 200. El build genera el sitemap y las etiquetas canónicas con esa versión. Después de desplegar, comprobar que siguen respondiendo correctamente y que sitemap, enlaces y canónicas coinciden. La raíz es `https://alpa.digital/`.

## Revisión tras cada despliegue

1. Comprobar que `https://alpa.digital/sitemap.xml` y `https://alpa.digital/robots.txt` responden correctamente.
2. Inspeccionar una muestra de páginas importantes en Search Console: inicio, servicios, instalaciones eléctricas, Sevilla, Málaga y Alcoy. Comparar canónica declarada y seleccionada por Google.
3. Revisar el error histórico de redirección de `/servicios` y validar una corrección solo después de verificar la respuesta pública.
4. Revisar títulos, descripción y datos estructurados al cargar y al navegar entre páginas.
5. Verificar contactos y eventos en el entorno de pruebas antes de asociarlos a conversiones publicitarias.

## Seguimiento mensual

- Comparar clics, impresiones, CTR y posición por página y consulta, con periodos equivalentes. Separar búsquedas de marca y las relacionadas con servicios o sectores.
- Registrar contactos recibidos y oportunidades cualificadas por canal cuando sea posible. No contabilizar abrir el correo como un mensaje enviado.
- Revisar páginas locales con datos y evaluar su utilidad individualmente antes de mejorar, mantener o consolidar. La ausencia de impresiones por sí sola no determina qué hacer.
- Comprobar Core Web Vitals cuando haya datos reales; usar también pruebas de laboratorio para detectar problemas técnicos.
- En Search Console, inspeccionar URL concretas y solicitar indexación cuando sea útil. La solicitud no garantiza indexación ni un plazo específico.
