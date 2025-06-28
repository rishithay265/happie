import { NextRequest, NextResponse } from "next/server";
import { createStripeSession, createPayPalOrder } from "@/lib/payments";

export async function POST(req: NextRequest) {
  const { amount, provider, metadata } = await req.json();

  if (!amount || amount <= 0) {
    return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
  }

  if (provider === "paypal") {
    const order = await createPayPalOrder(amount);
    return NextResponse.json({ id: order.id, links: order.links });
  }

  const session = await createStripeSession(amount, metadata);
  return NextResponse.json({ id: session.id, url: session.url });
}
