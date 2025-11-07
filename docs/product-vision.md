---
title: Many Paths Product Vision
deck: Technology platform that coordinates homeless services and supports people's diverse paths to stable, safe, and healthy lives
---

# Many Paths: Product Vision

## Mission

**Many Paths is a technology platform that coordinates homeless services, empowers individuals experiencing homelessness, and engages communities to support people's diverse paths to stable, safe, and healthy lives.**

We believe that people's journeys toward stability are better supported when providers work together, individuals are treated with dignity and autonomy, and communities are transparently engaged in solutions. We recognize that housing is one path to stability, but not the only one - hence the name "Many Paths."

---

## Core Principles

1. **Coordination over Silos** - Providers working together achieve better outcomes than working alone
2. **Dignity and Consent** - Individuals control their information and participate in decisions about their path
3. **Many Paths, Not One Path** - Success looks different for different people; housing isn't the only measure
4. **Transparency** - Communities deserve to see the reality and progress
5. **Sustainability** - Technology and operations must be sustainable long-term
6. **Scalability** - Solutions should work in multiple communities
7. **Privacy and Security** - HIPAA-compliant, secure, and respectful of sensitive data

---

## Platform Overview

Many Paths is a comprehensive platform with two major components:

### **Provider Coordination Tools** (Restricted Access)

Professional tools for homeless service providers to coordinate care, track resources, and collaborate effectively.

### **Community Engagement Tools** (Public Access)

Public-facing tools that provide transparency, enable donations, and connect community members to services.

---

## Feature Catalog

### Restricted Access Features

#### 1. By-Name List

**Purpose:** Track every person experiencing homelessness by name and coordinate support for their path to stability, safety, and health.

**Description:**
The By-Name List is the core coordination tool that allows all providers to know who is currently experiencing homelessness, what services they're receiving, what their goals are, and what support they need. It replaces siloed spreadsheets and informal knowledge with a shared, real-time view that respects individual paths.

**Key Capabilities:**

- Individual profiles with key demographics (name, DOB, contact info)
- Current living situation and history
- Individual goals and preferences
- Services being provided by which organizations
- Support needs and barriers (income, mental health, substance use, criminal history, etc.)
- Case notes and updates from providers
- Priority scoring (vulnerability, chronic status, etc.)
- Progress tracking toward individual goals
- Outcomes (housing, harm reduction, reunification, stability in place, etc.)

**Users:**

- Case managers
- Outreach workers
- Housing navigators
- Program coordinators
- System administrators

**Data Sensitivity:** HIGH - Contains personally identifiable information (PII) and protected health information (PHI)

**HIPAA Compliance:** Required when health information is included

---

#### 2. Case Conferencing Support

**Purpose:** Facilitate regular coordination meetings where providers discuss complex cases and plan coordinated interventions.

**Description:**
Structured guides and documentation to support regular case conferencing meetings where providers come together to problem-solve for individuals with complex needs.

**Key Capabilities:**

- Case conferencing meeting agendas
- Discussion guides and frameworks
- Decision trees for housing prioritization
- Action item tracking
- Meeting notes and documentation
- Follow-up tracking
- Resource library of best practices
- Problem-solving templates

**Users:**

- Case conference facilitators
- Participating providers
- System coordinators

**Data Sensitivity:** HIGH - Discusses individual cases

**HIPAA Compliance:** Required if health information discussed

---

#### 3. Bed/Capacity Tracker

**Purpose:** Real-time visibility into shelter bed availability and housing unit openings.

**Description:**
Live tracker of available beds across emergency shelters, transitional housing, and permanent supportive housing. Enables rapid placement when openings occur.

**Key Capabilities:**

- Real-time bed availability by facility
- Occupancy rates and trends
- Reservation/hold functionality
- Eligibility criteria by facility
- Waitlist management
- Historical capacity trends
- Forecasting and planning tools
- Notification alerts for openings

**Users:**

- Shelter staff
- Housing navigators
- Emergency responders
- Outreach teams
- System planners

**Data Sensitivity:** LOW to MEDIUM - Facility-level, not individual-level

**HIPAA Compliance:** Generally not required (no PHI)

---

#### 4. Encampment Tracker

**Purpose:** Know where people are living unsheltered and coordinate outreach and services.

