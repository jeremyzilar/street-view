// Shared Airtable data fetching utilities

import {
  transformDashboardData,
  type DashboardOverviewFields,
  type DashboardData,
} from "@/types/dashboard";

const AIRTABLE_API_KEY = process.env.NEXT_PUBLIC_AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID;
const DASHBOARD_TABLE_ID = "tblyqwTuZAkdk08WL";

export async function fetchDashboardData(): Promise<DashboardData | null> {
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
    console.error("Airtable configuration missing");
    return null;
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
      console.error(`Airtable API error: ${response.status}`);
      return null;
    }

    const data = await response.json();

    if (!data.records || data.records.length === 0) {
      console.error("No dashboard data found");
      return null;
    }

    // Get the first (and should be only) record
    const dashboardRecord = data.records[0];
    const fields = dashboardRecord.fields as DashboardOverviewFields;

    // Transform to our typed format
    return transformDashboardData(fields);
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return null;
  }
}
