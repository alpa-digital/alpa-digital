import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PoliticaCookies = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animations after component mounts
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header onContactClick={() => {}} />
      
      <main className="py-8 md:py-16 px-4 md:px-8 pt-32 md:pt-40">
        <div className="max-w-4xl mx-auto">
          <div className={`text-center mb-8 md:mb-12 transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'
          }`}>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight text-foreground">
              Política de Cookies
            </h1>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-primary/60 mx-auto mt-6 rounded-full"></div>
          </div>
          
          <div className="space-y-8 md:space-y-12">
            <section className={`transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`} style={{ transitionDelay: '0.2s' }}>
              <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4 text-foreground">¿Qué son las cookies?</h2>
              <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas nuestro sitio web. 
                Estas cookies nos ayudan a mejorar tu experiencia de navegación, recordar tus preferencias y ofrecerte contenido personalizado 
                que sea más relevante para ti.
              </p>
            </section>

            <section className={`transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`} style={{ transitionDelay: '0.4s' }}>
              <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-foreground">Tipos de cookies que utilizamos</h2>
              
              <div className="space-y-4 md:space-y-6">
                <div className={`p-4 md:p-6 border border-border rounded-lg bg-card/50 backdrop-blur-sm hover:border-primary/30 hover:bg-card/70 transition-all duration-500 group ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                }`} style={{ transitionDelay: '0.6s' }}>
                  <h3 className="text-lg md:text-xl font-medium mb-2 md:mb-3 text-foreground flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    Cookies necesarias
                  </h3>
                  <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                    Son esenciales para el funcionamiento básico del sitio web. Incluyen cookies de sesión que permiten 
                    navegar por el sitio, utilizar sus funciones básicas y mantener la seguridad durante tu visita.
                  </p>
                </div>

                <div className={`p-4 md:p-6 border border-border rounded-lg bg-card/50 backdrop-blur-sm hover:border-primary/30 hover:bg-card/70 transition-all duration-500 group ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                }`} style={{ transitionDelay: '1.2s' }}>
                  <h3 className="text-lg md:text-xl font-medium mb-2 md:mb-3 text-foreground flex items-center gap-2 group-hover:text-primary transition-colors duration-300">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    Cookies de rendimiento
                  </h3>
                  <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                    Recopilan información anónima sobre cómo los visitantes utilizan nuestro sitio web, como qué páginas 
                    visitan con más frecuencia, cuánto tiempo permanecen en cada página y si reciben mensajes de error. 
                    Esta información nos ayuda a optimizar el rendimiento y la usabilidad del sitio.
                  </p>
                </div>

                <div className={`p-4 md:p-6 border border-border rounded-lg bg-card/50 backdrop-blur-sm hover:border-primary/30 hover:bg-card/70 transition-all duration-500 group ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                }`} style={{ transitionDelay: '0.8s' }}>
                  <h3 className="text-lg md:text-xl font-medium mb-2 md:mb-3 text-foreground flex items-center gap-2 group-hover:text-primary transition-colors duration-300">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    Cookies funcionales
                  </h3>
                  <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                    Permiten que el sitio web recuerde las opciones que has elegido (como tu idioma preferido o región) 
                    y proporcionan funciones mejoradas y más personales. También pueden recordar cambios que hayas hecho 
                    en el tamaño del texto, fuentes y otras partes personalizables del sitio.
                  </p>
                </div>

                <div className={`p-4 md:p-6 border border-border rounded-lg bg-card/50 backdrop-blur-sm hover:border-primary/30 hover:bg-card/70 transition-all duration-500 group ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                }`} style={{ transitionDelay: '1.0s' }}>
                  <h3 className="text-lg md:text-xl font-medium mb-2 md:mb-3 text-foreground flex items-center gap-2 group-hover:text-primary transition-colors duration-300">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    Cookies de marketing
                  </h3>
                  <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                    Se utilizan para rastrear a los visitantes en los sitios web con el fin de mostrar anuncios relevantes 
                    y atractivos. Estas cookies pueden compartir información con terceros o organizaciones publicitarias 
                    para personalizar la publicidad según tus intereses.
                  </p>
                </div>
              </div>
            </section>

            <section className={`transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`} style={{ transitionDelay: '2.4s' }}>
              <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4 text-foreground">Cómo gestionar y controlar las cookies</h2>
              <div className="space-y-3 md:space-y-4">
                <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                  Tienes control total sobre las cookies que se almacenan en tu dispositivo. Puedes:
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-muted-foreground ml-4">
                  <li>Eliminar todas las cookies existentes en tu dispositivo</li>
                  <li>Configurar tu navegador para bloquear cookies futuras</li>
                  <li>Permitir cookies solo de sitios específicos</li>
                  <li>Recibir notificaciones cuando se instalen nuevas cookies</li>
                </ul>
                <div className="mt-4 p-3 md:p-4 bg-accent/20 rounded-lg border border-accent/30">
                  <p className="text-xs md:text-sm text-muted-foreground">
                    <strong>Nota importante:</strong> Si deshabilitas las cookies, es posible que algunas funciones del sitio 
                    no funcionen correctamente y que tengas que ajustar manualmente ciertas preferencias en cada visita.
                  </p>
                </div>
              </div>
            </section>

            <section className={`transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`} style={{ transitionDelay: '1.4s' }}>
              <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4 text-foreground">Servicios de terceros</h2>
              <p className="text-sm md:text-base leading-relaxed text-muted-foreground mb-4">
                Nuestro sitio web utiliza servicios de terceros que pueden instalar sus propias cookies:
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-muted-foreground ml-4">
                <li><strong>Google Analytics:</strong> Para analizar el tráfico del sitio web y mejorar nuestros servicios</li>
                <li><strong>Redes sociales:</strong> Para facilitar el compartir contenido en plataformas sociales</li>
                <li><strong>Servicios de chat:</strong> Para proporcionar soporte en tiempo real</li>
              </ul>
            </section>

            <section className={`transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`} style={{ transitionDelay: '1.6s' }}>
              <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4 text-foreground">Duración de las cookies</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`p-4 border border-border rounded-lg bg-card/30 hover:bg-card/50 transition-all duration-500 ${
                  isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`} style={{ transitionDelay: '2.0s' }}>
                  <h3 className="text-base md:text-lg font-medium mb-2 text-foreground">Cookies de sesión</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    Se eliminan automáticamente cuando cierras tu navegador
                  </p>
                </div>
                <div className={`p-4 border border-border rounded-lg bg-card/30 hover:bg-card/50 transition-all duration-500 ${
                  isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`} style={{ transitionDelay: '2.2s' }}>
                  <h3 className="text-base md:text-lg font-medium mb-2 text-foreground">Cookies persistentes</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    Permanecen hasta su fecha de expiración o hasta que las elimines manualmente
                  </p>
                </div>
              </div>
            </section>

            <section className={`transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`} style={{ transitionDelay: '1.8s' }}>
              <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4 text-foreground">Tu consentimiento</h2>
              <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                Al continuar navegando en nuestro sitio web, aceptas el uso de cookies según se describe en esta política. 
                Puedes retirar tu consentimiento en cualquier momento modificando la configuración de tu navegador o 
                contactándonos directamente.
              </p>
            </section>

            <section className={`bg-primary/5 p-4 md:p-6 rounded-lg border border-primary/20 backdrop-blur-sm transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
            }`} style={{ transitionDelay: '2.6s' }}>
              <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4 text-foreground">Contacto y dudas</h2>
              <p className="text-sm md:text-base leading-relaxed text-muted-foreground mb-3">
                Si tienes alguna pregunta sobre nuestra política de cookies o necesitas más información sobre cómo 
                manejamos tus datos, no dudes en contactarnos:
              </p>
              <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
                <span className="text-sm md:text-base text-muted-foreground">Email:</span>
                <a href="mailto:info@alpa.digital" className="text-primary hover:underline font-medium">
                  info@alpa.digital
                </a>
              </div>
            </section>

            <section className={`text-center py-4 border-t border-border transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`} style={{ transitionDelay: '2.8s' }}>
              <p className="text-xs md:text-sm text-muted-foreground">
                <strong>Última actualización:</strong> 24 de septiembre de 2025
              </p>
              <p className="text-xs text-muted-foreground/80 mt-2">
                Nos reservamos el derecho de actualizar esta política cuando sea necesario. 
                Te notificaremos sobre cualquier cambio significativo.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PoliticaCookies;