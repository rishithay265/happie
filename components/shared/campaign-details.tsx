"use client";
import { useEffect } from "react";
import { useCommonStore } from "@/store/useCommonStore";
import { Card, CardContent, CardHeader, CardImage, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Comments from "./comments";
import safeUrl from "@/lib/safeURL";

export default function CampaignDetails({ id }: { id: string }) {
  const { startups, fetchStartups, isLoading } = useCommonStore();
  useEffect(() => {
    if (!startups) {
      fetchStartups();
    }
  }, [startups, fetchStartups]);

  const campaign = startups?.find((s) => String(s.id) === id);
  if (isLoading || !campaign) return <div>Loading...</div>;
  const progress =
    (Number.parseInt((campaign.raised_amount?.toString() || "0").replace(/[^0-9]/g, "")) /
      Number.parseInt((campaign.budget?.toString() || "1").replace(/[^0-9]/g, ""))) * 100;

  return (
    <div className="space-y-6">
      <div className="relative rounded-xl overflow-hidden">
        <CardImage src={safeUrl(campaign.cover_image) || "/placeholder.svg"} alt="cover" className="w-full h-60" />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{campaign.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>{campaign.description}</div>
          <div className="space-y-2">
            <Progress value={progress} className="h-2" />
            <div className="text-sm text-muted-foreground">{progress.toFixed(0)}% funded</div>
          </div>
        </CardContent>
      </Card>
      <div className="flex gap-4">
        <a
          href={`https://www.instagram.com/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
          target="_blank" rel="noopener noreferrer" className="text-sm underline">
          Share on Instagram
        </a>
        <a
          href={`https://www.tiktok.com/share?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
          target="_blank" rel="noopener noreferrer" className="text-sm underline">
          Share on TikTok
        </a>
      </div>
      <Comments projectId={id} />
    </div>
  );
}
