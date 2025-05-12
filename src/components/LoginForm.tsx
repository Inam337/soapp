"use client";

import { useState } from "react";
import { useIntl } from "react-intl";
import { useIntl as useAppIntl } from "@/providers/react-intl-provider";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import Image from "next/image";
import LogoGreen from "../assets/logo/green_logo.png";
export default function LoginForm() {
  const intl = useIntl();
  const router = useRouter();
  const { direction } = useAppIntl();
  const isRtl = direction === "rtl";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const t = (id: string, defaultMessage: string) =>
    intl.formatMessage({ id }, { defaultMessage });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would handle authentication here
    router.push("/dashboard");
  };

  const handleRegister = () => {
    router.push("/register");
  };

  const handleForgotPassword = () => {
    // Handle forgot password logic here
    alert("Forgot password functionality will be implemented soon.");
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Welcome Text */}
      <div className={cn("text-center mb-8", isRtl && "font-urdu")}>
        <div className="relative mx-auto w-[270px] h-[96px] mb-4">
          <Image
            src={LogoGreen}
            alt="Login Banner"
            className="object-contain"
            width={270}
            height={96}
          />
        </div>
        <p className="text-base">
          {t(
            "login.welcome",
            "Welcome to our Complaints Management System! We're glad to have you here and look forward to helping you resolve any issues you may have."
          )}
        </p>
      </div>

      {/* Login Form */}
      <form
        onSubmit={handleLogin}
        className={cn("space-y-6", isRtl && "text-right")}
      >
        <div className="space-y-2">
          <Label htmlFor="email" className={cn(isRtl && "font-urdu")}>
            {t("login.email", "Email or Phone Number")}
          </Label>
          <Input
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={isRtl ? "text-right font-urdu" : ""}
            dir={direction}
          />
        </div>

        <div className="space-y-2">
          <div className={cn("flex items-center justify-between")}>
            <Label htmlFor="password" className={cn(isRtl && "font-urdu")}>
              {t("login.password", "Password")}
            </Label>
          </div>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={isRtl ? "text-right font-urdu" : ""}
            dir={direction}
          />
          <div className={cn("flex items-center justify-end")}>
            <Button
              variant="outline"
              className={cn("px-4 text-green-600", isRtl && "font-urdu")}
              onClick={handleForgotPassword}
              type="button"
              size="sm"
            >
              {t("login.forgotpassword", "Forgot Password")}
            </Button>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-primary hover:bg-green-700 text-white py-2 rounded"
        >
          {t("login.submit", "Login")}
        </Button>
      </form>

      {/* Register Link */}
      <div
        className={cn(
          "flex items-center justify-center mt-6",
          isRtl && "flex-row-reverse"
        )}
      >
        <p className={cn("text-sm", isRtl && "font-urdu")}>
          {t("login.noaccount", "Don't have an account?")}
        </p>
        <Button
          variant="outline"
          className={cn("ml-2 text-green-600", isRtl && "font-urdu mr-2 ml-0")}
          onClick={handleRegister}
          size="sm"
        >
          {t("login.register", "Register")}
        </Button>
      </div>
    </div>
  );
}
