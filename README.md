# alpa.digital

Landing de Alpa Digital: automatización con inteligencia artificial y consultoría para pymes.

## Stack

- React 18 + TypeScript, construido con Vite
- Tailwind CSS y componentes shadcn/ui
- Iconos de lucide-react
- Dos funciones de servidor en `netlify/functions` (análisis de webs con Claude y envío de informes por email). El resto de la web es estática.

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
- `src/components/AutomationScan.tsx`: analizador de webs. Llama a `/api/analyze`; si no está disponible usa la estimación por sector de `src/lib/scanFallback.ts`. El email del informe va a `/api/lead`, con `mailto:` como respaldo.
- `src/components/Services.tsx`: las tres ofertas (diagnóstico, automatización, acompañamiento). Los precios se editan en el array `services`.
- `src/components/Workflow.tsx`: proceso de trabajo en cinco pasos.
- `src/components/FAQ.tsx`: preguntas frecuentes. Si cambian, actualizar también `src/components/SEOHead.tsx`.
- `src/components/SEOHead.tsx`: datos estructurados (FAQ, servicios, contacto).
- `index.html`: título, meta descripción, Open Graph y datos de organización.

## Funciones de servidor

Desplegadas con Netlify Functions desde `netlify/functions`:

- `analyze.mts` (`POST /api/analyze`): descarga el texto público de la web indicada y pide a Claude un mapa de automatización por área en formato estructurado. Necesita `ANTHROPIC_API_KEY`.
- `lead.mts` (`POST /api/lead`): envía el informe completo al email del visitante y un aviso a `LEAD_TO_EMAIL` usando Resend. Necesita `RESEND_API_KEY`.

Las variables están descritas en `.env.example`. Se configuran en el panel de Netlify, nunca en el repositorio. Sin ellas, la web sigue funcionando: el analizador muestra una estimación por sector y el formulario abre el cliente de correo.
