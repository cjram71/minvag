# MINVÄG decision log

<!-- markdownlint-disable MD013 -->

> **Status:** Proposed decisions for review
> **Last updated:** 2026-09-02

| ID | Decision | Why | Revisit trigger |
| --- | --- | --- | --- |
| D-001 | Sweden only in MVP; every country-specific model carries `country_code` and `framework_version`. | Depth and trust matter more than premature international breadth. | Swedish pilot success and a funded second-country discovery phase. |
| D-002 | Target Grade 8 first, while supporting Grade 9 urgency. | Grade 8 allows exploration before the deadline pressure documented in Grade 9. | Research shows Grade 9 or another cohort has materially higher value. |
| D-003 | Core student service can be explored anonymously; an account is requested only to save a profile/path. | Data minimisation and lower onboarding friction for minors. | A required school integration cannot work without earlier identity. |
| D-004 | Do not request personnummer or BankID in MVP. | Neither is necessary for guidance; both increase privacy and operational risk. | A legally reviewed, necessary use case emerges. |
| D-005 | Grades are manually entered and labelled `self-reported`; no grade-document upload/OCR in MVP. | Avoids document storage and OCR errors while preserving eligibility guidance. | Pilot proves high manual-entry abandonment and a DPIA approves a safer import. |
| D-006 | Eligibility is a deterministic, versioned rule engine. An LLM may explain a computed result but never calculate or override it. | Education rules require reproducibility and auditability. | Never for the calculation; explanation interface may evolve. |
| D-007 | No single “match score.” Show separate eligibility, fit evidence, historical admission context, practical feasibility, and uncertainty. | Prevents false precision and hidden value judgments. | Never without explicit ethics and user evidence review. |
| D-008 | Use PostgreSQL relational tables and recursive queries for the graph in MVP; no graph database. | One datastore is simpler and sufficient for the expected graph size. | Measured query or authoring constraints cannot be solved within PostgreSQL. |
| D-009 | Use a modular monolith plus isolated background workers, not microservices. | Lower operational complexity, clearer transactions, easier privacy controls. | Independent scale, availability, or regulatory boundaries are demonstrated. |
| D-010 | No autonomous multi-agent system. Use a deterministic workflow orchestrator and at most one bounded language-model call per explanatory task. | Reduces cost, latency, injection surface, and untraceable behaviour. | A measured task cannot be solved with tools/workflows and passes safety review. |
| D-011 | Official Swedish sources are authoritative for rules and offerings. Aggregators may accelerate discovery but cannot silently override an authority. | Trust and legal accuracy. | Source governance board explicitly changes precedence for a field. |
| D-012 | Historical cut-offs are context, not a forecast or admission guarantee. | Local supply, demand, and rules change. | Never; only confidence presentation may change. |
| D-013 | Parent access is invited by the student, scoped, time-bound, visible, and revocable. No covert parent monitoring. | Preserves student agency and privacy. | Legal obligation or safeguarding procedure reviewed by counsel. |
| D-014 | A SYV brief is student-generated and student-shared. It contains questions and uncertainty, not a hidden risk label. | Improves human conversations without replacing professional judgment. | Institutional pilot requires an additional lawful workflow with student transparency. |
| D-015 | Do not store diagnoses, protected characteristics, exact home address, or inferred personality. Practical preferences may be stored in neutral language. | They are not necessary for initial guidance and create disproportionate risk. | Explicit user need, necessity test, legal basis, DPIA, and specialist review all pass. |
| D-016 | Core student experience has no ads, sponsored ranking, lead sale, or behavioural targeting. | Commercial incentives must not distort recommendations to minors. | Never for ranking; labelled non-targeted funding acknowledgements require separate review. |
| D-017 | First-party, minimal analytics only; no session replay or free-text prompt capture. | Protects minors and reduces data leakage. | DPIA-approved evidence that another tool is necessary and proportionate. |
| D-018 | AI provider receives pseudonymous, minimized task context; no personal data for model training. Prefer EEA processing and contractual no-training. | Limits third-country and reuse risk. | Vendor review demonstrates an equal or safer arrangement. |
| D-019 | Career-to-education edges are always “possible pathway” claims with provenance, strength, and alternatives. | Real pathways branch and change; correlation is not a requirement. | Never; ontology can be expanded. |
| D-020 | Production implementation is blocked until the 25 artifacts are reviewed and Gates 1–10 are explicitly passed. | Founder directive and high-stakes/minor context. | Only recorded approvals in `gate-review.md`. |
