"use client";

import ComplaintsList from "@/components/complaints/complaints-list";
import DashboardLayout from "@/components/main/sidebar-layout";

export default function ComplaintsPage() {
  return (
    <DashboardLayout>
      <ComplaintsList />
    </DashboardLayout>
  );
}
