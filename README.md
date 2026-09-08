# alpa.digital

Landing de Alpa Digital: automatización con inteligencia artificial y consultoría para pymes.

## Stack

- React 18 + TypeScript, construido con Vite
- Tailwind CSS y componentes shadcn/ui
- Iconos de lucide-react
- Dos funciones de servidor en `netlify/functions` (análisis de webs con Mistral y envío de informes por email). El resto de la web es estática.

## Desarrollo

```sh
npm install
npm run dev      # servidor en http://localhost:8080
npm run build    # genera dist/
npm run lint
```

## Estructura

- `src/pages/Index.tsx`: orden de las secciones de la landing.
- `src/components/Hero.tsx`: titular, subtítulo y ejemplo visual de una automatización.
- `src/components/AutomationFlows.tsx`: flujos animados por área (datos en `src/data/automationFlows.ts`).
- `src/components/AutomationScan.tsx`: analizador de webs. Llama a `/api/analyze`, que deduce el sector de la propia web; si no está disponible usa la estimación de `src/lib/scanFallback.ts`, que adivina el sector por el dominio. El email del informe va a `/api/lead`, con `mailto:` como respaldo.
- `src/components/Services.tsx`: las tres ofertas (diagnóstico, automatización, acompañamiento). Los precios se editan en el array `services`.
- `src/components/Workflow.tsx`: proceso de trabajo en cinco pasos.
- `src/components/FAQ.tsx`: preguntas frecuentes. Si cambian, actualizar también `src/components/SEOHead.tsx`.
- `src/components/SEOHead.tsx`: datos estructurados (FAQ, servicios, contacto).
- `index.html`: título, meta descripción, Open Graph y datos de organización.

## Funciones de servidor

Desplegadas con Netlify Functions desde `netlify/functions`:

- `analyze.mts` (`POST /api/analyze`): descarga el texto público de la web indicada y pide a Mistral (salida JSON estructurada) el sector de la empresa y un mapa de automatización por área. Necesita `MISTRAL_API_KEY`; `MISTRAL_MODEL` es opcional.
- `lead.mts` (`POST /api/lead`): envía el informe completo al email del visitante y un aviso a `LEAD_TO_EMAIL` usando Resend. Necesita `RESEND_API_KEY`.

Las variables están descritas en `.env.example`. Se configuran en el panel de Netlify, nunca en el repositorio. Sin ellas, la web sigue funcionando: el analizador muestra una estimación por sector y el formulario abre el cliente de correo.

## ¿Dónde se ejecuta el análisis?

El analizador necesita código de servidor. Hay dos opciones:

- **Netlify** (recomendada): las funciones de `netlify/functions` se despliegan con la web. Comprobar con `https://<sitio>/api/health`, que indica el proveedor y el modelo en uso y si las claves están configuradas.
- **Cualquier otro hosting** (Lovable, GitHub Pages, estático): importar los workflows de `n8n/` y definir `VITE_ANALYZE_ENDPOINT` y `VITE_LEAD_ENDPOINT` en el build. Detalles en `n8n/README.md`.

Si el analizador muestra "Estimación por sector" con un aviso en ámbar, el aviso indica cuál de los dos pasos falla.

## Despliegue en Netlify

1. En Netlify, "Add new site" → "Import an existing project" → elegir este repositorio y la rama a publicar. La configuración de build la toma de `netlify.toml`.
2. En "Site configuration" → "Environment variables", añadir `OPENAI_API_KEY` (o `MISTRAL_API_KEY`) y `RESEND_API_KEY`. Si están las dos claves de modelo, tiene prioridad OpenAI. Las demás variables de `.env.example` son opcionales.
3. Lanzar el deploy. Las funciones quedan en `https://<sitio>.netlify.app/api/analyze` y `/api/lead`.

Prueba rápida del análisis desde un terminal:

```sh
curl -sS https://<sitio>.netlify.app/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"url":"https://www.ejemplo.es"}'
```

Debe devolver un JSON con `company`, `sectorId`, `sector`, `summary`, `favicon` y seis `areas`.

Dos límites a tener en cuenta:

- Netlify corta las funciones síncronas a los 10 segundos. La función reparte ese tiempo entre descargar la web y llamar al modelo, y responde 504 si no llega. `ANALYZE_DEADLINE_MS` (por defecto 9200) ajusta ese presupuesto si Netlify amplía el límite del sitio.
- El plan gratuito de Mistral limita a 1 petición por segundo y a veces responde 429 "capacity exceeded" en modelos concretos. La función reintenta con pausa, pasa a JSON libre si el esquema falla y cambia a `MISTRAL_FALLBACK_MODEL` (por defecto `open-mistral-nemo`). Con un plan de pago desaparecen estos 429.
- Un 429 con `"code":"1300"` ("Rate limit exceeded") en todas las llamadas significa que la clave o el workspace de Mistral está en su límite (plan sin activar, cuota mensual agotada). Se comprueba con una llamada directa:

  ```sh
  curl -sS https://api.mistral.ai/v1/chat/completions \
    -H "Authorization: Bearer $MISTRAL_API_KEY" -H "Content-Type: application/json" \
    -d '{"model":"mistral-small-latest","messages":[{"role":"user","content":"Di hola"}],"max_tokens":5}'
  ```

  Si responde 429, el problema está en la cuenta de Mistral. Para cambiar de proveedor sin tocar código, definir `LLM_BASE_URL`, `LLM_API_KEY` y `LLM_MODEL` (cualquier API compatible con OpenAI: OpenAI, Groq, OpenRouter...).
