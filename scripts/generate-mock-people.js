const fs = require("fs");
const path = require("path");

// Load bed types from the JSON file
const bedTypesPath = path.join(
  __dirname,
  "..",
  "data",
  "mocks",
  "bed-types.json"
);
let bedTypesData = [];
try {
  bedTypesData = JSON.parse(fs.readFileSync(bedTypesPath, "utf8"));
  console.log(`✓ Loaded ${bedTypesData.length} bed types`);
} catch (error) {
  console.error(
    "Warning: Could not load bed-types.json. Run fetch-bed-types.js first."
  );
  console.error("Continuing without bed type assignments...\n");
}

// Filter to only Active bed types
const activeBedTypes = bedTypesData.filter((bt) => bt.fields.Active === true);
console.log(`✓ Filtered to ${activeBedTypes.length} active bed types\n`);

// Load providers from the JSON file
const providersPath = path.join(
  __dirname,
  "..",
  "data",
  "mocks",
  "providers.json"
);
let providersData = [];
try {
  providersData = JSON.parse(fs.readFileSync(providersPath, "utf8"));
  console.log(`✓ Loaded ${providersData.length} providers\n`);
} catch (error) {
  console.error(
    "Warning: Could not load providers.json. Run fetch-providers.js first."
  );
  console.error("Continuing without shelter assignments...\n");
}

// Create a map of bed type ID to provider ID(s)
const bedTypeToProvider = {};
activeBedTypes.forEach((bedType) => {
  const providers = bedType.fields.Provider || [];
  if (providers.length > 0) {
    bedTypeToProvider[bedType.id] = providers;
  }
});

// Track provider occupancy
const providerOccupancy = {};
providersData.forEach((provider) => {
  providerOccupancy[provider.id] = 0;
});

console.log("Provider capacity tracking initialized\n");

// Sample names
const firstNamesMale = [
  "James",
  "John",
  "Robert",
  "Michael",
  "William",
  "David",
  "Richard",
  "Joseph",
  "Thomas",
  "Christopher",
  "Daniel",
  "Matthew",
  "Anthony",
  "Mark",
  "Donald",
  "Steven",
  "Andrew",
  "Paul",
  "Joshua",
  "Kenneth",
  "Kevin",
  "Brian",
  "George",
  "Timothy",
  "Ronald",
  "Edward",
  "Jason",
  "Jeffrey",
  "Ryan",
  "Jacob",
  "Gary",
  "Nicholas",
  "Eric",
  "Jonathan",
  "Stephen",
  "Larry",
  "Justin",
  "Scott",
  "Brandon",
  "Benjamin",
  "Samuel",
  "Raymond",
  "Gregory",
  "Frank",
  "Alexander",
  "Patrick",
  "Jack",
  "Dennis",
  "Jerry",
  "Tyler",
  "Aaron",
  "Jose",
  "Adam",
  "Nathan",
  "Douglas",
  "Zachary",
  "Peter",
  "Kyle",
  "Walter",
  "Ethan",
  "Jeremy",
  "Harold",
  "Keith",
  "Christian",
  "Roger",
  "Noah",
  "Gerald",
  "Carl",
  "Terry",
  "Sean",
  "Austin",
  "Arthur",
  "Lawrence",
  "Jesse",
  "Dylan",
  "Jordan",
  "Bryan",
  "Billy",
  "Bruce",
  "Albert",
  "Willie",
  "Gabriel",
  "Logan",
  "Alan",
  "Juan",
  "Ralph",
  "Roy",
];

