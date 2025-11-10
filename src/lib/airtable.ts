// Shared Airtable data fetching utilities

import {
  transformDashboardData,
  type DashboardOverviewFields,
  type DashboardData,
} from "@/types/dashboard";

const AIRTABLE_API_KEY = process.env.NEXT_PUBLIC_AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID;
const DASHBOARD_TABLE_ID = "tblyqwTuZAkdk08WL";
const PROVIDERS_TABLE_ID = "tblTQpGt9Th8ETHPh";
const BED_TYPES_TABLE_ID = "tblTI5lFeTTGozx5q";
const DONATIONS_TABLE_ID = "tblkPblJxjB8XsE0c";

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

export async function getProvidersRecords(): Promise<any[]> {
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
    console.error("Airtable configuration missing");
    return [];
  }

  try {
    const response = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${PROVIDERS_TABLE_ID}`,
      {
        headers: {
          Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        },
        next: { revalidate: 300 },
      }
    );

    if (!response.ok) {
      console.error(`Airtable API error: ${response.status}`);
      return [];
    }

    const data = await response.json();
    return data.records || [];
  } catch (error) {
    console.error("Error fetching providers:", error);
    return [];
  }
}

export async function getBedTypesRecords(): Promise<any[]> {
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
    console.error("Airtable configuration missing");
    return [];
  }

  try {
    const response = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${BED_TYPES_TABLE_ID}`,
      {
        headers: {
          Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        },
        next: { revalidate: 300 },
      }
    );

    if (!response.ok) {
      console.error(`Airtable API error: ${response.status}`);
      return [];
    }

    const data = await response.json();
    return data.records || [];
  } catch (error) {
    console.error("Error fetching bed types:", error);
    return [];
  }
}

export async function getDonationsRecords(): Promise<any[]> {
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
    console.error("Airtable configuration missing");
    return [];
  }

  try {
    const response = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${DONATIONS_TABLE_ID}`,
      {
        headers: {
          Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        },
        next: { revalidate: 300 },
      }
    );

    if (!response.ok) {
      console.error(`Airtable API error: ${response.status}`);
      return [];
    }

    const data = await response.json();
    return data.records || [];
  } catch (error) {
    console.error("Error fetching donations:", error);
    return [];
  }
}
