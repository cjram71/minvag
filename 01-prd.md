# 01 — Product requirements document

<!-- markdownlint-disable MD013 -->

> **Status:** Review draft v0.1
> **Scope:** Swedish Grade 8–9 discovery and gymnasium navigation
> **Decision:** No controlled-pilot implementation until all artifacts are reviewed and Gates 1–3 pass; no scaled production rollout until all gates pass

## 1. Product statement

MINVÄG is a Swedish-first, mobile-first guidance service that helps a young person understand themselves, explore education and work without being labelled, compare realistic possibilities, save a branching possible path, and take one useful next action.

**Promise to the student:**

> Du behöver inte veta vad du vill bli. Vi hjälper dig att förstå vad som kan passa just nu, vad som krävs och vad du kan göra härnäst. Det är du som bestämmer.

## 2. Problem

Swedish students are asked to make consequential choices while many are uncertain about occupations, what programmes lead to, and how options relate to their own situation. Skolverket’s 2024 study found that 33% in its sample described choosing school/programme as difficult, while also showing the important nuance that most did not answer “difficult.” Many chose broadly perceived programmes and had limited labour-market knowledge. [S01](SOURCES.md#product-education-and-data-sources) A wider Skolverket evidence review describes large variation in guidance and the choice as hard to survey for many pupils. [S02](SOURCES.md#product-education-and-data-sources)

The product hypothesis is narrower:

> Students who are unsure will gain clarity and agency if self-discovery, verified Swedish education rules, real offerings, potential career pathways, uncertainty, and one small next action are connected in one calm flow.

This hypothesis is **not yet validated with primary users**.

## 3. Vision and initial wedge

### Long-term vision

A living, trustworthy navigation layer from compulsory school through gymnasium, university/YH/vocational routes, work and continuing development.

### MVP wedge

- Sweden only.
- Begin in Grade 8; accommodate Grade 9 urgency.
- National gymnasium programme exploration, current school/programme offerings, eligibility guidance, historical admissions context where reliable, possible downstream pathways, comparisons, a living student profile, a branchable “Min väg”, and one “Nästa steg”.
- Basic parent support and student-controlled SYV preparation.
- No application submission and no official decision-making.

## 4. Outcomes

### Student outcome

After a meaningful session, an unsure student can:

1. name at least two things that matter to them now;
2. explain two realistic options and a meaningful difference between them;
3. see eligibility, admission context, fit evidence and practical feasibility separately;
4. understand uncertainty and source dates;
5. save a possible path with at least one alternative branch; and
6. choose one small, useful next action.

### Parent outcome

A parent can support conversation using questions and shared facts without receiving hidden surveillance or controlling the student’s path.

### SYV outcome

A SYV can receive a concise, student-approved brief containing what the student is considering, what is uncertain, and what they want to ask—without an AI verdict or hidden risk score.

### Organisation outcome (hypothesis)

Schools/municipalities may gain earlier, more consistent career-learning preparation and better use of scarce human conversation time. This must be tested; MINVÄG must not be sold as a replacement for SYVs.

## 5. Users and context

| User | Need | Product boundary |
| --- | --- | --- |
| Unsure Grade 8 student | Start without knowing a career; low-pressure exploration | “Jag vet inte” is a complete answer; no label or forced commitment. |
| Grade 9 student near choice deadline | Verify eligibility and compare a small shortlist | Show historical admissions as context, not forecast; link to official local application. |
| Student currently missing grades | Understand exactly what is missing and useful alternatives | No failure language; show actions, introduction-programme information and SYV handoff. |
| Student with limited Swedish | Simple Swedish, explain terms, optional approved language support later | MVP content is Swedish-first; automated translation cannot become an authority. |
| Student with access needs | Operable, readable, cognitively calm flow | Do not require disclosure of diagnosis; store neutral interaction preferences only if needed. |
| Parent/guardian | Help without amplifying pressure or taking control | Access only through transparent, revocable student sharing. |
| SYV | Prepare and focus the human guidance conversation | No autonomous advice, no hidden categorisation, no official record write-back in MVP. |
| School/municipality admin | Configure cohort and see aggregate adoption/safety signals | No individual browsing/profile surveillance; minimum-cell aggregation. |

## 6. Jobs to be done

### Students

- “När jag inte vet vad jag vill bli, hjälp mig börja med vad jag gillar och ogillar utan att ge mig en etikett.”
- “När jag hittar något intressant, visa hur det hänger ihop med utbildningar och yrken.”
- “När jag undrar om jag kan komma in, skilj på behörighet och tidigare antagningspoäng.”
- “När jag saknar något, visa vad jag kan påverka, alternativa vägar och vad jag kan fråga min SYV.”
- “När allt känns stort, ge mig ett litet nästa steg.”
- “När fakta kan ha ändrats, visa varifrån de kommer och när de kontrollerades.”

### Parents

- “När mitt barn vill ha stöd, ge oss neutrala frågor och samma verifierade fakta utan att jag tar över.”

### SYVs

- “När en elev kommer till samtal, hjälp eleven att i förväg formulera alternativ, osäkerhet och frågor så att vår tid används väl.”

## 7. Product principles as requirements

1. **Student agency:** recommendations use “kan passa att utforska”, never “du är/du ska bli”.
2. **Mutable profile:** every profile signal has origin, date and edit/delete/reset controls.
3. **Multiple possibilities:** present a small, meaningfully diverse set and a visible “visa något annorlunda”.
4. **Separate dimensions:**
   - **Behörighet:** current deterministic rule result based on entered grades.
   - **Antagningsläge:** historical local context with year and coverage.
   - **Passar att utforska:** evidence from stated interests/values/activities, not personality destiny.
   - **Praktiskt:** offering status and approximate journey feasibility.
5. **No aggregate match score:** never hide these dimensions in one number or rank.
6. **Potential pathways:** paths may branch, be edited and change as facts or the student change.
7. **Uncertainty first:** forecasts and inferred fit are labelled; missing/conflicting data remains visible.
8. **Source before persuasion:** commercial relationships cannot change exposure or order.
9. **Human remains accountable:** official authorities, schools, admissions offices and qualified SYVs decide within their roles.
10. **Safe default:** minimum data, private profile, no social feed, no direct adult-to-child marketplace.

## 8. Core experience

### JAG (ME)

Friendly, progressive discovery through short choices, skips and examples:

- “Vad vill du ha mer av i en vanlig dag?”
- “Vad vill du helst slippa?”
- activities enjoyed or tolerated;
- preferred ways of working (alone/together, practical/theoretical, routine/variation);
- values as current priorities, not identity;
- manually entered, self-reported current grades only when needed.

Outputs are observations such as “Du har sagt att variation är viktigt just nu”—not traits.

### UTFORSKA (EXPLORE)

Browse through tasks, themes, occupations, national programmes and real school offerings. Each card answers:

- What is this in plain Swedish?
- What might a normal day include?
- Why is this being shown?
- What education routes may lead here?
- What is known, forecast, or unknown?
- Source/date.

### MIN VÄG (MY PATH)

A branchable visual story, for example:

`Åk 8 → Teknikprogrammet (möjlighet A) → högskola eller YH (flera grenar) → teknikrelaterade roller`

Every edge says “en möjlig väg”, not a promise. Student can add a second branch, note a doubt, or archive the entire path.

### MINA ALTERNATIV (MY OPTIONS)

Compare at most three options initially. Use rows that answer student questions, not a giant table:

- What will I learn/do?
- Eligibility now?
- What is missing?
- Historical admission context?
- Approximate travel burden?
- What can it keep open?
- What might be challenging for my stated preferences?
- Source and unknowns.

### NÄSTA STEG (NEXT STEP)

Offer one action chosen from a safe, finite catalogue, e.g.:

- compare two programme structures;
- save one question for a SYV;
- visit an official programme page;
- find an open house from a verified school source;
- ask a current school what subject support exists;
- discuss one trade-off with a trusted adult.

A student may replace, snooze or decline the action without penalty.

## 9. Recommendation contract

A recommendation response must include:

- 3–5 candidates, with diversity logic preventing near-duplicates;
- eligibility state: `eligible | not_yet_eligible | unknown | not_applicable`;
- 1–3 student-owned reasons grounded in explicit observations;
- one possible challenge/counterpoint;
- key alternatives considered;
- evidence claim IDs with source/applicability/verified dates;
- inference confidence, never presented as fact;
- historical admission context separately where available;
- no use of protected characteristics or covert socioeconomic proxies for ranking;
- ability to inspect, correct, dismiss, request different options or reset.

No candidate can be removed solely because of current grades unless the view is explicitly filtered to “eligible now.” Ineligible possibilities can remain with a constructive pathway.

## 10. Functional requirements

| ID | Requirement | MVP priority |
| --- | --- | --- |
| FR-01 | Anonymous browse and discovery; account only to persist | Must |
| FR-02 | Progressive, editable living profile with provenance per observation | Must |
| FR-03 | Explore occupations, programmes, schools/offerings | Must |
| FR-04 | Deterministic, versioned eligibility evaluation | Must |
| FR-05 | Explainable multi-dimension recommendations | Must |
| FR-06 | Branchable saved path and alternatives | Must |
| FR-07 | Compare up to three pathways/programme offerings | Must |
| FR-08 | One next action with replace/snooze/dismiss/complete | Must |
| FR-09 | Source/freshness/conflict display | Must |
| FR-10 | Student-generated, student-shared SYV brief | Must |
| FR-11 | Student-invited parent conversation view | Must (basic) |
| FR-12 | First-party feedback and safety reporting | Must |
| FR-13 | Export, deletion, sharing revocation and profile reset | Must |
| FR-14 | Account recovery without personnummer | Must |
| FR-15 | Organisation dashboards with aggregates only | Should after student pilot |
| FR-16 | University/YH offering search | Later; pathway summaries only in MVP |
| FR-17 | Direct school information correction workflow | Should |
| FR-18 | Official application integration/write-back | Will not build |

## 11. Non-functional requirements

- **Accessibility:** WCAG 2.2 AA product target; keyboard, screen reader, zoom/reflow, reduced motion, clear errors and 44×44 CSS-pixel touch targets.
- **Performance:** proposed mobile p75 LCP ≤2.5s on representative Swedish mid-range devices/network; interaction p75 ≤200ms for local UI; API p95 ≤500ms excluding explicitly async AI. Validate before gate.
- **Availability:** catalogue and saved path remain useful if AI is down; eligibility never depends on AI.
- **Security:** encryption in transit/at rest, phishing-resistant admin/SYV MFA, least privilege, tenant isolation, audit logs, secrets management, secure SDLC.
- **Privacy:** no ad tracking/session replay; no raw free text in analytics; EEA-first processing; documented retention and deletion.
- **Data quality:** rule/data version pinned to each evaluation; stale and conflict banners; ingestion schema validation and rollback.
- **Language:** Swedish source copy at approximate lower-secondary reading level; define uncommon words at point of use.

## 12. Content and safety requirements

- Never guarantee admission, salary, employment or a fixed future.
- Never diagnose, provide mental-health counselling, or infer disability/personality.
- A distress or self-harm disclosure receives a safe, non-LLM crisis/help handoff appropriate for Sweden; no attempt to counsel. Exact protocol requires safeguarding review.
- Never enable unmoderated adult contact, jobs, internships or marketplace messaging in MVP.
- Salary shows distribution/measure/year/population, not one seductive number.
- Labour outlook shows provider, horizon, region and uncertainty.
- Missing data reads “Uppgift saknas” with a useful verification action.
- “Not yet eligible” language focuses on requirements and routes, not worth or ability.

## 13. Success metrics and guardrails

### North-star candidate

**Useful next-action rate:** proportion of activated students who complete, schedule, or deliberately replace a verified next action within 14 days.

### Supporting outcomes

- clarity delta (before/after 1–5 self-report, paired with teach-back tasks);
- number who can explain two options and one trade-off;
- percentage who understand eligibility versus historical admission context;
- SYV brief usefulness and preparation-time change;
- return to update a path/profile because circumstances changed.

### Guardrails

- student-reported pressure or reduced agency;
- unsupported/incorrect critical factual claim rate;
- subgroup exposure disparity;
- privacy/security incidents and access anomalies;
- harmful or irrelevant action dismissal;
- source staleness and unresolved conflicts;
- parent/SYV access misunderstood by student;
- AI fallback/refusal rate.

No optimisation for time-on-site, streaks, number of clicks, or lead conversion.

## 14. Dependencies and open questions

1. Complete primary user discovery and disconfirmation.
2. Verify official API field completeness, terms and update cadence.
3. Establish field-level source precedence for regional final admissions.
4. Determine controller/processor arrangement and legal bases with counsel.
5. Test whether account-free local storage or short-lived server sessions best support anonymous exploration.
6. Confirm whether parent mode belongs in first pilot or should follow student-only validation.
7. Confirm product identity intended by the founder as “Gymnasio.”

## 15. Release decision

This PRD is a **review artifact**, not approval. Controlled-pilot implementation can be planned only after all 25 deliverables are reviewed and Gates 1–3 pass; Gates 4–6 must pass before live minor data, and scaled production follows Gate 10.