const firstNamesFemale = [
  "Mary",
  "Patricia",
  "Jennifer",
  "Linda",
  "Barbara",
  "Elizabeth",
  "Susan",
  "Jessica",
  "Sarah",
  "Karen",
  "Lisa",
  "Nancy",
  "Betty",
  "Margaret",
  "Sandra",
  "Ashley",
  "Kimberly",
  "Emily",
  "Donna",
  "Michelle",
  "Carol",
  "Amanda",
  "Dorothy",
  "Melissa",
  "Deborah",
  "Stephanie",
  "Rebecca",
  "Sharon",
  "Laura",
  "Cynthia",
  "Kathleen",
  "Amy",
  "Angela",
  "Shirley",
  "Anna",
  "Brenda",
  "Pamela",
  "Emma",
  "Nicole",
  "Helen",
  "Samantha",
  "Katherine",
  "Christine",
  "Debra",
  "Rachel",
  "Carolyn",
  "Janet",
  "Catherine",
  "Maria",
  "Heather",
  "Diane",
  "Ruth",
  "Julie",
  "Olivia",
  "Joyce",
  "Virginia",
  "Victoria",
  "Kelly",
  "Lauren",
  "Christina",
  "Joan",
  "Evelyn",
  "Judith",
  "Megan",
  "Andrea",
  "Cheryl",
  "Hannah",
  "Jacqueline",
  "Martha",
  "Gloria",
  "Teresa",
  "Ann",
  "Sara",
  "Madison",
  "Frances",
  "Kathryn",
  "Janice",
  "Jean",
  "Abigail",
  "Sophia",
  "Judy",
  "Grace",
  "Denise",
  "Amber",
];

// Hispanic surnames (will be 35% of population with high repetition)
const hispanicLastNames = [
  "Garcia",
  "Martinez",
  "Rodriguez",
  "Hernandez",
  "Lopez",
  "Gonzalez",
  "Perez",
  "Sanchez",
  "Ramirez",
  "Torres",
  "Flores",
  "Rivera",
  "Gomez",
  "Diaz",
  "Cruz",
  "Reyes",
  "Morales",
  "Gutierrez",
  "Ortiz",
  "Ramos",
  "Chavez",
  "Mendoza",
  "Ruiz",
  "Alvarez",
  "Castillo",
  "Jimenez",
  "Vasquez",
  "Romero",
  "Moreno",
  "Herrera",
  "Medina",
  "Aguilar",
  "Delgado",
  "Castro",
  "Vargas",
  "Guzman",
];

// Non-Hispanic surnames
const nonHispanicLastNames = [
  "Smith",
  "Johnson",
  "Williams",
  "Brown",
  "Jones",
  "Miller",
  "Davis",
  "Wilson",
  "Anderson",
  "Thomas",
  "Taylor",
  "Moore",
  "Jackson",
  "Martin",
  "Lee",
  "Thompson",
  "White",
  "Harris",
  "Clark",
  "Lewis",
  "Robinson",
  "Walker",
  "Young",
  "Allen",
  "King",
  "Wright",
  "Scott",
  "Nguyen",
  "Hill",
  "Green",
  "Adams",
  "Nelson",
  "Baker",
  "Hall",
  "Campbell",
  "Mitchell",
  "Carter",
  "Roberts",
  "Phillips",
  "Evans",
  "Turner",
  "Parker",
  "Edwards",
  "Collins",
  "Stewart",
  "Morris",
  "Murphy",
  "Cook",
  "Rogers",
  "Morgan",
  "Cooper",
  "Peterson",
  "Bailey",
  "Reed",
  "Kelly",
  "Howard",
  "Kim",
  "Cox",
  "Ward",
  "Richardson",
  "Watson",
  "Brooks",
  "Wood",
  "James",
  "Bennett",
  "Gray",
  "Hughes",
  "Price",
  "Sanders",
  "Patel",
  "Myers",
  "Long",
  "Ross",
  "Foster",
  "Powell",
  "Jenkins",
  "Perry",
  "Russell",
  "Sullivan",
  "Bell",
  "Coleman",
  "Butler",
  "Henderson",
  "Barnes",
  "Fisher",
  "Simmons",
  "Jordan",
  "Patterson",
  "Alexander",
  "Hamilton",
  "Graham",
  "Reynolds",
  "Griffin",
  "Wallace",
];

// Helper to get a last name with 35% Hispanic
function getRandomLastName() {
  const isHispanic = Math.random() < 0.35;
  return isHispanic
    ? getRandomElement(hispanicLastNames)
    : getRandomElement(nonHispanicLastNames);
}

const petNames = [
  "Buddy",
  "Max",
  "Charlie",
  "Rocky",
  "Bear",
  "Duke",
  "Jack",
  "Cooper",
  "Zeus",
  "Luna",
  "Bella",
  "Daisy",
  "Lucy",
  "Sadie",
  "Molly",
  "Bailey",
  "Shadow",
  "Princess",
  "Mittens",
  "Whiskers",
  "Tiger",
  "Smokey",
  "Patches",
  "Oreo",
  "Simba",
  "Misty",
];

