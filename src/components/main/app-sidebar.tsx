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
  const isRtl = direction === "rtl";

  // Client-side rendering state
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

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

  return (
    <Sidebar
      collapsible="icon"
      className={cn(
        "h-screen border-r",
        isRtl ? "right-0 border-l" : "left-0 border-r"
      )}
    >
      <SidebarHeader className="p-4 flex items-center justify-between">
        <div
          className={cn(
            "text-xl font-bold transition-opacity duration-200 group-data-[state=collapsed]/sidebar:opacity-0",
            isRtl ? "font-urdu text-right" : ""
          )}
        >
          {appTitle}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className={isRtl ? "mr-auto" : "ml-auto"}
        >
          {state === "collapsed" ? (
            <Menu size={18} />
          ) : isRtl ? (
            <ChevronRight size={18} />
          ) : (
            <ChevronLeft size={18} />
          )}
        </Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className={isRtl ? "text-right font-urdu" : ""}>
            {sidebarNavigation}
          </SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip={homeLabel}
                className={isRtl ? "flex-row-reverse text-right" : ""}
              >
                <div
                  className={cn(
                    "flex items-center",
                    isRtl ? "flex-row-reverse" : ""
                  )}
                >
                  <Home className={cn("h-5 w-5", isRtl ? "ml-2" : "mr-2")} />
                  <span className={isRtl ? "font-urdu" : ""}>{homeLabel}</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip={dashboardLabel}
                className={isRtl ? "flex-row-reverse text-right" : ""}
              >
                <div
                  className={cn(
                    "flex items-center",
                    isRtl ? "flex-row-reverse" : ""
                  )}
                >
                  <LayoutDashboard
                    className={cn("h-5 w-5", isRtl ? "ml-2" : "mr-2")}
                  />
                  <span className={isRtl ? "font-urdu" : ""}>
                    {dashboardLabel}
                  </span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip={productsLabel}
                className={isRtl ? "flex-row-reverse text-right" : ""}
              >
                <div
                  className={cn(
                    "flex items-center",
                    isRtl ? "flex-row-reverse" : ""
                  )}
                >
                  <ShoppingCart
                    className={cn("h-5 w-5", isRtl ? "ml-2" : "mr-2")}
                  />
                  <span className={isRtl ? "font-urdu" : ""}>
                    {productsLabel}
                  </span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip={usersLabel}
                className={isRtl ? "flex-row-reverse text-right" : ""}
              >
                <div
                  className={cn(
                    "flex items-center",
                    isRtl ? "flex-row-reverse" : ""
                  )}
                >
                  <Users className={cn("h-5 w-5", isRtl ? "ml-2" : "mr-2")} />
                  <span className={isRtl ? "font-urdu" : ""}>{usersLabel}</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className={isRtl ? "text-right font-urdu" : ""}>
            {systemLabel}
          </SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip={settingsLabel}
                className={isRtl ? "flex-row-reverse text-right" : ""}
              >
                <div
                  className={cn(
                    "flex items-center",
                    isRtl ? "flex-row-reverse" : ""
                  )}
                >
                  <Settings
                    className={cn("h-5 w-5", isRtl ? "ml-2" : "mr-2")}
                  />
                  <span className={isRtl ? "font-urdu" : ""}>
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
          <div className={cn("pt-2", isRtl ? "text-right" : "text-left")}>
            <div className="mb-2 text-xs text-muted-foreground">
              {isRtl ? "زبان کا انتخاب کریں" : "Choose Language"}
            </div>
            {isClient && (
              <LanguageSwitcher
                currentLocale={locale}
                onLocaleChange={onLocaleChange}
              />
            )}
          </div>
        )}

        <div
          className={cn(
            "text-xs text-gray-500 transition-opacity duration-200 group-data-[state=collapsed]/sidebar:opacity-0 pt-2",
            isRtl ? "text-right font-urdu" : ""
          )}
        >
          {versionLabel}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
