import { useLang } from "@/i18n";
import { processCopy } from "@/data/process";

/** Conceptual diagrams of the method, not screenshots or claimed project artefacts. */
const ProcessVisual = ({ stage }: { stage: number }) => {
  const { lang } = useLang();
  const c = processCopy[lang];
  const labels = c.visualLabels[stage];
  return <figure className={`method-visual method-visual-${stage}`}>
    <svg viewBox="0 0 560 460" fill="none" aria-hidden="true" focusable="false">
      {stage === 0 && <>
        <path d="M116 100 280 230 450 110M110 355 280 230 455 350" className="method-art-line" />
        <circle cx="116" cy="100" r="58" className="method-art-outline" /><rect x="392" y="52" width="116" height="116" rx="12" className="method-art-outline" />
        <rect x="52" y="297" width="116" height="116" rx="12" className="method-art-outline" /><circle cx="455" cy="350" r="58" className="method-art-outline" />
        <circle cx="280" cy="230" r="76" className="method-art-blue" />
        <text x="116" y="106">{labels[0]}</text><text x="450" y="116">{labels[1]}</text><text x="110" y="361">{labels[2]}</text><text x="455" y="356">{labels[3]}</text><text x="280" y="237" className="method-art-white">{labels[4]}</text>
      </>}
      {stage === 1 && <>
        <path d="M108 150H450M280 150V315H450" className="method-art-line" />
        <path d="m434 140 16 10-16 10m0 145 16 10-16 10" className="method-art-line" />
        <rect x="42" y="91" width="132" height="118" rx="12" className="method-art-outline" /><rect x="214" y="91" width="132" height="118" rx="12" className="method-art-blue" /><rect x="386" y="91" width="132" height="118" rx="12" className="method-art-outline" />
        <rect x="214" y="264" width="132" height="102" rx="51" className="method-art-outline" /><circle cx="452" cy="315" r="12" className="method-art-blue" />
        <text x="108" y="156">{labels[0]}</text><text x="280" y="156" className="method-art-white">{labels[1]}</text><text x="280" y="321">{labels[2]}</text><text x="452" y="156">{labels[3]}</text>
      </>}
      {stage === 2 && <>
        <path d="M97 110H463M97 230H463M97 350H463M97 110V350M280 110V350M463 110V350" className="method-art-line" />
        {[97,280,463].flatMap((x, column) => [110,230,350].map(y => <rect key={`${x}-${y}`} x={x-38} y={y-38} width="76" height="76" rx="9" className={column === 1 ? "method-art-blue" : "method-art-outline"} />))}
        <path d="m257 230 16 16 31-33" stroke="white" strokeWidth="3" />
        <text x="97" y="430">{labels[0]}</text><text x="280" y="430">{labels[1]}</text><text x="463" y="430">{labels[2]}</text>
      </>}
      {stage === 3 && <>
        <circle cx="280" cy="220" r="165" className="method-art-outline" /><circle cx="280" cy="220" r="110" className="method-art-ring" />
        <path d="M280 55a165 165 0 0 1 143 247m1-22 0 23-22-4" className="method-art-line method-art-accent" />
        <circle cx="280" cy="220" r="62" className="method-art-blue" /><circle cx="280" cy="55" r="10" className="method-art-blue" /><circle cx="137" cy="303" r="10" className="method-art-blue" /><circle cx="423" cy="303" r="10" className="method-art-blue" />
        <text x="280" y="227" className="method-art-white">{labels[3]}</text><text x="280" y="27">{labels[0]}</text><text x="90" y="345">{labels[1]}</text><text x="470" y="345">{labels[2]}</text>
      </>}
    </svg>
    <figcaption>{c.visualCaptions[stage]}</figcaption>
  </figure>;
};
export default ProcessVisual;
