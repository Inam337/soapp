"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useIntl } from "react-intl";
import { useIntl as useAppIntl } from "@/providers/react-intl-provider";
import { cn } from "@/lib/utils";
import DashboardLayout from "@/components/main/sidebar-layout";

export default function UsersPage() {
  const intl = useIntl();
  const { direction } = useAppIntl();
  const isRtl = direction === "rtl";

  const t = (id: string, defaultMessage: string = "") =>
    intl.formatMessage({ id, defaultMessage });

  // Sample user data
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Editor" },
    { id: 4, name: "Alice Brown", email: "alice@example.com", role: "User" },
    {
      id: 5,
      name: "Charlie Davis",
      email: "charlie@example.com",
      role: "User",
    },
    { id: 6, name: "Diana Evans", email: "diana@example.com", role: "Manager" },
  ];

  return (
    <DashboardLayout>
      <div className={cn("space-y-6", isRtl && "font-urdu text-right")}>
        <Card>
          <CardHeader className={cn(isRtl && "flex flex-col-reverse")}>
            <CardTitle>{t("sidebar.users", "Users")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              {t(
                "users.description",
                "This is the users page. Here you can view and manage user accounts."
              )}
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {users.map((user) => (
            <Card key={user.id}>
              <CardContent
                className={cn(
                  "flex items-center gap-4 py-4",
                  isRtl && "flex-row-reverse"
                )}
              >
                <Avatar>
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div
                  className={cn(
                    "flex flex-col",
                    isRtl && "flex-col-reverse items-end"
                  )}
                >
                  <h3 className="font-medium">{user.name}</h3>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                  <p className="text-xs">{user.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
