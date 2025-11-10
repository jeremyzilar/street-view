import { NextResponse } from "next/server";
import {
  transformDashboardData,
  type DashboardOverviewFields,
} from "@/types/dashboard";

const AIRTABLE_API_KEY = process.env.NEXT_PUBLIC_AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID;
const DASHBOARD_TABLE_ID = "tblyqwTuZAkdk08WL";

export const revalidate = 300; // Revalidate every 5 minutes

export async function GET() {
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
    return NextResponse.json(
      { error: "Airtable configuration missing" },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${DASHBOARD_TABLE_ID}`,
      {
        headers: {
          Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        },
        next: { revalidate: 300 }, // Cache for 5 minutes
      }
    );

    if (!response.ok) {
      throw new Error(`Airtable API error: ${response.status}`);
    }

    const data = await response.json();

    if (!data.records || data.records.length === 0) {
      return NextResponse.json(
        { error: "No dashboard data found" },
        { status: 404 }
      );
    }

    // Get the first (and should be only) record
    const dashboardRecord = data.records[0];
    const fields = dashboardRecord.fields as DashboardOverviewFields;

    // Transform to our typed format
    const dashboardData = transformDashboardData(fields);

    return NextResponse.json(dashboardData);
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
}

