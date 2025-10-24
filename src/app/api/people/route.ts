import { NextResponse } from "next/server";
import { getPeopleRecords } from "@/lib/airtable";

export async function GET() {
  try {
    const people = await getPeopleRecords();
    return NextResponse.json({ people });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch people" },
      { status: 500 }
    );
  }
}
