"use client";

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
  currentLocale: SupportedLocale;
  onLocaleChange: (locale: SupportedLocale) => void;
}

export function LanguageSwitcher({
  currentLocale = "en",
  onLocaleChange,
}: LanguageSwitcherProps) {
  const changeLanguage = (newLocale: SupportedLocale) => {
    onLocaleChange(newLocale);
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;
  };

  // Find current language data
  const currentLanguage =
    languages.find((lang) => lang.code === currentLocale) || languages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex w-full items-center justify-between border-2"
          size="sm"
        >
          <div className="flex items-center">
            <span className="flex items-center">
              <span className="mr-1">{currentLanguage.flag}</span>
              <span>{currentLanguage.name}</span>
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
              {language.code === currentLocale && <Check className="h-4 w-4" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
