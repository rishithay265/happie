"use client";
import { useParams } from "next/navigation";
import CampaignDetails from "@/components/shared/campaign-details";

export default function CampaignPage() {
  const { id } = useParams();
  return (
    <div className="min-h-screen p-6">
      <CampaignDetails id={id as string} />
    </div>
  );
}
