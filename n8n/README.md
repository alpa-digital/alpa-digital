# Analizador y leads en n8n

Alternativa a las funciones de Netlify para cuando la web se publica en un hosting
que no ejecuta código de servidor (Lovable, GitHub Pages, un hosting estático...).

## Importar

1. En n8n: "Workflows" → "Import from file" → `analizador-webs.json`. Repetir con `leads-analizador.json`.
2. Crear dos credenciales de tipo "Header Auth":
   - `Mistral API`: Name `Authorization`, Value `Bearer <clave de Mistral>`.
   - `Resend API`: Name `Authorization`, Value `Bearer <clave de Resend>`.
   Asignarlas en los nodos "Mistral", "Enviar informe al visitante" y "Aviso interno".
3. Activar los dos workflows. Copiar las URL de producción de los webhooks
   (`https://<tu-n8n>/webhook/alpa-analyze` y `https://<tu-n8n>/webhook/alpa-lead`).

## Conectar la web

Definir en el build de la web (variables de entorno de Vite):

```
VITE_ANALYZE_ENDPOINT=https://<tu-n8n>/webhook/alpa-analyze
VITE_LEAD_ENDPOINT=https://<tu-n8n>/webhook/alpa-lead
```

Sin estas variables, la web usa `/api/analyze` y `/api/lead` (funciones de Netlify).

## Probar

```sh
curl -sS https://<tu-n8n>/webhook/alpa-analyze -H "Content-Type: application/json" -d '{"url":"https://www.ejemplo.es"}'
```

Debe devolver `company`, `sectorId`, `sector`, `summary`, `favicon` y seis `areas`.
