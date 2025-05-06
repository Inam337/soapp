"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface OnboardingLayoutProps {
  children: React.ReactNode;
  direction?: "rtl" | "ltr";
}

export default function OnboardingLayout({
  children,
  direction = "ltr",
}: OnboardingLayoutProps) {
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
