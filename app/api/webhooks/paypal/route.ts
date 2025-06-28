import { NextRequest, NextResponse } from "next/server";
import { handlePayPalWebhook } from "@/lib/payments";

export async function POST(req: NextRequest) {
  const body = await req.json();
  await handlePayPalWebhook(body);
  return NextResponse.json({ received: true });
}
