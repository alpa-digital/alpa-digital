import { servicesPageCopy } from "@/data/servicesPage";
import type { Lang } from "@/i18n";

export const processCopy = {
  es: {
    label: "Cómo trabajamos", title: ["Un camino claro.", "Una solución que se usa."], intro: "Tanto si quieres automatizar un proceso como construir un producto, empezamos por entender qué necesitas. Definimos el alcance, diseñamos la solución y la desarrollamos por fases hasta prepararla para su uso.", start: "Ver cómo avanzamos", phase: "Fase", explore: "Ver esta fase", close: "Cerrar detalle de la fase", do: "Qué hacemos", deliver: "Qué queda preparado", participate: "Cómo participas", previous: "Fase anterior", next: "Siguiente fase", contact: "Hablemos de tu proyecto", navigation: "Fases del proyecto",
    titles: ["Estrategia y alcance", "Diseño de la solución", "Desarrollo e integración", "Puesta en marcha y evolución"],
    participation: ["Compartes el contexto, las herramientas actuales y ejemplos del trabajo. Acordamos contigo qué problema merece atención y cómo comprobaremos que la primera fase es útil.", "Revisamos contigo los recorridos y las reglas antes de desarrollar. Las personas que van a utilizar la solución ayudan a detectar lo que falta o lo que puede complicar el uso.", "Revisas las entregas y los casos de prueba acordados. Contrastamos los resultados, resolvemos dudas y ajustamos lo necesario antes de preparar la puesta en marcha.", "Preparamos con tu equipo el uso de la solución y revisamos las dudas que aparecen. Las siguientes mejoras y el acompañamiento se acuerdan según lo que necesites."],
    visualLabels: [["Equipo", "Datos", "Herramientas", "Proceso", "Objetivo"], ["Entrada", "Acción", "Revisión", "Resultado"], ["Datos", "Conexiones", "Solución"], ["Probar", "Aprender", "Mejorar", "En uso"]],
    visualCaptions: ["Entender el contexto para elegir una prioridad.", "Definir el recorrido antes de construirlo.", "Conectar las piezas y comprobar cómo funcionan juntas.", "Poner en uso, revisar y decidir el siguiente paso."],
    mindset: "El criterio detrás de cada fase.", mindsetIntro: "El proceso se adapta a la necesidad. Estas decisiones guían el trabajo tanto en una automatización como en un producto digital.",
    principles: [
      { title: "Con las personas que lo usan", text: "Revisamos el trabajo con el equipo, no solo con dirección. El contexto de uso forma parte de las decisiones." },
      { title: "Alcance por fases", text: "Definimos qué entra en cada entrega y qué puede esperar. Las prioridades y los siguientes pasos se acuerdan contigo." },
      { title: "Pruebas antes de la puesta en marcha", text: "Contrastamos la solución con los casos definidos y revisamos las situaciones que pueden fallar." },
      { title: "Evolución acordada", text: "Después de empezar a usarla, revisamos lo que ocurre y valoramos las mejoras que necesita el equipo o el producto." },
    ],
    work: "Del proceso al trabajo real.", workIntro: "Productos y automatizaciones que hemos desarrollado. Cada proyecto tiene su propio contexto y alcance.", allWork: "Ver todos los trabajos", project: "Ver proyecto", samples: "Las capturas de producto contienen datos de ejemplo.",
  },
  en: {
    label: "How we work", title: ["A clear path.", "A solution people use."], intro: "Whether you want to automate a process or build a product, we start by understanding what you need. We agree on scope, design the solution and develop it in stages until it is prepared for use.", start: "Explore our process", phase: "Phase", explore: "Explore this phase", close: "Close phase details", do: "What we do", deliver: "What is prepared", participate: "How you take part", previous: "Previous phase", next: "Next phase", contact: "Let's discuss your project", navigation: "Project phases",
    titles: ["Strategy and scope", "Solution design", "Development and integration", "Launch and evolution"],
    participation: ["You share the context, current tools and examples of the work. Together, we agree on which problem needs attention and how to check that the first phase is useful.", "We review journeys and rules with you before development. The people who will use the solution help identify gaps and obstacles to use.", "You review deliveries and the agreed test cases. We compare results, answer questions and make adjustments before preparing rollout.", "We prepare rollout with your team and review questions as they arise. Further improvements and support are agreed around what you need."],
    visualLabels: [["Team", "Data", "Tools", "Process", "Goal"], ["Input", "Action", "Review", "Output"], ["Data", "Connections", "Solution"], ["Test", "Learn", "Improve", "In use"]],
    visualCaptions: ["Understand the context and choose a priority.", "Define the journey before building it.", "Connect the parts and test how they work together.", "Put into use, review and agree on the next step."],
    mindset: "The thinking behind each phase.", mindsetIntro: "The process adapts to the need. These decisions guide both automation work and digital product development.",
    principles: [
      { title: "With the people who use it", text: "We review the work with the team, not only management. The context of use informs decisions." },
      { title: "Scope in stages", text: "We define what each delivery includes and what can wait. Priorities and next steps are agreed with you." },
      { title: "Testing before rollout", text: "We check the solution against the defined cases and review situations that could fail." },
      { title: "Evolution by agreement", text: "Once the solution is in use, we review what happens and assess improvements needed by the team or product." },
    ],
    work: "From process to real work.", workIntro: "Products and automation we have developed. Each project has its own context and scope.", allWork: "Explore all work", project: "Explore project", samples: "Product screenshots contain sample data.",
  },
};
export const processIds = ["estrategia", "diseno", "desarrollo", "puesta-en-marcha"];
export const getProcessStages = (lang: Lang) => servicesPageCopy[lang].process.stages.map((stage, index) => ({
  ...stage, id: processIds[index], title: processCopy[lang].titles[index], participation: processCopy[lang].participation[index],
}));
