import { AdminLayout } from "@/components/admin/admin-layout";
import AdminCampaigns from "@/components/admin/admin-campaigns";

export default function CampaignsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <AdminLayout>
        <AdminCampaigns />
      </AdminLayout>
    </div>
  );
}
