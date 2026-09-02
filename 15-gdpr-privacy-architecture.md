# 15 — GDPR and privacy architecture

<!-- markdownlint-disable MD013 -->

> **Status:** Design proposal, not legal advice or completed DPIA
> **Mandatory before pilot:** Swedish privacy counsel/DPO approval, records of processing, DPIA, contracts and child-readable notice testing

## 1. Privacy objectives

- A student can explore without identifying themselves.
- Collect the minimum current observations needed for a named function.
- Keep official facts separate from personal profile data.
- Do not infer personality, ability, health, socioeconomic status or family situation.
- Keep the profile private and sharing student-controlled.
- Make access, correction, export, deletion, restriction and objection workable.
- Use no behavioural ads, pay-to-rank, session replay or data sale.
- Ensure AI/provider processing is optional, minimal and transparent.
- Do not make solely automated legal/similarly significant decisions.

Children’s data merits specific protection. IMY states that a child’s ability to understand consent depends on the situation; for ages 13–16 it must be assessed case by case. [L01](SOURCES.md#privacy-safety-ai-and-accessibility-sources) Age 13 for information-society consent does not make consent automatically valid or the correct legal basis. [L02](SOURCES.md#privacy-safety-ai-and-accessibility-sources)

## 2. Controller scenarios (decision required)

| Scenario | Likely role question | Design consequence |
| --- | --- | --- |
| Direct student account | MINVÄG likely controller for account/guidance; final counsel determination | MINVÄG chooses purpose/means, gives notices, handles rights and legal basis. |
| School-procured, roster-linked service | School/municipality may be controller and MINVÄG processor for defined school purpose; some independent purposes may make MINVÄG separate controller | Data processing agreement, documented instructions, no reuse for MINVÄG recommendations/training. |
| Anonymous public catalogue | MINVÄG controller for essential service/security data | Minimise cookies/logs; no consent wall for essential processing. |
| Student-to-parent/SYV share | Role depends on account/deployment; recipient may act in personal/professional capacity | Exact payload/purpose/expiry, access history and controller notice. |
| Product analytics/research | Controller purpose must be explicit; school instruction alone may not cover product research | Separate necessity/legal-basis/notice; opt-out or consent where required; no dark patterns. |

Do not describe all school deployments as “processor” or all sharing as “consent” without analysing actual purposes and means.

## 3. Processing inventory and legal-basis decision record

Final basis is a legal decision. Candidate matrix for counsel:

| Purpose | Minimum data | Candidate basis to assess | Constraints |
| --- | --- | --- | --- |
| Deliver anonymous catalogue/session | essential cookie/session, coarse technical security data | Legitimate interests or contract/pre-contract, depending service | Balancing/necessity, no tracking. |
| Create/save student account/path | contact credential, profile/path | Contract may be considered for direct service; public task may apply in school context | Assess child capacity and necessity; do not bundle analytics. |
| Deterministic eligibility guidance | self-reported subject results, target, rule | Same delivery basis as requested feature | Not official decision; clear provenance and deletion. |
| Parent/SYV share | selected snapshot, recipient/token, expiry | User-requested service; explicit sharing instruction | “Consent to share” in UX is control, but legal basis still documented. |
| Security/fraud/incident | event metadata | Legitimate interests/legal obligation as applicable | Restricted access/retention; balance child rights. |
| Source correction | report contact optional, claim reference | Legitimate interests/public task depending deployment | Pseudonymous reporting allowed. |
| Product analytics | pseudonymous allowlisted events | Legitimate interests only if necessity/balance pass, otherwise consent or do not process | No raw text/session replay/cross-site IDs. |
| User research | recordings/transcripts/demographics | Separate informed consent/guardian approach per protocol | Not condition of service; withdrawal; separate research store. |
| AI wording | minimized task packet | Same purpose as user-requested function plus vendor processor arrangement | Optional/template alternative; no training. |

Record purpose, basis, necessity, balancing/consent test, controller, recipients, transfer, retention, rights and owner for every processing activity.

## 4. Data minimisation

### Collect

- account email/passkey only to save/recover;
- school year and coarse region only if necessary;
- explicit current interests/preferences;
- self-reported subject outcomes for requested calculation;
- saved options/path/action;
- exact selected sharing payload;
- minimal security telemetry.

### Do not collect in MVP

- personnummer, BankID identity, date of birth;
- exact home address/location history;
- school transcript/document/OCR image;
- diagnosis, health/disability details or support plan;
- ethnicity, religion, sexuality, political views;
- family income/background;
- contacts/social graph;
- voice, face, biometrics or emotion data;
- personality/ability/motivation score;
- free-chat history;
- advertising IDs or third-party browsing.

Accessibility can be met through UI settings (larger text, reduced motion, reading mode) without asking why the user needs them.

## 5. Age-appropriate transparency

Use layered information tested with 13–16-year-olds.

### Layer 1, before profile

```text
Dina val är privata
Du kan prova utan konto. Vi sparar bara sådant du själv väljer att lägga till.
MINVÄG väljer inte åt dig och säljer inte dina uppgifter.
[Se vad som sparas] [Fortsätt utan konto]
```

### Layer 2

- What is saved and why, item by item.
- Whether a result is a rule, source fact, product inference or AI wording.
- Who can see it now.
- How to change/delete/share.
- Retention and contact/complaint routes.

### Layer 3

Full Article 13/14 information, controller identity/contact, DPO where applicable, bases, recipients, transfers, periods/criteria, rights, IMY complaint, automated decision information and source of indirectly obtained data.

No “agree to everything” checkbox. Essential service, optional AI wording, research and notifications are separate choices where choice is the legal/control mechanism.

## 6. Profiling and automated decisions

Personalised option retrieval may be GDPR profiling. Treat it accordingly:

- explicit, inspectable inputs only;
- no protected/special-category inputs or inferred proxies;
- no learning from engagement;
- no official/legal decision or admission probability;
- multiple options, counterpoint and neutral-browse mode;
- ability to correct/reset/object to personalisation;
- logic description in child-readable and professional detail;
- fairness and counterfactual testing;
- human SYV handoff.

IMY guidance limits solely automated decisions with legal or similarly significant effects. [L04](SOURCES.md#privacy-safety-ai-and-accessibility-sources) Product design and marketing must keep MINVÄG advisory. If deployment starts materially determining access, level, support or official plans, stop and reassess GDPR Article 22 and AI Act classification.

## 7. Parent/SYV sharing

- Student initiates, selects fields, previews exact payload, purpose and expiry.
- Default excludes raw grades and private discovery history.
- Recipient identity/type and last access are visible.
- Revoke immediately; recipient then loses service access.
- Download/print warning explains that MINVÄG cannot technically revoke copies already made.
- No parent receives inactivity/browsing/grade alerts.
- No organisation-wide standing student access based only on membership.
- Safeguarding/legal exceptions need a separate, narrowly defined protocol and cannot be hidden in routine sharing.

## 8. Rights architecture

| Right/control | Product workflow |
| --- | --- |
| Information | Layered notices and per-result source/logic sheet. |
| Access | Authenticated dashboard plus formal request route. |
| Portability/export | Machine-readable JSON + accessible human summary; short-lived encrypted link. Scope depends on basis. |
| Rectification | Edit profile; report authority/provider fact; preserve correction trace. |
| Erasure | Immediate account lock and UI removal; queue deletion across DB, objects, queues, analytics linkage/cache; backup expiry/crypto strategy disclosed. |
| Restriction | Freeze personalisation/sharing while preserving only required record. |
| Objection | Turn off personalisation/analytics where applicable; human review of legitimate-interest objection. |
| Withdraw choice/consent | Granular settings without loss of unrelated service. |
| Human intervention | Contact route/SYV handoff; no official automated decision. |
| Complaint | Controller/DPO and IMY contact. |

Identity verification for rights requests must be proportionate and not demand personnummer. Rehearse end-to-end, including processors and backups.

## 9. Retention and deletion

Proposed periods are in [database schema](10-database-schema.md#11-retention-proposal-for-dpia-review). Principles:

- purpose-based, not “keep forever for improvement”;
- short anonymous sessions and share links;
- no model-provider retention/training;
- event analytics aged to approved aggregates;
- separate security-log retention;
- source/public claim history based on licence/audit, not mixed with student records;
- deletion ledger records task completion without retaining deleted content;
- backup restoration re-applies deletion tombstones before service.

## 10. Processors and transfers

Vendor register per service:

- purpose/data categories/data subjects;
- legal entity and role;
- regions and every subprocessor/support location;
- encryption/key/access controls;
- retention/deletion/training terms;
- transfer mechanism and transfer impact assessment;
- government access/remote support risk;
- incident timing, audit evidence and exit/export.

Remote access from outside EEA may be a transfer even if data is stored in the EEA. [L05](SOURCES.md#privacy-safety-ai-and-accessibility-sources) Prefer EEA vendors but assess real access paths.

## 11. DPIA

IMY’s criteria include children, profiling/scoring, new technology and scale; several can apply. [L03](SOURCES.md#privacy-safety-ai-and-accessibility-sources) Treat DPIA as mandatory before pilot.

DPIA must cover:

1. direct and school-deployed purposes/roles;
2. student/profile/grade/share data flows;
3. necessity/proportionality and alternatives;
4. child understanding, power imbalance and valid choice;
5. recommendation/profiling logic and bias;
6. parent/SYV/organisation access;
7. AI, vendors, subprocessors and transfers;
8. source errors and consequential guidance;
9. security, abuse, shared devices and safeguarding;
10. retention, rights and breach handling;
11. residual risks and formal acceptance/consultation decision.

Update after user research, architecture/vendor selection, new data/use case or incident.

## 12. DSA and minors

The DSA’s exact obligations depend on service classification. If MINVÄG becomes an online platform, Article 28 includes high privacy/safety and prohibits profiling-based ads to minors where the provider knows with reasonable certainty the user is a minor. [L08](SOURCES.md#privacy-safety-ai-and-accessibility-sources) The MVP has no public user content and no ads. Apply the Commission’s minors-safety guidance as design practice: private defaults, reporting, age-appropriate design, recommender scrutiny and no manipulative engagement. [L09](SOURCES.md#privacy-safety-ai-and-accessibility-sources)

## 13. Research data

Primary validation is a separate processing activity:

- school/guardian/student information and assent/consent protocol approved before recruitment;
- no teacher coercion or effect on grades/services;
- participant can skip/withdraw;
- use participant codes; contact key stored separately;
- recordings optional and time-limited; transcripts redacted;
- do not import research responses into product profiles;
- compensation equitable and not coercive;
- report minimum-cell aggregates and suppress identifying stories.

## 14. Governance and stop conditions

Named owners: product data owner, DPO/privacy lead, security lead, data steward, safeguarding lead, AI owner and SYV domain lead.

Stop processing/use case if:

- legal basis/controller instruction is unresolved;
- a child cannot understand the choice/notice;
- access scope is broader than expected by students;
- deletion/export cannot complete;
- vendor changes location/training/subprocessor terms without review;
- recommendation materially affects official access or uses prohibited inference;
- unresolved high residual DPIA risk requires consultation.
