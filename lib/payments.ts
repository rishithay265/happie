import Stripe from "stripe";
import paypal from "@paypal/checkout-server-sdk";
import prisma from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16",
});

const paypalClient = new paypal.core.PayPalHttpClient(
  new paypal.core.SandboxEnvironment(
    process.env.PAYPAL_CLIENT_ID || "",
    process.env.PAYPAL_CLIENT_SECRET || ""
  )
);

export async function createStripeSession(amount: number, metadata: object = {}) {
  return stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: Math.round(amount * 100),
          product_data: { name: "Donation" },
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/cancel`,
    metadata,
  });
}

export async function createPayPalOrder(amount: number) {
  const request = new paypal.orders.OrdersCreateRequest();
  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [{ amount: { currency_code: "USD", value: amount.toFixed(2) } }],
  });
  const response = await paypalClient.execute(request);
  return response.result;
}

export async function handleStripeWebhook(event: Stripe.Event) {
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    await prisma.donation.create({
      data: {
        amount: session.amount_total ? session.amount_total / 100 : 0,
        currency: session.currency || "usd",
        paymentProvider: "stripe",
        paymentId: session.id,
        projectId: Number(session.metadata?.projectId || 0),
        status: "escrow",
      },
    });
  }
}

export async function handlePayPalWebhook(body: any) {
  if (body.event_type === "CHECKOUT.ORDER.APPROVED") {
    const resource = body.resource;
    await prisma.donation.create({
      data: {
        amount: parseFloat(resource.purchase_units[0].amount.value),
        currency: resource.purchase_units[0].amount.currency_code.toLowerCase(),
        paymentProvider: "paypal",
        paymentId: resource.id,
        projectId: Number(resource.custom_id || 0),
        status: "escrow",
      },
    });
  }
}
