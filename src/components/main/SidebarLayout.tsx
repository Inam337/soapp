"use client";

import React from "react";
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
  return (
    <div dir={direction}>
      <MainLayout
        direction={direction}
        locale={locale}
        onLocaleChange={onLocaleChange}
      >
        {children}
      </MainLayout>
    </div>
  );
}
