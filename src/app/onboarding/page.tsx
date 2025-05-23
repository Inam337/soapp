"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, ChevronLeft, Globe, User, Users } from "lucide-react";
import { useIntl as useReactIntl } from "react-intl";
import {
  LanguageSwitcher,
  SupportedLocale,
} from "@/components/LanguageSwitcher";
import { useIntl } from "@/providers/react-intl-provider";
import { cn } from "@/lib/utils";
import OnboardingLayout from "@/components/main/landing-layout";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import LoginBanner from "../../assets/logo/Banner.png";
import LogoGreen from "../../assets/logo/green_logo.png";
export default function OnboardingPage() {
  const intl = useReactIntl();
  const router = useRouter();
  const { locale, direction, setLocale } = useIntl();
  const isRtl = direction === "rtl";

  // Add client-side only rendering to avoid hydration mismatch
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const t = (id: string) => intl.formatMessage({ id });

  const handleCardClick = () => {
    router.push("/dashboard");
  };

  // Handle language change
  const handleLocaleChange = (newLocale: SupportedLocale) => {
    setLocale(newLocale);
  };

  return (
    <OnboardingLayout>
      <div className="min-h-screen flex flex-col md:flex-row">
        {/* Image side (left in LTR, right in RTL) */}
        <div
          className={cn(
            "relative w-full md:w-1/2 h-64 md:h-auto",
            isRtl ? "md:order-2" : "md:order-1"
          )}
        >
          <Image
            src={LoginBanner}
            alt="Onboarding Banner"
            className="object-cover"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        {/* Content side (right in LTR, left in RTL) */}
        <div
          className={cn(
            "w-full md:w-1/2 flex items-center justify-center p-6",
            isRtl ? "md:order-1" : "md:order-2"
          )}
        >
          {isClient && (
            <div className={cn("absolute top-4 right-4")}>
              <LanguageSwitcher
                currentLocale={locale}
                onLocaleChange={handleLocaleChange}
              />
            </div>
          )}
          <div className="w-full max-w-md space-y-6">
            {/* Language Dropdown */}
            <div
              className={cn("flex", isRtl ? "justify-start" : "justify-end")}
            ></div>
            <div className="w-full flex items-center justify-center">
              <Image
                src={LogoGreen}
                alt="Login Banner"
                className="object-contain m-0"
                width={270}
                height={96}
              />
            </div>

            {/* Logo + Welcome Text */}
            <div className={cn("text-center space-y-2", isRtl && "font-urdu")}>
              <p className="text-lg font-bold text-black">
                {t("onboarding.welcome")}
              </p>
            </div>

            {/* Options */}
            <div className="space-y-4">
              <Card
                className="cursor-pointer hover:shadow-lg transition bg-primary text-white"
                onClick={handleCardClick}
              >
                <CardContent className="flex items-center justify-between">
                  {/* Content with icon and text */}
                  <div
                    className={cn(
                      "flex items-center gap-3",
                      isRtl && "flex-row"
                    )}
                  >
                    {/* Icon */}
                    <User className="text-white" />

                    {/* Text */}
                    <div className={isRtl ? "text-right font-urdu" : ""}>
                      <p className="font-semibold">{t("onboarding.citizen")}</p>
                      <p className="text-xs text-white opacity-90">
                        {t("onboarding.citizen.description")}
                      </p>
                    </div>
                  </div>

                  {/* Arrow - always at the end of the container */}
                  {isRtl ? (
                    <ChevronLeft className="text-white" />
                  ) : (
                    <ChevronRight className="text-white" />
                  )}
                </CardContent>
              </Card>

              <Card
                className="cursor-pointer hover:shadow-lg transition bg-primary text-white"
                onClick={handleCardClick}
              >
                <CardContent className="flex items-center justify-between">
                  {/* Content with icon and text */}
                  <div
                    className={cn(
                      "flex items-center gap-3",
                      isRtl && "flex-row"
                    )}
                  >
                    {/* Icon */}
                    <Users className="text-white" />

                    {/* Text */}
                    <div className={isRtl ? "text-right font-urdu" : ""}>
                      <p className="font-semibold">
                        {t("onboarding.overseas")}
                      </p>
                      <p className="text-xs text-white opacity-90">
                        {t("onboarding.overseas.description")}
                      </p>
                    </div>
                  </div>

                  {/* Arrow - always at the end of the container */}
                  {isRtl ? (
                    <ChevronLeft className="text-white" />
                  ) : (
                    <ChevronRight className="text-white" />
                  )}
                </CardContent>
              </Card>

              <Card
                className="cursor-pointer hover:shadow-lg transition bg-primary text-white"
                onClick={handleCardClick}
              >
                <CardContent className="flex items-center justify-between">
                  {/* Content with icon and text */}
                  <div
                    className={cn(
                      "flex items-center gap-3",
                      isRtl && "flex-row"
                    )}
                  >
                    {/* Icon */}
                    <Globe className="text-white" />

                    {/* Text */}
                    <div className={isRtl ? "text-right font-urdu" : ""}>
                      <p className="font-semibold">
                        {t("onboarding.foreigner")}
                      </p>
                      <p className="text-xs text-white opacity-90">
                        {t("onboarding.foreigner.description")}
                      </p>
                    </div>
                  </div>

                  {/* Arrow - always at the end of the container */}
                  {isRtl ? (
                    <ChevronLeft className="text-white" />
                  ) : (
                    <ChevronRight className="text-white" />
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Login Prompt */}
            <div className={cn("text-center text-sm", isRtl && "font-urdu")}>
              {t("onboarding.login")}{" "}
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  "border-green-600 text-green-600 hover:bg-green-50",
                  isRtl ? "mr-2" : "ml-2"
                )}
                onClick={() => router.push("/login")}
              >
                {t("onboarding.login.button")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );
}
