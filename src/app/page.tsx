"use client";
import Image from "next/image";
// app/page.tsx or pages/index.tsx

import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import MainLayout from "@/components/main/MainLayout";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    // Get the preferred locale from localStorage or default to "en"
    const savedLocale =
      typeof window !== "undefined"
        ? localStorage.getItem("preferredLocale") || "en"
        : "en";

    // Redirect to the locale-specific page
    router.replace(`/${savedLocale}`);
  }, [router]);

  // Show a loading state while redirecting
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-lg">Loading...</p>
      </div>
    </div>
  );
}
