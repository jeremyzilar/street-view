const fs = require("fs");
const path = require("path");

// Read environment variables from .env file
const envPath = path.join(__dirname, "..", ".env");
let AIRTABLE_API_KEY = "";
let AIRTABLE_BASE_ID = "";

try {
  const envContent = fs.readFileSync(envPath, "utf8");
  const lines = envContent.split("\n");

  lines.forEach((line) => {
    if (line.startsWith("NEXT_PUBLIC_AIRTABLE_API_KEY=")) {
      AIRTABLE_API_KEY = line.split("=")[1].trim();
    }
    if (line.startsWith("NEXT_PUBLIC_AIRTABLE_BASE_ID=")) {
      AIRTABLE_BASE_ID = line.split("=")[1].trim();
    }
  });
} catch (error) {
  console.error("Error reading .env file:", error.message);
  process.exit(1);
}

if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
  console.error(
    "Error: AIRTABLE_API_KEY or AIRTABLE_BASE_ID not found in .env file"
  );
  process.exit(1);
}

const DASHBOARD_TABLE_ID = "tblyqwTuZAkdk08WL";

async function fetchDashboardSchema() {
  console.log("Fetching Dashboard Overview schema from Airtable...\n");

  try {
    const response = await fetch(
      `https://api.airtable.com/v0/meta/bases/${AIRTABLE_BASE_ID}/tables`,
      {
        headers: {
          Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Find the Dashboard Overview table
    const dashboardTable = data.tables.find(
      (table) => table.id === DASHBOARD_TABLE_ID
    );

    if (!dashboardTable) {
      console.error("Dashboard Overview table not found!");
      console.log("\nAvailable tables:");
      data.tables.forEach((table) => {
        console.log(`  ${table.name} (${table.id})`);
      });
      process.exit(1);
    }

    console.log(`Found table: ${dashboardTable.name}\n`);
    console.log(`Fields (${dashboardTable.fields.length}):`);
    dashboardTable.fields.forEach((field) => {
      console.log(`  - ${field.name} (${field.type})`);
    });

    // Save schema
    const schemaPath = path.join(
      __dirname,
      "..",
      "data",
      "mocks",
      "dashboard-overview-schema.json"
    );
    fs.writeFileSync(schemaPath, JSON.stringify(dashboardTable, null, 2));
    console.log(`\n✓ Schema saved to: ${schemaPath}`);

    return dashboardTable;
  } catch (error) {
    console.error("Error fetching schema:", error);
    process.exit(1);
  }
}

async function fetchDashboardData() {
  console.log("\nFetching Dashboard Overview data from Airtable...\n");

  try {
    const response = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${DASHBOARD_TABLE_ID}`,
      {
        headers: {
          Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!data.records || data.records.length === 0) {
      console.log("⚠️  No records found in Dashboard Overview table");
      return null;
    }

    // Get the first (and should be only) record
    const dashboardRecord = data.records[0];

    console.log(`Found record: ${dashboardRecord.id}\n`);
    console.log("Fields:");
    Object.entries(dashboardRecord.fields).forEach(([key, value]) => {
      console.log(`  ${key}: ${value}`);
    });

    // Save data
    const dataPath = path.join(
      __dirname,
      "..",
      "data",
      "mocks",
      "dashboard-overview-data.json"
    );
    fs.writeFileSync(
      dataPath,
      JSON.stringify(dashboardRecord.fields, null, 2)
    );
    console.log(`\n✓ Data saved to: ${dataPath}`);

    return dashboardRecord;
  } catch (error) {
    console.error("Error fetching data:", error);
    process.exit(1);
  }
}

async function main() {
  await fetchDashboardSchema();
  await fetchDashboardData();
  console.log("\n✅ Dashboard Overview fetch complete!");
}

main();