**Description:**
Geographic tracker of encampment locations, conditions, number of people, and service needs. Enables coordinated outreach and response.

**Key Capabilities:**

- Map-based view of encampment locations
- Number of people at each site
- Site conditions and needs
- Outreach visit history
- Services provided
- Safety concerns or incidents
- Sanitation service coordination
- Cleanup and closure tracking
- Relocation coordination

**Users:**

- Outreach workers
- City agencies (public works, police, etc.)
- Sanitation services
- Health departments
- Outreach coordinators

**Data Sensitivity:** MEDIUM - Location data can be sensitive

**HIPAA Compliance:** May be required if individual health needs tracked

**Ethical Considerations:** Must balance transparency with privacy and safety. Could be used punitively if not governed carefully.

---

#### 5. Outreach App

**Purpose:** Mobile-friendly tool for outreach workers to document interactions and access information in the field.

**Description:**
Field-optimized mobile interface that allows outreach teams to update the By-Name List, record interactions, check bed availability, and coordinate services from their phones or tablets.

**Key Capabilities:**

- Mobile-optimized interface
- Quick updates to By-Name List
- Photo documentation (with consent)
- GPS location tagging
- Offline capability
- Quick access to resource information
- Real-time bed availability check
- Emergency contact information
- Safety features for outreach workers
- Voice notes and transcription

**Users:**

- Street outreach workers
- Mobile crisis teams
- Peer support specialists
- Volunteers conducting outreach

**Data Sensitivity:** HIGH - PII and PHI in field settings

**HIPAA Compliance:** Required, with extra attention to mobile security

---

#### 6. Shared Documentation

**Purpose:** Centralized repository of resources, protocols, and best practices for all providers.

**Description:**
Knowledge base and resource library that ensures all providers are working from the same protocols, have access to the same resources, and can learn from shared best practices.

**Key Capabilities:**

- Housing resource directory (landlords, programs, funding sources)
- Standard operating procedures
- Assessment tools and forms
- Training materials
- Policy documents
- Best practice guides
- FAQ and troubleshooting
- Contact lists and org charts
- Community resource database
- Document version control

**Users:**

- All provider staff
- New staff onboarding
- System administrators
- Training coordinators

**Data Sensitivity:** LOW - Public or internal organizational information

**HIPAA Compliance:** Generally not required unless documents contain PHI

---

### Public Access Features

#### 7. Public Dashboard

**Purpose:** Transparent, aggregate data showing the state of homelessness in Santa Fe.

**Description:**
Public-facing dashboard that shows real-time (or near real-time) aggregate statistics about homelessness in the community, progress toward supporting stability, and system performance.

**Key Capabilities:**

- Total number experiencing homelessness (point-in-time)
- Inflow (newly homeless) and outflow (achieving stability goals) trends
- Average time to achieve stability
- Demographics (age, gender, household type)
- Geographic distribution
- Veterans, chronically homeless, families
- Positive outcomes this month/year (housing, harm reduction, stabilization, reunification, etc.)
- Shelter capacity and utilization
- Service connections made
- Goals and progress toward supporting all paths to stability
- Year-over-year comparisons
- Interactive charts and visualizations

**Users:**

- General public
- Policymakers
- Media
- Researchers
- Funders and donors
- Advocacy organizations

**Data Sensitivity:** LOW - Only aggregate, de-identified data

**HIPAA Compliance:** Not required (no individual data)

**Design Principles:**

- Clear, easy to understand visualizations
- Mobile-friendly
- Regularly updated (at least monthly)
- Context and explanations provided
- Avoids sensationalism while being honest
- Shows both challenges and progress

---

#### 8. Donation of Goods Support

**Purpose:** Coordinate material donations to meet real-time needs of providers and individuals.

**Description:**
Public-facing tool where providers can post current needs (clothing, toiletries, sleeping bags, etc.) and community members can respond with donations.

**Key Capabilities:**

- Current needs list by organization
- Specific items requested
- Quantity needed
- Drop-off locations and hours
- Donation status (still needed/fulfilled)
- "Not needed" list (avoid unwanted donations)
- Seasonal needs updates
- Wishlist for planned programs
- Volunteer opportunities related to donations
- Impact stories (how donations helped)

**Users:**

- Community members wanting to donate
- Provider organizations posting needs
- Volunteer coordinators
- Donation drop-off locations

