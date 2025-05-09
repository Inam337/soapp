"use client";

import React from "react";
import { useIntl as useReactIntl } from "react-intl";
import { useIntl as useAppIntl } from "@/providers/react-intl-provider";
import { cn } from "@/lib/utils";

interface OnboardingLayoutProps {
  children: React.ReactNode;
}

export default function OnboardingLayout({ children }: OnboardingLayoutProps) {
  const { direction } = useAppIntl();
  const isRtl = direction === "rtl";

  return (
    <div
      className={cn(
        "min-h-screen bg-background",
        isRtl ? "text-right font-urdu" : "text-left"
      )}
      dir={direction}
    >
      {children}
    </div>
  );
}
