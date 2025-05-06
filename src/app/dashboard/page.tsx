"use client";

import { useState, useEffect } from "react";
import { IntlProvider, useIntl } from "react-intl";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import DashboardLayout from "@/components/main/SidebarLayout";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getCookie } from "cookies-next";
import { SupportedLocale } from "@/components/LanguageSwitcher";

// Define RTL locales
const rtlLocales = ["ur"];

// Define supported locales
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
export default function DashboardPage() {
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
      <DashboardPageContent
        direction={direction}
        locale={locale}
        onLocaleChange={handleLocaleChange}
      />
    </IntlProvider>
  );
}

// Actual component content, wrapped with IntlProvider above
function DashboardPageContent({
  direction,
  locale,
  onLocaleChange,
}: {
  direction: "rtl" | "ltr";
  locale: SupportedLocale;
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

  const t = (id: string, defaultMessage: string = "") =>
    intl.formatMessage({ id, defaultMessage });

  return (
    <DashboardLayout
      direction={direction}
      locale={locale}
      onLocaleChange={onLocaleChange}
    >
      <div className={cn("space-y-6", isRtl && "font-urdu text-right")}>
        <Card>
          <CardHeader className={cn(isRtl && "flex flex-col-reverse")}>
            <CardTitle>{t("sidebar.dashboard", "Dashboard")}</CardTitle>
            <CardDescription>
              {t("dashboard.welcome", "Welcome to your dashboard")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              {t(
                "dashboard.description",
                "This is your main dashboard. Here you can view and manage your account information."
              )}
            </p>
          </CardContent>
          <CardFooter>
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push("/onboarding")}
              className={cn(
                "flex items-center gap-2",
                isRtl && "flex-row-reverse"
              )}
            >
              <ArrowLeft className="h-4 w-4" />
              <span>{t("common.back", "Back to Onboarding")}</span>
            </Button>
          </CardFooter>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader className={cn(isRtl && "flex flex-col-reverse")}>
              <CardTitle>{t("dashboard.stats", "Statistics")}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                {t(
                  "dashboard.stats.description",
                  "View your account statistics and activity."
                )}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className={cn(isRtl && "flex flex-col-reverse")}>
              <CardTitle>
                {t("dashboard.activity", "Recent Activity")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                {t(
                  "dashboard.activity.description",
                  "See your recent account activity."
                )}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className={cn(isRtl && "flex flex-col-reverse")}>
              <CardTitle>{t("dashboard.settings", "Settings")}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                {t(
                  "dashboard.settings.description",
                  "Manage your account settings and preferences."
                )}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
