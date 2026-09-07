# alpa.digital

Landing de Alpa Digital: automatización con inteligencia artificial y consultoría para pymes.

## Stack

- React 18 + TypeScript, construido con Vite
- Tailwind CSS y componentes shadcn/ui
- Iconos de lucide-react
- Sin backend: el formulario de contacto abre el cliente de correo (`mailto:`) y enlaza a Cal.com

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
- `src/components/Services.tsx`: las tres ofertas (diagnóstico, automatización, acompañamiento). Los precios se editan en el array `services`.
- `src/components/UseCases.tsx`: tareas que se automatizan en una pyme, por área.
- `src/components/Workflow.tsx`: proceso de trabajo en cinco pasos.
- `src/components/FAQ.tsx`: preguntas frecuentes. Si cambian, actualizar también `src/components/SEOHead.tsx`.
- `src/components/SEOHead.tsx`: datos estructurados (FAQ, servicios, contacto).
- `index.html`: título, meta descripción, Open Graph y datos de organización.
