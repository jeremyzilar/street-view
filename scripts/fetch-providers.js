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

const PROVIDERS_TABLE_ID = "tblTQpGt9Th8ETHPh";

async function fetchProvidersSchema() {
  console.log("Fetching Providers schema from Airtable...\n");

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

    // Find the Providers table
    const providersTable = data.tables.find(
      (table) => table.id === PROVIDERS_TABLE_ID
    );

    if (!providersTable) {
      console.error("Providers table not found!");
      process.exit(1);
    }

    console.log(`Found table: ${providersTable.name}\n`);
    console.log(`Fields (${providersTable.fields.length}):`);
    providersTable.fields.forEach((field) => {
      console.log(`  - ${field.name} (${field.type})`);
    });

    // Save schema
    const schemaPath = path.join(
      __dirname,
      "..",
      "data",
      "mocks",
      "providers-schema.json"
    );
    fs.writeFileSync(schemaPath, JSON.stringify(providersTable, null, 2));
    console.log(`\n✓ Schema saved to: ${schemaPath}`);

    return providersTable;
  } catch (error) {
    console.error("Error fetching schema:", error);
    process.exit(1);
  }
}

async function fetchProviders() {
  console.log("\nFetching providers records from Airtable...\n");

  try {
    const response = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${PROVIDERS_TABLE_ID}`,
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

    console.log(`Found ${data.records.length} providers:\n`);

    data.records.forEach((record, index) => {
      const name = record.fields["Name"] || "(no name)";
      const bedTypes = record.fields["Bed Types + Capacity"] || [];
      const totalBeds = record.fields["Total Beds"] || 0;
      console.log(`${index + 1}. ${name}`);
      console.log(`   ID: ${record.id}`);
      console.log(`   Total Beds: ${totalBeds}`);
      if (bedTypes.length > 0) {
        console.log(`   Bed Types: ${bedTypes.length} types`);
      }
      console.log("");
    });

    // Save to file
    const outputPath = path.join(
      __dirname,
      "..",
      "data",
      "mocks",
      "providers.json"
    );
    fs.writeFileSync(outputPath, JSON.stringify(data.records, null, 2));
    console.log(`✓ Providers saved to: ${outputPath}`);
  } catch (error) {
    console.error("Error fetching providers:", error);
    process.exit(1);
  }
}

async function main() {
  await fetchProvidersSchema();
  await fetchProviders();
  console.log("\n✅ Providers fetch complete!");
}

main();

