"use client";

import { Provider } from "react-redux";
import { store } from "@/store/store";
import { ReactIntlProvider } from "@/providers/react-intl-provider";
import { useState, useEffect } from "react";

// Define default locale directly since middleware is gone
const defaultLocale = "en";

export function Providers({ children }: { children: React.ReactNode }) {
  // Define state for locale and messages
  const [isReady, setIsReady] = useState(false);

  // Load messages in useEffect without using Suspense
  useEffect(() => {
    // Use a simple dynamic import without cache
    import(`@/locales/${defaultLocale}.json`)
      .then(() => {
        setIsReady(true);
      })
      .catch((error) => {
        console.error(
          `Failed to load messages for locale: ${defaultLocale}`,
          error
        );
        setIsReady(true); // Still mark as ready to render with empty messages
      });
  }, []);

  // Use a simple loading state without suspending
  if (!isReady) {
    // Return a minimal loading state instead of null
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <Provider store={store}>
      <ReactIntlProvider>{children}</ReactIntlProvider>
    </Provider>
  );
}
