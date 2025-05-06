"use client";

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
  User,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  LanguageSwitcher,
  SupportedLocale,
} from "@/components/LanguageSwitcher";
import { cn } from "@/lib/utils";

interface NavUserProps {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
  direction?: "rtl" | "ltr";
  locale?: SupportedLocale;
  onLocaleChange?: (locale: SupportedLocale) => void;
  translations?: {
    upgrade?: string;
    account?: string;
    billing?: string;
    notifications?: string;
    logout?: string;
  };
}

export function NavUser({
  user,
  direction = "ltr",
  locale = "en",
  onLocaleChange,
  translations = {},
}: NavUserProps) {
  const { isMobile, state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const isRtl = direction === "rtl";

  // Default fallback translations
  const {
    upgrade = "Upgrade",
    account = "Account",
    billing = "Billing",
    notifications = "Notifications",
    logout = "Log out",
  } = translations;

  // Display name based on language
  const displayName = isRtl ? "صارف" : user.name;

  return (
    <SidebarMenu>
      {onLocaleChange && (
        <SidebarMenuItem>
          <LanguageSwitcher
            currentLocale={locale}
            onLocaleChange={onLocaleChange}
          />
        </SidebarMenuItem>
      )}
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              tooltip={isCollapsed ? displayName : undefined}
              size={isCollapsed ? "default" : "lg"}
              className={cn(
                "data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground w-full",
                isRtl ? "flex-row-reverse text-right" : ""
              )}
            >
              <Avatar
                className={cn(
                  "h-8 w-8 rounded-lg shrink-0",
                  isRtl ? "ml-2" : "mr-2"
                )}
              >
                <AvatarImage src={user.avatar} alt={displayName} />
                <AvatarFallback className="rounded-lg">
                  {isCollapsed ? (
                    <User size={18} />
                  ) : (
                    displayName.charAt(0) +
                    (displayName.split(" ")[1]?.charAt(0) || "")
                  )}
                </AvatarFallback>
              </Avatar>
              <div
                className={cn(
                  "grid flex-1 text-sm leading-tight",
                  isRtl ? "text-right" : "text-left"
                )}
              >
                <span
                  className={cn(
                    "truncate font-semibold",
                    isRtl ? "font-urdu" : ""
                  )}
                >
                  {displayName}
                </span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown
                className={cn("size-4", isRtl ? "mr-auto" : "ml-auto")}
              />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : isRtl ? "left" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div
                className={cn(
                  "flex items-center gap-2 px-1 py-1.5",
                  isRtl ? "flex-row-reverse text-right" : "text-left"
                )}
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={displayName} />
                  <AvatarFallback className="rounded-lg">
                    {displayName.charAt(0) +
                      (displayName.split(" ")[1]?.charAt(0) || "")}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={cn(
                    "grid flex-1 text-sm leading-tight",
                    isRtl ? "text-right" : "text-left"
                  )}
                >
                  <span
                    className={cn(
                      "truncate font-semibold",
                      isRtl ? "font-urdu" : ""
                    )}
                  >
                    {displayName}
                  </span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                className={isRtl ? "flex-row-reverse text-right" : ""}
              >
                <div
                  className={cn(
                    "flex items-center gap-2",
                    isRtl ? "flex-row-reverse" : ""
                  )}
                >
                  <Sparkles className="h-4 w-4" />
                  <span className={isRtl ? "font-urdu" : ""}>{upgrade}</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                className={isRtl ? "flex-row-reverse text-right" : ""}
              >
                <div
                  className={cn(
                    "flex items-center gap-2",
                    isRtl ? "flex-row-reverse" : ""
                  )}
                >
                  <BadgeCheck className="h-4 w-4" />
                  <span className={isRtl ? "font-urdu" : ""}>{account}</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                className={isRtl ? "flex-row-reverse text-right" : ""}
              >
                <div
                  className={cn(
                    "flex items-center gap-2",
                    isRtl ? "flex-row-reverse" : ""
                  )}
                >
                  <CreditCard className="h-4 w-4" />
                  <span className={isRtl ? "font-urdu" : ""}>{billing}</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                className={isRtl ? "flex-row-reverse text-right" : ""}
              >
                <div
                  className={cn(
                    "flex items-center gap-2",
                    isRtl ? "flex-row-reverse" : ""
                  )}
                >
                  <Bell className="h-4 w-4" />
                  <span className={isRtl ? "font-urdu" : ""}>
                    {notifications}
                  </span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className={isRtl ? "flex-row-reverse text-right" : ""}
            >
              <div
                className={cn(
                  "flex items-center gap-2",
                  isRtl ? "flex-row-reverse" : ""
                )}
              >
                <LogOut className="h-4 w-4" />
                <span className={isRtl ? "font-urdu" : ""}>{logout}</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
