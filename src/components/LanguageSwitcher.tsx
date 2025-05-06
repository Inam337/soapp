"use client";

import { useState } from "react";
import { Check, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useIntl } from "@/providers/react-intl-provider";

// Define supported locales
export const supportedLocales = ["en", "es", "fr", "de", "ur"] as const;
export type SupportedLocale = (typeof supportedLocales)[number];

const languages = [
  { code: "en" as SupportedLocale, name: "English", flag: "🇺🇸" },
  { code: "es" as SupportedLocale, name: "Español", flag: "🇪🇸" },
  { code: "fr" as SupportedLocale, name: "Français", flag: "🇫🇷" },
  { code: "de" as SupportedLocale, name: "Deutsch", flag: "🇩🇪" },
  { code: "ur" as SupportedLocale, name: "اردو", flag: "🇵🇰", rtl: true },
];

interface LanguageSwitcherProps {
  currentLocale?: SupportedLocale;
  onLocaleChange?: (locale: SupportedLocale) => void;
}

export function LanguageSwitcher({
  currentLocale,
  onLocaleChange,
}: LanguageSwitcherProps = {}) {
  const { locale, setLocale } = useIntl();

  // Use provided locale or fall back to the one from context
  const activeLocale = currentLocale || (locale as SupportedLocale);

  const changeLanguage = (newLocale: SupportedLocale) => {
    // If custom handler provided, use it
    if (onLocaleChange) {
      onLocaleChange(newLocale);
    } else {
      // Otherwise use the context's setLocale
      setLocale(newLocale);
    }

    // Always set the cookie
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;
  };

  // Find current language data
  const currentLanguage =
    languages.find((lang) => lang.code === activeLocale) || languages[0];

  const isRtl = currentLanguage.rtl;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex w-full items-center justify-between"
          size="sm"
        >
          <div className={cn("flex items-center", isRtl && "flex-row-reverse")}>
            <Languages className={cn("h-4 w-4", isRtl ? "ml-2" : "mr-2")} />
            <span
              className={cn("flex items-center", isRtl && "flex-row-reverse")}
            >
              <span className={isRtl ? "ml-1" : "mr-1"}>
                {currentLanguage.flag}
              </span>
              <span className={isRtl ? "font-urdu" : ""}>
                {currentLanguage.name}
              </span>
            </span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[200px]">
        <DropdownMenuGroup>
          {languages.map((language) => (
            <DropdownMenuItem
              key={language.code}
              onClick={() => changeLanguage(language.code)}
              className={cn(
                "flex cursor-pointer items-center justify-between",
                language.rtl ? "flex-row-reverse text-right" : ""
              )}
            >
              <span
                className={cn(
                  "flex items-center",
                  language.rtl ? "flex-row-reverse" : ""
                )}
              >
                <span className={language.rtl ? "ml-2" : "mr-2"}>
                  {language.flag}
                </span>
                <span className={language.rtl ? "font-urdu" : ""}>
                  {language.name}
                </span>
              </span>
              {language.code === activeLocale && <Check className="h-4 w-4" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
