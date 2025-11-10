// Dashboard Overview data types

export interface PopulationStats {
  totalPeople: number;
  currentlyUnhoused: number;
  currentlyInShelter: number;
  exitedToHousing: number;
  otherExits: number;
}

export interface CurrentNeeds {
  seekingShelter: number;
  needsMedicalRespite: number;
  hasPets: number;
  hasVehicle: number;
  needsADA: number;
}

export interface BedTypeDemand {
  name: string;
  demand: number;
  available: number | string;
  gap?: number;
}

export interface SystemCoverage {
  inUniteUs: number;
  inHMIS: number;
  hasMailingAddress: number;
  employed: number;
}

export interface DashboardData {
  // Meta
  name: string;
  lastUpdated: string;

  // Population stats
  population: PopulationStats;

  // Current needs (unhoused only)
  needs: CurrentNeeds;

  // Bed types supply and demand
  bedTypes: BedTypeDemand[];
  totalBedsAvailable: number;

  // System integration
  systemCoverage: SystemCoverage;
}

// Raw Airtable field names mapping
export interface DashboardOverviewFields {
  "Dashboard Overview Name": string;
  "Total People": number;
  "Currently Unhoused": number;
  "Currently In Shelter": number;
  "Exited to Housing": number;
  "Other Exits": number;
  "Seeking Shelter (Unhoused)": number;
  "Needs Medical Respite (Unhoused)": number;
  "Has Pets (Unhoused)": number;
  "Has Vehicle (Unhoused)": number;
  "Needs ADA (Unhoused)": number;
  "Adult Men – Dormitory Demand (Unhoused)": number;
  "Women's Beds Demand (Unhoused)": number;
  "Medical Respite – Men Demand (Unhoused)": number;
  "Medical Respite – Women Demand (Unhoused)": number;
  "General Adult Beds Demand (Unhoused)": number;
  "Adult Singles & Couples Demand (Unhoused)": number;
  "Family Suites (High Barrier) Demand (Unhoused)": number;
  "Family Suites (Low Barrier) Demand (Unhoused)": number;
  "Family Rooms (Units) Demand (Unhoused)": number;
  "DV Shelter Beds Demand (Unhoused)": number;
  "Non-Congregate Units Demand (Unhoused)": number;
  "Congregate Overflow Demand (Unhoused)": number;
  "Adult Men – Dormitory Beds Available": number | string;
  "Women's Beds Available": number | string;
  "Medical Respite – Men Beds Available": number | string;
  "Medical Respite – Women Beds Available": number | string;
  "General Adult Beds Available": number | string;
  "Adult Singles & Couples Beds Available": number | string;
  "Family Suites (High Barrier) Beds Available": number | string;
  "Family Suites (Low Barrier) Beds Available": number | string;
  "Family Rooms (Units) Beds Available": number | string;
  "DV Shelter Beds Available": number | string;
  "Non-Congregate Units Beds Available": number | string;
  "Congregate Overflow Beds Available": number | string;
  "TOTAL Beds Available": number;
  "In UniteUs": number;
  "In HMIS": number;
  "Has Mailing Address": number;
  Employed: number;
  "Last Updated": string;
  People: string[];
  "Bed Types + Capacity": string[];
}

