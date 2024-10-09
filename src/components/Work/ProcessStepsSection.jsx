import React from 'react';

const ProcessStep = ({ image, subtitle, title, description }) => (
  <div className="bg-blue-600 rounded-3xl p-6 shadow-lg flex flex-col">
    <img src={image} alt={title} className="w-full h-48 object-cover rounded-2xl mb-4" />
    <p className="text-blue-200 text-m mb-2">{subtitle}</p>
    <h3 className="text-white text-2xl font-bold mb-3">{title}</h3>
    <p className="text-white">{description}</p>
  </div>
);

const ProcessStepsSection = () => {
  const steps = [
    {
      image: "/path-to-kickoff-image.jpg",
      subtitle: "Agenda una reunión para conocernos",
      title: "Paso 1: Kick Off",
      description: "Agenda una reunión de 30 minutos para ver cómo podemos ayudar a tu empresa. Nos aseguramos que seamos un buen fit para tu negocio y definimos el alcance del proyecto."
    },
    {
      image: "/path-to-strategy-image.jpg",
      subtitle: "Comenzamos a pensar tu estrategia",
      title: "Paso 2: Contenido, estructura y diseño",
      description: "Definimos la estructura y el diseño en base a los objetivos discutidos en la primera fase. Recibimos tu feedback y hacemos los ajustes necesarios para llegar al mejor resultado."
    },
    {
      image: "/path-to-development-image.jpg",
      subtitle: "Tu web casi lista",
      title: "Paso 3: Desarrollamos y lanzamos",
      description: "¡Comenzamos a programar! Una vez terminado tendrás tu sitio web responsive, autoadministrable y listo para salir a conquistar nuevos clientes."
    }
  ];

  return (
    <section className="bg-gray-900 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <ProcessStep key={index} {...step} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessStepsSection;