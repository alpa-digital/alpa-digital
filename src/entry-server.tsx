import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "./App";
import { allRoutes, renderHeadTags } from "@/lib/seo";

export { allRoutes, renderHeadTags };

export function render(path: string): string {
  return renderToString(
    <StaticRouter location={path}>
      <App />
    </StaticRouter>
  );
}
