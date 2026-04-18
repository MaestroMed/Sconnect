import { redirect } from "next/navigation";
import { getAuthenticatedUser } from "@/lib/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { ConfirmDialogProvider } from "@/components/ui/ConfirmDialog";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getAuthenticatedUser();

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <ConfirmDialogProvider>
      <div className="min-h-screen bg-surface-muted flex">
        <AdminSidebar />
        <main className="flex-1 min-w-0 lg:ml-0">
          <div className="p-4 lg:p-8">{children}</div>
        </main>
      </div>
    </ConfirmDialogProvider>
  );
}