**Data Sensitivity:** LOW - Organizational needs, not individual

**HIPAA Compliance:** Not required

---

#### 9. Financial Donations

**Purpose:** Accept and direct monetary contributions to homeless services.

**Description:**
Online donation processing integrated with the platform, allowing community members to make tax-deductible donations that support operations.

**Key Capabilities:**

- Secure online donation forms
- One-time and recurring donations
- Designated giving (specific programs/needs)
- General operating support
- Donor recognition options (public/anonymous)
- Tax receipts automatically generated
- Donation impact calculator/examples
- Transparent reporting on fund usage
- Integration with nonprofit's accounting
- Donor management and communications

**Users:**

- Individual donors
- Corporate giving programs
- Foundation funders
- Nonprofit finance staff

**Data Sensitivity:** MEDIUM - Donor information, payment details

**HIPAA Compliance:** Not required (financial data, not health data)

**Technical Requirements:**

- PCI-DSS compliant payment processing
- Integration with Stripe, PayPal, or similar
- Operates through fiscal sponsor's nonprofit status for tax deductibility

---

#### 10. Provider Directory

**Purpose:** Comprehensive, searchable directory of all homeless service providers in Santa Fe.

**Description:**
Public-facing directory that makes it easy for anyone to find services, understand eligibility, and make connections.

**Key Capabilities:**

- Searchable by service type
- Filter by eligibility criteria
- Location and contact information
- Hours of operation
- Services offered
- Eligibility requirements
- How to access services
- Languages spoken
- Accessibility information
- Map view of providers
- Mobile-friendly for people in need
- Printable resource guides

**Users:**

- Individuals seeking help
- Family members looking for resources
- Case managers making referrals
- 211 operators
- First responders
- Anyone needing to connect to services

**Data Sensitivity:** LOW - Public organizational information

**HIPAA Compliance:** Not required

---

#### 11. Updates from Providers and City

**Purpose:** Keep community informed about progress, policy changes, success stories, and news.

**Description:**
Public-facing news/blog section with updates from the coordinated homeless response system.

**Key Capabilities:**

- News posts from providers and city
- Success stories (with consent)
- Policy updates and changes
- New programs or services launching
- Event announcements
- Volunteer opportunities
- Media coverage and press releases
- Subscribe via email
- Share on social media
- Archive of past updates
- RSS feed

**Users:**

- General public
- Media outlets
- Advocacy organizations
- Stakeholders and partners
- People interested in staying informed

**Data Sensitivity:** LOW - Public information, carefully vetted stories

**HIPAA Compliance:** Not required (any individual stories require consent and are de-identified or consent for full identification)

---

## Target Users

### Primary Users (Restricted Access)

**Case Managers**

- Use By-Name List daily
- Participate in case conferencing
- Check bed availability
- Document services provided

**Outreach Workers**

- Use Outreach App in the field
- Update encampment tracker
- Record contacts and needs
- Access resource information

**Housing Navigators**

- Use By-Name List for housing search
- Track bed/unit availability
- Coordinate move-ins
- Document barriers and progress

**System Coordinators**

- Facilitate case conferencing
- Generate reports and metrics
- Manage user access
- Ensure data quality

**Provider Leadership**

- Review aggregate data and trends
- Access shared documentation
- Participate in strategic planning
- Coordinate across organizations

### Secondary Users (Public Access)

**Community Members**

- View public dashboard
- Make donations (goods and financial)
- Find provider information
- Stay informed through updates

**Policymakers**

- Monitor dashboard for decision-making
- Understand system performance
- Justify funding and policy decisions

**Media and Advocates**

- Access accurate data for reporting
- Track progress and challenges
- Share stories and updates

**Researchers**

- Access aggregate data (with permissions)
- Study what's working
- Evaluate interventions

---

## Technical Considerations

### Platform Requirements

**Accessibility:**

- Mobile-responsive design for all features
- Offline capability for outreach app
- Low-bandwidth optimization for field use
- Accessible to users with disabilities (WCAG 2.1 AA)
- Multiple language support (English/Spanish minimum)

**Security:**

- Role-based access control
- Audit logging of all data access
- Encryption at rest and in transit
- Regular security assessments
- Incident response plan
- Data breach notification procedures

**HIPAA Compliance:**