// Transform Airtable data to DashboardData format
export function transformDashboardData(
  fields: DashboardOverviewFields
): DashboardData {
  // Helper to parse availability values (might be string "Unable to generate formula")
  const parseAvailable = (value: number | string): number | string => {
    if (typeof value === "number") return value;
    return value; // Return the error string as-is for display
  };

  // Helper to calculate gap
  const calculateGap = (
    demand: number,
    available: number | string
  ): number | undefined => {
    if (typeof available === "number") {
      return demand - available;
    }
    return undefined; // Can't calculate gap if availability is not a number
  };

  const bedTypes: BedTypeDemand[] = [
    {
      name: "Adult Men – Dormitory",
      demand: fields["Adult Men – Dormitory Demand (Unhoused)"] || 0,
      available: parseAvailable(fields["Adult Men – Dormitory Beds Available"]),
      gap: calculateGap(
        fields["Adult Men – Dormitory Demand (Unhoused)"] || 0,
        fields["Adult Men – Dormitory Beds Available"]
      ),
    },
    {
      name: "Women's Beds",
      demand: fields["Women's Beds Demand (Unhoused)"] || 0,
      available: parseAvailable(fields["Women's Beds Available"]),
      gap: calculateGap(
        fields["Women's Beds Demand (Unhoused)"] || 0,
        fields["Women's Beds Available"]
      ),
    },
    {
      name: "Medical Respite – Men",
      demand: fields["Medical Respite – Men Demand (Unhoused)"] || 0,
      available: parseAvailable(
        fields["Medical Respite – Men Beds Available"]
      ),
      gap: calculateGap(
        fields["Medical Respite – Men Demand (Unhoused)"] || 0,
        fields["Medical Respite – Men Beds Available"]
      ),
    },
    {
      name: "Medical Respite – Women",
      demand: fields["Medical Respite – Women Demand (Unhoused)"] || 0,
      available: parseAvailable(
        fields["Medical Respite – Women Beds Available"]
      ),
      gap: calculateGap(
        fields["Medical Respite – Women Demand (Unhoused)"] || 0,
        fields["Medical Respite – Women Beds Available"]
      ),
    },
    {
      name: "General Adult Beds",
      demand: fields["General Adult Beds Demand (Unhoused)"] || 0,
      available: parseAvailable(fields["General Adult Beds Available"]),
      gap: calculateGap(
        fields["General Adult Beds Demand (Unhoused)"] || 0,
        fields["General Adult Beds Available"]
      ),
    },
    {
      name: "Adult Singles & Couples",
      demand: fields["Adult Singles & Couples Demand (Unhoused)"] || 0,
      available: parseAvailable(fields["Adult Singles & Couples Beds Available"]),
      gap: calculateGap(
        fields["Adult Singles & Couples Demand (Unhoused)"] || 0,
        fields["Adult Singles & Couples Beds Available"]
      ),
    },
    {
      name: "Family Suites (High Barrier)",
      demand: fields["Family Suites (High Barrier) Demand (Unhoused)"] || 0,
      available: parseAvailable(
        fields["Family Suites (High Barrier) Beds Available"]
      ),
      gap: calculateGap(
        fields["Family Suites (High Barrier) Demand (Unhoused)"] || 0,
        fields["Family Suites (High Barrier) Beds Available"]
      ),
    },
    {
      name: "Family Suites (Low Barrier)",
      demand: fields["Family Suites (Low Barrier) Demand (Unhoused)"] || 0,
      available: parseAvailable(
        fields["Family Suites (Low Barrier) Beds Available"]
      ),
      gap: calculateGap(
        fields["Family Suites (Low Barrier) Demand (Unhoused)"] || 0,
        fields["Family Suites (Low Barrier) Beds Available"]
      ),
    },
    {
      name: "Family Rooms (Units)",
      demand: fields["Family Rooms (Units) Demand (Unhoused)"] || 0,
      available: parseAvailable(fields["Family Rooms (Units) Beds Available"]),
      gap: calculateGap(
        fields["Family Rooms (Units) Demand (Unhoused)"] || 0,
        fields["Family Rooms (Units) Beds Available"]
      ),
    },
    {
      name: "DV Shelter Beds",
      demand: fields["DV Shelter Beds Demand (Unhoused)"] || 0,
      available: parseAvailable(fields["DV Shelter Beds Available"]),
      gap: calculateGap(
        fields["DV Shelter Beds Demand (Unhoused)"] || 0,
        fields["DV Shelter Beds Available"]
      ),
    },
    {
      name: "Non-Congregate Units",
      demand: fields["Non-Congregate Units Demand (Unhoused)"] || 0,
      available: parseAvailable(fields["Non-Congregate Units Beds Available"]),
      gap: calculateGap(
        fields["Non-Congregate Units Demand (Unhoused)"] || 0,
        fields["Non-Congregate Units Beds Available"]
      ),
    },
    {
      name: "Congregate Overflow",
      demand: fields["Congregate Overflow Demand (Unhoused)"] || 0,
      available: parseAvailable(fields["Congregate Overflow Beds Available"]),
      gap: calculateGap(
        fields["Congregate Overflow Demand (Unhoused)"] || 0,
        fields["Congregate Overflow Beds Available"]
      ),
    },
  ];

  return {
    name: fields["Dashboard Overview Name"],
    lastUpdated: fields["Last Updated"],
    population: {
      totalPeople: fields["Total People"],
      currentlyUnhoused: fields["Currently Unhoused"],
      currentlyInShelter: fields["Currently In Shelter"],
      exitedToHousing: fields["Exited to Housing"],
      otherExits: fields["Other Exits"],
    },
    needs: {
      seekingShelter: fields["Seeking Shelter (Unhoused)"],
      needsMedicalRespite: fields["Needs Medical Respite (Unhoused)"],
      hasPets: fields["Has Pets (Unhoused)"],
      hasVehicle: fields["Has Vehicle (Unhoused)"],
      needsADA: fields["Needs ADA (Unhoused)"],
    },
    bedTypes,
    totalBedsAvailable: fields["TOTAL Beds Available"],
    systemCoverage: {
      inUniteUs: fields["In UniteUs"],
      inHMIS: fields["In HMIS"],
      hasMailingAddress: fields["Has Mailing Address"],
      employed: fields["Employed"],
    },
  };
}

