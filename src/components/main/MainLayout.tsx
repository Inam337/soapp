"use client";

import { AppSidebar } from "./app-sidebar";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useIntl as useReactIntl } from "react-intl";
import {
  LanguageSwitcher,
  SupportedLocale,
} from "@/components/LanguageSwitcher";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface MainLayoutProps {
  children: React.ReactNode;
  direction?: "rtl" | "ltr";
  locale?: SupportedLocale;
  onLocaleChange?: (locale: SupportedLocale) => void;
}

const MainLayout = ({
  children,
  direction = "ltr",
  locale = "en",
  onLocaleChange,
}: MainLayoutProps) => {
  const intl = useReactIntl();
  const isRtl = direction === "rtl";

  // Add client-side only rendering to avoid hydration mismatch
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const t = (id: string) => intl.formatMessage({ id });

  // Prepare translations for sidebar
  const sidebarTranslations = {
    appTitle: t("app.title"),
    sidebarNavigation: t("sidebar.navigation"),
    homeLabel: t("sidebar.home"),
    dashboardLabel: t("sidebar.dashboard"),
    productsLabel: t("sidebar.products"),
    usersLabel: t("sidebar.users"),
    systemLabel: t("sidebar.system"),
    settingsLabel: t("sidebar.settings"),
    versionLabel: t("app.version"),
  };

  return (
    <SidebarProvider
      defaultOpen={true}
      className={cn(
        "w-full min-h-screen h-screen flex",
        isClient && isRtl && "flex-row-reverse"
      )}
    >
      <AppSidebar
        direction={direction}
        locale={locale}
        onLocaleChange={onLocaleChange}
        translations={sidebarTranslations}
      />
      <SidebarInset className="flex flex-col flex-1 w-full h-full min-h-screen">
        <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center px-4 border-b bg-white shadow-sm">
          <div
            className={cn(
              "flex w-full items-center justify-between",
              isRtl && "flex-row-reverse"
            )}
          >
            <div
              className={cn(
                "flex items-center gap-2",
                isRtl && "flex-row-reverse"
              )}
            >
              <SidebarTrigger className={isRtl ? "mr-2" : "-ml-1"} />
              <span className={cn("font-semibold", isRtl ? "font-urdu" : "")}>
                {t("sidebar.dashboard")}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {onLocaleChange ? (
                <LanguageSwitcher
                  currentLocale={locale}
                  onLocaleChange={onLocaleChange}
                />
              ) : null}
            </div>
          </div>
        </header>
        <main
          className={cn(
            "flex-1 p-6 overflow-auto",
            isRtl ? "text-right" : "text-left"
          )}
        >
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default MainLayout;
