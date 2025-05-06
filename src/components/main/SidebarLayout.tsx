"use client";

import React, { useEffect } from "react";
import MainLayout from "@/components/main/MainLayout";
import { SupportedLocale } from "@/components/LanguageSwitcher";

interface DashboardLayoutProps {
  children: React.ReactNode;
  direction?: "rtl" | "ltr";
  locale?: SupportedLocale;
  onLocaleChange?: (locale: SupportedLocale) => void;
}

export default function DashboardLayout({
  children,
  direction = "ltr",
  locale = "en",
  onLocaleChange,
}: DashboardLayoutProps) {
  // Immediately calculate the direction based on locale
  const currentDirection = locale === "ur" ? "rtl" : "ltr";

  console.log("locale:", locale, "currentDirection:", currentDirection);

  // Update direction when locale changes
  useEffect(() => {
    if (locale === "ur") {
      document.documentElement.dir = "rtl";
      document.documentElement.lang = "ur";
    } else {
      document.documentElement.dir = "ltr";
      document.documentElement.lang = locale;
    }
  }, [locale]);

  return (
    <MainLayout locale={locale} onLocaleChange={onLocaleChange}>
      {children}
    </MainLayout>
  );
}
