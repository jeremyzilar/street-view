# Data Governance Framework

## Santa Fe Street View By-Name List

**Last Updated:** October 2025  
**Version:** 1.0 - For Provider Review

---

## Purpose

This document explains how data is owned, protected, and managed in the Santa Fe Street View By-Name List system. It's designed to help service providers understand the legal and operational framework that protects sensitive client information.

---

## Legal Structure

### Who Owns the Data?

**Legal Data Custodian:** [FISCAL SPONSOR NAME]  
_[501(c)(3) nonprofit organization]_

As the fiscal sponsor and legal entity, [FISCAL SPONSOR NAME] serves as the legal custodian of all data in the By-Name List system. They hold ultimate legal responsibility and authority over data governance.

### Who Operates the System?

**Project Director:** Jeremy [Last Name]  
**Operational Role:** Day-to-day system management and provider coordination

The Project Director operates the system under the authority of [FISCAL SPONSOR NAME], implementing data policies and managing provider relationships.

### Your Role as Provider

**Data Contributors:** You share information about clients you serve  
**Data Users:** You access aggregated information to coordinate care  
**Data Partners:** You help govern how data is used through advisory participation

---

## HIPAA Compliance

### Business Associate Agreements (BAAs)

✓ **Airtable (Database Platform):** BAA executed by [FISCAL SPONSOR NAME]  
✓ **Vercel (Hosting Platform):** BAA executed by [FISCAL SPONSOR NAME]

These agreements legally obligate our technology vendors to:

- Protect health information according to HIPAA standards
- Implement required security safeguards
- Notify us of any data breaches
- Limit use of data to specified purposes

### Your BAA with Santa Fe Street View

When you join as a data-sharing provider, [FISCAL SPONSOR NAME] will execute a BAA with your organization defining:

- What data you will share
- How shared data will be protected
- Permitted and prohibited uses
- Your rights to audit and review
- Breach notification procedures

---

## What Data is Collected?

### Required Minimum Data

To coordinate services effectively, the system maintains:

**Identifying Information:**

- Name (or alias if preferred)
- Date of birth
- Basic demographics
- Unique identifier

**Service Information:**

- Current location/encampment
- Service history (which providers engaged)
- Housing status
- Basic needs assessment

**Provider Information:**

- Which organizations have worked with individual
- Type of services provided
- Dates of engagement
- Current case status

### What Data is NOT Collected

We intentionally do not collect:

- Medical diagnoses or treatment details
- Substance use specifics
- Criminal history
- Social Security numbers (unless required for specific services)
- Detailed case notes or clinical information

**Principle:** Collect only what's needed for coordination, not comprehensive case management.

---

## Data Access Controls

### Role-Based Access

Not everyone sees everything. Access is controlled by role:

**Street Outreach Team:**

- View: Basic information and location data for active outreach
- Edit: Update location, contact information, immediate needs
- Scope: Individuals they are actively engaging

**Service Provider Coordinators:**

- View: Service history, current providers, coordination needs
- Edit: Update service connections, program enrollment
- Scope: Individuals connected to their programs

**Housing Coordinators:**

- View: Housing history, barriers, readiness assessments
- Edit: Update housing status, placement information
- Scope: Individuals in housing placement process

**System Administrator:**

- View: All data for system management
- Edit: Technical configuration, user access management
- Scope: System-wide (with audit trail)

**City Officials/Funders:**

- View: De-identified aggregate data and statistics only
- Edit: None
- Scope: Community-wide trends, no individual identification

### What This Means for You

1. **You control what you share:** You decide what information about your clients to add
2. **You see what you need:** Access is limited to coordination purposes
3. **Others can't see your case notes:** Detailed case management stays in your system
4. **Everything is logged:** All access and changes are recorded

---

## Data Security Measures

### Technical Safeguards

✓ **Encryption:** All data encrypted in transit (HTTPS/TLS) and at rest  
✓ **Authentication:** Secure login with individual user accounts  
✓ **Authorization:** Role-based access controls (see above)  
✓ **Audit Logs:** Complete record of who accessed what and when  
✓ **Backups:** Regular encrypted backups with secure storage  
✓ **Monitoring:** Automated alerts for suspicious access patterns

### Organizational Safeguards

✓ **Training:** All users complete HIPAA and data privacy training  
✓ **Policies:** Written data security policies and procedures  
✓ **Agreements:** BAAs with all technology vendors and partners  
✓ **Incident Response:** Protocol for responding to breaches or concerns  
✓ **Regular Review:** Quarterly security audits and updates

### Physical Safeguards

✓ **Cloud-based:** No physical servers to secure  
✓ **Device Security:** Access only from password-protected devices  
✓ **Screen Timeouts:** Automatic logout after inactivity  
✓ **No Downloads:** Bulk data export restricted to authorized roles

---

## How Data Can Be Used

### Permitted Uses

✅ **Service Coordination:** Connecting individuals to appropriate services  
✅ **Avoiding Duplication:** Knowing what services someone is already receiving  
✅ **Measuring Progress:** Tracking community-wide reduction in homelessness  
✅ **Resource Planning:** Understanding service gaps and needs  
✅ **Reporting to Funders:** De-identified aggregate data for grant reporting  
✅ **Quality Improvement:** Making the system more effective over time

### Prohibited Uses

