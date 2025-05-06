"use client";

import { useState, useEffect } from "react";
import { IntlProvider, useIntl } from "react-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, ChevronLeft, Globe, User, Users } from "lucide-react";
import {
  LanguageSwitcher,
  SupportedLocale as LanguageSwitcherLocale,
} from "@/components/LanguageSwitcher";
import { cn } from "@/lib/utils";
import OnboardingLayout from "@/components/main/LandingLayout";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";

// Define RTL locales
const rtlLocales = ["ur"];

// Define supported locales to match LanguageSwitcher
type SupportedLocale = LanguageSwitcherLocale;
const supportedLocales = ["en", "es", "fr", "de", "ur"] as const;

// Load all translation messages
const messages: Record<string, Record<string, string>> = {
  en: require("@/locales/en.json"),
  es: require("@/locales/es.json"),
  fr: require("@/locales/fr.json"),
  de: require("@/locales/de.json"),
  ur: require("@/locales/ur.json"),
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

// Main export with IntlProvider wrapper
export default function OnboardingPage() {
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
      <OnboardingPageContent
        locale={locale}
        direction={direction}
        onLocaleChange={handleLocaleChange}
      />
    </IntlProvider>
  );
}

// Actual component content, wrapped with IntlProvider above
function OnboardingPageContent({
  locale,
  direction,
  onLocaleChange,
}: {
  locale: SupportedLocale;
  direction: "rtl" | "ltr";
  onLocaleChange: (locale: SupportedLocale) => void;
}) {
  const intl = useIntl();
  const router = useRouter();
  const isRtl = direction === "rtl";

  // Add client-side only rendering to avoid hydration mismatch
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const t = (id: string) => intl.formatMessage({ id });

  const handleCardClick = () => {
    router.push("/dashboard");
  };

  return (
    <OnboardingLayout direction={direction}>
      <div className="min-h-screen flex flex-col md:flex-row">
        {/* Image side (left in LTR, right in RTL) */}
        <div
          className={cn(
            "relative w-full md:w-1/2 h-64 md:h-auto",
            isRtl ? "md:order-2" : "md:order-1"
          )}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-green-800 to-green-600 opacity-80"></div>
          <div className="absolute inset-0 flex items-center justify-center text-white text-4xl font-bold">
            {t("onboarding.title")}
          </div>
        </div>

        {/* Content side (right in LTR, left in RTL) */}
        <div
          className={cn(
            "w-full md:w-1/2 flex items-center justify-center p-6",
            isRtl ? "md:order-1" : "md:order-2"
          )}
        >
          <div className="w-full max-w-md space-y-6">
            {/* Language Dropdown */}
            <div
              className={cn("flex", isRtl ? "justify-start" : "justify-end")}
            >
              <LanguageSwitcher
                currentLocale={locale}
                onLocaleChange={onLocaleChange}
              />
            </div>

            {/* Logo + Welcome Text */}
            <div className={cn("text-center space-y-2", isRtl && "font-urdu")}>
              <h1 className="text-2xl font-bold text-green-700">
                {t("onboarding.title")}
              </h1>
              <p className="text-sm text-gray-700">{t("onboarding.welcome")}</p>
            </div>

            {/* Options */}
            <div className="space-y-4">
              <Card
                className="cursor-pointer hover:shadow-lg transition"
                onClick={handleCardClick}
              >
                <CardContent className="flex items-center justify-between p-4">
                  {/* Content with icon and text */}
                  <div
                    className={cn(
                      "flex items-center gap-3",
                      isRtl && "flex-row"
                    )}
                  >
                    {/* Icon */}
                    <User className="text-green-600" />

                    {/* Text */}
                    <div className={isRtl ? "text-right font-urdu" : ""}>
                      <p className="font-semibold">{t("onboarding.citizen")}</p>
                      <p className="text-xs text-muted-foreground">
                        {t("onboarding.citizen.description")}
                      </p>
                    </div>
                  </div>

                  {/* Arrow - always at the end of the container */}
                  {isRtl ? (
                    <ChevronLeft className="text-muted-foreground" />
                  ) : (
                    <ChevronRight className="text-muted-foreground" />
                  )}
                </CardContent>
              </Card>

              <Card
                className="cursor-pointer hover:shadow-lg transition"
                onClick={handleCardClick}
              >
                <CardContent className="flex items-center justify-between p-4">
                  {/* Content with icon and text */}
                  <div
                    className={cn(
                      "flex items-center gap-3",
                      isRtl && "flex-row"
                    )}
                  >
                    {/* Icon */}
                    <Users className="text-green-600" />

                    {/* Text */}
                    <div className={isRtl ? "text-right font-urdu" : ""}>
                      <p className="font-semibold">
                        {t("onboarding.overseas")}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {t("onboarding.overseas.description")}
                      </p>
                    </div>
                  </div>

                  {/* Arrow - always at the end of the container */}
                  {isRtl ? (
                    <ChevronLeft className="text-muted-foreground" />
                  ) : (
                    <ChevronRight className="text-muted-foreground" />
                  )}
                </CardContent>
              </Card>

              <Card
                className="cursor-pointer hover:shadow-lg transition"
                onClick={handleCardClick}
              >
                <CardContent className="flex items-center justify-between p-4">
                  {/* Content with icon and text */}
                  <div
                    className={cn(
                      "flex items-center gap-3",
                      isRtl && "flex-row"
                    )}
                  >
                    {/* Icon */}
                    <Globe className="text-green-600" />

                    {/* Text */}
                    <div className={isRtl ? "text-right font-urdu" : ""}>
                      <p className="font-semibold">
                        {t("onboarding.foreigner")}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {t("onboarding.foreigner.description")}
                      </p>
                    </div>
                  </div>

                  {/* Arrow - always at the end of the container */}
                  {isRtl ? (
                    <ChevronLeft className="text-muted-foreground" />
                  ) : (
                    <ChevronRight className="text-muted-foreground" />
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Login Prompt */}
            <div className={cn("text-center text-sm", isRtl && "font-urdu")}>
              {t("onboarding.login")}{" "}
              <Button
                variant="outline"
                size="sm"
                className={isRtl ? "mr-2" : "ml-2"}
                onClick={() => router.push("/dashboard")}
              >
                {t("onboarding.login.button")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );
}
