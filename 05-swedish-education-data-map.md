# 05 — Swedish education data map

<!-- markdownlint-disable MD013 -->

> **Status:** Review draft
> **Data principle:** official-first, versioned, field-level provenance; missing is unknown
> **MVP geography:** Sweden

## 1. Education system slice

### Compulsory school → gymnasium

The MVP must represent:

- Grade 8–9 student context and self-reported subject status;
- 18 Gy25 national gymnasium programmes: 12 vocational and 6 higher-education preparatory; [S06](SOURCES.md#product-education-and-data-sources)
- national special variants, nationally approved sports education and fourth technical year only as correctly typed catalogue variants, not flattened into ordinary offerings;
- four introduction programmes: programme-oriented choice, vocational introduction, individual alternative and language introduction; [S07](SOURCES.md#product-education-and-data-sources)
- municipal, regional/association, state and independent providers/school units;
- programme, orientation/specialisation, subject and subject-level structures;
- planned versus confirmed local offering and admission region;
- Gy11 course grades and Gy25 subject-level grades during the transition.

### Gy25 transition

Gy25 applies to gymnasial education started after 30 June 2025. Older course-based provisions continue during a transition ending 30 June 2030. [S05](SOURCES.md#product-education-and-data-sources)

Required data dimensions:

| Dimension | Example | Why |
| --- | --- | --- |
| `framework_version` | `GY11`, `GY25` | Prevent mixing course and subject-level structures. |
| `valid_from`, `valid_to` | rule interval | Evaluate the rule in force for the intended start. |
| `student_start_cohort` | 2026-08 | Select correct programme plan. |
| `legacy_course_code` | source code | Preserve historical/admission inputs. |
| `subject_code`, `level_code` | Gy25 identity | Represent subject-level progression. |
| `mapping_type` | official_equivalence / editorial_related | Never imply equivalence from a weak mapping. |
| `authority_claim_id` | provenance link | Audit every rule/mapping. |

Never algorithmically convert Gy11 course grades to Gy25 subject grades unless an official rule explicitly supports the exact use.

## 2. Eligibility rules

### National programme baseline

Based on current Skolverket guidance [S04](SOURCES.md#product-education-and-data-sources):

- **Vocational:** passing grades in Swedish or Swedish as a second language, English, mathematics, and at least five other compulsory-school subjects.
- **Higher-education preparatory:** the same three base subjects plus at least nine others.
- **Economics, humanities, social sciences:** geography, history, religion and social studies must be among the nine.
- **Natural science and technology:** biology, physics and chemistry must be among the nine.
- **Arts:** nine other subjects without those SO/NO group requirements; local skills tests may apply for some offerings and must be represented separately.

The rule engine outputs `eligible`, `not_yet_eligible`, or `unknown`. Missing/ambiguous subject input always yields `unknown` where it prevents a conclusion.

### Programme-oriented choice

Current guidance permits eligibility through alternative subject combinations involving Swedish/SVA, English, mathematics and additional subjects. Encode the exact combinations from the current authority/legal version, not prose copied into application code. Other introduction programmes have purposes and target groups that require individual/local assessment. MINVÄG explains and refers; it does not decide local admission. [S07](SOURCES.md#product-education-and-data-sources)

## 3. Source map

| Domain | Preferred source | Key IDs/fields | Cadence expectation | Licence/access | Known limitation / fallback |
| --- | --- | --- | --- | --- | --- |
| School-unit identity/status/address | Skolenhetsregistret [S14] | school unit code, provider, address, status | Source-dependent; poll changes daily | Open API; verify terms | Address is not proof of a specific current offering. |
| Planned schools/programmes/statistics | Planned Educations v3 [S12] | school, programme, orientation, statistical measures, documents | Poll at least daily; field-specific dates | Open API; verify terms/rates | Coverage and admission fields must be measured. |
| National education opportunities | Susa-navet v3 [S13] | event/opportunity, provider, place/mode, start, codes, status | Daily incremental changes | Open API | Upstream reporting completeness varies; retain provider link. |
| Programme/subject plans | Skolverket syllabus/programme APIs/pages [S11] | programme, subject, level, point structures | On authority change | Open API/pages | Versioning essential during Gy11/Gy25. |
| Eligibility | Law + Skolverket [S04] | programme family, required subjects/counts, validity | Event-driven legal review | Public official guidance | Human-reviewed rule transcription required. |
| Introduction programmes | Skolverket/Utbildningsguiden [S07] | type, purpose, national eligibility patterns | Event-driven | Public guidance | Local design/availability can vary. |
| Local gymnasium admission | Regional admission offices; possibly Planned Educations fields | programme-offering/year/final cut-off/distribution | Annual cycles + corrections | Heterogeneous pages/PDFs/APIs/licences | No proven uniform national complete API. Mark coverage. |
| Higher-ed offerings and admissions context | UHR/Studera/Antagning [S15–S17] | education code, term, eligibility, historical rounds | Per term | Official service; access varies | MVP path summary/link-out, not application. |
| YH offerings/rules | MYH public search/data and guidance [S18] | programme, provider, location, pace, start, eligibility | Per decision/intake | Official; validate machine access | Provider admission/real competence are contextual. |
| Occupation concepts/skills | Arbetsförmedlingen JobTech/Taxonomy | concept IDs, labels, broader/narrower, skills | Dataset version | Open data/API terms | Taxonomy relation does not prove education requirement. |
| Education↔occupation links | JobEd Connect [S20] + authority/curation | education text/concept, occupation/skill similarity | Dataset version | API terms | Similarity must be labelled; sample accuracy before use. |
| Job demand/current adverts | JobSearch/JobTech [S19] | occupation, region, dates, counts | Daily | API terms | Job-ad counts are not total demand; duplicates/bias. |
| Labour forecasts | Arbetsförmedlingen [S19] | occupation, horizon, region, outlook category | Release-specific | Official data | Forecast, not fact or individual outcome. |
| Salaries | SCB [S21, S22] | SSYK, year, sex where published, mean/median/distribution | Annual | CC0 data | Suppression/sample/population limits; never personalise salary. |
| Population/outcome statistics | SCB PxWeb + Skolverket stats [S08–S10] | region/cohort/programme/outcome/year | Release-specific | Official | Aggregate context only; no inference about an individual. |
| Study finance | CSN [S23] | support type, amount, eligibility, period | Rule-period | Official pages | Volatile; preferably link out and show checked date. |
| Transit feasibility | ResRobot/Trafiklab [S25] | stop IDs, itinerary, scheduled time | Near-real-time/timetable | CC0; API key/rates | Use selected stop/coarse area; no home address/history. |
| Open house/local profile/support | School/provider official page or regional portal | event date, programme, URL, verified timestamp | High volatility | Provider-owned | Machine-readability poor; require expiry and verification. |
| Reviews/subjective experience | None in MVP | — | — | — | Reviews create moderation/manipulation/safety burden. RED. |

## 4. Canonical identifiers

Every record keeps both internal immutable UUID and source-scoped identifier:

```text
entity_id                     internal UUID
country_code                  SE
entity_type                   school_unit | programme | offering | subject | occupation …
source_system                 skolverket_school_registry
source_identifier             authority ID as string
source_version                API/schema/dataset version
valid_from / valid_to         real-world validity
observed_at                   source retrieval time
recorded_at                   MINVÄG write time
```

Do not merge based on names. A match candidate needs normalised name/address/provider evidence, a match method/confidence, and human review for ambiguous cases.

## 5. Admission context

### Separate three facts

1. **Eligibility:** national/local requirements determine whether application can be considered.
2. **Historical cut-off:** lowest admitted merit value for a named offering, round, quota and year, if published.
3. **Future outcome:** unknown; never return a probability in MVP.

Display contract:

```text
Tidigare antagningsläge
Lägsta antagna meritvärde: 242,5
Slutlig antagning, 2025 · [region/urvalsgrupp]
Detta är historik, inte en gräns för nästa år.
Källa … · kontrollerad …
```

Required metadata: region/office, school unit, offering/programme/orientation, academic year, admission round, quota/group, statistic type (minimum/median/other), value scale, source URL/document, page/table coordinates if PDF, retrieved/verified dates, coverage and correction status.

Never compare a self-reported current merit value to a prior cut-off as “likely admitted.” The descriptive label may be “över/kring/under förra årets lägsta värde,” with no implied probability.

## 6. Labour-market signals

Use a layered fact model:

| Layer | Label | Permitted statement |
| --- | --- | --- |
| Official historical statistic | **Statistik** | “Median salary in [defined population/year] was …” |
| Current observed postings | **Aktuell signal** | “JobTech contained … postings tagged … during …”; explain it is not all jobs. |
| Official forecast | **Prognos** | “Arbetsförmedlingen assesses … for horizon …”; preserve category/method. |
| Product scenario | **Exempel** | “If travel radius changes, these observed offerings become visible.” |
| Unknown | **Saknas** | “No reliable regional forecast found.” |

Labour demand must never remove a student’s option or present workforce planning as personal destiny. Regional dimensioning considers both student demand and labour need. [S24](SOURCES.md#product-education-and-data-sources)

## 7. Provenance and temporal model

For each field/claim store:

- who asserted it;
- source URL/API request and content hash;
- source licence/terms version;
- effective/applicability date range;
- observation/retrieval time;
- verification time/method/reviewer;
- transformation lineage and code version;
- confidence type (authority, coverage, inference), not one vague number;
- conflict/staleness/suppression status.

Production source snapshots must be retained subject to licence and minimisation. A UI card resolves claims “as of” a requested date and records the exact IDs used.

## 8. Refresh and stale policy (proposed; validate with sources)

| Fact type | Poll/review | UI stale warning | Critical behaviour |
| --- | --- | --- | --- |
| Binding eligibility rule | Daily change monitor + monthly human review | Immediately after superseding authority notice | Block affected calculation until reviewed. |
| School unit status | Daily | 7 days beyond expected feed | Show source unavailable banner. |
| Planned offering | Daily during choice season; weekly otherwise | 7/30 days respectively | Label “planerad/behöver verifieras.” |
| Admission historical value | Weekly during publication; annual thereafter | Missing latest completed cycle | Never carry previous year as current. |
| Open house | Daily where ingested | 24 hours after event/expiry | Auto-hide expired event. |
| Forecast | On release + monthly check | After source horizon/replacement | Keep dated label; do not extrapolate. |
| Salary statistic | Monthly release check | When newer annual table exists | Continue showing old year clearly until replaced. |
| Editorial pathway explanation | Six-month review or source change | At review due date | Suppress if key supporting claim invalid. |

These are service goals, not observed source guarantees.

## 9. Data conflict policy

1. Preserve both claims; never destructive-overwrite history.
2. Apply field-specific authority precedence.
3. If two authoritative sources conflict, display unknown/conflict and notify data steward.
4. A provider can correct its local event/profile but cannot override national eligibility.
5. AI cannot choose the winning claim.
6. Critical rule conflicts suppress calculation; offering conflicts produce a verification action.
7. Record resolution rationale, actor, timestamp and superseded claim.

## 10. Data quality tests

- schema contract and enum drift;
- valid temporal intervals and no overlapping “current” authority rules;
- referential integrity to canonical IDs;
- code set validity against framework version;
- duplicate/merge anomaly checks;
- geographical plausibility;
- offering start date/status consistency;
- admission value range/scale and round completeness;
- source freshness and retrieval failure;
- null/unknown rate by source and field;
- labour category/horizon required;
- sampled source-to-UI reconciliation.

## 11. Data rollout

1. **Spike:** source terms, schemas and 30-day reliability without user data.
2. **Catalogue alpha:** national programmes, authority school IDs and limited current offerings.
3. **Pilot regions:** only admission areas with measured completeness and direct source review.
4. **National expansion:** coverage map per region/field, never a blanket “all Sweden” claim.
5. **Later routes:** UHR/MYH detail only after gymnasium gate outcomes.

## 12. Open decisions

- Which regional admission sources/licences pass a national coverage threshold?
- How does Planned Educations represent final versus preliminary admission and missing values in practice?
- What provider correction evidence is sufficient for local details?
- Which JobEd edge types are accurate enough to display to 13–16-year-olds?
- What claims/snapshots may be retained under every source’s terms?
