"use client";

import React from "react";
import { AppSidebar } from "./app-sidebar";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { useIntl as useReactIntl } from "react-intl";
import {
  LanguageSwitcher,
  SupportedLocale,
} from "@/components/LanguageSwitcher";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

interface MainLayoutProps {
  children: React.ReactNode;
  direction?: "rtl" | "ltr";
  locale?: SupportedLocale;
  onLocaleChange?: (locale: SupportedLocale) => void;
}

const MainLayout = ({
  children,
  direction = "rtl",
  locale = "en",
  onLocaleChange,
}: MainLayoutProps) => {
  const intl = useReactIntl();
  const isRtl = direction === "ltr";
  const pathname = usePathname();

  // Add client-side only rendering to avoid hydration mismatch
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const t = (id: string) => intl.formatMessage({ id });

  // Check if we're on the dashboard page
  const isDashboardPage = pathname === "/dashboard";

  // Generate breadcrumb items based on current path
  const generateBreadcrumbs = () => {
    // Skip for dashboard
    if (isDashboardPage) return null;

    const pathSegments = pathname.split("/").filter(Boolean);

    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">{t("sidebar.dashboard")}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />

          {pathSegments.map((segment, index) => {
            const segmentPath = `/${pathSegments
              .slice(0, index + 1)
              .join("/")}`;
            const isLast = index === pathSegments.length - 1;

            // Translate segment name if available
            const segmentTranslationKey = `sidebar.${segment.toLowerCase()}`;
            const segmentName = intl.messages[segmentTranslationKey]
              ? t(segmentTranslationKey)
              : segment.charAt(0).toUpperCase() + segment.slice(1);

            return isLast ? (
              <BreadcrumbItem key={segment}>
                <BreadcrumbPage>{segmentName}</BreadcrumbPage>
              </BreadcrumbItem>
            ) : (
              <React.Fragment key={segment}>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href={segmentPath}>{segmentName}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    );
  };

  // Header component that uses the sidebar context
  const HeaderContent = () => {
    const { state, isMobile } = useSidebar();

    return (
      <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center px-4 border-b bg-white shadow-sm">
        <div
          className={cn(
            "flex w-full items-center justify-between",
            isRtl && "flex-row-reverse"
          )}
        >
          <div className="flex items-center justify-start gap-2">
            {isMobile && (
              <SidebarTrigger
                className={cn(
                  state === "collapsed" ? "mx-auto" : isRtl ? "mr-2" : "-ml-1"
                )}
              />
            )}
            <div
              className={cn(
                "flex items-center gap-2",
                isRtl && "flex-row-reverse"
              )}
            >
              {!isDashboardPage ? (
                generateBreadcrumbs()
              ) : (
                <span className={cn("font-semibold", isRtl ? "font-urdu" : "")}>
                  {t("sidebar.dashboard")}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {onLocaleChange ? (
              <LanguageSwitcher
                currentLocale={locale}
                onLocaleChange={(newLocale) => {
                  if (onLocaleChange) {
                    // First, update the document direction
                    const newDirection = newLocale === "ur" ? "rtl" : "ltr";
                    document.documentElement.dir = newDirection;

                    // Then call the parent's onLocaleChange
                    onLocaleChange(newLocale);
                  }
                }}
              />
            ) : null}
          </div>
        </div>
      </header>
    );
  };

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
    insightsLabel: t("sidebar.insights"),
    complaintsLabel: t("sidebar.complaints"),
    reportsLabel: t("sidebar.reports"),
    dataLabel: t("sidebar.data"),
    notificationsLabel: t("sidebar.notifications"),
    feedbacksLabel: t("sidebar.feedbacks"),
    settingLabel: t("sidebar.setting"),
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
        <HeaderContent />
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
