import { NextResponse } from "next/server";
import { fetchDashboardData } from "@/lib/airtable";

export const revalidate = 300; // Revalidate every 5 minutes

export async function GET() {
  try {
    const dashboardData = await fetchDashboardData();

    if (!dashboardData) {
      return NextResponse.json(
        { error: "Failed to fetch dashboard data" },
        { status: 500 }
      );
    }

    return NextResponse.json(dashboardData);
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
}
