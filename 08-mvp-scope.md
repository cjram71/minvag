# 08 — MVP scope

<!-- markdownlint-disable MD013 -->

> **Status:** Proposed cut line; build blocked by gates
> **Market/cohort:** Sweden, Grade 8 first; responsive support for Grade 9
> **Form:** Swedish mobile-first web application/PWA

## MVP definition

The MVP is the smallest **safe, source-visible, end-to-end guidance loop** that lets an unsure student:

`start privately → express current preferences → explore → reality-check → save a branching possible path → compare → take one next step → prepare a human conversation`

A catalogue plus AI chat is not the MVP. A full national lifelong-learning platform is not the MVP.

## Must have

### Entry and identity

- Swedish landing and child-readable “how it works / data” summary.
- Try without account; create account only to persist across devices.
- Passwordless/passkey-capable authentication without personnummer.
- Private defaults, export, delete, profile reset and session/device controls.

### Friendly discovery and living profile

- 12–20 approved situation prompts; first useful output after 2–3 answers.
- “Jag vet inte”, “inget av detta”, skip and neutral browse.
- Profile observations labelled `du har sagt`, dated, editable/deletable.
- Values/interests/work-style preferences as temporary priorities, not traits.
- Manual self-reported subject/grade status only when needed.

### Education and career exploration

- All 18 national Gy25 programmes with authority-linked structures.
- Introduction-programme explanations and constructive handoff.
- Verified school units and current/planned offerings with coverage labels.
- A bounded, reviewed occupation/task catalogue from official taxonomy sources.
- Possible education↔occupation routes with evidence/strength and alternatives.
- Search, filters and “show something different.”

### Eligibility and recommendation

- Versioned deterministic national eligibility rules.
- States: eligible, not yet eligible, unknown, not applicable.
- Exact input/rule trace and missing requirements.
- 3–5 exploration candidates with stated reasons and one counterpoint.
- Eligibility, fit evidence, historical admission context, practical feasibility and resilience shown separately.
- No aggregate match score or future admission probability.

### My Path, alternatives and next action

- Save/edit/archive a path with branch, uncertainty note and version snapshot.
- Compare up to three programmes/offerings by trade-offs.
- One safe next action from finite catalogue; replace/snooze/decline/complete.
- Explain path changes when a source/profile changes; never silently rewrite.

### Provenance and safety

- Source sheet for important facts: owner, applicability/data date, verified date, confidence type and conflict/stale state.
- Fact/forecast/scenario/inference/unknown labels.
- Report wrong/confusing/harmful content.
- AI disclosure and non-AI fallback.
- Audit, role/access controls, encryption, rate limiting, prompt-injection defences and incident workflow.

### Parent and SYV

- Public parent guide and student-created expiring, scoped conversation share.
- Student-generated SYV brief with selected options, questions, unknowns and source appendix.
- Preview/revoke/access-history; no standing adult access or grade sharing by default.
- Accessible print view.

## Should have if data and safety pass during pilot

| Capability | Narrow MVP form | Fallback if not ready |
| --- | --- | --- |
| Historical gymnasium admissions | Selected verified pilot regions; final round/year/group displayed | “Tillförlitlig uppgift saknas” + regional official link |
| Labour-market outlook | Limited reviewed occupations; official horizon/region/method | Omit rather than extrapolate |
| Salary | SCB distribution/measure/year context, secondary placement | Link to official statistics or omit |
| Transit | Selected stop/coarse area and example scheduled journey | Distance/area text or manual check action |
| Open houses | Direct provider/official events with expiry and checked date | School official link and “kontrollera datum” |
| What-if | Change self-reported subject status or coarse travel choice; recompute transparent dimensions | Manual comparison; never probability |
| Resilience view | At least one evidence-backed alternative branch for supported routes | State that alternatives have not been mapped |
| Aggregate organisation dashboard | Activation, task outcome, errors and source health with minimum cells | No dashboard; researcher summaries |

## Could have after first pilot

- English or approved easy-Swedish companion content while Swedish remains authoritative.
- Saved offline catalogue/path (without sensitive profile/grade caching on shared devices).
- Teacher “career learning” group activities with no individual ranking.
- School-provider correction portal.
- More detailed university/YH route exploration.
- Regional commute scenarios and relocation/cost planning for older cohorts.
- User-controlled calendar export.

