"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Home,
  LayoutDashboard,
  ShoppingCart,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavUser } from "./nav-user";
import { cn } from "@/lib/utils";
import {
  LanguageSwitcher,
  SupportedLocale,
} from "@/components/LanguageSwitcher";
import { useEffect, useState } from "react";
import { CommonIcon } from "../../common/icons";
import { CommonIconNames, IconColors } from "../../common/icons/types";
interface AppSidebarProps {
  direction?: "rtl" | "ltr";
  locale?: SupportedLocale;
  onLocaleChange?: (locale: SupportedLocale) => void;
  translations?: {
    appTitle?: string;
    sidebarNavigation?: string;
    homeLabel?: string;
    dashboardLabel?: string;
    productsLabel?: string;
    usersLabel?: string;
    systemLabel?: string;
    settingsLabel?: string;
    versionLabel?: string;
  };
}

export function AppSidebar({
  direction = "ltr",
  locale = "en",
  onLocaleChange,
  translations = {},
}: AppSidebarProps) {
  const { toggleSidebar, state } = useSidebar();

  // Client-side rendering state
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Helper to apply styling based on locale
  const getTextAlignment = (extraClasses = "") =>
    cn(extraClasses, locale === "ur" ? "text-right font-urdu" : "text-left");

  // Helper to determine if we should use RTL layout
  const shouldUseRtl = locale === "ur";

  // Helper to get icon margin based on locale
  const getIconMargin = shouldUseRtl ? "ml-2" : "mr-2";
  const ICON_SIZE = 22;

  // Default fallback translations
  const {
    appTitle = "Sindh Ombudsman",
    sidebarNavigation = "Navigation",
    homeLabel = "Home",
    dashboardLabel = "Dashboard",
    productsLabel = "Products",
    usersLabel = "Users",
    systemLabel = "System",
    settingsLabel = "Settings",
    versionLabel = "Version 1.0",
  } = translations;

  // Mock user data
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://github.com/shadcn.png",
  };
  const isRtl = direction === "ltr";
  return (
    <Sidebar
      collapsible="icon"
      className={cn(
        "h-screen",
        shouldUseRtl ? "border-l right-0" : "border-r left-0"
      )}
      dir={shouldUseRtl ? "rtl" : "ltr"}
    >
      <SidebarHeader
        className={cn(
          "p-4 flex items-center",
          shouldUseRtl ? "justify-between" : "justify-between"
        )}
      >
        <SidebarTrigger className={isRtl ? "mr-2" : "-ml-1"} />
        <div
          className={cn(
            "text-xl font-bold transition-opacity duration-200 group-data-[state=collapsed]/sidebar:opacity-0",
            getTextAlignment()
          )}
        >
          {appTitle}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className={shouldUseRtl ? "mr-auto" : "ml-auto"}
        >
          {state === "collapsed" ? (
            <Menu size={18} />
          ) : shouldUseRtl ? (
            <ChevronRight size={18} />
          ) : (
            <ChevronLeft size={18} />
          )}
        </Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className={getTextAlignment()}>
            {sidebarNavigation}
          </SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip={homeLabel}
                className={shouldUseRtl ? "flex-row-reverse" : ""}
              >
                <div
                  className={cn(
                    "flex w-full items-center",
                    shouldUseRtl ? "justify-end" : ""
                  )}
                >
                  <CommonIcon
                    width={ICON_SIZE}
                    height={ICON_SIZE}
                    name={CommonIconNames.HOME_ICON}
                    fill={IconColors.GRAY_COLOR_ICON}
                    className="w-4 h-4 flex items-center justify-center"
                  />

                  <span className={getTextAlignment("w-full")}>
                    {homeLabel}
                  </span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip={dashboardLabel}
                className={shouldUseRtl ? "flex-row-reverse" : ""}
              >
                <div
                  className={cn(
                    "flex w-full items-center",
                    shouldUseRtl ? " justify-end" : ""
                  )}
                >
                  <LayoutDashboard className={cn("h-5 w-5", getIconMargin)} />
                  <span className={getTextAlignment("w-full")}>
                    {dashboardLabel}
                  </span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip={productsLabel}
                className={shouldUseRtl ? "flex-row-reverse" : ""}
              >
                <div
                  className={cn(
                    "flex w-full items-center",
                    shouldUseRtl ? " justify-end" : ""
                  )}
                >
                  <ShoppingCart className={cn("h-5 w-5", getIconMargin)} />
                  <span className={getTextAlignment("w-full")}>
                    {productsLabel}
                  </span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip={usersLabel}
                className={shouldUseRtl ? "flex-row-reverse" : ""}
              >
                <div
                  className={cn(
                    "flex w-full items-center",
                    shouldUseRtl ? " justify-end" : ""
                  )}
                >
                  <Users className={cn("h-5 w-5", getIconMargin)} />
                  <span className={getTextAlignment("w-full")}>
                    {usersLabel}
                  </span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className={getTextAlignment()}>
            {systemLabel}
          </SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip={settingsLabel}
                className={shouldUseRtl ? "flex-row-reverse" : ""}
              >
                <div
                  className={cn(
                    "flex w-full items-center",
                    shouldUseRtl ? " justify-end" : ""
                  )}
                >
                  <Settings className={cn("h-5 w-5", getIconMargin)} />
                  <span className={getTextAlignment("w-full")}>
                    {settingsLabel}
                  </span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="flex flex-col gap-2 p-4">
        <NavUser user={user} />

        {/* Language Switcher Component */}
        {onLocaleChange && (
          <div
            className={cn(
              "pt-2",
              shouldUseRtl ? "text-right" : "text-left",
              shouldUseRtl && "flex flex-col items-end"
            )}
          >
            <div
              className={cn(
                "w-full mb-2 text-xs text-muted-foreground",
                shouldUseRtl ? "text-left" : "text-right",
                getTextAlignment()
              )}
            >
              {locale === "ur" ? "زبان کا انتخاب کریں" : "Choose Language"}
            </div>
            {isClient && (
              <LanguageSwitcher
                currentLocale={locale}
                onLocaleChange={(newLocale) => {
                  if (onLocaleChange) {
                    // First, update the document direction
                    const newDirection = newLocale === "ur" ? "rtl" : "ltr";
                    document.documentElement.dir = newDirection;
                    document.documentElement.lang = newLocale;

                    // Then call the parent's onLocaleChange
                    onLocaleChange(newLocale);
                  }
                }}
              />
            )}
          </div>
        )}

        {/* <div
          className={cn(
            "text-xs text-gray-500 transition-opacity duration-200 group-data-[state=collapsed]/sidebar:opacity-0 pt-2",
            shouldUseRtl ? "text-right font-urdu" : ""
          )}
        >
          {versionLabel}
        </div> */}
      </SidebarFooter>
    </Sidebar>
  );
}
