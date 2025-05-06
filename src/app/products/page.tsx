"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useIntl } from "react-intl";
import { useIntl as useAppIntl } from "@/providers/react-intl-provider";
import { cn } from "@/lib/utils";
import DashboardLayout from "@/components/main/SidebarLayout";
import { useEffect, useState } from "react";

export default function ProductsPage() {
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
    <DashboardLayout>
      <div className={cn("space-y-6", isRtl && "font-urdu text-right")}>
        <Card>
          <CardHeader className={cn(isRtl && "flex flex-col-reverse")}>
            <CardTitle>{t("sidebar.products", "Products")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              {t(
                "products.description",
                "This is the products page. Here you can view and manage your products."
              )}
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Card key={item}>
              <CardHeader
                className={cn("pb-2", isRtl && "flex flex-col-reverse")}
              >
                <CardTitle className="text-lg">
                  {t("products.item", "Product")} {item}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {t(
                    "products.item.description",
                    "This is a product description. Click to view details."
                  )}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
