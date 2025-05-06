"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, ChevronLeft, Globe, User, Users } from "lucide-react";
import { useIntl } from "react-intl";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useIntl as useAppIntl } from "@/providers/react-intl-provider";
import { cn } from "@/lib/utils";
import OnboardingLayout from "@/components/main/LandingLayout";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function OnboardingPage() {
  const intl = useIntl();
  const router = useRouter();
  const { locale, direction } = useAppIntl();
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
          <div className="absolute inset-0 bg-gradient-to-r from-green-800 to-green-600 opacity-80"></div>
          <div className="absolute inset-0 flex items-center justify-center text-white text-4xl font-bold">
            {t("onboarding.title")}
          </div>
        </div>

        {/* Content side (right in LTR, left in RTL) */}
        <div
          className={cn(
            "w-full md:w-1/2 flex items-center justify-center p-6",
            isRtl ? "md:order-1" : "md:order-2"
          )}
        >
          <div className="w-full max-w-md space-y-6">
            {/* Language Dropdown */}
            <div
              className={cn("flex", isRtl ? "justify-start" : "justify-end")}
            >
              <LanguageSwitcher />
            </div>

            {/* Logo + Welcome Text */}
            <div className={cn("text-center space-y-2", isRtl && "font-urdu")}>
              <h1 className="text-2xl font-bold text-green-700">
                {t("onboarding.title")}
              </h1>
              <p className="text-sm text-gray-700">{t("onboarding.welcome")}</p>
            </div>

            {/* Options */}
            <div className="space-y-4">
              <Card
                className="cursor-pointer hover:shadow-lg transition"
                onClick={handleCardClick}
              >
                <CardContent className="flex items-center justify-between p-4">
                  {/* Content with icon and text */}
                  <div
                    className={cn(
                      "flex items-center gap-3",
                      isRtl && "flex-row"
                    )}
                  >
                    {/* Icon */}
                    <User className="text-green-600" />

                    {/* Text */}
                    <div className={isRtl ? "text-right font-urdu" : ""}>
                      <p className="font-semibold">{t("onboarding.citizen")}</p>
                      <p className="text-xs text-muted-foreground">
                        {t("onboarding.citizen.description")}
                      </p>
                    </div>
                  </div>

                  {/* Arrow - always at the end of the container */}
                  {isRtl ? (
                    <ChevronLeft className="text-muted-foreground" />
                  ) : (
                    <ChevronRight className="text-muted-foreground" />
                  )}
                </CardContent>
              </Card>

              <Card
                className="cursor-pointer hover:shadow-lg transition"
                onClick={handleCardClick}
              >
                <CardContent className="flex items-center justify-between p-4">
                  {/* Content with icon and text */}
                  <div
                    className={cn(
                      "flex items-center gap-3",
                      isRtl && "flex-row"
                    )}
                  >
                    {/* Icon */}
                    <Users className="text-green-600" />

                    {/* Text */}
                    <div className={isRtl ? "text-right font-urdu" : ""}>
                      <p className="font-semibold">
                        {t("onboarding.overseas")}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {t("onboarding.overseas.description")}
                      </p>
                    </div>
                  </div>

                  {/* Arrow - always at the end of the container */}
                  {isRtl ? (
                    <ChevronLeft className="text-muted-foreground" />
                  ) : (
                    <ChevronRight className="text-muted-foreground" />
                  )}
                </CardContent>
              </Card>

              <Card
                className="cursor-pointer hover:shadow-lg transition"
                onClick={handleCardClick}
              >
                <CardContent className="flex items-center justify-between p-4">
                  {/* Content with icon and text */}
                  <div
                    className={cn(
                      "flex items-center gap-3",
                      isRtl && "flex-row"
                    )}
                  >
                    {/* Icon */}
                    <Globe className="text-green-600" />

                    {/* Text */}
                    <div className={isRtl ? "text-right font-urdu" : ""}>
                      <p className="font-semibold">
                        {t("onboarding.foreigner")}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {t("onboarding.foreigner.description")}
                      </p>
                    </div>
                  </div>

                  {/* Arrow - always at the end of the container */}
                  {isRtl ? (
                    <ChevronLeft className="text-muted-foreground" />
                  ) : (
                    <ChevronRight className="text-muted-foreground" />
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
                className={isRtl ? "mr-2" : "ml-2"}
                onClick={() => router.push("/dashboard")}
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
