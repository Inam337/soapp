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
import { NavUser } from "./nav-user";
import { cn } from "@/lib/utils";
import { SupportedLocale } from "@/components/LanguageSwitcher";
import { memo } from "react";
import { CommonIcon } from "../../common/icons";
import {
  CommonIconNames,
  IconColors,
  IconType,
} from "../../common/icons/types";
import ProjectLogo from "../../assets/logo/white_logo.png";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

interface AppSidebarProps {
  direction?: "rtl" | "ltr";
  locale?: SupportedLocale;
  onLocaleChange?: (locale: SupportedLocale) => void;
  translations?: {
    appTitle?: string;
    sidebarNavigation?: string;
    versionLabel?: string;
    homeLabel?: string;
    insightsLabel?: string;
    complaintsLabel?: string;
    usersLabel?: string;
    reportsLabel?: string;
    dataLabel?: string;
    notificationsLabel?: string;
    feedbacksLabel?: string;
    settingLabel?: string;
  };
}

// Define route structure
interface SidebarRoute {
  label: string;
  url: string;
  icon: CommonIconNames;
  isImplemented?: boolean;
}

export function AppSidebar({
  direction = "ltr",
  locale = "en",
  onLocaleChange: _onLocaleChange,
  translations = {},
}: AppSidebarProps) {
  const { state } = useSidebar();
  const router = useRouter();
  const pathname = usePathname();

  // Helper to apply styling based on locale
  const getTextAlignment = (extraClasses = "") =>
    cn(extraClasses, locale === "ur" ? "text-right font-urdu" : "text-left");

  // Helper to determine if we should use RTL layout
  const shouldUseRtl = locale === "ur";

  const ICON_SIZE = 16;

  // Text visibility class based on sidebar state
  const textVisibilityClass = cn(
    "transition-opacity duration-200",
    state === "collapsed" ? "opacity-0 hidden" : "opacity-100"
  );

  // Default fallback translations
  const {
    sidebarNavigation = "Navigation",
    insightsLabel = "Insights",
    complaintsLabel = "Complaints",
    usersLabel = "Users",
    reportsLabel = "Reports",
    dataLabel = "Data Management",
    notificationsLabel = "Notifications",
    feedbacksLabel = "Feedbacks",
    settingLabel = "Settings",
  } = translations;

  // Define all routes with their URLs and icons
  const routes: SidebarRoute[] = [
    {
      label: insightsLabel,
      url: "/dashboard",
      icon: CommonIconNames.DASHBOARD_ICON,
      isImplemented: true,
    },
    {
      label: complaintsLabel,
      url: "/complaints",
      icon: CommonIconNames.FILE_ICON,
      isImplemented: true,
    },
    {
      label: usersLabel,
      url: "/users",
      icon: CommonIconNames.USER_ICON,
      isImplemented: false,
    },
    {
      label: reportsLabel,
      url: "/reports",
      icon: CommonIconNames.REPORT_ICON,
      isImplemented: false,
    },
    {
      label: dataLabel,
      url: "/data",
      icon: CommonIconNames.DATA_ICON,
      isImplemented: false,
    },
    {
      label: notificationsLabel,
      url: "/notifications",
      icon: CommonIconNames.NOTIFICATION_ICON,
      isImplemented: false,
    },
    {
      label: feedbacksLabel,
      url: "/feedbacks",
      icon: CommonIconNames.FEEDBACK_ICON,
      isImplemented: false,
    },
  ];

  // Define settings route separately since it appears in the footer
  const settingsRoute: SidebarRoute = {
    label: settingLabel,
    url: "/settings",
    icon: CommonIconNames.COG_ICON,
    isImplemented: false,
  };

  // Handle navigation
  const handleNavigation = (route: SidebarRoute) => {
    if (route.isImplemented) {
      router.push(route.url);
    } else {
      // If route is not implemented, just log or show a notification
      console.log(`Route ${route.url} is not implemented yet`);
      // You could also display a toast notification here
    }
  };

  // Check if a route is active
  const isRouteActive = (url: string) => {
    return pathname === url;
  };

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
        "h-screen bg-primary-900 text-white",
        shouldUseRtl ? " border-l right-0" : " border-r left-0"
      )}
      dir={shouldUseRtl ? "rtl" : "ltr"}
    >
      <SidebarHeader
        className={cn(
          "flex items-center",
          shouldUseRtl ? "justify-between" : "justify-between"
        )}
      >
        <div
          className={cn(
            "w-full flex items-center h-16 border-b-2 border-b-sidebar-accent",
            state === "collapsed"
              ? "justify-center px-0"
              : "justify-between px-4"
          )}
        >
          <div
            className={cn(
              "text-xl font-bold transition-all duration-300 ease-in-out",
              getTextAlignment(),
              state === "collapsed"
                ? "w-0 opacity-0 overflow-hidden max-h-0 m-0"
                : "w-auto opacity-100"
            )}
          >
            <Image
              src={ProjectLogo.src}
              alt="Logo"
              className="min-h-screen w-24 object-contain"
              width={96}
              height={600}
            />
          </div>
          <SidebarTrigger
            className={cn(
              state === "collapsed" ? "mx-auto" : isRtl ? "mr-2" : "-ml-1"
            )}
          />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className={getTextAlignment()}>
            {sidebarNavigation}
          </SidebarGroupLabel>
          <SidebarMenu>
            {routes.map((route) => (
              <SidebarMenuItem key={route.url}>
                <SidebarMenuButton
                  tooltip={route.label}
                  className={shouldUseRtl ? "flex-row-reverse" : ""}
                  onClick={() => handleNavigation(route)}
                  data-active={isRouteActive(route.url)}
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
                      name={route.icon}
                      fill={IconColors.WHITE_COLOR_ICON}
                      className="w-4 h-4 flex items-center justify-center mr-2"
                    />

                    <span
                      className={cn(
                        getTextAlignment("w-full"),
                        textVisibilityClass,
                        shouldUseRtl ? "mr-2" : ""
                      )}
                    >
                      {route.label}
                    </span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="flex flex-col p-0">
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip={settingsRoute.label}
                  className={shouldUseRtl ? "flex-row-reverse" : ""}
                  onClick={() => handleNavigation(settingsRoute)}
                  data-active={isRouteActive(settingsRoute.url)}
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
                      name={settingsRoute.icon}
                      fill={IconColors.WHITE_COLOR_ICON}
                      className="w-4 h-4 flex items-center justify-center mr-2"
                    />

                    <span
                      className={cn(
                        getTextAlignment("w-full"),
                        textVisibilityClass,
                        shouldUseRtl ? "mr-2" : "ml-2"
                      )}
                    >
                      {settingsRoute.label}
                    </span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </SidebarFooter>
      <div className="p-2">
        <NavUser user={user} />
      </div>
    </Sidebar>
  );
}

const LanguageIcon: React.FC<IconType> = memo((props) => {
  const { width = 20, height = 20, className = "", fill = "#F9FAFB" } = props;

  return (
    <div className={className}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_220_1039)">
          <path
            d="M14.6 4.27495C13.575 2.49995 11.85 1.17495 9.85001 0.674951C9.20001 0.524951 8.60001 0.449951 8.00001 0.449951C7.37501 0.449951 6.72501 0.524951 6.10001 0.699951C4.12501 1.19995 2.42501 2.49995 1.42501 4.29995C0.775012 5.44995 0.450012 6.69995 0.450012 7.99995V8.17495C0.475012 9.54995 0.900012 10.9 1.62501 12.075C2.82501 13.975 4.80001 15.225 7.00001 15.475C7.30001 15.525 7.62501 15.55 8.00001 15.55C8.30001 15.55 8.62501 15.525 8.92501 15.5C11.175 15.225 13.15 13.975 14.375 12.075C15.125 10.925 15.525 9.57495 15.575 8.17495V7.99995C15.575 6.74995 15.225 5.44995 14.6 4.27495ZM12.825 7.64995C12.75 6.82495 12.55 6.02495 12.225 5.27495H13.825C14.175 6.02495 14.375 6.84995 14.425 7.64995H12.825ZM1.57501 7.64995C1.62501 6.82495 1.82501 6.02495 2.17501 5.27495H3.62501C3.30001 6.02495 3.12501 6.82495 3.05001 7.64995H1.57501ZM4.87501 5.27495H7.42501V7.64995H4.20001C4.27501 6.79995 4.50001 5.99995 4.87501 5.27495ZM10.3 4.14995H8.55001V2.07495C9.12501 2.52495 9.70001 3.22495 10.3 4.14995ZM7.45001 2.04995V4.14995H5.57501C6.20001 3.19995 6.82501 2.49995 7.45001 2.04995ZM7.45001 8.77495V11.15H4.95001C4.55001 10.425 4.30001 9.59995 4.22501 8.77495H7.45001ZM7.45001 12.275V14C6.82501 13.575 6.20001 12.975 5.65001 12.275H7.45001ZM8.57501 14V12.25H10.475C9.95001 12.975 9.30001 13.575 8.57501 14ZM8.57501 11.15V8.77495H11.725C11.675 9.59995 11.475 10.4 11.125 11.15H8.57501ZM8.57501 7.64995V5.27495H11C11.375 5.99995 11.625 6.82495 11.7 7.64995H8.57501ZM13.15 4.14995H11.625C11.075 3.22495 10.525 2.47495 9.97501 1.89995C11.25 2.29995 12.375 3.09995 13.15 4.14995ZM5.87501 1.92495C5.32501 2.49995 4.77501 3.24995 4.22501 4.12495H2.87501C3.62501 3.12495 4.67501 2.34995 5.87501 1.92495ZM1.60001 8.77495H3.07501C3.15001 9.59995 3.35001 10.4 3.67501 11.15H2.37501C1.95001 10.4 1.70001 9.59995 1.60001 8.77495ZM3.17501 12.275H4.30001C4.70001 12.925 5.20001 13.525 5.70001 14.025C4.72501 13.65 3.85001 13.05 3.17501 12.275ZM10.475 13.95C10.975 13.475 11.425 12.9 11.775 12.3C11.775 12.3 11.775 12.275 11.8 12.275H12.825C12.175 13 11.375 13.575 10.475 13.95ZM13.625 11.15H12.325C12.625 10.4 12.8 9.59995 12.825 8.77495H14.375C14.3 9.59995 14.025 10.4 13.625 11.15Z"
            fill={fill}
          />
        </g>
      </svg>
    </div>
  );
});

export { LanguageIcon };
