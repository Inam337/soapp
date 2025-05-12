"use client";

import React, { useState, useEffect } from "react";
import { IntlProvider } from "react-intl";
import MainLayout from "@/components/main/main-layout";
import { SupportedLocale } from "@/components/LanguageSwitcher";
import { getCookie } from "cookies-next";
import { cn } from "@/lib/utils";

// Import translation files using ES module imports
import enMessages from "@/locales/en.json";
import esMessages from "@/locales/es.json";
import frMessages from "@/locales/fr.json";
import deMessages from "@/locales/de.json";
import urMessages from "@/locales/ur.json";

// Define RTL locales
const rtlLocales = ["ur"];

// Define supported locales
const supportedLocales = ["en", "es", "fr", "de", "ur"] as const;

// Load all translation messages
const messages: Record<string, Record<string, string>> = {
  en: enMessages,
  es: esMessages,
  fr: frMessages,
  de: deMessages,
  ur: urMessages,
};

// Standalone locale detection
function getDefaultLocale(): SupportedLocale {
  // Try to get from cookie
  const savedLocale = getCookie("NEXT_LOCALE");
  if (
    savedLocale &&
    supportedLocales.includes(savedLocale.toString() as SupportedLocale)
  ) {
    return savedLocale.toString() as SupportedLocale;
  }

  // Default to English
  return "en";
}

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [locale, setLocale] = useState<SupportedLocale>("en");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setLocale(getDefaultLocale());
  }, []);

  // Determine direction based on locale
  const direction = rtlLocales.includes(locale) ? "rtl" : "ltr";
  const isRtl = direction === "rtl";

  // Set HTML direction attribute
  useEffect(() => {
    if (isClient) {
      document.documentElement.dir = direction;
      document.documentElement.lang = locale;
    }
  }, [locale, direction, isClient]);

  // Handle locale change
  const handleLocaleChange = (newLocale: SupportedLocale) => {
    setLocale(newLocale);
  };

  if (!isClient) {
    return null; // Prevent rendering during SSR to avoid hydration issues
  }

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <MainLayout locale={locale} onLocaleChange={handleLocaleChange}>
        <div className={cn("space-y-6", isRtl && "font-urdu text-right")}>
          {children}
        </div>
      </MainLayout>
    </IntlProvider>
  );
}
