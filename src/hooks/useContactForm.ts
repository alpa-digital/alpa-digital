import { useState } from "react";

/**
 * Qué busca quien escribe. Se deduce del botón que ha pulsado y se puede
 * cambiar en el propio formulario; viaja con el mensaje para saber por dónde ha
 * entrado y qué necesita.
 */
export type ContactTopic = "general" | "diagnostico" | "sistemas" | "acompanamiento";

export const contactTopics = ["general", "diagnostico", "sistemas", "acompanamiento"] as const;

const isTopic = (value: unknown): value is ContactTopic => typeof value === "string" && (contactTopics as readonly string[]).includes(value);

export const useContactForm = () => {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [contactTopic, setContactTopic] = useState<ContactTopic>("general");

  // Varios botones pasan esta función directamente como onClick, así que el
  // argumento puede ser un evento: solo se acepta si es un tema conocido.
  const openContactForm = (topic?: ContactTopic | unknown) => {
    setContactTopic(isTopic(topic) ? topic : "general");
    setIsContactFormOpen(true);
  };

  const closeContactForm = () => {
    setIsContactFormOpen(false);
  };

  return {
    isContactFormOpen,
    contactTopic,
    openContactForm,
    closeContactForm,
  };
};
