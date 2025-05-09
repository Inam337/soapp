"use client";

import { useEffect, useState } from "react";
import { useIntl as useAppIntl } from "@/providers/react-intl-provider";
import { cn } from "@/lib/utils";
import OnboardingLayout from "@/components/main/landing-layout";
import LoginForm from "@/components/LoginForm";
import Image from "next/image";
import LoginBanner from "../../assets/logo/Banner.png";
import {
  LanguageSwitcher,
  SupportedLocale,
} from "@/components/LanguageSwitcher";

export default function LoginPage() {
  const { direction, locale, setLocale } = useAppIntl();
  const isRtl = direction === "rtl";

  // Add client-side only rendering to avoid hydration mismatch
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLocaleChange = (newLocale: SupportedLocale) => {
    if (setLocale) {
      setLocale(newLocale);
    }
  };

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
          <Image
            src={LoginBanner}
            alt="Login Banner"
            className="object-cover"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Right Content - will be on left in RTL */}
        <div
          className={cn(
            "w-full md:w-1/2 flex items-center justify-center p-6 relative",
            isRtl ? "md:order-1" : "md:order-2"
          )}
        >
          {/* Language Dropdown - top right */}
          {isClient && (
            <div className="absolute top-4 right-4">
              <LanguageSwitcher
                currentLocale={locale as SupportedLocale}
                onLocaleChange={handleLocaleChange}
              />
            </div>
          )}
          <LoginForm />
        </div>
      </div>
    </OnboardingLayout>
  );
}
