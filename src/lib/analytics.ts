/**
 * Helpers pour le tracking Google Analytics et événements personnalisés
 */

// Types pour les événements
export type EventName =
  | "phone_click"
  | "email_click"
  | "form_submit"
  | "quote_request"
  | "emergency_request"
  | "contact_submit"
  | "scroll_depth"
  | "cta_click";

export type EventParams = {
  category?: string;
  label?: string;
  value?: number;
  [key: string]: any;
};

/**
 * Envoie un événement à Google Analytics
 */
export function trackEvent(eventName: EventName, params?: EventParams) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, params);
  }
}

/**
 * Track un clic sur numéro de téléphone
 */
export function trackPhoneClick(phoneNumber: string) {
  trackEvent("phone_click", {
    category: "engagement",
    label: phoneNumber,
  });
}

/**
 * Track un clic sur email
 */
export function trackEmailClick(email: string) {
  trackEvent("email_click", {
    category: "engagement",
    label: email,
  });
}

/**
 * Track une soumission de formulaire
 */
export function trackFormSubmit(formType: "contact" | "devis" | "intervention") {
  trackEvent("form_submit", {
    category: "conversion",
    label: formType,
  });

  // Track également comme conversion spécifique
  if (formType === "devis") {
    trackEvent("quote_request", {
      category: "conversion",
      value: 1,
    });
  } else if (formType === "intervention") {
    trackEvent("emergency_request", {
      category: "conversion",
      value: 1,
    });
  } else {
    trackEvent("contact_submit", {
      category: "conversion",
      value: 1,
    });
  }
}

/**
 * Track un clic sur CTA
 */
export function trackCTAClick(ctaName: string, location: string) {
  trackEvent("cta_click", {
    category: "engagement",
    label: ctaName,
    location: location,
  });
}

/**
 * Track la profondeur de scroll
 */
export function trackScrollDepth(depth: number) {
  trackEvent("scroll_depth", {
    category: "engagement",
    value: depth,
  });
}

/**
 * Initialise le tracking de scroll
 */
export function initScrollTracking() {
  if (typeof window === "undefined") return;

  let tracked25 = false;
  let tracked50 = false;
  let tracked75 = false;
  let tracked100 = false;

  const handleScroll = () => {
    const scrollPercent =
      (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

    if (scrollPercent >= 25 && !tracked25) {
      tracked25 = true;
      trackScrollDepth(25);
    }
    if (scrollPercent >= 50 && !tracked50) {
      tracked50 = true;
      trackScrollDepth(50);
    }
    if (scrollPercent >= 75 && !tracked75) {
      tracked75 = true;
      trackScrollDepth(75);
    }
    if (scrollPercent >= 100 && !tracked100) {
      tracked100 = true;
      trackScrollDepth(100);
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });

  // Cleanup
  return () => window.removeEventListener("scroll", handleScroll);
}

/**
 * Track le temps passé sur la page
 */
export function initTimeTracking() {
  if (typeof window === "undefined") return;

  const startTime = Date.now();

  const trackTime = () => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000); // en secondes
    if (timeSpent > 10) {
      // Seulement si plus de 10 secondes
      trackEvent("scroll_depth", {
        category: "engagement",
        label: "time_on_page",
        value: timeSpent,
      });
    }
  };

  // Track au moment de quitter la page
  window.addEventListener("beforeunload", trackTime);

  // Cleanup
  return () => window.removeEventListener("beforeunload", trackTime);
}

// Augmenter le type Window
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}
