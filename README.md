# MINVÄG — Phase 0 review package

<!-- markdownlint-disable MD013 -->

> **Status:** Review draft, not approved for production build
> **Version:** 0.1
> **Prepared:** 2026-09-02
> **Market:** Sweden only
> **Audience:** Founder, product, design, engineering, legal/privacy, Swedish SYV reviewers

MINVÄG is a proposed Swedish-first, mobile-first education and career navigation service. Its purpose is to help an unsure young person move from **confusion → understanding → realistic options → a possible path → one useful next action**.

The student journey is:

> **JAG → UTFORSKA → MIN VÄG → MINA ALTERNATIV → NÄSTA STEG**
> Internal model: **ME → EXPLORE → MY PATH → MY OPTIONS → NEXT STEP**

The numbered deliverables are documentation. [`prototype/`](prototype/README.md) is a working **non-production, local-only prototype** created from those drafts; it does not change the gate status or authorise production use. The founder asked that all 25 pre-build deliverables be reviewed before production implementation begins.

## Current recommendation

**STOP before production implementation.** Desk research supports the problem, and the proposed architecture can be made safe, but Gates 1–10 are not yet passed. In particular, the problem and UX have not been validated with current Swedish students, parents, or study and career guidance counsellors (SYV). Proceed only with primary research and a non-production clickable prototype. See [Gate review](gate-review.md).

## Run the working prototype

Requirements: Node.js 22 and npm.

```bash
cd prototype
npm install
npm run dev
```

Then open the local URL printed by Vite. The prototype keeps its demonstration
state in the current browser only. Run the complete quality check with:

```bash
cd prototype
npm run check
npm run build
```

## The 25 deliverables

| # | Deliverable | File | Review focus |
| ---: | --- | --- | --- |
| 1 | Product requirements document | [01-prd.md](01-prd.md) | Problem, users, outcomes, guardrails |
| 2 | Student journey | [02-student-journey.md](02-student-journey.md) | Unsure student, struggling student, next action |
| 3 | Parent journey | [03-parent-journey.md](03-parent-journey.md) | Support without takeover |
| 4 | SYV journey | [04-syv-journey.md](04-syv-journey.md) | Human handoff and time savings |
| 5 | Swedish education data map | [05-swedish-education-data-map.md](05-swedish-education-data-map.md) | Authority, freshness, gaps, Gy25 |
| 6 | Competitor analysis | [06-competitor-analysis.md](06-competitor-analysis.md) | Build/integrate/avoid decisions |
| 7 | Feature gap analysis | [07-feature-gap-analysis.md](07-feature-gap-analysis.md) | Defensible white space |
| 8 | MVP scope | [08-mvp-scope.md](08-mvp-scope.md) | Ruthless scope and exclusions |
| 9 | Technical architecture | [09-technical-architecture.md](09-technical-architecture.md) | Modular monolith, provenance, resilience |
| 10 | Database schema | [10-database-schema.md](10-database-schema.md) | Privacy, bitemporal facts, relationships |
| 11 | Education graph schema | [11-education-graph-schema.md](11-education-graph-schema.md) | Branching, versioned pathway claims |
| 12 | AI architecture | [12-ai-architecture.md](12-ai-architecture.md) | Bounded AI; deterministic rules |
| 13 | Agent architecture | [13-agent-architecture.md](13-agent-architecture.md) | Minimal orchestration, no autonomous decisions |
| 14 | Security architecture | [14-security-architecture.md](14-security-architecture.md) | Minor data, threats, least privilege |
| 15 | GDPR/privacy architecture | [15-gdpr-privacy-architecture.md](15-gdpr-privacy-architecture.md) | DPIA, legal basis, child rights |
| 16 | Data provenance architecture | [16-data-provenance-architecture.md](16-data-provenance-architecture.md) | Sources, dates, conflicts, confidence |
| 17 | UX wireframes | [17-ux-wireframes.md](17-ux-wireframes.md) | Swedish mobile flows and source display |
| 18 | Design system | [18-design-system.md](18-design-system.md) | Calm, accessible, non-judgmental UI |
| 19 | API specification | [19-api-specification.md](19-api-specification.md) | Contracts, auth, errors, source metadata |
| 20 | Testing strategy | [20-testing-strategy.md](20-testing-strategy.md) | Rule, data, AI, safety, accessibility |
| 21 | Analytics strategy | [21-analytics-strategy.md](21-analytics-strategy.md) | Useful action, privacy, guardrails |
| 22 | Business model | [22-business-model.md](22-business-model.md) | No pay-to-rank; B2B hypotheses |
| 23 | Pilot strategy | [23-pilot-strategy.md](23-pilot-strategy.md) | Ethical Swedish school validation |
| 24 | Risk register | [24-risk-register.md](24-risk-register.md) | Owners, triggers, stop conditions |
| 25 | Product roadmap | [25-product-roadmap.md](25-product-roadmap.md) | Gate-driven sequence |

## Supporting review artifacts

- [Source register](SOURCES.md) — authoritative and competitor sources, verification dates, confidence, and intended use.
- [Gate review](gate-review.md) — Gates 1–10 with evidence, gaps, and pass criteria.
- [Decision log](DECISIONS.md) — consequential product and architecture decisions.
- [OpenAPI review contract](schemas/openapi.yaml) — machine-readable companion to deliverable 19; not an implemented server.
- [Working local prototype](prototype/README.md) — interactive React/Vite implementation for Gate 2–3 testing; no backend, accounts, analytics or live local datasets.

## Non-negotiable product principles

1. **Student-owned:** MINVÄG supports a decision; it does not make the decision.
2. **Possibilities, not verdicts:** no permanent personality labels and no claim that there is one right career.
3. **Separate concepts:** eligibility, historical admission position, fit, and practical feasibility are never collapsed into one opaque score.
4. **One next action:** offer a small useful action before a long plan.
5. **No dead ends:** show missing requirements, actions, alternatives, and a question to ask a SYV.
6. **Source-visible:** important facts show source, applicability/data date, verification date, and confidence.
7. **Forecast-honest:** facts, trends, forecasts, scenarios, and unknowns are visibly different.
8. **Minor-safe:** data minimisation, private defaults, deletion, encryption, access control, auditability, and child-readable information from inception.
9. **Human escalation:** deterministic rules handle eligibility; qualified humans remain responsible for high-stakes guidance and official admissions.
10. **No commercial distortion:** no pay-to-rank, sponsored recommendations, or behavioural advertising to students.

## Review sequence

1. Founder confirms product intent, scope, and business constraints.
2. Two independent Swedish SYVs review education rules, terminology, and handoff design.
3. Privacy counsel/DPO reviews the proposed controller roles, legal bases, child information, DPIA, and vendors.
4. Security reviewer threat-models account, organisation, AI, and ingestion boundaries.
5. Accessibility specialist reviews the wireframes and design system.
6. Conduct primary research described in the pilot strategy.
7. Update documents and record each gate decision as evidence becomes available. Gates 1–3 and full artifact review precede controlled-pilot implementation; Gates 4–6 precede live minor data; scaled production follows Gate 10.

## Status vocabulary

- **Proposed:** design choice, not validated.
- **Verified fact:** supported by a registered source.
- **Hypothesis:** must be tested with users or buyers.
- **Unknown:** deliberately exposed; must not be filled with invented data.
- **Passed gate:** named reviewer, evidence, date, and approval recorded in `gate-review.md`.
