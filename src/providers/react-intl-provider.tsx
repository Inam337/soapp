"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { IntlProvider, useIntl as useReactIntl } from "react-intl";
import { getCookie } from "cookies-next";

// Define RTL locales directly here since we removed them from middleware
export const rtlLocales = ["ur"];

// Define supported locales
export const supportedLocales = ["en", "es", "fr", "de", "ur"] as const;
export type SupportedLocale = (typeof supportedLocales)[number];

// Load all translation messages
const messages: Record<SupportedLocale, Record<string, string>> = {
  en: require("@/locales/en.json"),
  es: require("@/locales/es.json"),
  fr: require("@/locales/fr.json"),
  de: require("@/locales/de.json"),
  ur: require("@/locales/ur.json"),
};

// Detect default locale
function getDefaultLocale(): SupportedLocale {
  // First try to get from cookie
  const savedLocale = getCookie("NEXT_LOCALE");
  if (
    savedLocale &&
    supportedLocales.includes(savedLocale.toString() as SupportedLocale)
  ) {
    return savedLocale.toString() as SupportedLocale;
  }

  // Then try browser language
  if (typeof window !== "undefined") {
    const browserLocale = navigator.language.split("-")[0];
    if (supportedLocales.includes(browserLocale as SupportedLocale)) {
      return browserLocale as SupportedLocale;
    }
  }

  // Default to English
  return "en";
}

// Define our context types
interface IntlContextType {
  locale: SupportedLocale;
  direction: "rtl" | "ltr";
  setLocale: (locale: SupportedLocale) => void;
}

// Create context
const IntlContext = createContext<IntlContextType | undefined>(undefined);

// Create a hook to use the context
export function useIntl() {
  const context = useContext(IntlContext);
  if (!context) {
    throw new Error("useIntl must be used within a ReactIntlProvider");
  }
  return context;
}

// Provider component
export function ReactIntlProvider({ children }: { children: React.ReactNode }) {
  // Use state to track if we're rendering on client side to avoid hydration mismatch
  const [isClient, setIsClient] = useState(false);
  const [locale, setLocaleState] = useState<SupportedLocale>("en"); // Start with default locale

  // After first render, update with actual locale preference and mark as client-side
  useEffect(() => {
    setIsClient(true);
    setLocaleState(getDefaultLocale());
  }, []);

  // Set direction based on locale
  const direction = rtlLocales.includes(locale) ? "rtl" : "ltr";

  // Effect to set HTML dir attribute
  useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = locale;
  }, [locale, direction]);

  // Function to change locale
  const setLocale = (newLocale: SupportedLocale) => {
    setLocaleState(newLocale);
  };

  // Render with client-side values only after hydration
  return (
    <IntlContext.Provider
      value={{
        locale,
        direction,
        setLocale,
      }}
    >
      <IntlProvider
        locale={locale}
        messages={isClient ? messages[locale] : messages.en}
      >
        {children}
      </IntlProvider>
    </IntlContext.Provider>
  );
}

// Export useReactIntl for direct access to its functions
export { useReactIntl };
