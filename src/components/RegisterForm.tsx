"use client";

import { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import { useIntl as useAppIntl } from "@/providers/react-intl-provider";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const intl = useIntl();
  const router = useRouter();
  const { direction } = useAppIntl();
  const isRtl = direction === "rtl";

  // Add client-side only rendering to avoid hydration mismatch
  const [isClient, setIsClient] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState("citizen");

  useEffect(() => {
    setIsClient(true);
  }, []);

  const t = (id: string, defaultMessage: string) =>
    intl.formatMessage({ id }, { defaultMessage });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would handle registration here
    router.push("/dashboard");
  };

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Language Dropdown - top right */}
      <div className={cn("flex justify-end mb-6")}>
        <LanguageSwitcher />
      </div>

      {/* Welcome Text */}
      <div className={cn("text-center mb-8", isRtl && "font-urdu")}>
        <h2 className={cn("text-xl font-bold mb-2", isRtl && "font-urdu")}>
          {t("register.title", "Create your account")}
        </h2>
        <p className="text-base">
          {t(
            "register.welcome",
            "Join our Complaints Management System to get started with resolving your issues."
          )}
        </p>
      </div>

      {/* Register Form */}
      <form
        onSubmit={handleRegister}
        className={cn("space-y-4", isRtl && "text-right")}
      >
        <div className="flex flex-col md:flex-row md:items-start md:gap-4">
          {/* Full Name */}
          <div className="w-full md:w-1/2 space-y-2">
            <Label htmlFor="fullName" className={cn(isRtl && "font-urdu")}>
              {t("register.fullName", "Full Name")}
            </Label>
            <Input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className={isRtl ? "text-right font-urdu" : ""}
              dir={direction}
            />
          </div>

          {/* Email */}
          <div className="w-full md:w-1/2 space-y-2 mt-4 md:mt-0">
            <Label htmlFor="email" className={cn(isRtl && "font-urdu")}>
              {t("register.email", "Email")}
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={isRtl ? "text-right font-urdu" : ""}
              dir={direction}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className={cn(isRtl && "font-urdu")}>
            {t("register.phone", "Phone Number")}
          </Label>
          <Input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={isRtl ? "text-right font-urdu" : ""}
            dir={direction}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="userType" className={cn(isRtl && "font-urdu")}>
            {t("register.userType", "User Type")}
          </Label>
          <div className="grid grid-cols-3 gap-2">
            <Button
              type="button"
              variant={userType === "citizen" ? "default" : "outline"}
              onClick={() => setUserType("citizen")}
              className={cn(
                userType === "citizen" ? "bg-green-600" : "",
                isRtl && "font-urdu"
              )}
            >
              {t("onboarding.citizen", "Inland Citizen")}
            </Button>
            <Button
              type="button"
              variant={userType === "overseas" ? "default" : "outline"}
              onClick={() => setUserType("overseas")}
              className={cn(
                userType === "overseas" ? "bg-green-600" : "",
                isRtl && "font-urdu"
              )}
            >
              {t("onboarding.overseas", "Overseas")}
            </Button>
            <Button
              type="button"
              variant={userType === "foreigner" ? "default" : "outline"}
              onClick={() => setUserType("foreigner")}
              className={cn(
                userType === "foreigner" ? "bg-green-600" : "",
                isRtl && "font-urdu"
              )}
            >
              {t("onboarding.foreigner", "Foreigner")}
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className={cn(isRtl && "font-urdu")}>
            {t("register.password", "Password")}
          </Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={isRtl ? "text-right font-urdu" : ""}
            dir={direction}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className={cn(isRtl && "font-urdu")}>
            {t("register.confirmPassword", "Confirm Password")}
          </Label>
          <Input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={isRtl ? "text-right font-urdu" : ""}
            dir={direction}
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded mt-6"
        >
          {t("register.submit", "Register")}
        </Button>
      </form>

      {/* Login Link */}
      <div
        className={cn(
          "flex items-center justify-center mt-6",
          isRtl && "flex-row-reverse"
        )}
      >
        <p className={cn("text-sm", isRtl && "font-urdu")}>
          {t("register.haveAccount", "Already have an account?")}
        </p>
        <Button
          variant="outline"
          className={cn("ml-2 text-green-600", isRtl && "font-urdu mr-2 ml-0")}
          onClick={handleLogin}
          size="sm"
        >
          {t("register.login", "Login")}
        </Button>
      </div>
    </div>
  );
}
