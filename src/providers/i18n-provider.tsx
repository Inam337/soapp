"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import i18next from "@/lib/i18n-client";
import { I18nextProvider, useTranslation } from "react-i18next";

type Language = {
  code: string;
  name: string;
  flag: string;
};

// Define available languages
export const LANGUAGES: Language[] = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
];

type I18nContextType = {
  language: string;
  languages: Language[];
  changeLanguage: (code: string) => void;
  getLanguageByCode: (code: string) => Language | undefined;
};

const I18nContext = createContext<I18nContextType | null>(null);

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (context === null) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
};

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [language, setLanguage] = useState("en");
  const [initialized, setInitialized] = useState(false);

  // Initialize i18n instance
  useEffect(() => {
    try {
      const lng = i18next.language || "en";
      setLanguage(lng);
      setInitialized(true);
    } catch (error) {
      console.error("Error initializing i18n:", error);
      setLanguage("en");
      setInitialized(true);
    }
  }, []);

  const changeLanguage = (code: string) => {
    try {
      i18next.changeLanguage(code).then(() => {
        setLanguage(code);
        localStorage.setItem("i18nextLng", code);

        // Update URL to include language
        const currentPath = window.location.pathname;
        const pathSegments = currentPath.split("/").filter(Boolean);
        const firstSegment = pathSegments[0];

        // Check if first segment is a language code
        const isFirstSegmentLanguage = LANGUAGES.some(
          (lang) => lang.code === firstSegment
        );

        let newPath;
        if (isFirstSegmentLanguage) {
          // Replace the language segment
          pathSegments[0] = code;
          newPath = `/${pathSegments.join("/")}`;
        } else {
          // Add language to the beginning
          newPath = `/${code}${currentPath}`;
        }

        router.push(newPath);
      });
    } catch (error) {
      console.error("Error changing language:", error);
    }
  };

  const getLanguageByCode = (code: string) => {
    return LANGUAGES.find((lang) => lang.code === code);
  };

  if (!initialized) {
    return <div className="text-center p-4">Loading...</div>;
  }

  return (
    <I18nContext.Provider
      value={{
        language,
        languages: LANGUAGES,
        changeLanguage,
        getLanguageByCode,
      }}
    >
      <I18nextProvider i18n={i18next}>{children}</I18nextProvider>
    </I18nContext.Provider>
  );
}