const petSpecies = [
  "dog",
  "cat",
  "small dog",
  "large dog",
  "cat (orange tabby)",
  "cat (gray)",
  "pit bull mix",
  "chihuahua",
  "shepherd mix",
];

const vehicleTypes = [
  "1998 Honda Civic",
  "2005 Ford F-150",
  "2003 Toyota Camry",
  "1995 Chevy van",
  "2001 Dodge Caravan",
  "2007 Nissan Sentra",
  "1999 Ford Taurus",
  "2004 GMC truck",
  "2002 Honda Accord",
  "older pickup truck",
  "1997 Subaru Outback",
  "2006 Toyota Corolla",
  "white van",
  "RV (older model)",
];

const notesTemplates = [
  "Needs assistance with housing applications",
  "Working with case manager weekly",
  "Has ID, needs birth certificate",
  "Applied for Medicaid, waiting for approval",
  "Interested in substance abuse treatment",
  "Veteran - served in Navy",
  "Has family in Albuquerque",
  "Previously lived in Denver",
  "Working part-time at local restaurant",
  "Receives SSI benefits",
  "Health issues - needs regular medical care",
  "Estranged from family",
  "Recently lost job and housing",
  "Been on streets for 3 months",
  "Been on streets for over a year",
  "Willing to work, looking for opportunities",
  "Has GED, interested in vocational training",
  "Chronic health condition requires medication",
  "Mental health support needed",
  "Previously housed at shelter, had to leave",
  "Waiting for shelter bed",
  "On Life Link waitlist",
  "Connected with HUGS outreach team",
  "Attended last case conferencing meeting",
  "Declined services at this time",
  "Prefers to stay in current location",
  "Open to housing opportunities",
  "Needs help with disability application",
  "Lost everything in recent fire",
  "Fleeing domestic violence situation",
];

const statusOptions = ["Unhoused", "Placed", "Exited to Housing", "Other Exit"];

// ADA Accommodation options
const adaAccommodations = [
  "Wheelchair accessible",
  "Ground floor only",
  "Grab bars needed",
  "Visual accommodations",
  "Hearing accommodations",
];

// Housing Preference options
const housingPreferences = [
  "Seeking Shelter Placement",
  "Prefers Vehicle",
  "Prefers Outdoor/Tent",
  "Staying with Family/Friends",
  "Unsheltered by Choice",
  "Undecided",
  "Other",
];

// Create a mapping of bed type names to IDs (only Active bed types)
const nameToIdMap = {};
if (activeBedTypes && activeBedTypes.length > 0) {
  activeBedTypes.forEach((bedType) => {
    const name = bedType.fields["Bed Group Name"];
    if (name && !nameToIdMap[name]) {
      nameToIdMap[name] = bedType.id;
    }
  });
  console.log(
    `✓ Created ${Object.keys(nameToIdMap).length} active bed type mappings\n`
  );
}

// Bed type categories for easier assignment
const bedTypeCategories = {
  menOnly: ["Adult Men – Dormitory"],
  womenOnly: ["Women's Beds"],
  medicalMen: ["Medical Respite – Men"],
  medicalWomen: ["Medical Respite – Women"],
  general: ["General Adult Beds", "Adult Singles & Couples"],
  familyHigh: ["Family Suites (High Barrier)", "Family Rooms (Units)"],
  familyLow: ["Family Suites (Low Barrier)"],
  overflow: ["Congregate Overflow", "Non-Congregate Units"],
  dv: ["DV Shelter Beds (Shared Bedrooms)"],
};

// Function to convert bed type names to IDs
function convertNamesToIds(names) {
  if (!names || names.length === 0) return [];
  return names.map((name) => nameToIdMap[name]).filter((id) => id);
}

