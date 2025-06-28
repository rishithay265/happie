"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

interface Campaign {
  id: number;
  title: string;
  description: string;
  verified: boolean;
  live: boolean;
}

export default function AdminCampaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    fetch("/api/campaigns")
      .then((res) => res.json())
      .then((data) => setCampaigns(data))
      .catch((err) => console.error(err));
  }, []);

  async function verify(id: number) {
    const res = await fetch(`/api/campaigns/${id}/verify`, { method: "PUT" });
    if (res.ok) {
      const updated = await res.json();
      setCampaigns((prev) =>
        prev.map((c) => (c.id === updated.id ? updated : c))
      );
    }
  }

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Campaigns</h1>
      {campaigns.map((c) => (
        <Card key={c.id}>
          <CardHeader>
            <CardTitle>{c.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>{c.description}</p>
            <p>Status: {c.verified ? "Verified" : "Pending"}</p>
            {!c.verified && (
              <Button onClick={() => verify(c.id)}>Approve</Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
