"use client";

import { useRouter } from "next/navigation";
import { useIntl } from "@/providers/react-intl-provider";
import { getLocalizedPath } from "@/app/routes";

export function useRouteNavigation() {
  const router = useRouter();
  const { locale } = useIntl();

  const navigateTo = (routeKey: string) => {
    const path = getLocalizedPath(routeKey, locale);
    router.push(path);
  };

  return {
    navigateTo,
  };
}
