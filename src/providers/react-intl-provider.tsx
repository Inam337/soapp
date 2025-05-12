"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { IntlProvider, useIntl as useReactIntl } from "react-intl";
import { getCookie } from "cookies-next";

// Import translation files
import enMessages from "@/locales/en.json";
import esMessages from "@/locales/es.json";
import frMessages from "@/locales/fr.json";
import deMessages from "@/locales/de.json";
import urMessages from "@/locales/ur.json";
import { ensureTranslation } from "@/app/i18n-client";

// Define RTL locales directly here since we removed them from middleware
export const rtlLocales = ["ur"];

// Define supported locales
export const supportedLocales = ["en", "es", "fr", "de", "ur"] as const;
export type SupportedLocale = (typeof supportedLocales)[number];

// Ensure critical translations are available
ensureTranslation("app.title", "Sindh Ombudsman");
ensureTranslation("app.version", "Version 1.0.0");

// Load all translation messages
const messages: Record<SupportedLocale, Record<string, string>> = {
  en: enMessages,
  es: esMessages,
  fr: frMessages,
  de: deMessages,
  ur: urMessages,
};

// Define an interface for IntlError
interface IntlErrorType {
  code: string;
  message: string;
}

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

  // Handle errors with missing translations
  const handleIntlError = (error: IntlErrorType) => {
    // Only log in development, suppress in production
    if (
      process.env.NODE_ENV === "development" &&
      error.code === "MISSING_TRANSLATION"
    ) {
      console.warn(`[i18n] ${error.message}`);
    }
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
        onError={handleIntlError}
        defaultLocale="en"
      >
        {children}
      </IntlProvider>
    </IntlContext.Provider>
  );
}

// Export useReactIntl for direct access to its functions
export { useReactIntl };
