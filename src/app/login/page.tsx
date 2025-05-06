"use client";

import { useState, useEffect } from "react";
import { IntlProvider, useIntl } from "react-intl";
import { cn } from "@/lib/utils";
import OnboardingLayout from "@/components/main/LandingLayout";
import LoginForm from "@/components/LoginForm";
import Image from "next/image";
import { getCookie } from "cookies-next";

// Define RTL locales
const rtlLocales = ["ur"];

// Define supported locales
const supportedLocales = ["en", "es", "fr", "de", "ur"] as const;
type SupportedLocale = (typeof supportedLocales)[number];

// Load all translation messages
const messages: Record<string, Record<string, string>> = {
  en: require("@/locales/en.json"),
  es: require("@/locales/es.json"),
  fr: require("@/locales/fr.json"),
  de: require("@/locales/de.json"),
  ur: require("@/locales/ur.json"),
};

// Standalone locale detection for the login page
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

// Main export with IntlProvider wrapper
export default function LoginPage() {
  const [locale, setLocale] = useState<SupportedLocale>("en");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setLocale(getDefaultLocale());
  }, []);

  // Determine direction based on locale
  const direction = rtlLocales.includes(locale) ? "rtl" : "ltr";

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

  return (
    <IntlProvider
      locale={locale}
      messages={isClient ? messages[locale] : messages.en}
    >
      <LoginPageContent
        locale={locale}
        direction={direction}
        onLocaleChange={handleLocaleChange}
      />
    </IntlProvider>
  );
}

// Actual component content, wrapped with IntlProvider above
function LoginPageContent({
  locale,
  direction,
  onLocaleChange,
}: {
  locale: SupportedLocale;
  direction: "rtl" | "ltr";
  onLocaleChange: (locale: SupportedLocale) => void;
}) {
  const intl = useIntl();
  const isRtl = direction === "rtl";

  const t = (id: string, defaultMessage: string = "") =>
    intl.formatMessage({ id, defaultMessage });

  return (
    <OnboardingLayout direction={direction}>
      <div className="min-h-screen flex flex-col md:flex-row">
        {/* Left Image - will be on right in RTL */}
        <div
          className={cn(
            "relative w-full md:w-1/2 h-64 md:h-auto",
            isRtl ? "md:order-2" : "md:order-1"
          )}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-green-800 to-green-600 opacity-80"></div>
          <div className="absolute inset-0 flex items-center justify-center text-white text-4xl font-bold">
            {t("onboarding.title", "SINDH OMBUDSMAN")}
          </div>
        </div>

        {/* Right Content - will be on left in RTL */}
        <div
          className={cn(
            "w-full md:w-1/2 flex items-center justify-center p-6",
            isRtl ? "md:order-1" : "md:order-2"
          )}
        >
          <LoginForm
            direction={direction}
            locale={locale}
            onLocaleChange={onLocaleChange}
          />
        </div>
      </div>
    </OnboardingLayout>
  );
}
