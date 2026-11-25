import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { productFaqs } from "@/data/product";
import ServiceDetailLayout, { ServiceDetailContact, ServiceDetailFaqs, ServiceDetailProjects } from "@/components/pages/ServiceDetailLayout";

const stages = [
  { title: "Definir el producto", text: "Entendemos el problema, las personas que lo usarán y qué debe resolver la primera versión. Priorizamos las funcionalidades antes de construir." },
  { title: "Diseñar y desarrollar", text: "Diseñamos la experiencia y desarrollamos el producto por fases, desde una aplicación SaaS hasta una app móvil o una herramienta para clientes o equipos." },
  { title: "Probar y evolucionar", text: "Probamos el producto con los casos acordados y usamos lo aprendido para decidir las siguientes mejoras." },
];
const scope = ["Plataformas y productos SaaS", "Aplicaciones móviles y web", "Herramientas digitales para empresas y sus clientes", "Funciones de automatización o IA integradas cuando sean útiles"];

const ProductPage = () => <ServiceDetailLayout
  title="Desarrollo de producto digital."
  intro="Diseñamos y desarrollamos productos digitales para startups y empresas: plataformas SaaS, aplicaciones móviles y herramientas web. Desde definir la primera versión hasta mejorar un producto que ya está en marcha."
  crumbs={[{ name: "Inicio", path: "/" }, { name: "Servicios", path: "/servicios/" }, { name: "Desarrollo de producto digital", path: "/servicios/desarrollo-producto-digital/" }]}
  topic="producto" contactLabel="Cuéntanos tu producto"
>
  <section id="alcance" className="services-offer-section" aria-labelledby="product-scope-title"><div className="services-page-container services-offer-layout"><div className="services-offer-heading"><h2 id="product-scope-title">Para lanzar<br />o evolucionar.</h2><p>Podemos ayudar a definir una primera versión, desarrollar una aplicación o estudiar cómo ampliar un producto existente. Cada proyecto parte del problema que necesita resolver y de las personas que lo van a utilizar.</p></div><ul className="services-consulting-list service-detail-benefits"><li><h3>Desde la primera versión</h3><p>Trabajamos por fases, desde definir qué necesita el producto hasta desarrollar y revisar cada entrega.</p></li><li><h3>Producto e IA cuando tiene sentido</h3><p>La experiencia de Alpa en automatización y agentes de IA puede formar parte del producto cuando aporte valor. También desarrollamos productos digitales que no necesitan IA.</p></li></ul></div></section>

  <section id="incluye" className="services-offer-section service-detail-includes" aria-labelledby="product-includes-title"><div className="services-page-container services-offer-layout"><div className="services-offer-heading"><h2 id="product-includes-title">Qué podemos<br />construir.</h2><ServiceDetailContact topic="producto">Hablemos de tu producto</ServiceDetailContact></div><ul className="service-detail-deliverables">{scope.map(item => <li key={item}><Check size={19} aria-hidden="true" /><span>{item}</span></li>)}</ul></div></section>

  <ServiceDetailProjects slugs={["makernotch", "boughtcast"]} title="Productos en los que hemos trabajado." intro="Hemos desarrollado productos digitales junto a startups, además de aplicaciones móviles para organización de bodas, salud y fitness." />
  <div className="services-page-container service-detail-other-products"><span>Otros productos que hemos desarrollado</span><Link to="/casos/climbber/">Climbber<ArrowUpRight size={18} aria-hidden="true" /></Link><Link to="/casos/brandtoads/">BrandToAds<ArrowUpRight size={18} aria-hidden="true" /></Link></div>

  <section className="services-offer-section" aria-labelledby="product-process-title"><div className="services-page-container services-offer-layout"><div className="services-offer-heading"><h2 id="product-process-title">Cómo abordamos<br />el desarrollo.</h2><Link className="services-text-link" to="/como-trabajamos/">Nuestro proceso completo<ArrowRight size={18} aria-hidden="true" /></Link></div><ol className="service-detail-product-stages">{stages.map((stage,index) => <li key={stage.title}><span>{String(index+1).padStart(2,"0")}</span><div><h3>{stage.title}</h3><p>{stage.text}</p></div></li>)}</ol></div></section>

  <ServiceDetailFaqs faqs={productFaqs} />
  <section className="services-offer-section" aria-labelledby="product-related-title"><div className="services-page-container services-offer-layout"><div className="services-offer-heading"><h2 id="product-related-title">Otros puntos<br />de partida.</h2><Link className="services-text-link" to="/servicios/">Ver todos los servicios<ArrowRight size={18} aria-hidden="true" /></Link></div><ul className="service-detail-related"><li><Link to="/servicios/consultoria-ia-pymes/"><h3>Consultoría y definición</h3><ArrowUpRight size={21} aria-hidden="true" /></Link></li><li><Link to="/servicios/automatizacion-ia-pymes/"><h3>Automatización con IA</h3><ArrowUpRight size={21} aria-hidden="true" /></Link></li><li><Link to="/recursos/automatizacion-agente-ia-software-medida-diferencias/"><h3>Guía: automatización, agentes y software a medida</h3><ArrowUpRight size={21} aria-hidden="true" /></Link></li></ul></div></section>
</ServiceDetailLayout>;

export default ProductPage;
