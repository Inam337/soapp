"use client";

import { useIntl as useReactIntl } from "react-intl";
import { useIntl } from "@/providers/react-intl-provider";
import { cn } from "@/lib/utils";
import OnboardingLayout from "@/components/main/LandingLayout";
import RegisterForm from "@/components/RegisterForm";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function RegisterPage() {
  const intl = useReactIntl();
  const { locale, direction } = useIntl();
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
            "relative w-full md:w-1/2 bg-green-800 h-64 md:h-auto",
            isRtl ? "md:order-2" : "md:order-1"
          )}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-green-800 to-green-600 opacity-80"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white py-10 px-6">
            <h1 className="text-4xl font-bold mb-6 text-center">
              {t("register.welcomeHeading", "SINDH OMBUDSMAN")}
            </h1>
            <p className="text-xl mb-8 text-center max-w-md">
              {t(
                "register.welcomeText",
                "Register to access the complaint management system"
              )}
            </p>
          </div>
        </div>

        {/* Right Content - will be on left in RTL */}
        <div
          className={cn(
            "w-full md:w-1/2 flex items-center justify-center p-6 bg-white",
            isRtl ? "md:order-1" : "md:order-2"
          )}
        >
          <RegisterForm />
        </div>
      </div>
    </OnboardingLayout>
  );
}
