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

console.log("Fetching Bed Types from Airtable...\n");

// Fetch records from Bed Types + Capacity table
const options = {
  hostname: "api.airtable.com",
  path: `/v0/${BASE_ID}/Bed%20Types%20%2B%20Capacity`,
  method: "GET",
  headers: {
    Authorization: `Bearer ${AIRTABLE_API_KEY}`,
  },
};

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

    console.log(`Found ${response.records.length} Bed Types:\n`);

    response.records.forEach((record) => {
      console.log(`ID: ${record.id}`);
      console.log(`  Name: ${record.fields.Name || "(no name)"}`);
      console.log(
        `  Description: ${record.fields.Description || "(no description)"}`
      );
      console.log();
    });

    // Save to file
    const outputPath = path.join(
      __dirname,
      "..",
      "data",
      "mocks",
      "bed-types.json"
    );
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, JSON.stringify(response.records, null, 2));
    console.log(`✓ Bed Types saved to: ${outputPath}`);
  });
});

req.on("error", (error) => {
  console.error("Error:", error);
  process.exit(1);
});

req.end();
