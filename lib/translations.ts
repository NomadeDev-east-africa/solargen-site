import { useLang, type Lang } from "./i18n";

/**
 * Dictionnaire de tous les textes du site SOLARGEN GROUP.
 * Pour ajouter / modifier un texte : éditez les deux langues ci-dessous.
 * Les données du matériel sont dans `lib/products.ts`.
 */
export const dict = {
  fr: {
    nav: {
      links: [
        { href: "#about", label: "À propos" },
        { href: "#services", label: "Services" },
        { href: "#products", label: "Matériel" },
        { href: "#projects", label: "Réalisations" },
        { href: "#contact", label: "Contact" },
      ],
      cta: "Demander un devis",
    },
    hero: {
      eyebrow: "Énergie solaire · Djibouti",
      titleLine1: "L'énergie du soleil,",
      titleLine2: "à portée de toit",
      paragraph:
        "SOLARGEN GROUP conçoit, vend et installe vos solutions solaires à Djibouti : panneaux photovoltaïques, onduleurs et batteries de marque SAJ. Pour un avenir énergétique propre, fiable et accessible.",
      ctaPrimary: "Demander un devis gratuit",
      ctaSecondary: "Voir nos réalisations",
      scroll: "DÉFILER",
      badge1: "Matériel certifié SAJ & Jinko",
      badge2: "Installation clé en main",
    },
    stats: {
      items: [
        { label: "Installations réalisées", suffix: "+" },
        { label: "kWc installés à Djibouti", suffix: "+" },
        { label: "Clients satisfaits", suffix: "%" },
        { label: "Accompagnement & SAV", suffix: "/7" },
      ],
    },
    about: {
      eyebrow: "Qui sommes-nous",
      titlePre: "Votre partenaire ",
      titleEm: "solaire à Djibouti",
      paragraph1:
        "Chez SOLARGEN GROUP SARL, nous croyons en un avenir énergétique propre et accessible. Implantés à Djibouti, nous accompagnons particuliers, entreprises et collectivités dans leur transition vers l'énergie solaire — de l'étude à la mise en service.",
      paragraph2:
        "Nous sélectionnons du matériel de référence (panneaux Jinko Tiger Neo, onduleurs et batteries SAJ) et nous l'installons avec rigueur, pour des systèmes performants qui durent et réduisent durablement vos factures d'électricité.",
      cardText: "d'ensoleillement par an à Djibouti — un potentiel solaire exceptionnel",
      features: [
        ["Étude sur mesure", "Chaque installation est dimensionnée selon vos besoins réels."],
        ["Matériel de marque", "Panneaux Jinko et équipements SAJ certifiés et garantis."],
        ["Pose professionnelle", "Une équipe technique qualifiée, du toit au tableau électrique."],
        ["Économies durables", "Produisez votre électricité et réduisez vos factures."],
      ],
    },
    services: {
      eyebrow: "Nos services",
      titlePre: "Du soleil à la prise, ",
      titleEm: "nous gérons tout",
      items: [
        ["Étude & dimensionnement", "Analyse de vos besoins, calcul de production et devis détaillé, sans engagement."],
        ["Vente de matériel", "Panneaux, onduleurs et batteries de marque, disponibles à l'unité ou en kit complet."],
        ["Installation & pose", "Mise en place sur toiture ou au sol par nos techniciens, dans les règles de l'art."],
        ["Stockage par batterie", "Profitez de votre énergie jour et nuit grâce aux batteries lithium SAJ."],
        ["Pompage solaire", "Solutions de pompage de l'eau au fil du soleil pour l'agriculture et l'élevage."],
        ["Maintenance & SAV", "Suivi, entretien et dépannage pour garder votre installation au meilleur rendement."],
      ],
    },
    products: {
      eyebrow: "Notre matériel",
      titlePre: "Des équipements ",
      titleEm: "fiables et garantis",
      paragraph:
        "Nous travaillons avec des marques de référence du photovoltaïque. Voici une sélection du matériel que nous vendons et installons.",
      filters: [
        { key: "all", label: "Tout le matériel" },
        { key: "panneau", label: "Panneaux" },
        { key: "onduleur", label: "Onduleurs" },
        { key: "batterie", label: "Batteries" },
      ],
      cta: "Demander un prix",
    },
    projects: {
      eyebrow: "Nos réalisations",
      titlePre: "Des projets ",
      titleEm: "qui produisent déjà",
      paragraph:
        "De la ferme agropastorale au siège d'entreprise, découvrez quelques installations menées par nos équipes à Djibouti.",
      items: [
        {
          title: "Projet Agropastoral d'Assamo",
          tag: "Pompage & irrigation solaire",
          text: "Alimentation solaire d'un site agropastoral à Assamo : pompage de l'eau et énergie pour l'élevage, en autonomie totale.",
          images: [
            "/images/projet-agropastoral-1.jpeg",
            "/images/projet-agropastoral-2.jpeg",
            "/images/projet-agropastoral-3.jpeg",
            "/images/projet-agropastoral-4.jpeg",
            "/images/projet-agropastoral-5.jpeg",
            "/images/projet-agropastoral-6.jpeg",
          ],
        },
        {
          title: "Installation HALT",
          tag: "Toiture photovoltaïque",
          text: "Équipement solaire du siège HALT : production photovoltaïque en toiture pour couvrir les besoins du bâtiment.",
          images: [
            "/images/projet-halt-1.jpeg",
            "/images/projet-halt-2.jpeg",
            "/images/projet-halt-3.jpeg",
            "/images/projet-halt-4.jpeg",
            "/images/projet-halt-5.jpeg",
            "/images/projet-halt-6.jpeg",
          ],
        },
      ],
      viewLabel: "Voir le projet",
    },
    gallery: {
      eyebrow: "En images",
      titlePre: "Le solaire ",
      titleEm: "en action",
      paragraph:
        "Matériel, chantiers et installations terminées. Cliquez sur une image pour l'agrandir.",
    },
    advantages: {
      eyebrow: "Pourquoi le solaire",
      titlePre: "Le bon choix, ",
      titleEm: "pour longtemps",
      items: [
        ["Jusqu'à -70 % sur vos factures", "Produisez votre propre électricité et réduisez fortement votre dépense énergétique."],
        ["Énergie propre & locale", "Une énergie renouvelable qui réduit votre empreinte carbone, sous le soleil de Djibouti."],
        ["Autonomie & fiabilité", "Avec le stockage par batterie, gardez le courant même en cas de coupure réseau."],
        ["Un investissement rentable", "Le système s'amortit puis vous fait économiser pendant des décennies."],
      ],
    },
    cta: {
      title: "Prêt à passer au solaire ?",
      paragraph:
        "Recevez une étude et un devis gratuits, adaptés à votre consommation et à votre budget. Notre équipe vous répond rapidement.",
      primary: "Demander mon devis gratuit",
      secondary: "Discuter sur WhatsApp",
    },
    contact: {
      eyebrow: "Parlons de votre projet",
      titlePre: "Demandez votre ",
      titleEm: "devis gratuit",
      paragraph:
        "Un projet d'installation, une question sur le matériel, un besoin de pompage solaire ? Écrivez-nous, nous vous recontactons rapidement.",
      addressLabel: "Adresse",
      addressValue: "Rue de Marseille, 15 — Djibouti",
      phoneLabel: "Téléphone",
      emailLabel: "E-mail",
      whatsappBtn: "Discuter sur WhatsApp",
      formTitle: "Demande de devis",
      formSubtitle: "Réponse rapide, sans engagement.",
      fieldName: "Nom complet",
      fieldNamePh: "Votre nom",
      fieldPhone: "Téléphone",
      fieldPhonePh: "+253 ...",
      fieldInterest: "Mon projet concerne",
      interestOptions: [
        "Installation résidentielle (maison)",
        "Installation professionnelle / entreprise",
        "Pompage solaire (agriculture)",
        "Achat de matériel uniquement",
        "Maintenance / SAV",
        "Autre",
      ],
      fieldMessage: "Message",
      fieldMessagePh: "Décrivez votre besoin (surface, consommation, lieu...)",
      submit: "Envoyer ma demande",
      sent: "Merci ! Votre message s'ouvre dans WhatsApp pour finaliser l'envoi.",
      waGreeting: "Bonjour SOLARGEN GROUP,",
      waName: "Nom",
      waPhone: "Téléphone",
      waInterest: "Projet",
      mapTitle: "SOLARGEN GROUP — Djibouti",
    },
    footer: {
      tagline:
        "Vente & installation de matériels solaires à Djibouti. Pour un avenir énergétique propre et accessible.",
      explore: "Explorer",
      exploreLinks: [
        ["À propos", "#about"],
        ["Services", "#services"],
        ["Matériel", "#products"],
        ["Réalisations", "#projects"],
      ],
      servicesTitle: "Nos services",
      servicesLinks: [
        ["Étude & devis", "#contact"],
        ["Installation", "#services"],
        ["Pompage solaire", "#services"],
        ["Maintenance & SAV", "#services"],
      ],
      contactTitle: "Contact",
      rights: "Tous droits réservés.",
      built: "Énergie solaire · Djibouti",
    },
  },

  en: {
    nav: {
      links: [
        { href: "#about", label: "About" },
        { href: "#services", label: "Services" },
        { href: "#products", label: "Equipment" },
        { href: "#projects", label: "Projects" },
        { href: "#contact", label: "Contact" },
      ],
      cta: "Request a quote",
    },
    hero: {
      eyebrow: "Solar energy · Djibouti",
      titleLine1: "The power of the sun,",
      titleLine2: "right on your roof",
      paragraph:
        "SOLARGEN GROUP designs, sells and installs your solar solutions in Djibouti: photovoltaic panels, inverters and batteries by SAJ. For a clean, reliable and affordable energy future.",
      ctaPrimary: "Get a free quote",
      ctaSecondary: "See our projects",
      scroll: "SCROLL",
      badge1: "Certified SAJ & Jinko equipment",
      badge2: "Turnkey installation",
    },
    stats: {
      items: [
        { label: "Installations completed", suffix: "+" },
        { label: "kWp installed in Djibouti", suffix: "+" },
        { label: "Satisfied clients", suffix: "%" },
        { label: "Support & after-sales", suffix: "/7" },
      ],
    },
    about: {
      eyebrow: "Who we are",
      titlePre: "Your solar partner ",
      titleEm: "in Djibouti",
      paragraph1:
        "At SOLARGEN GROUP SARL, we believe in a clean and accessible energy future. Based in Djibouti, we support households, businesses and communities in their transition to solar energy — from study to commissioning.",
      paragraph2:
        "We select reference-grade equipment (Jinko Tiger Neo panels, SAJ inverters and batteries) and install it with care, for high-performing systems that last and durably cut your electricity bills.",
      cardText: "of sunshine per year in Djibouti — exceptional solar potential",
      features: [
        ["Tailored study", "Every system is sized to your real needs."],
        ["Brand-name equipment", "Certified, warranted Jinko panels and SAJ equipment."],
        ["Professional install", "A qualified technical team, from roof to electrical panel."],
        ["Lasting savings", "Generate your own electricity and cut your bills."],
      ],
    },
    services: {
      eyebrow: "Our services",
      titlePre: "From sun to socket, ",
      titleEm: "we handle it all",
      items: [
        ["Study & sizing", "Analysis of your needs, output calculation and a detailed quote, no obligation."],
        ["Equipment sales", "Panels, inverters and batteries from leading brands, by the unit or as a full kit."],
        ["Installation", "Roof or ground-mount installation by our technicians, done by the book."],
        ["Battery storage", "Enjoy your energy day and night thanks to SAJ lithium batteries."],
        ["Solar pumping", "Sun-powered water pumping solutions for farming and livestock."],
        ["Maintenance & support", "Monitoring, servicing and repairs to keep your system at peak output."],
      ],
    },
    products: {
      eyebrow: "Our equipment",
      titlePre: "Reliable, ",
      titleEm: "warranted equipment",
      paragraph:
        "We work with leading photovoltaic brands. Here is a selection of the equipment we sell and install.",
      filters: [
        { key: "all", label: "All equipment" },
        { key: "panneau", label: "Panels" },
        { key: "onduleur", label: "Inverters" },
        { key: "batterie", label: "Batteries" },
      ],
      cta: "Ask for a price",
    },
    projects: {
      eyebrow: "Our projects",
      titlePre: "Projects ",
      titleEm: "already producing",
      paragraph:
        "From an agropastoral farm to a company headquarters, discover a few installations carried out by our teams in Djibouti.",
      items: [
        {
          title: "Assamo Agropastoral Project",
          tag: "Solar pumping & irrigation",
          text: "Solar power for an agropastoral site in Assamo: water pumping and energy for livestock, fully off-grid.",
          images: [
            "/images/projet-agropastoral-1.jpeg",
            "/images/projet-agropastoral-2.jpeg",
            "/images/projet-agropastoral-3.jpeg",
            "/images/projet-agropastoral-4.jpeg",
            "/images/projet-agropastoral-5.jpeg",
            "/images/projet-agropastoral-6.jpeg",
          ],
        },
        {
          title: "HALT Installation",
          tag: "Rooftop photovoltaics",
          text: "Solar equipment for the HALT headquarters: rooftop photovoltaic generation to cover the building's needs.",
          images: [
            "/images/projet-halt-1.jpeg",
            "/images/projet-halt-2.jpeg",
            "/images/projet-halt-3.jpeg",
            "/images/projet-halt-4.jpeg",
            "/images/projet-halt-5.jpeg",
            "/images/projet-halt-6.jpeg",
          ],
        },
      ],
      viewLabel: "View project",
    },
    gallery: {
      eyebrow: "In pictures",
      titlePre: "Solar ",
      titleEm: "in action",
      paragraph: "Equipment, job sites and completed installations. Click an image to enlarge it.",
    },
    advantages: {
      eyebrow: "Why solar",
      titlePre: "The right choice, ",
      titleEm: "for the long run",
      items: [
        ["Up to -70% on your bills", "Generate your own electricity and sharply reduce your energy spending."],
        ["Clean & local energy", "Renewable energy that lowers your carbon footprint, under Djibouti's sun."],
        ["Autonomy & reliability", "With battery storage, keep the power on even during grid outages."],
        ["A profitable investment", "The system pays for itself, then saves you money for decades."],
      ],
    },
    cta: {
      title: "Ready to go solar?",
      paragraph:
        "Get a free study and quote, tailored to your consumption and budget. Our team will get back to you quickly.",
      primary: "Get my free quote",
      secondary: "Chat on WhatsApp",
    },
    contact: {
      eyebrow: "Let's talk about your project",
      titlePre: "Request your ",
      titleEm: "free quote",
      paragraph:
        "An installation project, a question about equipment, a solar pumping need? Write to us and we'll get back to you quickly.",
      addressLabel: "Address",
      addressValue: "Rue de Marseille, 15 — Djibouti",
      phoneLabel: "Phone",
      emailLabel: "Email",
      whatsappBtn: "Chat on WhatsApp",
      formTitle: "Quote request",
      formSubtitle: "Fast response, no obligation.",
      fieldName: "Full name",
      fieldNamePh: "Your name",
      fieldPhone: "Phone",
      fieldPhonePh: "+253 ...",
      fieldInterest: "My project is about",
      interestOptions: [
        "Residential installation (home)",
        "Business / commercial installation",
        "Solar pumping (agriculture)",
        "Equipment purchase only",
        "Maintenance / support",
        "Other",
      ],
      fieldMessage: "Message",
      fieldMessagePh: "Describe your need (area, consumption, location...)",
      submit: "Send my request",
      sent: "Thank you! Your message is opening in WhatsApp to complete the sending.",
      waGreeting: "Hello SOLARGEN GROUP,",
      waName: "Name",
      waPhone: "Phone",
      waInterest: "Project",
      mapTitle: "SOLARGEN GROUP — Djibouti",
    },
    footer: {
      tagline:
        "Sale & installation of solar equipment in Djibouti. For a clean and accessible energy future.",
      explore: "Explore",
      exploreLinks: [
        ["About", "#about"],
        ["Services", "#services"],
        ["Equipment", "#products"],
        ["Projects", "#projects"],
      ],
      servicesTitle: "Our services",
      servicesLinks: [
        ["Study & quote", "#contact"],
        ["Installation", "#services"],
        ["Solar pumping", "#services"],
        ["Maintenance & support", "#services"],
      ],
      contactTitle: "Contact",
      rights: "All rights reserved.",
      built: "Solar energy · Djibouti",
    },
  },
} as const;

/** Hook pratique : renvoie le dictionnaire de la langue active. */
export function useT() {
  const { lang } = useLang();
  return dict[lang];
}

export type { Lang };
