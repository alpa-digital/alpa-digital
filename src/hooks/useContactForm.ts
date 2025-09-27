import { useState } from "react";

export const useContactForm = () => {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const openContactForm = () => {
    setIsContactFormOpen(true);
  };

  const closeContactForm = () => {
    setIsContactFormOpen(false);
  };

  return {
    isContactFormOpen,
    openContactForm,
    closeContactForm,
  };
};