## Explicitly out of scope

- Other countries or translated global catalogues.
- Direct gymnasium/university/YH application or status tracking.
- Official eligibility/admission decisions or probability forecasts.
- Import/write-back to school grade/study-plan/administrative records.
- BankID/personnummer.
- Grade document upload, OCR or transcript scraping.
- Psychometric/personality diagnosis or immutable profile.
- One career answer, one match score, school prestige rank or guaranteed pathway.
- Student social network, comments/reviews, streaks, leaderboards or public profiles.
- Marketplace, employer/student direct messaging, jobs/internships matching.
- Ads to students, behavioural targeting, pay-to-rank, lead sale.
- Open-ended AI counsellor or autonomous agents.
- Parent/school surveillance, hidden risk scores or behaviour alerts.
- Diagnoses, therapy, crisis counselling or health profiling.
- Native mobile applications until web evidence proves a need.
- Microservices/graph database/event-stream platform without measured need.

## Experience cut line

### Required screens

1. Landing and privacy summary.
2. Discovery prompt and “what I’ve said” profile.
3. Explore list/search.
4. Programme detail.
5. School/offering detail.
6. Occupation/work-area detail.
7. Recommendation explanation.
8. Eligibility input/result/recovery.
9. Branching My Path.
10. Three-option compare.
11. Next Step.
12. Source sheet/conflict state.
13. Parent invitation/parent read view.
14. SYV brief preview/print.
15. Account, sharing and privacy controls.
16. Error/safety report.

### Required empty/degraded states

- no profile answers;
- no account;
- missing grade subject;
- not yet eligible;
- no local offering;
- stale offering;
- conflicting sources;
- no admission data;
- no labour forecast;
- AI unavailable;
- entire upstream source unavailable;
- parent share expired/revoked;
- deleted/archive path.

## Acceptance criteria by outcome

| Outcome | Acceptance test |
| --- | --- |
| Start without certainty | Student reaches meaningful explore state after ≤3 optional answers or skips directly. |
| Profile agency | Student can inspect and delete any observation; deletion removes it from future reasons. |
| Accurate eligibility | Approved golden cases produce exact rule state/trace; unknown input never becomes not eligible. |
| Explainable option | Card names explicit student evidence, factual constraints, counterpoint, sources and uncertainty. |
| No opaque rank | API and UI expose no universal score; sort reason is visible. |
| Constructive setback | Not-yet-eligible state names missing requirement, actions, alternatives and SYV question. |
| Real path | Every edge has type, source/curation, validity and “possible” language; at least one branch can be added. |
| Small choice | Initial comparison contains no more than 3 options and supports progressive detail. |
| One action | Exactly one primary action; student can replace, snooze or decline without penalty. |
| Provenance | A student can reach source owner/date/claim status in one interaction from a key fact. |
| Parent control | Parent sees only previewed scope; revocation takes effect immediately; student can inspect access. |
| SYV handoff | Brief is student-selected, indicates self-reported inputs and never states official determination. |
| AI independence | Catalogue, eligibility, saved path, compare and template explanations work with AI disabled. |
| Deletion | User-visible data disappears immediately; backend completion follows documented retention/backup SLA. |

## Technical budget hypotheses

- One TypeScript application codebase and PostgreSQL database.
- Separate worker runtime from the same repository for ingestion/async tasks.
- One cloud region in the EEA with tested recovery.
- One AI provider behind an adapter, no-training contract and kill switch; templates remain default for high-risk outputs.
- No more than one model call for an explanatory action; cached only where inputs/claims are identical and safe.

## Pilot content/data boundary

Start with 2–3 deliberately diverse regions/school partnerships for local offering/admission depth, while national programme rules remain available. UI publishes a coverage map. “Sweden MVP” means Swedish system and national programme coverage—not fabricated completeness for every local field.

## Definition of done

MVP is not “done” at code complete. It requires:

- Gates 1–10 passed and sign-offs recorded;
- accessibility audit with no critical blocker;
- DPIA/legal/vendor/transfer review complete;
- independent security test with no unresolved critical/high issue;
- 30-day source reliability rehearsal;
- deterministic rule golden tests;
- Swedish student/SYV safety and comprehension thresholds;
- incident, source outage, correction, export and deletion rehearsals;
- pilot support/rollback and post-pilot deletion plan.
