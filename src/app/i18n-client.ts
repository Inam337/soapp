import { createIntl } from "react-intl";
import enMessages from "@/locales/en.json";

// Create a default intl instance for client-side
export const defaultIntl = createIntl({
  locale: "en",
  defaultLocale: "en",
  messages: enMessages,
  onError: (err) => {
    // In development, log missing messages to console
    if (process.env.NODE_ENV === "development") {
      console.warn(`[i18n warning]: ${err.message}`);
    }
  },
});

// Helper function to check if a translation key exists
export function hasTranslation(key: string, locale: string = "en"): boolean {
  if (locale === "en") {
    return key in enMessages;
  }

  // For other locales, you would check their message objects
  return true;
}

// Add missing translations to avoid runtime errors
export function ensureTranslation(key: string, defaultValue: string = "") {
  if (!hasTranslation(key)) {
    console.warn(`Missing translation key: ${key}, adding default value`);
    // This is just for development - in production you'd want to add these to your locale files
    (enMessages as Record<string, string>)[key] = defaultValue || key;
  }
}

// Initialize with common app keys
ensureTranslation("app.title", "Sindh Ombudsman");
ensureTranslation("app.description", "Complaints Management System");
