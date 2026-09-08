// Puntos de entrada del analizador y de la captación de leads.
// Por defecto apuntan a las funciones de Netlify del propio dominio. Si la web se
// publica en un hosting sin funciones (Lovable, GitHub Pages...), define en el build
// VITE_ANALYZE_ENDPOINT y VITE_LEAD_ENDPOINT con las URL de los webhooks de n8n.
export const ANALYZE_ENDPOINT: string = import.meta.env.VITE_ANALYZE_ENDPOINT || "/api/analyze";
export const LEAD_ENDPOINT: string = import.meta.env.VITE_LEAD_ENDPOINT || "/api/lead";
