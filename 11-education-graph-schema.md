# 11 — Education graph schema

<!-- markdownlint-disable MD013 -->

> **Status:** Proposed ontology and traversal contract
> **Storage:** PostgreSQL adjacency/relationship tables in MVP, not a graph database
> **Core wording:** every route is **en möjlig väg**, never a guaranteed sequence

## 1. Purpose

The education graph connects:

- where a student is now;
- Swedish gymnasium programmes and offerings;
- subject/level/credential requirements;
- possible next education routes (university, YH, adult/bridging routes where verified);
- occupations, skills and work areas;
- alternative branches and uncertainty.

It supports explanation and pathway exploration. It must not infer that an education guarantees, is mandatory for, or uniquely leads to an occupation unless authoritative evidence explicitly establishes that relationship.

## 2. Two graphs, kept separate

### Knowledge graph

Shared, versioned, evidence-backed entities and relationships about the Swedish system.

### Student path graph

A student-authored snapshot selecting knowledge-graph nodes/edges plus their own hypotheses, questions and concerns. It is not the source of public facts and is never silently rewritten.

## 3. Entity types

| Type | Example | Key qualifiers |
| --- | --- | --- |
| `country` | Sweden | ISO code |
| `education_framework` | Gy25 | validity/transition |
| `education_level` | gymnasial | Swedish/ISCED mapping where official |
| `programme` | Teknikprogrammet | framework, programme type/code |
| `specialisation` | Teknikvetenskap | programme/framework relation |
| `subject` | Matematik | authority code |
| `subject_level` | Matematik – nivå 1c | Gy25 level/code |
| `course_legacy` | Gy11 course | legacy version/code |
| `credential` | gymnasieexamen | awarding rules/validity |
| `provider` | municipality/company/state | legal/authority ID |
| `school_unit` | named campus/unit | Skolverket unit ID/status |
| `education_offering` | programme at unit/start term | status, start, mode, place |
| `admission_context` | final admission 2025 | office, round, group, statistic |
| `higher_education_programme` | named programme | UHR/provider identifiers |
| `yh_programme` | named YH offering | MYH/provider identifiers |
| `bridging_route` | verified complementary route | target, rule period |
| `occupation` | software developer concept | JobTech/SSYK codes/crosswalks |
| `skill` | debugging | taxonomy/version |
| `task` | troubleshoot system | source/version |
| `industry` | information services | SNI/source |
| `region` | municipality/county/admission area | code/version |
| `support_resource` | SYV/official guide | jurisdiction/availability |

An “admission context” may also be modelled as a claim bundle rather than a navigable node; it must never become a future outcome edge.

## 4. Relationship vocabulary

| Code | From → to | Semantics | Allowed strength |
| --- | --- | --- | --- |
| `GOVERNED_BY` | entity → framework | Rules/version that govern the entity | required |
| `OFFERS` | provider/school → offering | Named provider/unit offers or plans offering | required/possible based on status |
| `INSTANCE_OF` | offering → programme | Local opportunity is an instance of national programme | required |
| `HAS_SPECIALISATION` | programme/offering → specialisation | National or local structure | required/possible |
| `INCLUDES` | programme → subject/level | Programme plan includes content | required/elective/possible encoded in qualifier |
| `LOCATED_IN` | unit/offering → region | Authority/provider location | required |
| `AWARDS` | programme/route → credential | Completion can award credential under conditions | possible/required + conditions |
| `REQUIRES` | programme/credential/next route → subject/credential | Formal eligibility/prerequisite | required; rule reference mandatory |
| `SATISFIES` | credential/subject level → requirement | Official satisfaction/equivalence | required; authority evidence only |
| `SUPERSEDES` | framework/rule/entity → earlier | Temporal replacement | required |
| `OFFICIAL_EQUIVALENT` | legacy course ↔ subject level | Official transition equivalence | required; evidence mandatory |
| `RELATED_TO` | concepts | Taxonomic/editorial association | related only |
| `DEVELOPS` | education → skill | Skills/content plausibly developed | common/possible |
| `USES_SKILL` | occupation → skill | Role uses skill | common/possible |
| `INVOLVES_TASK` | occupation → task | Typical task, not universal | common/possible |
| `POSSIBLE_NEXT_EDUCATION` | credential/programme → education | One possible further route, conditions separate | possible |
| `POSSIBLE_ROUTE_TO` | education → occupation | Education may be one route into occupation | common/possible, never guarantees |
| `ALTERNATIVE_TO` | programme/route ↔ programme/route | Meaningfully different way to pursue stated objective | possible with explanation |
| `CAN_BRIDGE_TO` | bridging route → target | Verified complementary path under conditions | possible |
| `SUPPORTED_BY` | entity/path situation → support resource | Relevant human/official help | possible |

Do not create a generic `LEADS_TO` relation. It is too easily misread as causal or guaranteed.

## 5. Relationship record

```json
{
  "id": "rel_uuid",
  "subject_id": "teknikprogrammet_gy25",
  "type": "POSSIBLE_ROUTE_TO",
  "object_id": "occupation_software_developer",
  "framework_version": "GY25",
  "directness": "indirect",
  "strength": "possible",
  "conditions": [
    "Further education is commonly required; inspect branches"
  ],
  "valid_from": "2025-07-01",
  "valid_to": null,
  "evidence": [
    {"claim_id": "...", "role": "supports"}
  ],
  "curation": {
    "method": "official_mapping_plus_human_review",
    "reviewed_at": "2026-08-20",
    "review_due": "2027-02-20"
  },
  "status": "active"
}
```