// Function to select appropriate bed types based on demographics
// Returns array of bed type IDs for Airtable import
function selectBedTypes(isMale, age, hasPets) {
  const bedTypeNames = [];

  // 20% need medical respite (older population or health issues)
  const needsMedical = age > 60 || Math.random() < 0.1;

  // 5% are fleeing DV
  const isDV = Math.random() < 0.05;

  // 10% have families/children
  const hasFamily = Math.random() < 0.1;

  if (isDV) {
    bedTypeNames.push(...bedTypeCategories.dv);
  } else if (hasFamily) {
    // Family suites
    if (Math.random() < 0.7) {
      bedTypeNames.push(...bedTypeCategories.familyHigh);
    } else {
      bedTypeNames.push(...bedTypeCategories.familyLow);
    }
  } else if (needsMedical) {
    // Medical respite - gender-specific
    if (isMale) {
      bedTypeNames.push(...bedTypeCategories.medicalMen);
    } else {
      bedTypeNames.push(...bedTypeCategories.medicalWomen);
    }
  } else {
    // Gender-specific or general beds
    if (isMale) {
      // 40% men's dorm, 60% general/couples
      if (Math.random() < 0.4) {
        bedTypeNames.push(...bedTypeCategories.menOnly);
      } else {
        bedTypeNames.push(...bedTypeCategories.general);
      }
    } else {
      // 50% women's beds, 50% general/couples
      if (Math.random() < 0.5) {
        bedTypeNames.push(...bedTypeCategories.womenOnly);
      } else {
        bedTypeNames.push(...bedTypeCategories.general);
      }
    }
  }

  // 40% of people are flexible and will also accept overflow beds
  if (Math.random() < 0.4) {
    bedTypeNames.push(getRandomElement(bedTypeCategories.overflow));
  }

  // Convert names to IDs and return
  return convertNamesToIds(bedTypeNames);
}

// Weighted status selection (70% Unhoused, 15% Placed, 10% Exited, 5% Other)
// Status counter to ensure exactly 260 "In Shelter"
let inShelterCount = 0;
const MAX_IN_SHELTER = 260;

