# 24 — Risk register

<!-- markdownlint-disable MD013 -->

> **Status:** Initial review register
> **Scale:** Likelihood `Low/Medium/High`; impact `Moderate/High/Critical`
> **Rule:** a red/high residual risk is not accepted by silence; it needs named authority, date and review trigger

## Register

| ID | Risk | L | I | Leading indicator/trigger | Prevention/mitigation | Contingency / stop condition | Owner |
| --- | --- | :---: | :---: | --- | --- | --- | --- |
| R-01 | Product problem is already adequately solved or not important enough | M | H | Students prefer official/existing tools; weak recurring job | Disconfirming interviews and baseline tasks before build | Stop/reposition if Gate 1 fails | Product research |
| R-02 | Interface increases pressure or feels like a test | M | H | “Right answer” behaviour, abandonment, distress, deterministic teach-back | “I don’t know,” skip, mutable profile, no score/progress pressure; prototype rounds | Stop affected flow; rewrite/retest Gate 2 | Design/research |
| R-03 | Eligibility rule wrong/outdated | M | C | Golden/source mismatch, correction, authority change | Versioned DSL, authority claims, dual SYV review, mutation tests, change monitor | Block/suppress affected evaluations; notify impacted users; incident review | Domain/rule owner |
| R-04 | Missing input shown as not eligible | M | C | `unknown` rate anomaly, user/SYV report | Three-state logic, property tests, API enum contract | Kill eligibility use case until fixed | Engineering + domain |
| R-05 | Historical cut-off read as admission guarantee | H | H | Teach-back says “I will get in”; forecast-like copy | Separate panels; year/round/group; no probability; comprehension gate | Remove comparison feature in affected source/flow | Product content |
| R-06 | Local admission data is incomplete/inconsistently licensed | H | H | Region gaps, PDF ambiguity, terms changes | Coverage audit, official regional precedence, pilot regions, no blanket completeness | Show unavailable/link-out; do not launch national historical claim | Data owner/legal |
| R-07 | Planned offering/open-house data stale | H | H | SLA breach, school correction, expired event | Daily/seasonal refresh, expiry, provider source and stale banner | Suppress event/mark planned; create verify action | Data steward |
| R-08 | Source poisoning/parser compromise | M | C | Schema/volume anomaly, malicious content, unexpected egress | Allowlist, sandbox, size/type limits, staging/quarantine, hashes, dual critical review | Roll back dataset, rotate credentials, suppress claims | Security + data |
| R-09 | Education→occupation edge overstates causality | H | H | “leads to/guarantees” copy, SYV disagreement | Typed possible/common/direct edges, evidence, review, no transitive inference | Suppress edge/path and notify affected saved paths | Graph/domain owner |
| R-10 | Recommendation narrows by gender/class/geography stereotype | M | C | Counterfactual/exposure disparity, student report | No protected features/proxies, diverse candidates, neutral browse, audits, student advisory review | Pause personalisation; use neutral catalogue; investigate | Fairness/product owner |
| R-11 | Current grades become a judgment of potential | M | H | Ineligible options disappear; harmful language | Grades only for eligibility; aspiration remains; constructive alternative/next action | Disable eligibility filter/ranking coupling | Product/domain |
| R-12 | Opaque score emerges through internal optimisation | M | H | UI/API “match %”; one score controls order | Explicit dimension contracts, forbidden schema fields, architecture review | Remove score/order and rerun fairness/comprehension | Product + engineering |
| R-13 | Parent mode enables coercion/surveillance | M | C | Student cannot predict scope; sharing pressure; repeated access attempts | Student preview, minimum scopes, expiry/revoke/access log, no alerts/standing account | Pause parent mode and safeguarding review | Privacy/safeguarding |
| R-14 | SYV brief becomes hidden assessment/official record | M | H | Staff stores/treats as diagnosis; asks for bulk access | Student-owned questions, disclaimers, no hidden labels/write-back, training/contracts | Suspend organisation/feature; delete inappropriate copies where controllable | SYV lead/privacy |
| R-15 | Cross-student/tenant data access | M | C | BOLA test/denial anomaly/incident | RLS + service policy, opaque IDs, narrow grants, MFA, independent test | Immediate containment, breach process, pause service | Security lead |
| R-16 | Share token leaks via URL/referrer/log | M | C | Token detected in telemetry/history | URL fragment bootstrap, auth header, high entropy/hash, no referrer/analytics, tests | Revoke all affected tokens and rotate flow | Security lead |
| R-17 | Shared-device exposes minor data | H | H | Support reports, persistent cache/session | Anonymous short expiry, no sensitive service-worker cache, logout/session controls, neutral notifications | Remote revoke; shorten sessions; redesign before broader pilot | Security/design |
| R-18 | Deletion/export fails across systems/backups/vendors | M | C | Reconciliation mismatch, overdue privacy request | Data map, orchestrated idempotent jobs, vendor APIs, tombstones, rehearsals | Stop new collection/use case; manual remediation/notification | Privacy + engineering |
| R-19 | Legal basis/controller roles invalid or unclear | M | C | Partner instructions conflict; counsel/DPO objection | Scenario-specific analysis/DPIA/contracts; purpose separation | Do not process/live-pilot until resolved | DPO/legal |
| R-20 | Child consent/notice is not understood or freely given | M | C | Teach-back failure, teacher/parent pressure | Layered child-readable notice, anonymous core, separate optional choices, research assent protocol | Stop optional processing/recruitment and redesign | DPO/research |
| R-21 | Unlawful/uncontrolled third-country transfer | M | C | Vendor subprocessor/support/model terms change | EEA-first, data minimisation, TIA/SCC as needed, vendor monitor/exit | Kill vendor use case, template fallback, migrate/delete | DPO/vendor owner |
| R-22 | AI invents fact, changes result or gives deterministic advice | M | C | Citation/schema failure or harmful report | Closed packet, immutable rule, one call, schema/ID checks, template fallback, eval/red team | Global use-case kill switch; incident review | AI owner |
| R-23 | Prompt injection/source text exfiltrates data | M | C | Adversarial test/provider anomaly | No model tools/secrets/web, source sanitisation, delimiters, minimum packet | Disable AI/adapter, security response | AI + security |
| R-24 | Product drifts into AI Act high-risk intended use without controls | M | C | Marketing/deployment influences access, level, official plans | Intended-use policy, legal review, no official decisions, change gate and high-risk disciplines | Stop deployment/use, reclassify/conformity programme | Legal/AI owner |
| R-25 | Distressed student expects counselling/24-7 monitoring | M | C | Crisis disclosure/report outside staffed hours | Clear scope/hours, static urgent support, no AI counselling, pilot safeguarding contacts | Trigger reviewed emergency/support protocol; pause if duty unclear | Safeguarding lead |
| R-26 | Accessibility blocks a core choice | M | H | Manual/disabled-user test fail, support report | WCAG 2.2 AA, semantic UI, path list, reflow/AT tests, specialist review | Block release/disable inaccessible feature | Accessibility owner |
| R-27 | Labour/salary signal steers prestige or promises work | M | H | Students cite salary as guaranteed; low-paid routes suppressed | Secondary placement, distributions/year/horizon, no ranking impact, forecast labels | Remove affected signal/recommendation use | Content/data owner |
| R-28 | Commercial buyer requests ranking, leads or individual monitoring | H | H | Procurement requirement/conflict | Public independence policy, contract prohibitions, architecture separation | Decline customer; Gate 10 cannot pass on conflicted revenue | CEO/product governance |
| R-29 | Close competitors eliminate differentiation | H | H | Comparative tests show no meaningful gain; switching resistance | Test against Digital SYV/Skoolie/official tools; focus clarity/provenance/action | Stop/narrow to defensible workflow | Founder/product |
| R-30 | Data stewardship/support cost makes model unsustainable | H | H | Corrections, local feeds, onboarding overwhelm ACV | Pilot cost attribution, limited regions, automate validation not semantics, standard package | Do not national-expand; narrow data/product or stop | CEO/finance/data |
| R-31 | Procurement cycle/runway mismatch | H | H | Long security/DPA/procurement, no budget owner | Early buyer discovery, paid/committed pilot structure, reusable assurance pack, downside plan | Reduce burn/scope; funding/stop point | CEO/finance |
| R-32 | Over-engineering delays evidence | M | H | Microservices/agents/graph DB before need; low research cadence | Modular monolith, explicit exclusions, gate-driven backlog | Stop technical expansion; return to gate evidence | CTO/product |
| R-33 | Analytics becomes surveillance or leaks sensitive interests | M | C | Exact entities/grades/free text in events; individual school view | Allowlisted first-party minimal events, no replay, separate IDs, short retention/min cells | Disable analytics, delete data, incident assessment | Analytics/privacy |
| R-34 | External vendor/source outage breaks flow | H | H | Error/latency/SLA breach | Circuit breaker, last verified + banner, template fallback, source independence | Degrade to official links/read-only; communicate | Engineering/data |
| R-35 | Saved path silently changes after source update | M | H | Student sees unexpected route | Immutable path versions and explicit change impact | Restore prior version, notify and root-cause | Path/product owner |
| R-36 | Security/compliance assurance arrives too late for schools | M | H | Pilot delayed by DPO/IT findings | Involve DPO/security/accessibility/procurement in Stage A/C; standard evidence pack | Delay pilot rather than waive control | Programme lead |

## 2. Highest pre-live residual concerns

Until mitigations are implemented and tested, treat these as highest:

- national/local data accuracy and source coverage (R-03–R-09);
- minor privacy/sharing/access/deletion (R-13–R-21);
- recommendation fairness and non-determinism (R-10–R-12, R-22–R-24);
- safeguarding/accessibility (R-25–R-26);
- actual differentiation and sustainable stewardship (R-29–R-31).

Documentation reduces uncertainty; it does not lower likelihood by itself.

## 3. Review cadence

- Every fortnight during discovery/build/pilot and before each gate.
- Immediate review after incident, authority rule/source/vendor/model change or scope/deployment change.
- Monthly executive review of top residual risks, overdue actions and runway.
- Named owners update evidence, residual rating and next action; product governance approves acceptance.

## 4. Risk decision record

For each accepted residual risk record:

```text
risk ID and scenario
controls implemented and test evidence
remaining likelihood/impact and affected users
alternatives considered
accepting role/name/date (not only implementer)
expiry/review trigger
monitor/contingency and communication
```

Critical child-data, wrong-rule or unlawful-processing risks cannot be accepted merely to meet a date.
