# 06 — Competitor and alternative analysis

<!-- markdownlint-disable MD013 -->

> **Status:** Desk-research draft; public pages only, no hands-on procurement/user testing
> **Verified:** 2026-09-02
> **Important correction:** there are close integrated competitors. MINVÄG cannot claim the category is empty.

## Decision labels

- **GREEN — build:** necessary core capability where ownership/trust/differentiation warrants building.
- **YELLOW — integrate:** use an authority or specialist rather than recreating the source/service.
- **BLUE — improve:** established feature exists; build only with a materially better, tested interaction.
- **RED — do not build:** harmful, unnecessary, commercially conflicted or out of MVP.

## Landscape

| Product/alternative | Observable focus | Strengths to respect | Limits / unknowns from desk research | MINVÄG decision |
| --- | --- | --- | --- | --- |
| **Digital SYV** [C01](SOURCES.md#competitorproduct-sources) | Student app: discovery/personality-style tests, merit support, schools/programmes, occupations, contacts, paths/further education | Very close integrated breadth; free student access; counsellor connection | Recommendation/provenance semantics, institutional price, current active usage and safety model not established from public pages | **BLUE:** do not clone tests. Improve with mutable evidence, branches, separated dimensions and auditable uncertainty. |
| **Gymnasium.se** [C02](SOURCES.md#competitorproduct-sources) | Large commercial search/comparison/content platform, reviews, quizzes, merit calculator | Reach, content depth, provider discovery, reviews and search | Provider marketing/lead business introduces ranking/trust questions; recommendation internals and institutional price unknown | **YELLOW** for market benchmark only; **RED** paid visibility/lead sale in recommendations. |
| **Utbildningsguiden** [C03](SOURCES.md#competitorproduct-sources) | Official programme/school/occupation guidance and tools | Authoritative, broad, trusted, no need to recreate basic rule copy | Less personalised/branching; product usability must be tested, not assumed | **YELLOW:** deep-link and source official facts. **BLUE:** add calm connected journey, not competing authority. |
| **Gymnasio** | No verified Swedish education product found | Unknown | Name/domain may be wrong; public searches returned unrelated results | **RED:** no capability claim. Founder must supply legal name/URL. |
| **Skolkoll** [C05](SOURCES.md#competitorproduct-sources) | School comparison, public-data aggregation, downloadable datasets | Explicit provenance/equal-treatment stance; convenient CC BY 4.0 exports | Secondary compiler; public API appears future-facing; independent/error/coverage validation needed | **YELLOW:** possible cross-check/accelerator after licence and lineage review; official origin remains primary. |
| **Skoolie** [C06](SOURCES.md#competitorproduct-sources) | B2B pathway plans, grades/eligibility, education/occupation and labour information, SYV/municipal workflows | Closest institutional overlap; already frames ongoing pathway work | Public pricing, adoption outcomes, model details, data provenance and student-agency safeguards unknown | **BLUE:** differentiate in student simplicity, consent, one action, non-opaque dimensions and auditable path claims. |
| **Ednia** [C07](SOURCES.md#competitorproduct-sources) | School/programme search and public-data rankings | Methodology disclosure and useful public indicators | Weighted ranking can hide value choices; exact weights not all disclosed; user outcomes/pricing unknown | **YELLOW** as research; **RED** universal school rank. Build question-led comparison. |
| **Gymnasiekoll** [C08](SOURCES.md#competitorproduct-sources) | Gymnasium test and directory | Quick-entry discovery and catalogue | Ownership, methodology, provenance, usage and update details need verification | **BLUE:** use situation prompts, not opaque test result. |
| **FrågaSYV / AI-SYV** [C09](SOURCES.md#competitorproduct-sources) | Human Q&A plus AI answer experience | Large real-question corpus and direct question framing | Answer safety, source freshness, AI boundaries and licensing are not established here | **YELLOW:** link to human/official help where useful; **RED:** unconstrained AI counsellor. |
| **School/municipal SYV** | Qualified human contextual guidance | Professional nuance, safeguarding, local knowledge, accountability | Time/access varies; not a software “competitor” to remove | **YELLOW/partner:** prepare conversation and return student to human. |
| **Parents, teachers, peers, social media/search** | Informal advice and lived experience | Trusted relationships and concrete stories | Bias, pressure, outdated/unsourced facts, algorithmic influence | **BLUE:** provide conversation prompts and source checking; no social feed. |

## Feature matrix

Legend: ● publicly visible/core; ◐ partial/unclear; — not found in reviewed public information. This is not a hands-on test and should not be published as definitive marketing copy.

| Capability | Digital SYV | Gymnasium.se | Utbildnings-guiden | Skolkoll | Skoolie | Ednia | MINVÄG proposed |
| --- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| Programme/school discovery | ● | ● | ● | ● | ● | ● | ● |
| Student discovery/test | ● | ● | ● | — | ◐ | ◐ | ●, no personality verdict |
| Merit/eligibility | ● | ● | ● | ◐ | ● | ◐ | ● deterministic trace |
| Occupation content | ● | ● | ● | — | ● | ◐ | ● linked as possibilities |
| Labour signal | ◐ | ◐ | ● | — | ● | ◐ | ◐ sourced/limited |
| Saved pathway/plan | ● | ◐ | ◐ | — | ● | — | ● branchable |
| Explicit one next action | ◐ | ◐ | ◐ | — | ◐ | — | ● |
| Field-level source/date UI | Unknown | ◐ | ● | ● | Unknown | ● methodology | ● required |
| Separate eligibility/admission/fit/feasibility | Unknown | Unknown | ◐ | — | Unknown | — | ● required |
| Student-controlled parent share | Unknown | — | — | — | Unknown | — | ● basic |
| Student-owned SYV brief | ◐ | ◐ | — | — | ● workflow | — | ● |
| Universal school rank | Unknown | Results/marketing | — | Comparison | ◐ | ● | **Never** |
| Commercial provider visibility | Unknown | ● | — | claims no | B2B | Unknown | **Never affects logic** |

## Strategic conclusions

### 1. Breadth is not differentiation

Digital SYV and Skoolie already publicly claim combinations of profile/discovery, programme/occupation exploration, pathways, eligibility and counsellor workflows. MINVÄG wins only if a student understands the experience better and trusts how facts and uncertainty are handled.

### 2. Official tools are partners, not content to clone

Utbildningsguiden and authority datasets should remain visible authorities. MINVÄG’s role is to connect, simplify, personalise carefully and hand off—not to rebrand official rules as proprietary knowledge.

### 3. Ranking is the wrong competitive response

Ednia and other directories demonstrate demand for easy comparison. MINVÄG should not counter with a more elaborate universal rank. It should make trade-offs inspectable and driven by the student’s stated priorities.

### 4. Provenance is a product surface

Skolkoll’s visible source orientation sets a useful baseline. MINVÄG must go further on field-level source, dates, validity, conflict, confidence and the distinction between fact, forecast and inference.

### 5. The human relationship remains defensible

The product should make the student–SYV conversation more prepared and equitable. Marketing the product as an “AI SYV” would create an unnecessary trust and regulatory problem and conflict with the intended role.

## Build / integrate / improve / avoid portfolio

| Decision | Capabilities |
| --- | --- |
| **GREEN — build** | Living editable profile; separated recommendation dimensions; one-next-action selector; branching path; compare-by-trade-off; share-grant controls; provenance UI/resolver; deterministic rule trace; conflict correction flow. |
| **YELLOW — integrate** | Skolverket catalogue/rules; UHR/MYH links/data; JobTech/SCB facts; transit; identity/email delivery; security monitoring; official application handoff. |
| **BLUE — improve** | Discovery prompts, merit input, education/occupation cards, programme comparison, counsellor preparation, parent conversation, open-house aggregation. Build only after user test demonstrates improvement. |
| **RED — do not build** | Personality typing, single match score, universal school prestige rank, pay-to-rank, lead sales, behavioural ads, anonymous reviews/social feed, direct application in MVP, unmoderated adult contact, autonomous AI counsellor, covert parent/school monitoring. |

## Commercial signals

- Gymnasium.se explicitly markets provider visibility/education marketing, confirming a commercial lead/advertising model in this category. [C02](SOURCES.md#competitorproduct-sources)
- Digital SYV publicly says the student app is free. [C01](SOURCES.md#competitorproduct-sources)
- Institutional prices for the close B2B tools were not reliably public in this review. Record as **undisclosed**, not estimated.

## Research still required

1. Obtain product demos and buyer references for Digital SYV and Skoolie.
2. Run the same Grade 8 tasks in MINVÄG concepts, official tools and selected products; compare comprehension and pressure, not feature count.
3. Interview procurement, DPO, SYV and IT roles about switching barriers and controller models.
4. Verify all competitor privacy, AI and commercial-ranking practices before any external comparison.
5. Resolve the “Gymnasio” name.
