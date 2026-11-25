import { useEffect, type RefObject } from "react";

/** Motion is progressive: everything is visible before JS and when motion is reduced. */
export const useHomeMotion = (rootRef: RefObject<HTMLElement>) => {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let teardown = () => {};

    const configure = () => {
      teardown();
      if (media.matches) return;
      const animations = new Set<Animation>();
      const projects = Array.from(root.querySelectorAll<HTMLElement>(".studio-work-project"));
      // Only covers with an image get parallax; text covers (e.g. the AI cases) have no .studio-work-media.
      const covers = Array.from(root.querySelectorAll<HTMLElement>(".studio-work-cover")).filter(cover => cover.querySelector(".studio-work-media"));
      const mediaElements = covers.map(cover => cover.querySelector<HTMLElement>(".studio-work-media")!);
      const reveal = new IntersectionObserver(entries => {
        entries.filter(entry => entry.isIntersecting).forEach(entry => {
          const element = entry.target as HTMLElement;
          const index = projects.indexOf(element);
          const animation = element.animate([
            { transform: "translate3d(0,32px,0)", opacity: .78 },
            { transform: "translate3d(0,0,0)", opacity: 1 },
          ], { duration: 760, delay: index * 80, easing: "cubic-bezier(.16,1,.3,1)" });
          animations.add(animation);
          animation.onfinish = () => animations.delete(animation);
          reveal.unobserve(element);
        });
      }, { threshold: .08 });
      projects.forEach(project => reveal.observe(project));

      let frame = 0;
      let inView = false;
      const update = () => {
        frame = 0;
        const viewportHeight = window.innerHeight;
        const distance = window.innerWidth < 768 ? 10 : 22;
        // Read both rectangles before writing transforms to avoid layout thrashing.
        const positions = covers.map(cover => {
          const rect = cover.getBoundingClientRect();
          return Math.max(-1, Math.min(1, (viewportHeight / 2 - rect.top - rect.height / 2) / viewportHeight)) * distance;
        });
        mediaElements.forEach((element, index) => element.style.transform = `translate3d(0,${positions[index].toFixed(2)}px,0)`);
      };
      const schedule = () => { if (inView && !frame) frame = requestAnimationFrame(update); };
      const work = root.querySelector(".studio-work-grid");
      const visibility = new IntersectionObserver(entries => {
        inView = entries.some(entry => entry.isIntersecting);
        schedule();
      }, { rootMargin: "100px" });
      if (work) visibility.observe(work);
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule, { passive: true });
      teardown = () => {
        reveal.disconnect(); visibility.disconnect(); cancelAnimationFrame(frame);
        window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule);
        animations.forEach(animation => animation.cancel());
        mediaElements.forEach(element => element.style.removeProperty("transform"));
      };
    };
    configure();
    const workGrid = root.querySelector(".studio-work-grid");
    const projectChanges = new MutationObserver(configure);
    if (workGrid) projectChanges.observe(workGrid, { childList: true });
    media.addEventListener("change", configure);
    return () => { teardown(); projectChanges.disconnect(); media.removeEventListener("change", configure); };
  }, [rootRef]);
};
