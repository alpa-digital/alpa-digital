// Genera HTML estático para cada ruta indexable, más sitemap.xml y robots.txt.
// Se ejecuta tras `vite build` (cliente) y `vite build --ssr` (servidor).
import { mkdir, readFile, writeFile, rm } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const template = await readFile(join(dist, "index.html"), "utf8");
const { render, allRoutes, renderHeadTags } = await import(pathToFileURL(join(dist, "server", "entry-server.js")).href);

const routes = allRoutes();
const siteUrl = "https://alpa.digital";
let written = 0;

for (const seo of routes) {
  const html = render(seo.path);
  const head = renderHeadTags(seo);
  const page = template
    .replace(/<title>[\s\S]*?<\/title>/, "")
    .replace(/<meta name="description"[^>]*>\s*/g, "")
    .replace(/<link rel="canonical"[^>]*>\s*/g, "")
    .replace(/<meta (?:property="og:|name="twitter:)[^>]*>\s*/g, "")
    .replace(/<meta name="robots"[^>]*>\s*/g, "")
    .replace("<!--app-head-->", head)
    .replace("<!--app-html-->", html);
  const file = seo.path === "/" ? join(dist, "index.html") : join(dist, seo.path, "index.html");
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, page, "utf8");
  written++;
}

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .filter((r) => !r.noindex)
  .map((r) => `  <url>\n    <loc>${siteUrl}${r.path === "/" ? "" : r.path}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${r.priority >= 0.9 ? "weekly" : "monthly"}</changefreq>\n    <priority>${r.priority.toFixed(1)}</priority>\n  </url>`)
  .join("\n")}
</urlset>
`;
await writeFile(join(dist, "sitemap.xml"), sitemap, "utf8");
await writeFile(join(dist, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`, "utf8");
await rm(join(dist, "server"), { recursive: true, force: true });
console.log(`Prerenderizadas ${written} páginas y sitemap con ${routes.length} URL.`);
