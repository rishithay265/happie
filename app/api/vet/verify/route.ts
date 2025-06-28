import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { vetId, data } = body;

    if (!vetId) {
      return NextResponse.json({ error: "vetId is required" }, { status: 400 });
    }

    // Placeholder for third-party verification logic
    // Example: await externalVetService.verify(vetId, data);

    return NextResponse.json(
      { success: true, message: "Verification request queued" },
      { status: 200 }
    );
  } catch (error) {
    console.error("/api/vet/verify error:", error);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
