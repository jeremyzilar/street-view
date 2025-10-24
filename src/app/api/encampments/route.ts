import { NextResponse } from "next/server";
import { getEncampmentsRecords } from "@/lib/airtable";

export async function GET() {
  try {
    const encampments = await getEncampmentsRecords();
    return NextResponse.json({ encampments });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch encampments" },
      { status: 500 }
    );
  }
}
