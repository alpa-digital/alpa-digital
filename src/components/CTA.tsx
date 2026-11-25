import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "@/i18n";

const CTA = () => {
  const { lang } = useLang();
  const { pathname } = useLocation();
  const english = lang === "en";
  return <section className="studio-contact" aria-labelledby="home-contact-title">
    <div>
      <h2 id="home-contact-title">
        <span>{english ? "Shall we set up your private AI?" : "¿Montamos tu IA privada?"}</span>{" "}
        <Link to="/contacto/" state={{ from: pathname }}>{english ? "Let's talk." : "Hablemos."}<ArrowUpRight aria-hidden="true" /></Link>
      </h2>
    </div>
  </section>;
};
export default CTA;
