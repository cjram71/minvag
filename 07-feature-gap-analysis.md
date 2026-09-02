# 07 — Feature gap analysis

<!-- markdownlint-disable MD013 -->

> **Status:** Hypothesis map derived from desk research; gaps are not proven demand
> **Rule:** Every BLUE/GREEN feature still requires student validation before implementation.

## Gap thesis

The market does not lack search, quizzes, programme content, merit tools, career pages or B2B SYV planning. The proposed white space is a **simpler and more trustworthy decision process**:

1. start from uncertainty without personality labels;
2. connect options into editable, branching possible paths;
3. separate eligibility, historical admission context, fit evidence and practical feasibility;
4. expose sources, dates, uncertainty and conflicts at claim level;
5. turn information into one student-owned next action;
6. help parents/SYVs support without taking over; and
7. remain non-commercial in recommendation order.

## Gap matrix

| User problem | Existing pattern | Unmet/under-served hypothesis | Proposed response | Decision | Evidence needed |
| --- | --- | --- | --- | --- | --- |
| “I don’t know what I want.” | Quiz/test returns categories or careers | Students may need low-pressure situations and permission not to know | Progressive prompts; no final type; neutral browse at any point | **BLUE** | Comprehension/pressure versus quiz baseline |
| “Why did this appear?” | Match result/list, internals unclear | Explanations often do not quote editable student evidence or counterpoints | Reason card: what student said, factual constraints, challenge, alternatives | **GREEN** | Faithfulness and student teach-back |
| “Can I get in?” | Merit calculator and historical points near each other | Eligibility and selection are easily conflated | Four separate panels; no probability | **GREEN** | 80% teach-back threshold |
| “What if I’m missing grades?” | Dead-end “not eligible” or generic guidance | Students need actionable missing requirements and alternative routes | `Inte ännu` + exact missing input/subject + action + IM info + SYV question | **GREEN** | SYV validation and emotional-safety testing |
| “Where can this lead?” | Programme/occupation pages or linear plans | Real routes branch and change | Versioned graph + possible branches + resilience view | **GREEN** | Graph accuracy and perceived usefulness |
| “Which is best?” | Rankings/filters | Universal rank embeds values and prestige | Compare max 3 by student questions/trade-offs | **BLUE** | Decision quality versus ranking/list |
| “Is this information current?” | Page-level source or none | Key claim applicability and freshness remain hard to see | Claim-level source sheet, dates, stale/conflict status | **GREEN** | Users notice and understand without overload |
| “What do labour signals mean?” | Salary/outlook as prominent simple facts | Forecast and postings can look deterministic | Fact/trend/forecast/scenario/unknown labels | **GREEN** | Forecast comprehension and bias audit |
| “Everything is too much.” | Large directories and plans | Information volume does not produce action | One finite-catalogue action; replace/snooze/decline | **GREEN** | 14-day useful action rate |
| “How can my parent help?” | Parent information or institutional account | Parent access can reduce agency | Student-scoped expiring conversation share | **BLUE** | Triad pilot; pressure/agency outcomes |
| “How do I prepare for SYV?” | Chat/Q&A or internal plan | Student questions can be lost; counsellor may lack trace | Student-generated brief with sources and unknowns | **BLUE** | SYV workload and student ownership |
| “What if a source is wrong?” | Generic contact form | Errors need claim-level trace and safe suppression | Structured report and steward workflow | **GREEN** | Operational resolution time/volume |
| “Can I try privately?” | Account-first or tracking-heavy patterns vary | Minor may avoid discovery if identity required | Anonymous exploration, local/short-lived state, just-in-time account | **GREEN** | Privacy threat review and save conversion |

## Recommendation dimension model

| Dimension | What it answers | Source | Output | Never do |
| --- | --- | --- | --- | --- |
| Eligibility | “Does my current self-reported input satisfy this rule?” | Versioned deterministic rules | eligible / not yet / unknown + trace | Use AI or infer missing grades. |
| Historical admission position | “How does my value compare with a named past result?” | Regional official source | above/around/below descriptive band + year/round | Predict next admission or hide coverage. |
| Exploration fit | “Why might this be worth exploring?” | Explicit student observations + programme/tasks | reasons, counterpoint, confidence | Personality type, immutable label, protected attribute. |
| Practical feasibility | “Is it offered and roughly reachable?” | Offering status + coarse transit query | confirmed/planned/unknown; journey examples | Track home/location or claim future timetable. |
| Resilience | “What branches remain if one step changes?” | Education graph + rules | alternatives, transfer/next routes with edge evidence | Call one path “safest” without defining value. |

A card may be prominent because it is saved/recent/relevant, but never because a school paid.

## Feature-level moat versus commodity

### Trust/product ownership (build)

- rule-evaluation trace;
- claim resolver and conflict UI;
- profile observation provenance/editability;
- branchable path snapshots;
- reason/counterpoint generation contract;
- consent grants and share payload preview;
- safe next-action catalogue.

### Commodity/integration

- transactional email;
- transit calculation;
- mapping/geocoding;
- cloud infrastructure and monitoring;
- public authority datasets;
- authentication libraries;
- content delivery.

### Human/editorial operation

- Swedish plain-language content;
- mapping review between education and occupations;
- critical rule transcription/review;
- source conflict resolution;
- safety reports;
- student advisory input.

## Value versus complexity prioritisation

| Feature | Student value hypothesis | Trust/safety need | Complexity | MVP decision |
| --- | --- | --- | --- | --- |
| No-account start | High | High | Medium | Must |
| Living profile | High | High | Medium | Must |
| Programme/offering explore | High | High | Medium | Must |
| Career/task explore | High | Medium | Medium | Must, limited curated set if data quality requires |
| Deterministic eligibility | High | Critical | High | Must |
| Separate historical admission | High | Critical | High due source coverage | Must display model; data only in verified regions |
| Branching possible path | High/differentiating | High | Medium | Must |
| Compare max 3 | High | Medium | Medium | Must |
| One next action | High/differentiating | High | Low–medium | Must |
| Parent invitation | Medium/unknown | High | Medium | Basic must; may move after initial student-only usability round |
| SYV brief | High/unknown | High | Medium | Must |
| Open-house feed | Medium | Medium | High source volatility | Should, coverage-labelled |
| Live transit | Medium | High privacy | Medium | Should; coarse start only |
| Labour forecast/salary | Medium | High bias risk | High | Should, limited and source-labelled |
| What-if simulator | Medium | High | High | Should after rule validation; no admission probability |
| School reviews | Unknown | Very high moderation/manipulation | High | RED |
| AI free chat | Unknown | Critical | High | RED for MVP |

## Defensibility hypotheses

Defensibility should come from:

- trusted, time-aware Swedish education knowledge and operations;
- student comprehension and agency evidence;
- auditable outcome and fairness evaluation;
- correction relationships with SYVs/data owners;
- high-quality branching pathway semantics; and
- institutional trust without commercial ranking conflicts.

It should **not** depend on scraped content volume, proprietary personality labels, dark patterns, closed student data, or an unexplainable model.

## Falsification criteria

Stop or reposition if research shows any of the following:

- students already accomplish the job as clearly and safely with official/existing tools;
- the added source/uncertainty interface creates more confusion than benefit and cannot be simplified;
- one-next-action does not improve useful follow-through;
- branchable paths are perceived as false certainty or unnecessary complexity;
- schools require surveillance/lead generation incompatible with student agency;
- reliable admissions/offering data cannot support an honest national product claim;
- operational data stewardship costs make a sustainable product impossible.
