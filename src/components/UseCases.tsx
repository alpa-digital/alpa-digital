import { MessageCircle, FileText, Receipt, Users, Megaphone, BarChart3 } from "lucide-react";

const useCases = [
  {
    icon: MessageCircle,
    area: "Atención al cliente",
    title: "Responder consultas a cualquier hora",
    description:
      "Un asistente entrenado con tu catálogo, tus precios y tus condiciones responde por WhatsApp, web o email. Lo que no sabe, lo pasa a una persona con todo el contexto.",
    outcome: "Menos llamadas repetidas y clientes atendidos fuera de horario.",
  },
  {
    icon: FileText,
    area: "Ventas",
    title: "Presupuestos listos en minutos",
    description:
      "De un email o una llamada transcrita a un presupuesto en tu plantilla, con los datos del cliente en el CRM y un recordatorio de seguimiento programado.",
    outcome: "Se responde antes que la competencia y no se olvida ningún seguimiento.",
  },
  {
    icon: Receipt,
    area: "Administración",
    title: "Facturas y albaranes sin picar datos",
    description:
      "La IA lee las facturas de proveedores que llegan al correo, extrae los datos, los cuadra con los pedidos y los deja preparados en tu programa de contabilidad.",
    outcome: "Horas de administración a la semana que dejan de hacerse a mano.",
  },
  {
    icon: Users,
    area: "Recursos humanos",
    title: "Selección y onboarding más ágiles",
    description:
      "Cribado inicial de candidaturas según tus criterios, respuestas automáticas a candidatos y checklist de incorporación que se genera sola para cada puesto.",
    outcome: "Procesos de selección más cortos y sin candidatos sin respuesta.",
  },
  {
    icon: Megaphone,
    area: "Marketing",
    title: "Contenido y campañas con tu voz",
    description:
      "Borradores de newsletters, publicaciones y fichas de producto a partir de tu información real, con revisión de una persona antes de publicar.",
    outcome: "Comunicación constante sin dedicarle una jornada a la semana.",
  },
  {
    icon: BarChart3,
    area: "Dirección",
    title: "Informes que se preparan solos",
    description:
      "Ventas, cobros pendientes, stock o tiempos de respuesta reunidos cada lunes en un informe claro, con un resumen en lenguaje sencillo de lo que ha cambiado.",
    outcome: "Decisiones con datos al día sin perseguir a nadie para conseguirlos.",
  },
];

const UseCases = () => {
  return (
    <section id="casos-de-uso" className="py-24 px-8 bg-muted/30 relative overflow-hidden scroll-mt-24">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-4xl md:text-6xl font-light text-foreground mb-8 animate-fade-in">
            Qué automatizamos en una pyme
          </h2>
          <p className="text-xl text-muted-foreground font-light max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.3s', lineHeight: '1.8' }}>
            No hace falta reinventar la empresa. Estas son las tareas donde la IA da resultados rápidos y medibles en negocios de 5 a 100 personas.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {useCases.map((useCase, index) => {
            const Icon = useCase.icon;
            return (
              <article
                key={useCase.title}
                className="group flex flex-col bg-background rounded-2xl border border-border/60 p-8 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 transition-all duration-500 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full border border-border/50">
                    {useCase.area}
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-medium text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  {useCase.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6 flex-1">{useCase.description}</p>
                <p className="text-sm font-medium text-foreground border-t border-border/60 pt-4">
                  {useCase.outcome}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
