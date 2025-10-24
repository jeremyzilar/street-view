import { NextResponse } from "next/server";
import { getProvidersRecords } from "@/lib/airtable";

export async function GET() {
  try {
    const providers = await getProvidersRecords();
    return NextResponse.json(providers);
  } catch (error) {
    console.error("Error in providers API:", error);
    return NextResponse.json(
      { error: "Failed to fetch providers" },
      { status: 500 }
    );
  }
}