function getRandomStatus() {
  // First 260 people will be "In Shelter"
  if (inShelterCount < MAX_IN_SHELTER) {
    inShelterCount++;
    return "In Shelter";
  }

  // Remaining 225 distributed among other statuses
  const rand = Math.random();
  if (rand < 0.70) return "Unhoused"; // ~158 people
  if (rand < 0.90) return "Exited to Housing"; // ~45 people
  return "Other Exit"; // ~22 people
}

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateDateOfBirth(age) {
  const today = new Date();
  const birthYear = today.getFullYear() - age;
  const month = getRandomInt(1, 12);
  const day = getRandomInt(1, 28); // Keep it simple, avoid month-day validation
  return `${birthYear}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function generateDateAdded() {
  const month = getRandomInt(1, 12);
  const day = getRandomInt(1, 28);
  return `2025-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function generatePhoneNumber() {
  const last4 = getRandomInt(1000, 9999);
  return `505-555-${last4}`;
}

function generateNotes() {
  const numNotes = getRandomInt(1, 3);
  const selectedNotes = [];
  for (let i = 0; i < numNotes; i++) {
    selectedNotes.push(getRandomElement(notesTemplates));
  }
  return selectedNotes.join(". ") + ".";
}

// Assign shelter and occupied bed type for "In Shelter" people
function assignShelterPlacement(bedTypesNeeded) {
  if (!bedTypesNeeded || bedTypesNeeded.length === 0) {
    return { shelter: null, bedType: null };
  }

  // Shuffle bed types to try them in random order
  const shuffledBedTypes = [...bedTypesNeeded].sort(() => Math.random() - 0.5);

  for (const bedTypeId of shuffledBedTypes) {
    // Find providers that offer this bed type
    const providerIds = bedTypeToProvider[bedTypeId];

    if (!providerIds || providerIds.length === 0) {
      continue; // No provider offers this bed type
    }

    // Try each provider for this bed type
    for (const providerId of providerIds) {
      // Check if provider has capacity (no hard limit set, so we track informally)
      // For mock data, we'll allow reasonable distribution
      if (providerOccupancy[providerId] < 60) {
        // Arbitrary cap per provider
        providerOccupancy[providerId]++;
        return { shelter: providerId, bedType: bedTypeId };
      }
    }
  }

  // If all providers are full for all bed types, assign to first available anyway
  // This ensures all "In Shelter" people get placed
  const firstBedType = shuffledBedTypes[0];
  const firstProviderId = bedTypeToProvider[firstBedType]?.[0];

  if (firstProviderId) {
    providerOccupancy[firstProviderId]++;
    return { shelter: firstProviderId, bedType: firstBedType };
  }

  return { shelter: null, bedType: null };
}

function generatePerson() {
  const isMale = Math.random() < 0.5;
  const firstName = isMale
    ? getRandomElement(firstNamesMale)
    : getRandomElement(firstNamesFemale);
  const lastName = getRandomLastName(); // Use new function for Hispanic surnames
  const fullName = `${firstName} ${lastName}`;

  const age = getRandomInt(16, 90);
  const dateOfBirth = generateDateOfBirth(age);

  const phone = generatePhoneNumber();
  const email = `${firstName.toLowerCase()}_${lastName.toLowerCase()}@example.com`;

  const status = getRandomStatus();
  const notes = generateNotes();

  const hasPets = Math.random() < 0.333;
  const hasVehicle = Math.random() < 0.333;

  // Select appropriate bed types
  const bedTypesNeeded = selectBedTypes(isMale, age, hasPets);

  // 20% need medical respite (independent of bed types)
  const needsMedicalRespite = Math.random() < 0.2;

  // New fields with specified distributions
  const uniteUs = Math.random() < 0.33; // 33%
  const hmis = Math.random() < 0.21; // 21%
  const mailingAddress = Math.random() < 0.39; // 39%
  const employed = Math.random() < 0.18; // 18%

  // ADA Accommodations - 15% need them, most have 1-2
  const needsAda = Math.random() < 0.15;
  const adaNeeds = [];
  if (needsAda) {
    const numNeeds = Math.random() < 0.7 ? 1 : 2; // 70% have 1, 30% have 2
    const availableAccommodations = [...adaAccommodations];
    for (let i = 0; i < numNeeds && availableAccommodations.length > 0; i++) {
      const index = Math.floor(Math.random() * availableAccommodations.length);
      adaNeeds.push(availableAccommodations[index]);
      availableAccommodations.splice(index, 1);
    }
  }

  // Housing Preference - can have multiple
  const housingPref = [];
  const rand = Math.random();
  if (rand < 0.6) {
    // 60% seeking shelter
    housingPref.push("Seeking Shelter Placement");
  } else if (rand < 0.7) {
    // 10% prefer vehicle
    housingPref.push("Prefers Vehicle");
    // If they have a vehicle, they likely prefer it
    if (!hasVehicle && Math.random() < 0.5) {
      housingPref.push("Seeking Shelter Placement");
    }
  } else if (rand < 0.78) {
    // 8% unsheltered by choice
    housingPref.push("Unsheltered by Choice");
  } else if (rand < 0.88) {
    // 10% prefer outdoor/tent
    housingPref.push("Prefers Outdoor/Tent");
  } else if (rand < 0.94) {
    // 6% staying with family/friends
    housingPref.push("Staying with Family/Friends");
  } else if (rand < 0.98) {
    // 4% undecided
    housingPref.push("Undecided");
  } else {
    // 2% other
    housingPref.push("Other");
  }

  let petNamesList = "";
  if (hasPets) {
    const numPets = Math.random() < 0.7 ? 1 : 2; // 70% have 1 pet, 30% have 2
    const pets = [];
    for (let i = 0; i < numPets; i++) {
      const petName = getRandomElement(petNames);
      const petType = getRandomElement(petSpecies);
      pets.push(`${petName} (${petType})`);
    }
    petNamesList = pets.join(", ");
  }

  let vehicleDetails = "";
  if (hasVehicle) {
    const vehicle = getRandomElement(vehicleTypes);
    const condition = [
      "runs well",
      "needs repairs",
      "not running",
      "fair condition",
      "poor condition",
    ];
    vehicleDetails = `${vehicle} - ${getRandomElement(condition)}`;
  }

  // VI Score only for In Shelter status
  const viScore = status === "In Shelter" ? String(getRandomInt(70, 99)) : "";

  const dateAdded = generateDateAdded();

  // Assign shelter and bed type for "In Shelter" people
  let shelter = null;
  let bedType = null;
  if (status === "In Shelter") {
    const placement = assignShelterPlacement(bedTypesNeeded);
    shelter = placement.shelter;
    bedType = placement.bedType;
  }

  return {
    "Full Name": fullName,
    "Date of Birth": dateOfBirth,
    Phone: phone,
    Email: email,
    "Bed Types Needed": bedTypesNeeded,
    Status: status,
    Shelter: shelter,
    "Bed Type": bedType,
    Notes: notes,
    Pets: hasPets,
    "Pet name(s) and species": petNamesList,
    Vehicle: hasVehicle,
    "Vehicle Details": vehicleDetails,
    "VI Score": viScore,
    UniteUs: uniteUs,
    HMIS: hmis,
    "Mailing Address": mailingAddress,
    Employed: employed,
    "ADA Accommodations": adaNeeds,
    "Housing Preference": housingPref,
    "Needs Medical Respite": needsMedicalRespite,
    "Date Added": dateAdded,
  };
}

// Generate 485 people
console.log("Generating 485 mock people records...\n");
const people = [];

// First, generate 475 regular people
for (let i = 0; i < 475; i++) {
  people.push(generatePerson());
  if ((i + 1) % 50 === 0) {
    console.log(`Generated ${i + 1} records...`);
  }
}

// Then generate 10 more people with duplicate first+last name combinations
// to ensure we have at least 10 people with same full names
console.log("Generating 10 duplicate name records...");
for (let i = 0; i < 10; i++) {
  // Pick a random existing person and create a new one with same name but different details
  const existingPerson = people[Math.floor(Math.random() * people.length)];
  const duplicatePerson = generatePerson();
  duplicatePerson["Full Name"] = existingPerson["Full Name"];
  // Update email to use the same name base
  const nameParts = existingPerson["Full Name"].toLowerCase().split(" ");
  duplicatePerson.Email = `${nameParts.join("_")}@example.com`;
  people.push(duplicatePerson);
}

console.log(`Generated 485 records total...\n`);

// Create output directory
const outputDir = path.join(__dirname, "..", "data", "mocks");
fs.mkdirSync(outputDir, { recursive: true });

// Write JSON file
const jsonPath = path.join(outputDir, "people-mock-data.json");
fs.writeFileSync(jsonPath, JSON.stringify(people, null, 2));
console.log(`\n✓ JSON file created: ${jsonPath}`);

// Write CSV file
const csvPath = path.join(outputDir, "people-mock-data.csv");
const headers = [
  "Full Name",
  "Date of Birth",
  "Phone",
  "Email",
  "Bed Types Needed",
  "Status",
  "Shelter",
  "Bed Type",
  "Notes",
  "Pets",
  "Pet name(s) and species",
  "Vehicle",
  "Vehicle Details",
  "VI Score",
  "UniteUs",
  "HMIS",
  "Mailing Address",
  "Employed",
  "ADA Accommodations",
  "Housing Preference",
  "Needs Medical Respite",
  "Date Added",
];

// Helper to escape CSV values
function escapeCsvValue(value, fieldName) {
  if (value === null || value === undefined) return "";

  // Handle arrays
  if (Array.isArray(value)) {
    if (value.length === 0) return "";

    // For Airtable linked record fields (Bed Types Needed)
    // Format: "id1, id2, id3" (comma-separated IDs with spaces within quotes)
    if (fieldName === "Bed Types Needed") {
      const idsStr = value.join(", ");
      return `"${idsStr.replace(/"/g, '""')}"`;
    }

    // For other arrays (like multi-select fields), comma-separate with spaces within quotes
    const arrayStr = value.join(", ");
    return `"${arrayStr.replace(/"/g, '""')}"`;
  }

  const str = String(value);
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

const csvLines = [headers.join(",")];
people.forEach((person) => {
  const row = headers.map((header) => escapeCsvValue(person[header], header));
  csvLines.push(row.join(","));
});

fs.writeFileSync(csvPath, csvLines.join("\n"));
console.log(`✓ CSV file created: ${csvPath}`);

// Print statistics
const statusCounts = {};
statusOptions.forEach((status) => {
  statusCounts[status] = people.filter((p) => p.Status === status).length;
});

const petsCount = people.filter((p) => p.Pets).length;
const vehiclesCount = people.filter((p) => p.Vehicle).length;
const viScoreCount = people.filter((p) => p["VI Score"]).length;
const withBedTypes = people.filter(
  (p) => p["Bed Types Needed"] && p["Bed Types Needed"].length > 0
).length;
const uniteUsCount = people.filter((p) => p.UniteUs).length;
const hmisCount = people.filter((p) => p.HMIS).length;
const mailingAddressCount = people.filter((p) => p["Mailing Address"]).length;
const employedCount = people.filter((p) => p.Employed).length;
const adaCount = people.filter(
  (p) => p["ADA Accommodations"] && p["ADA Accommodations"].length > 0
).length;
const medicalRespiteCount = people.filter(
  (p) => p["Needs Medical Respite"]
).length;

// Count duplicate names
const nameCounts = {};
people.forEach((p) => {
  const name = p["Full Name"];
  nameCounts[name] = (nameCounts[name] || 0) + 1;
});
const duplicateNames = Object.entries(nameCounts).filter(
  ([name, count]) => count > 1
);

console.log("\n--- Statistics ---");
console.log(`Total Records: ${people.length}`);
console.log(
  `\nDuplicate Names: ${duplicateNames.length} names appear multiple times`
);
duplicateNames.slice(0, 5).forEach(([name, count]) => {
  console.log(`  ${name}: ${count} people`);
});

console.log("\nStatus Distribution:");
Object.entries(statusCounts).forEach(([status, count]) => {
  const percent = ((count / people.length) * 100).toFixed(1);
  console.log(`  ${status}: ${count} (${percent}%)`);
});

console.log(
  `\nHave Pets: ${petsCount} (${((petsCount / people.length) * 100).toFixed(1)}%)`
);
console.log(
  `Have Vehicle: ${vehiclesCount} (${((vehiclesCount / people.length) * 100).toFixed(1)}%)`
);
console.log(
  `Have VI Score: ${viScoreCount} (${((viScoreCount / people.length) * 100).toFixed(1)}%)`
);
console.log(
  `In UniteUs: ${uniteUsCount} (${((uniteUsCount / people.length) * 100).toFixed(1)}%)`
);
console.log(
  `In HMIS: ${hmisCount} (${((hmisCount / people.length) * 100).toFixed(1)}%)`
);
console.log(
  `Have Mailing Address: ${mailingAddressCount} (${((mailingAddressCount / people.length) * 100).toFixed(1)}%)`
);
console.log(
  `Employed: ${employedCount} (${((employedCount / people.length) * 100).toFixed(1)}%)`
);
console.log(
  `Need ADA Accommodations: ${adaCount} (${((adaCount / people.length) * 100).toFixed(1)}%)`
);
console.log(
  `Need Medical Respite: ${medicalRespiteCount} (${((medicalRespiteCount / people.length) * 100).toFixed(1)}%)`
);
console.log(
  `Have Bed Types: ${withBedTypes} (${((withBedTypes / people.length) * 100).toFixed(1)}%)`
);

// Count bed type assignments
console.log("\nBed Type Distribution:");
const bedTypeCounts = {};

people.forEach((person) => {
  if (person["Bed Types Needed"] && person["Bed Types Needed"].length > 0) {
    person["Bed Types Needed"].forEach((bedTypeId) => {
      // Find the name for this ID
      const bedType = bedTypesData.find((bt) => bt.id === bedTypeId);
      const name = bedType ? bedType.fields["Bed Group Name"] : bedTypeId;
      bedTypeCounts[name] = (bedTypeCounts[name] || 0) + 1;
    });
  }
});

// Sort by count and display
Object.entries(bedTypeCounts)
  .sort(([, a], [, b]) => b - a)
  .forEach(([bedType, count]) => {
    const percent = ((count / people.length) * 100).toFixed(1);
    console.log(`  ${bedType}: ${count} (${percent}%)`);
  });

// Shelter placement statistics
const inShelterPeople = people.filter((p) => p.Status === "In Shelter");
const withShelterAssignment = inShelterPeople.filter((p) => p.Shelter).length;
const withBedTypeAssignment = inShelterPeople.filter((p) => p["Bed Type"])
  .length;

console.log("\nShelter Placement Statistics:");
console.log(`  People "In Shelter": ${inShelterPeople.length}`);
console.log(`  Assigned to Shelter: ${withShelterAssignment}`);
console.log(`  Assigned Bed Type: ${withBedTypeAssignment}`);

// Provider occupancy breakdown
console.log("\nProvider Occupancy:");
Object.entries(providerOccupancy)
  .sort(([, a], [, b]) => b - a)
  .forEach(([providerId, count]) => {
    const provider = providersData.find((p) => p.id === providerId);
    const name = provider ? provider.fields.Name : providerId;
    console.log(`  ${name}: ${count} people`);
  });

console.log("\n✅ Mock data generation complete!");
