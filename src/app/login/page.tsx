"use client";

import { useIntl } from "react-intl";
import { useIntl as useAppIntl } from "@/providers/react-intl-provider";
import { cn } from "@/lib/utils";
import OnboardingLayout from "@/components/main/LandingLayout";
import LoginForm from "@/components/LoginForm";
import { useEffect, useState } from "react";
import Image from "next/image";
import LoginBanner from "../../assets/logo/Banner.png";
export default function LoginPage() {
  const intl = useIntl();
  const { direction } = useAppIntl();
  const isRtl = direction === "rtl";

  // Add client-side only rendering to avoid hydration mismatch
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const t = (id: string, defaultMessage: string = "") =>
    intl.formatMessage({ id, defaultMessage });

  return (
    <OnboardingLayout>
      <div className="min-h-screen flex flex-col md:flex-row">
        {/* Left Image - will be on right in RTL */}
        <div
          className={cn(
            "relative w-full md:w-1/2 h-64 md:h-auto",
            isRtl ? "md:order-2" : "md:order-1"
          )}
        >
          <img
            src={LoginBanner.src}
            alt="Logo"
            className="w-full h-full object-cover md:h-screen"
          />
        </div>

        {/* Right Content - will be on left in RTL */}
        <div
          className={cn(
            "w-full md:w-1/2 flex items-center justify-center p-6",
            isRtl ? "md:order-1" : "md:order-2"
          )}
        >
          <LoginForm />
        </div>
      </div>
    </OnboardingLayout>
  );
}
