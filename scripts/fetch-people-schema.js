const https = require("https");
const fs = require("fs");
const path = require("path");

// Read environment variables from .env file
const envPath = path.join(__dirname, "..", ".env");
const envContent = fs.readFileSync(envPath, "utf8");
const envVars = {};

envContent.split("\n").forEach((line) => {
  const match = line.match(/^([^=:#]+)=(.*)$/);
  if (match) {
    envVars[match[1].trim()] = match[2].trim();
  }
});

const AIRTABLE_API_KEY = envVars.NEXT_PUBLIC_AIRTABLE_API_KEY;
const BASE_ID = envVars.NEXT_PUBLIC_AIRTABLE_BASE_ID;

if (!AIRTABLE_API_KEY || !BASE_ID) {
  console.error("Missing Airtable credentials in .env file");
  process.exit(1);
}

// Fetch base schema using Airtable Metadata API
const options = {
  hostname: "api.airtable.com",
  path: `/v0/meta/bases/${BASE_ID}/tables`,
  method: "GET",
  headers: {
    Authorization: `Bearer ${AIRTABLE_API_KEY}`,
  },
};

console.log("Fetching schema from Airtable...\n");

const req = https.request(options, (res) => {
  let data = "";

  res.on("data", (chunk) => {
    data += chunk;
  });

  res.on("end", () => {
    if (res.statusCode !== 200) {
      console.error(`Error: ${res.statusCode}`);
      console.error(data);
      process.exit(1);
    }

    const response = JSON.parse(data);

    console.log("Available tables:");
    response.tables.forEach((table) =>
      console.log(`  - ${table.name} (${table.id})`)
    );
    console.log();

    // Find the People table
    const peopleTable = response.tables.find(
      (table) => table.name === "People" || table.name === "people"
    );

    if (!peopleTable) {
      console.error("\nPeople table not found!");
      process.exit(1);
    }

    console.log("People Table Schema:\n");
    console.log(`Table ID: ${peopleTable.id}`);
    console.log(`Table Name: ${peopleTable.name}`);
    console.log(`\nFields (${peopleTable.fields.length}):\n`);

    peopleTable.fields.forEach((field) => {
      console.log(`  ${field.name}`);
      console.log(`    Type: ${field.type}`);
      if (field.options) {
        console.log(`    Options:`, JSON.stringify(field.options, null, 6));
      }
      console.log();
    });

    // Save the schema to a file
    const schemaPath = path.join(
      __dirname,
      "..",
      "data",
      "mocks",
      "people-schema.json"
    );
    fs.mkdirSync(path.dirname(schemaPath), { recursive: true });
    fs.writeFileSync(schemaPath, JSON.stringify(peopleTable, null, 2));
    console.log(`\nSchema saved to: ${schemaPath}`);
  });
});

req.on("error", (error) => {
  console.error("Error:", error);
  process.exit(1);
});

req.end();