❌ **Marketing or Solicitation:** Never sold or shared for commercial purposes  
❌ **Law Enforcement:** Not accessible to police without individual consent or legal process  
❌ **Employment Screening:** Cannot be used for background checks  
❌ **Public Identification:** Individual information never made public  
❌ **Discriminatory Purposes:** Never used to deny services or housing  
❌ **Research Without Approval:** No research use without IRB approval and consent

---

## Individual Rights and Consent

### Client Consent

**Approach:** Individuals are informed when their information is added to the system and can:

- Request to see what information is recorded about them
- Request corrections to inaccurate information
- Request removal from the system (with understanding of service implications)
- Specify which providers can access their information

**Implementation:** Providers obtain and document informed consent using standard form.

### Right to Access

Individuals can request:

1. **What information** is in the system about them
2. **Who has accessed** their information and when
3. **Corrections** to any inaccurate data
4. **Restrictions** on sharing with specific providers

**Process:** Requests handled within 10 business days through Project Director or provider contact.

---

## Provider Rights and Responsibilities

### Your Rights as Data-Sharing Provider

✓ **Access Review:** Request information about data access patterns  
✓ **Policy Input:** Participate in data governance advisory committee  
✓ **Audit Access:** Verify security measures are being implemented  
✓ **Data Correction:** Update or correct data your organization contributed  
✓ **Exit Option:** Withdraw from participation with appropriate notice  
✓ **Breach Notification:** Be informed immediately of any security incidents

### Your Responsibilities

✓ **User Training:** Ensure your staff complete required training  
✓ **Access Management:** Notify us promptly when staff leave or change roles  
✓ **Data Quality:** Enter accurate, up-to-date information  
✓ **Confidentiality:** Maintain confidentiality of information accessed  
✓ **Incident Reporting:** Report suspected security incidents immediately  
✓ **Policy Adherence:** Follow data use policies and access restrictions

---

## Breach Notification

### If There's a Security Incident

**We Will:**

1. Investigate immediately (within 24 hours)
2. Notify affected providers within 48 hours
3. Notify affected individuals as required by law
4. Document incident and response
5. Implement corrective measures
6. Report to regulatory authorities if required

**You Should:**

1. Report suspected incidents immediately to Project Director
2. Preserve any evidence (screenshots, logs, etc.)
3. Cooperate with investigation
4. Notify your own affected clients if appropriate

**Contact for Incidents:**  
Email: [security contact]  
Phone: [emergency contact]  
Available 24/7 for security emergencies

---

## Data Retention and Deletion

### Retention Period

**Active Records:** Maintained while individual is receiving services or homeless  
**Historical Records:** Retained for 7 years after housing placement or last service  
**Aggregate Data:** De-identified trend data retained indefinitely for analysis

### Deletion Process

**When individual is housed and stable:**

- Personal identifiers removed from active system
- Aggregate historical data retained (no personal identification)
- Provider access restricted to historical view only

**When individual requests deletion:**

- Review request with individual to ensure understanding
- Remove from active system within 30 days
- Maintain minimal audit trail for compliance (dates and aggregate data only)

---

## Governance and Oversight

### Provider Advisory Committee

**Purpose:** Give providers voice in how system operates and evolves

**Composition:**

- Representatives from each participating provider organization
- Individuals with lived experience of homelessness
- Project Director
- [FISCAL SPONSOR NAME] representative

**Responsibilities:**

- Review data policies and procedures
- Advise on system improvements
- Address provider concerns and questions
- Recommend changes to data governance

**Meetings:** Monthly during implementation, quarterly once established

### Lived Experience Advisory Group

**Purpose:** Center voice of people experiencing homelessness in system design

**Approach:**

- Paid stipends for participation
- Regular feedback sessions
- Input on data collection and consent processes
- Review of materials and communications

---

## Questions and Concerns

### How to Get More Information

**Project Director:** Jeremy [Last Name]  
**Email:** [contact email]  
**Phone:** [contact phone]

**Fiscal Sponsor:** [FISCAL SPONSOR NAME]  
**Email:** [sponsor contact]  
**Phone:** [sponsor phone]

### Common Questions

**Q: What if I don't want certain information in the system?**  
A: You control what you share. Share only what's needed for coordination.

**Q: Can I see who accessed my clients' information?**  
A: Yes, audit logs available upon request for your clients.

**Q: What if I disagree with how data is being used?**  
A: Bring concerns to Provider Advisory Committee or directly to Project Director.

**Q: Can I stop participating?**  
A: Yes, with 30-day notice. Your historical data contributions will be retained for continuity.

**Q: What if my organization's HIPAA officer has questions?**  
A: We welcome direct contact and are happy to provide additional documentation.

---

## Continuous Improvement

This data governance framework will evolve based on:

- Provider feedback and concerns
- Changing legal requirements
- Technology updates
- Community needs

**Version History:**

- v1.0 (October 2025): Initial framework for provider review
- Updates will be shared with all providers and posted publicly

---

## Agreement and Sign-Off

By participating in the Santa Fe Street View By-Name List, your organization agrees to:

✓ Comply with this data governance framework  
✓ Complete required HIPAA and security training  
✓ Execute Business Associate Agreement with [FISCAL SPONSOR NAME]  
✓ Maintain confidentiality of accessed information  
✓ Report security incidents promptly  
✓ Participate in governance and continuous improvement

**Your organization will formally sign:**

- Business Associate Agreement
- Data Sharing Agreement
- Memorandum of Understanding

These agreements incorporate this data governance framework by reference.

---

_This framework embodies mutual aid principles of transparency, community control, and solidarity while meeting legal requirements for data protection._
