import { useState } from "react";
import projectFintech from "@/assets/project-fintech.png";
import projectEcommerce from "@/assets/project-ecommerce.png";
import projectHealth from "@/assets/project-health.png";
import projectTravel from "@/assets/project-travel.png";
import projectRealEstate from "@/assets/project-realestate.png";
import projectSocial from "@/assets/project-social.png";

const Projects = () => {
  const allProjects = [
    {
      title: "FinFlow",
      type: "App móvil",
      description: "App de gestión financiera personal con diseño intuitivo y funcionalidades avanzadas de análisis.",
      image: projectFintech,
      category: "Fintech"
    },
    {
      title: "MarketPlace Pro",
      type: "Web App",
      description: "Plataforma de e-commerce B2B con sistema de gestión completo y experiencia de usuario optimizada.",
      image: projectEcommerce,
      category: "E-commerce"
    },
    {
      title: "WellBeing",
      type: "App móvil",
      description: "Aplicación de salud y bienestar con seguimiento personalizado y comunidad integrada.",
      image: projectHealth,
      category: "Healthcare"
    },
    {
      title: "TravelPlanner",
      type: "Web App",
      description: "Plataforma de planificación de viajes con reservas integradas y recomendaciones personalizadas.",
      image: projectTravel,
      category: "Travel"
    },
    {
      title: "PropertyHub",
      type: "Web App",
      description: "Portal inmobiliario con búsqueda avanzada, tours virtuales y gestión de propiedades.",
      image: projectRealEstate,
      category: "Real Estate"
    },
    {
      title: "SocialBoost",
      type: "Dashboard",
      description: "Herramienta de gestión de redes sociales con analytics avanzados y programación de contenido.",
      image: projectSocial,
      category: "Marketing"
    }
  ];

  const originalProjects = allProjects.slice(0, 3);
  const additionalProjects = allProjects.slice(3, 6);

  const [featuredIndex, setFeaturedIndex] = useState(0);
  
  const handleProjectClick = (index: number) => {
    setFeaturedIndex(index);
  };

  const featuredProject = allProjects[featuredIndex];
  // Show only first 2 projects in the side column, don't filter out the featured one
  const sideProjects = originalProjects.slice(0, 2);

  return (
    <section className="py-24 px-8 bg-background relative overflow-hidden">
      {/* Línea separadora superior */}
      <div className="absolute top-0 left-0 w-full h-px bg-border"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0s', animationDuration: '4s' }}></div>
        <div className="absolute top-3/4 right-1/4 w-1.5 h-1.5 bg-primary/60 rounded-full animate-pulse" style={{ animationDelay: '2s', animationDuration: '6s' }}></div>
        <div className="absolute bottom-1/3 left-1/2 w-1 h-1 bg-primary/40 rounded-full animate-pulse" style={{ animationDelay: '4s', animationDuration: '5s' }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-20 text-center">
          <h2 className="text-4xl md:text-6xl font-light text-foreground mb-8 animate-fade-in">
            Proyectos realizados
          </h2>
          <p className="text-xl text-muted-foreground font-light max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.3s', lineHeight: '1.8' }}>
            Explora algunas de nuestras experiencias digitales más valoradas creadas desde 2015. Desde productos de startup hasta plataformas corporativas, todas las experiencias que desarrollamos son el resultado de una fusión única: las ideas e inspiración de nuestros clientes con la experiencia y creatividad de nuestro equipo.
          </p>
        </div>

        {/* Desktop: Grid asimétrico moderno */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Proyecto principal - ocupa más espacio */}
          <div className="lg:col-span-7 group">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-muted/30 to-muted/60 border border-border/50 hover:border-primary/30 min-h-[500px] hover-scale transition-all duration-700 animate-fade-in">
              <div className="absolute top-8 right-8 z-10">
                <span className="text-xs text-primary bg-background/90 px-3 py-1 rounded-full font-medium border border-border/50">
                  {featuredProject.category}
                </span>
              </div>
              
              <div className="relative z-10 flex flex-col h-full p-12">
                {/* Contenido arriba */}
                <div className="flex-1">
                  <div className="mb-6">
                    <span className="text-sm text-muted-foreground bg-background/90 px-4 py-2 rounded-full border border-border/50">
                      {featuredProject.type}
                    </span>
                  </div>
                  
                  <h3 className="text-4xl font-light text-foreground mb-6 group-hover:text-primary transition-colors duration-300">
                    {featuredProject.title}
                  </h3>
                  
                  <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                    {featuredProject.description}
                  </p>
                  
                  <button className="inline-flex items-center text-primary font-medium hover:text-primary/80 transition-colors duration-300 group/btn">
                    <span className="mr-2">Ver proyecto</span>
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
                
                {/* Imagen plana alineada a la izquierda */}
                <div className="flex justify-start mt-8">
                  <img 
                    src={featuredProject.image}
                    alt={`${featuredProject.title} - Proyecto ${featuredProject.category} desarrollado por Alpa Digital - ${featuredProject.description}`}
                    className="max-w-[280px] h-auto object-contain"
                    loading="lazy"
                    width="280"
                    height="400"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Proyectos secundarios en columna - máximo 2 */}
          <div className="lg:col-span-5 space-y-8">
            {sideProjects.map((project, index) => {
              const originalIndex = allProjects.findIndex(p => p === project);
              return (
              <div 
                key={originalIndex} 
                className="group cursor-pointer"
                onClick={() => handleProjectClick(originalIndex)}
              >
                <div className="relative overflow-hidden rounded-xl bg-card/50 border border-border/50 transition-all duration-500 hover:border-primary/30 hover:bg-primary/5 animate-fade-in hover:shadow-lg hover:shadow-primary/10">
                  {/* Imagen como header de la card */}
                   <div className="relative h-32 overflow-hidden">
                    <img 
                      src={project.image}
                      alt={project.title}
                       className="absolute inset-0 w-full h-full object-cover"
                    />
                    
                    {/* Badge de tipo */}
                    <div className="absolute top-4 right-4">
                      <span className="text-xs text-muted-foreground bg-background/90 px-3 py-1 rounded-full border border-border/50">
                        {project.type}
                      </span>
                    </div>
                    
                    {/* Indicador de click */}
                    <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  
                  {/* Contenido */}
                  <div className="p-6">
                    <div className="mb-3">
                      <span className="text-xs text-primary font-medium bg-primary/10 px-2 py-1 rounded-full">
                        {project.category}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-medium text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {project.description}
                    </p>
                    
                    <div className="flex items-center text-primary font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1">
                      <span className="text-sm">Ver detalles</span>
                      <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            )})}
          </div>

        </div>

        {/* Mobile: Simple Grid Layout */}
        <div className="block lg:hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {allProjects.map((project, index) => (
              <div key={index} className="group">
                <div className="relative overflow-hidden rounded-xl bg-card/50 border border-border/50 transition-all duration-500 hover:border-primary/30 hover:bg-primary/5 animate-fade-in hover:shadow-lg" style={{ animationDelay: `${index * 0.1}s` }}>
                  {/* Imagen como header */}
                   <div className="relative h-40 overflow-hidden">
                    <img 
                      src={project.image}
                      alt={project.title}
                       className="absolute inset-0 w-full h-full object-cover"
                    />
                    
                    {/* Badge de tipo */}
                    <div className="absolute top-4 right-4">
                      <span className="text-xs text-muted-foreground bg-background/90 px-2 py-1 rounded-full border border-border/50">
                        {project.type}
                      </span>
                    </div>
                  </div>
                  
                  {/* Contenido */}
                  <div className="p-6">
                    <div className="mb-3">
                      <span className="text-xs text-primary font-medium bg-primary/10 px-2 py-1 rounded-full">
                        {project.category}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-medium text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: Nueva fila para proyectos adicionales */}
        <div className="mt-20 hidden lg:block">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {additionalProjects.map((project, index) => {
              const projectIndex = allProjects.findIndex(p => p === project);
              return (
              <div key={index} className="group cursor-pointer" onClick={() => handleProjectClick(projectIndex)}>
                <div className="relative overflow-hidden rounded-xl bg-card/50 border border-border/50 transition-all duration-500 hover:border-primary/30 hover:bg-primary/5 animate-fade-in hover:shadow-lg" style={{ animationDelay: `${index * 0.1}s` }}>
                  {/* Imagen como header */}
                  <div className="relative h-32 overflow-hidden">
                    <img 
                      src={project.image}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    
                    
                    {/* Badge de tipo */}
                    <div className="absolute top-4 right-4">
                      <span className="text-xs text-muted-foreground bg-background/90 px-3 py-1 rounded-full border border-border/50">
                        {project.type}
                      </span>
                    </div>
                  </div>
                  
                  {/* Contenido */}
                  <div className="p-6">
                    <div className="mb-3">
                      <span className="text-xs text-primary font-medium bg-primary/10 px-2 py-1 rounded-full">
                        {project.category}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-medium text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {project.description}
                    </p>
                    
                    <div className="flex items-center text-primary font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1">
                      <span className="text-sm">Ver proyecto</span>
                      <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            );
            })}
          </div>
        </div>

        {/* Mobile: Nueva fila para proyectos adicionales */}
        <div className="mt-20 block lg:hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {additionalProjects.map((project, index) => {
              const projectIndex = allProjects.findIndex(p => p === project);
              return (
              <div key={index} className="group cursor-pointer" onClick={() => handleProjectClick(projectIndex)}>
                <div className="relative overflow-hidden rounded-xl bg-card/50 border border-border/50 transition-all duration-500 hover:border-primary/30 hover:bg-primary/5 animate-fade-in hover:shadow-lg" style={{ animationDelay: `${index * 0.1}s` }}>
                  {/* Imagen como header */}
                  <div className="relative h-40 overflow-hidden">
                    <img 
                      src={project.image}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    
                    
                    {/* Badge de tipo */}
                    <div className="absolute top-4 right-4">
                      <span className="text-xs text-muted-foreground bg-background/90 px-2 py-1 rounded-full border border-border/50">
                        {project.type}
                      </span>
                    </div>
                  </div>
                  
                  {/* Contenido */}
                  <div className="p-6">
                    <div className="mb-3">
                      <span className="text-xs text-primary font-medium bg-primary/10 px-2 py-1 rounded-full">
                        {project.category}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-medium text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>
              </div>
            );
            })}
          </div>
        </div>
      </div>
      
      {/* Línea separadora inferior */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-border"></div>
    </section>
  );
};

export default Projects;