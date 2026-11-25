import { useEffect, useRef, useState, type ReactNode } from "react";

interface AnimatedDetailsProps {
  summary: ReactNode;
  children: ReactNode;
  className?: string;
  summaryClassName?: string;
  expanded?: boolean;
  defaultOpen?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
}

/** Native, keyboard-accessible disclosure. The native open state stays set until its exit finishes. */
const AnimatedDetails = ({ summary, children, className = "", summaryClassName, expanded, defaultOpen = false, onExpandedChange }: AnimatedDetailsProps) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpen = expanded ?? internalOpen;
  const initialOpen = useRef(isOpen);
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const animationRef = useRef<Animation | null>(null);

  useEffect(() => {
    const details = detailsRef.current;
    if (!details) return;
    details.dataset.animated = "true";
    if (details.open === isOpen && !animationRef.current) return;
    const startHeight = details.getBoundingClientRect().height;
    animationRef.current?.cancel();
    animationRef.current = null;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches || !details.animate) { details.open = isOpen; details.style.overflow = ""; return; }

    details.open = true;
    const style = getComputedStyle(details);
    const summary = details.querySelector("summary")!;
    const endHeight = isOpen ? details.getBoundingClientRect().height : summary.getBoundingClientRect().height
      + parseFloat(style.paddingTop) + parseFloat(style.paddingBottom) + parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
    details.style.overflow = "hidden";
    const animation = details.animate([{ height: `${startHeight}px` }, { height: `${endHeight}px` }], {
      duration: isOpen ? 420 : 320, easing: "cubic-bezier(.22,1,.36,1)",
    });
    animationRef.current = animation;
    const finish = () => { details.open = isOpen; details.style.overflow = ""; animationRef.current = null; };
    animation.onfinish = finish;
    const stopMotion = () => { if (reduceMotion.matches) animation.finish(); };
    reduceMotion.addEventListener("change", stopMotion);
    return () => { reduceMotion.removeEventListener("change", stopMotion); };
  }, [isOpen]);

  useEffect(() => () => { animationRef.current?.cancel(); }, []);

  const toggle = () => {
    const next = !isOpen;
    if (expanded === undefined) setInternalOpen(next);
    onExpandedChange?.(next);
  };

  return <details ref={detailsRef} open={initialOpen.current} data-expanded={isOpen} className={`home-disclosure ${className}`}>
    <summary className={summaryClassName} onClick={event => { event.preventDefault(); toggle(); }}>{summary}</summary>
    <div className="home-disclosure-content">{children}</div>
  </details>;
};

export default AnimatedDetails;
