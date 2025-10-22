# The Many Paths Project

**Collective care coordination for people experiencing street homelessness in Santa Fe**

_Many paths, one community._

---

## About Many Paths

Many Paths fills the critical gap between existing systems—tracking people experiencing street homelessness who fall between UniteUS, Life Link waitlists, and HMIS. Through collective care coordination, we respect individual autonomy while ensuring providers work together.

### The Problem We're Solving

In Santa Fe, people experiencing homelessness move through various systems, but a critical gap exists:

1. **UniteUS** - Serves housing-insecure and food-insecure individuals, but not those already on the streets
2. **THE GAP** ← _This is where Many Paths operates_
3. **Life Link Shelter** - 3-8 month waitlist; people often lose ID, insurance, or Medicaid while waiting
4. **HMIS (The Coalition)** - Only captures people once they enter shelters, creating grossly inaccurate total counts

### Our Approach

- **Know everyone** experiencing street homelessness in Santa Fe in real time
- **Understand individual needs** - medical, mental health, seasonal shelter, ID, ADA accessibility
- **Respect autonomy** - some people don't want shelter, and that's okay
- **Coordinate provider response** through regular case conferencing
- **Tell an accurate story** to the public about homelessness using real data

---

## Tech Stack

This is a [Next.js](https://nextjs.org) application built with:

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling with Public Sans font
- **Airtable** - Data storage
- **React Markdown** - Document rendering with front matter support

---

## Getting Started

### Prerequisites

- Node.js 18+ and Yarn
- Airtable account with API credentials

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/caminos-sf.git
cd caminos-sf
```

2. Install dependencies:

```bash
yarn install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

Add your Airtable credentials to `.env.local`:

```
AIRTABLE_API_KEY=your_api_key
AIRTABLE_BASE_ID=your_base_id
AIRTABLE_PASSWORD=your_password
```

4. Run the development server:

```bash
yarn dev
```

Open [https://localhost:3000](https://localhost:3000) with your browser (note: HTTPS is enabled).

### Development Commands

```bash
yarn dev          # Start development server with Turbopack
yarn dev:clean    # Clean .next and start fresh dev server
yarn build        # Build for production
yarn start        # Start production server
yarn lint         # Run ESLint
```

---

## Project Structure

```
/Users/jeremy/Sites/santa-fe/street-view/
├── docs/                    # Markdown documentation
│   ├── mission.md          # Mission statement
│   ├── manual.md           # Operations manual
│   └── README.md           # Documentation guide
├── public/
│   └── pdfs/               # PDF storage
├── src/
│   ├── app/                # Next.js app directory
│   │   ├── page.tsx        # Homepage
│   │   ├── layout.tsx      # Root layout
│   │   ├── mission/        # Mission page
│   │   ├── manual/         # Operations manual page
│   │   ├── people/         # People list
│   │   ├── encampments/    # Encampments list
│   │   ├── add/            # Add person/encampment forms
│   │   └── api/            # API routes
│   ├── components/         # React components
│   ├── lib/                # Utilities (Airtable, geocoding)
│   ├── types/              # TypeScript types
│   └── styles/             # Global styles
├── package.json
└── README.md
```

---

## Key Features

### By-Name List Management

- Track people experiencing street homelessness
- Record individual needs and preferences
- System status tracking (UniteUS, Life Link, HMIS)

### Encampment Tracking

- Location documentation with geocoding
- Population and condition tracking
- Service coordination

### Collective Care Coordination

- Case conferencing support
- Provider coordination
- Service transaction tracking
- Outflow review process

### Documentation & Public Storytelling

- Mission and operations manual built-in
- Markdown-based content management
- Front matter support for metadata

---

## Scalability

Many Paths is designed to be deployed in multiple cities:

- **Many Paths SF** - Santa Fe, New Mexico (this instance)
- **Many Paths ABQ** - Albuquerque (future)
- **Many Paths [City]** - Additional cities can adopt the system

Each instance maintains its own data while sharing the same core platform and approach.

---

## Privacy & Security

- Password-protected access
- Personally identifiable information (PII) protection
- Release of Information (ROI) consent tracking
- Aggregated data only for public reporting

---

## Contributing

This is a private project for Santa Fe providers. If you're interested in deploying Many Paths in your city, please reach out.

---

## License

[Add appropriate license]

---

## Contact

For more information about Many Paths, please contact [contact information].

---

Built with ❤️ for the people of the wider Santa Fe community.
