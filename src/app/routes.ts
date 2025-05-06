import { CommonIconNames } from "@/common/icons/types";

export interface RouteIcon {
  name: CommonIconNames;
  fill?: string;
}

export interface Route {
  path: string;
  label: string;
  icon: RouteIcon;
  isAuthRoute?: boolean;
}

// Define the routes without 'as const' to allow the optional isAuthRoute property
export const routes: Record<string, Route> = {
  onboarding: {
    path: "/onboarding",
    label: "Onboarding",
    icon: {
      name: CommonIconNames.MENU_ICON,
      fill: "#9CA3AF",
    },
    isAuthRoute: false,
  },
  login: {
    path: "/login",
    label: "Login",
    icon: {
      name: CommonIconNames.HOME_ICON,
      fill: "#9CA3AF",
    },
  },
  register: {
    path: "/register",
    label: "Register",
    icon: {
      name: CommonIconNames.HOME_ICON,
      fill: "#9CA3AF",
    },
  },
  dashboard: {
    path: "/dashboard",
    label: "Dashboard",
    icon: {
      name: CommonIconNames.HOME_ICON,
      fill: "#9CA3AF",
    },
  },
};

// Helper function to get all routes
export const getAllRoutes = (): Route[] => {
  return Object.values(routes);
};

// Helper function to get routes for navigation (can exclude auth routes when logged in)
export const getNavigationRoutes = (isAuthenticated: boolean): Route[] => {
  return Object.values(routes).filter((route) => {
    return isAuthenticated ? !route.isAuthRoute : true;
  });
};

// Helper function to get route by path
export const getRouteByPath = (path: string): Route | undefined => {
  return Object.values(routes).find((route) => route.path === path);
};

// Helper function to check if a path is a valid route
export const isValidRoute = (path: string): boolean => {
  return Object.values(routes).some((route) => route.path === path);
};
