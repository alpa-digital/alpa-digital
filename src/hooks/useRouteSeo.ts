import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getRouteSeo } from "@/lib/seo";

/** En cliente: actualiza título, descripción, canonical y JSON-LD al navegar entre rutas. */
export function useRouteSeo() {
  const { pathname } = useLocation();
  useEffect(() => {
    const seo = getRouteSeo(pathname);
    if (!seo) return;
    document.title = seo.title;
    const setMeta = (selector: string, attr: string, value: string) => {
      let el = document.head.querySelector<HTMLElement>(selector);
      if (!el) {
        el = document.createElement(selector.startsWith("link") ? "link" : "meta");
        const [, key, val] = selector.match(/\[(\w+(?::\w+)?)="([^"]+)"\]/) ?? [];
        if (key && val) el.setAttribute(key, val);
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };
    setMeta('meta[name="description"]', "content", seo.description);
    setMeta('link[rel="canonical"]', "href", seo.canonical);
    setMeta('meta[property="og:title"]', "content", seo.title);
    setMeta('meta[property="og:description"]', "content", seo.description);
    setMeta('meta[property="og:url"]', "content", seo.canonical);
    document.head.querySelectorAll('script[data-route-jsonld]').forEach((el) => el.remove());
    seo.jsonLd.forEach((data) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.routeJsonld = "1";
      script.textContent = JSON.stringify(data);
      document.head.appendChild(script);
    });
    window.scrollTo({ top: 0 });
  }, [pathname]);
}
