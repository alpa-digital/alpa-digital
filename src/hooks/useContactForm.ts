import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export type ContactTopic = "general" | "diagnostico" | "sistemas" | "acompanamiento" | "producto";
export const contactTopics = ["general", "diagnostico", "sistemas", "acompanamiento", "producto"] as const;
export const isContactTopic = (value: unknown): value is ContactTopic => typeof value === "string" && (contactTopics as readonly string[]).includes(value);
export const contactPath = (topic: ContactTopic = "general") => topic === "general" ? "/contacto/" : `/contacto/?tema=${topic}`;

/** Los CTA conservan el interés seleccionado al navegar a la página de contacto. */
export const useContactForm = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const openContactForm = useCallback((topic?: ContactTopic | unknown) => {
    navigate(contactPath(isContactTopic(topic) ? topic : "general"), { state: { from: pathname } });
  }, [navigate, pathname]);
  return { openContactForm };
};