- Business Associate Agreements with all technology vendors
- HIPAA Security Rule technical safeguards
- HIPAA Privacy Rule policies and procedures
- Staff training on HIPAA requirements
- Regular risk assessments
- Secure authentication (2FA)

**Integration:**

- API access for approved partners
- Data import/export capabilities
- Integration with HMIS (if required)
- Webhook support for notifications
- Standard data formats (CSV, JSON, XML)

**Performance:**

- Fast load times (<3 seconds)
- Real-time updates for bed tracker
- Reliable uptime (99.9% SLA)
- Scalable to 1000+ tracked individuals
- Support for 100+ concurrent users

---

## Data Governance

### Consent and Privacy

**Individual Consent:**

- Individuals must provide informed consent before data sharing
- Clear explanation of who sees what information
- Ability to revoke consent at any time
- Partial consent options (share with some providers, not all)
- Verbal consent documented if written not possible
- Consent forms in multiple languages

**Data Minimization:**

- Only collect data necessary for coordination
- Avoid "nice to know" fields that aren't used
- Regular review of what data is actually needed
- Purge unused or outdated information

**Access Controls:**

- Role-based permissions (see only what you need)
- Individual-level permissions possible
- Audit trail of who accessed what data
- Regular access reviews and updates
- Immediate revocation when staff leave

### Data Sharing Boundaries

**Never Shared Publicly:**

- Individual names or identifiable information
- Specific locations of individuals
- Details that could identify someone
- Medical or health information
- Case notes or assessments

**Shared Among Providers (with consent):**

- Coordination information
- Services being provided
- Housing search status
- Contact information
- Barriers and needs

**Shared Publicly (aggregate only):**

- Counts and statistics
- Trends and patterns
- System-level performance
- De-identified success stories (with explicit consent)

---

## Roadmap and Phasing

### Phase 1: Foundation (Months 1-3)

**Goal:** Prove coordination value with core features

- **By-Name List** (basic version) - tracking individual goals and paths
- **Case Conferencing Support** (basic guides) - respecting diverse definitions of success
- **Provider Directory** (public)
- **Public Dashboard** (basic metrics) - showing diverse outcomes

**Success Metrics:**

- 3-5 providers actively using By-Name List
- Monthly case conferencing meetings established
- 20+ individuals tracked with their goals documented
- Public dashboard launched showing diverse paths to stability

---

### Phase 2: Expansion (Months 4-6)

**Goal:** Add real-time coordination tools

- **Bed/Capacity Tracker**
- **Encampment Tracker**
- **Donation of Goods Support**
- Enhanced By-Name List features

**Success Metrics:**

- Real-time bed availability used for placements
- Encampments mapped and outreach coordinated
- Community donations coordinated through platform
- 50+ individuals tracked

---

### Phase 3: Mobile and Community (Months 7-9)

**Goal:** Field tools and deeper community engagement

- **Outreach App**
- **Financial Donations**
- **Updates/News Section**
- Enhanced public dashboard

**Success Metrics:**

- Outreach teams using mobile app daily
- Online donations processing
- Regular community updates published
- 100+ individuals tracked

---

### Phase 4: Optimization (Months 10-12)

**Goal:** Refine, improve, and scale

- **Shared Documentation** enhanced
- API access for partners
- Advanced reporting and analytics
- System integration with HMIS/other tools
- Performance optimization

**Success Metrics:**

- Measurable reduction in time to achieve individual goals
- High user satisfaction from providers and individuals
- Strong community engagement with public tools
- Demonstrated respect for diverse paths to stability
- Ready to scale to other cities

---

## Success Metrics

### System-Level Outcomes

**Primary:**

- Reduction in average time to achieve stability goals
- Increase in positive outcomes (housing, harm reduction, health stabilization, etc.)
- Reduction in crisis interventions needed
- Progress toward supporting all paths to stability
- Individual goal achievement rates

**Secondary:**

- Number of providers actively participating
- Number of individuals in By-Name List
- Case conferencing meeting attendance
- Resource tracker usage and connection speed
- Respect for individual choice and autonomy

### User Adoption Metrics

- Daily active users (providers)
- Login frequency
- Feature usage rates
- Mobile app adoption
- Case notes and updates frequency

### Community Engagement Metrics

