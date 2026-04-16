import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import { reorderBrands } from "@/lib/data-service";

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const body = await request.json();
    if (!Array.isArray(body?.ids) || body.ids.some((id: unknown) => typeof id !== "string")) {
      return NextResponse.json(
        { error: "Payload invalide : ids[] attendu (string[])" },
        { status: 400 },
      );
    }

    const data = reorderBrands(body.ids);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Reorder brands error:", error);
    return NextResponse.json(
      { error: "Erreur lors du réordonnancement" },
      { status: 500 },
    );
  }
}

export const dynamic = "force-dynamic";