The displayed Swedish sentence is generated from relation type/qualifiers and reviewed templates—not trusted from arbitrary edge text.

## 6. Evidence strength

Keep independent dimensions:

- **Authority:** binding rule / official mapping / authority dataset / provider assertion / editorial synthesis.
- **Coverage:** complete / partial / unknown for the relevant population.
- **Directness:** direct / requires intermediate education or condition.
- **Strength:** required / common / possible / related.
- **Freshness:** within SLA / stale / expired.
- **Conflict:** none / open / resolved.

Do not average them into one confidence number.

## 7. Path constraints

A path query accepts:

```text
start nodes          current school stage or saved programme
exploration target   occupation, task, skill, work area or next education
intended date/cohort
country = SE
max hops              small, usually 4–6
allow unknown         yes, but visibly marked
student constraints   explicit only (e.g. coarse region), optional
```

Traversal rules:

1. Resolve graph as-of intended date and relevant framework.
2. Include only active/non-suppressed relationships.
3. Treat every `REQUIRES` as a side constraint evaluated by a rule, not a decorative edge.
4. Never infer transitivity for `POSSIBLE_ROUTE_TO`, `DEVELOPS` or `RELATED_TO`.
5. Penalise—not silently remove—long/uncertain routes unless the student asks for a hard filter.
6. Return 2–4 meaningfully different paths where evidence exists.
7. Explain cycles, indirect steps, unknown offerings and gaps.
8. Stop at a small horizon; invite exploration rather than drawing an intimidating life plan.

## 8. Path result contract

```json
{
  "title": "En möjlig väg att utforska",
  "not_a_guarantee": true,
  "as_of": "2026-09-02",
  "nodes": [
    {"id": "...", "kind": "programme", "label": "Teknikprogrammet"},
    {"id": "...", "kind": "higher_education", "label": "Exempel på vidare utbildning"},
    {"id": "...", "kind": "occupation", "label": "Systemutvecklare"}
  ],
  "edges": [
    {
      "type": "POSSIBLE_NEXT_EDUCATION",
      "label": "kan vara en väg vidare",
      "strength": "possible",
      "source_refs": ["claim_uuid"],
      "conditions": ["Behörighet och antagning behöver kontrolleras"]
    }
  ],
  "unknowns": ["Lokalt ämnesutbud har inte verifierats"],
  "alternatives": ["..."],
  "change_policy": "Saved version will not change automatically"
}
```

## 9. Resilience model

“Resilience” is not a prestige score. It answers inspectable questions:

- Does the path have more than one verified next-education branch?
- Is a key edge a formal requirement, common route or weak possibility?
- If one self-reported grade changes, which branches remain?
- If one local offering is cancelled, are there nearby/remote alternatives according to current data?
- Which step depends on a volatile forecast or local decision?
- What can the student verify now?

Output examples:

- “Det finns flera dokumenterade vägar vidare.”
- “Den här delen beror på ett lokalt utbud som ännu är planerat.”
- “Om den här vägen inte blir aktuell finns en annan gren att undersöka.”

Never “92% future-proof.”

## 10. What-if scenarios

Allowed MVP scenarios change explicit facts/inputs and rerun deterministic components:

- “Om matematik blir godkänd, vilka behörighetsresultat ändras?”
- “Om jag väljer en annan startort/station, vilka verifierade erbjudanden syns?”
- “Om det planerade programmet inte startar, vilka grenar har jag sparat?”
- “Om jag prioriterar mer praktiskt arbete just nu, vilka exploration cards differ?”

The old and new values, affected dimensions and unchanged unknowns are displayed. No future grade, admission or job outcome is predicted.

## 11. Curation lifecycle

1. Import authority/taxonomy candidates.
2. Keep automated similarity links in staging only.
3. Reviewer inspects semantics, intermediates, conditions and source.
4. Second reviewer required for formal requirements/equivalences.
5. Publish version; assign review due date.
6. Sample graph paths with SYVs and occupation/domain reviewers.
7. Monitor reports/source changes.
8. Suppress or supersede; never rewrite historical path evidence.

LLMs may propose candidate mappings for reviewers but cannot publish edges.

## 12. Graph quality tests

- entity/relation type compatibility;
- no formal `REQUIRES` without active authority claim/rule;
- no active edge outside validity;
- no accidental `LEADS_TO`/guarantee vocabulary;
- no unsupported transitive expansion;
- path source coverage and unknown reporting;
- Gy11/Gy25 separation and official crosswalk evidence;
- dead-end detection with truthful fallback;
- alternative diversity (not same route relabelled);
- counterfactual changes affect only declared dimensions;
- manual SYV review of sampled high-traffic paths.

## 13. Example UI language

```text
En möjlig väg — inte ett löfte

Teknikprogrammet
  kan ge behörighet att söka … om examens- och särskilda krav är uppfyllda
Vidare utbildning
  kan vara en vanlig väg till …
Yrkesområde

Varför visas vägen?
• Du har sagt att problemlösning är viktigt just nu.
• Programmet innehåller … enligt Skolverket.

Behöver kontrolleras
• Det lokala utbudet nästa år
• Behörighet och antagning till vidare utbildning
```
