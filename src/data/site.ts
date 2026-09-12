export const site = {
  name: "Alpa Digital",
  url: "https://alpa.digital",
  email: "info@alpa.digital",
  calUrl: "https://cal.com/alpa-digital-studio/30min?user=alpa-digital-studio&overlayCalendar=true",
  linkedin: "https://www.linkedin.com/company/alpa-digital",
  instagram: "https://www.instagram.com/alpadigitalstudio/",
  /** Sede: solo localidad y provincia. La calle, el código postal y el teléfono se añaden con la ficha de Google Business Profile. */
  address: { street: null as null | string, locality: "Utrera", region: "Sevilla", postalCode: null as null | string, country: "ES" },
  phone: null as null | string,
  /** Provincias con visita presencial (sede y limítrofes). */
  onSiteProvinces: ["sevilla", "cadiz", "huelva", "cordoba", "malaga", "badajoz"],
  homeProvince: "sevilla",
  homeMunicipality: "Utrera",
};