- Public dashboard page views
- Donations received (goods and financial)
- Provider directory searches
- Email newsletter subscribers
- Social media engagement

### Quality Metrics

- Data completeness
- Data accuracy
- Consent documentation rate
- Provider satisfaction scores
- Individual satisfaction (where measured)

---

## Scalability to Other Cities

### Replication Model

**What stays the same:**

- Core technology platform
- Feature set and capabilities
- Data governance framework
- Best practices and protocols

**What's customized:**

- Local provider network
- Community branding and messaging
- Specific workflows and processes
- Integration with local systems
- Data fields specific to local needs

### Requirements for New Cities

- Willing provider partners (minimum 3-5)
- Local nonprofit to serve as data custodian
- City/funder commitment to sustainability
- Community buy-in and support
- Local champion to coordinate launch

### Many Paths as a Service

The platform can be offered to other communities as a service:

- Many Paths provides technology platform
- Local nonprofit operates program
- City/funders contract for services
- Pricing based on community size and needs
- Shared learning across communities

---

## Open Questions and Future Considerations

### Lived Experience Integration

- How can people with lived experience of homelessness participate in governance?
- Should there be a peer advisory committee?
- How do we compensate people for their time and expertise?

### Data Ownership and Portability

- What happens if someone moves to another city?
- How do we handle data portability?
- Who owns the data in the long term?

### Integration with Existing Systems

- How does Many Paths relate to HMIS?
- Should there be a bidirectional data sync?
- What about 211 and other coordination systems?

### Sustainability and Revenue Model

- What's the right pricing for cities of different sizes?
- Should small nonprofits pay anything?
- Foundation grants vs. city contracts vs. subscription?

### Advocacy and Policy

- Should the platform include advocacy tools?
- How do we balance coordination with systems change?
- Role in policy development and implementation?

---

## Competitive Landscape

### Similar Platforms

**Unite Us**

- Coordination platform for social services and healthcare
- For-profit, venture-backed
- Broader than homelessness (all social determinants of health)
- Expensive for smaller communities

**CaseWorthy**

- Case management software for human services
- Includes homeless services modules
- Traditional software vendor model
- Less focused on public engagement

**HMIS (Homeless Management Information Systems)**

- Required for HUD-funded homeless services
- Primarily for reporting to HUD
- Often clunky and not user-friendly
- Limited public transparency features

**BuiltForZero**

- National initiative to end homelessness
- Provides methodology and support
- Not a software platform (communities use various tools)
- Many Paths could be the technology implementing BuiltForZero methods

### Many Paths Differentiation

1. **Public Engagement:** Unique focus on community transparency and participation
2. **Lightweight:** Designed for smaller cities, not just large metros
3. **Affordable:** Sustainable pricing for under-resourced communities
4. **Mobile-First:** Built for field workers from the start
5. **Open Approach:** Potential for open-source components
6. **Lived Experience:** Commitment to centering voices of those experiencing homelessness

---

## Long-Term Vision

**In 3 years:**

- Operating in 10+ New Mexico communities
- Proven improvement in supporting people's paths to stability where implemented
- National model for transparent, coordinated, dignity-centered homeless response
- Sustainable revenue model supporting ongoing innovation
- Active peer advisory committee with lived experience guiding development

**In 5 years:**

- Expanding beyond New Mexico to similar-sized communities nationally
- Open-source some components for broad adoption
- Training program for implementation in new cities
- Research partnerships demonstrating effectiveness of respecting diverse paths
- Policy influence at state and federal levels

**In 10 years:**

- Contributed to measurable improvement in stability and well-being for thousands
- Standard platform for smaller cities' homeless response
- Network of communities learning from each other
- Changed the conversation from "ending homelessness" to "supporting many paths"
- Evolved to meet changing needs and innovations
- Sustainable social enterprise supporting the mission

---

## Contact and More Information

**Many Paths Platform**

- Website: [To be developed]
- Email: [Contact information]
- Documentation: [Link to technical docs]
- GitHub: [If open source components]

**For Santa Fe Implementation:**

- Jeremy Zilar, Founder
- EAD Design
- [Contact information]

**To Implement in Your Community:**

- [Contact information]
- [Partnership inquiry form]

---

_This is a living document. Last updated: [Date]_
_Feedback and suggestions welcome: [Contact]_
