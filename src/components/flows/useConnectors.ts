import { useLayoutEffect, useState, type RefObject } from "react";

export interface Box {
  left: number;
  top: number;
  width: number;
  height: number;
  right: number;
  bottom: number;
  cx: number;
  cy: number;
}

/** Mide las cajas de los elementos [data-node-id] relativas al contenedor, y se actualiza al cambiar el tamaño. */
export function useNodeBoxes(containerRef: RefObject<HTMLElement>, deps: unknown[]) {
  const [boxes, setBoxes] = useState<Record<string, Box>>({});
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const measure = () => {
      const base = container.getBoundingClientRect();
      const next: Record<string, Box> = {};
      container.querySelectorAll<HTMLElement>("[data-node-id]").forEach((el) => {
        const r = el.getBoundingClientRect();
        const left = r.left - base.left;
        const top = r.top - base.top;
        next[el.dataset.nodeId as string] = { left, top, width: r.width, height: r.height, right: left + r.width, bottom: top + r.height, cx: left + r.width / 2, cy: top + r.height / 2 };
      });
      setBoxes(next);
      setSize({ width: base.width, height: base.height });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { boxes, size };
}
