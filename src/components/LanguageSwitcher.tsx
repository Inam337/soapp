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
import { CommonIconNames, IconColors } from "@/common/icons/types";
import { CommonIcon } from "@/common/icons";
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
  const ICON_SIZE = 18;
  // Find current language data
  const currentLanguage =
    languages.find((lang) => lang.code === currentLocale) || languages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex w-full items-center justify-between border-2 relative pl-6 pr-6"
          size="sm"
        >
          <div className="absolute top-2 left-1 z-20">
            <CommonIcon
              width={ICON_SIZE}
              height={ICON_SIZE}
              name={CommonIconNames.LANGUAGE_ICON}
              fill={IconColors.BLACK_COLOR_ICON}
              className="w-4 h-4 flex items-center justify-center mr-2"
            />
          </div>

          <div className="flex items-center">
            <span className="flex items-center">
              <span className="mr-1">{currentLanguage.flag}</span>
              <span>{currentLanguage.name}</span>
            </span>
          </div>
          <div className="absolute top-2 right-1 z-20">
            <CommonIcon
              width={ICON_SIZE}
              height={ICON_SIZE}
              name={CommonIconNames.ARROW_DOWN_ICON}
              fill={IconColors.BLACK_COLOR_ICON}
              className="w-4 h-4 flex items-center justify-center"
            />
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
