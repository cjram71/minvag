# MINVÄG Gates 1–10 — initial review

<!-- markdownlint-disable MD013 -->

> **Assessment date:** 2026-09-02
> **Overall status:** **STOP — production implementation is not authorised**
> **Allowed next work:** review these documents, conduct primary discovery, build a disposable clickable prototype, and run source/rule/security feasibility spikes using only public and synthetic data

A gate passes only when pre-agreed evidence, a named accountable approver and an approval date are recorded. A design document is not evidence that a student understands or benefits from the product.

## Summary

| Gate | Requirement | Status | Evidence now | Missing before pass |
| ---: | --- | --- | --- | --- |
| 1 | Problem validity | **Desk-supported; not passed** | Official research supports an uncertainty/overview/guidance problem for many—not all—students. [S01–S03] | Current primary interviews/tasks with diverse students, parents and SYVs; comparison with present alternatives; disconfirming evidence. |
| 2 | Comprehension | **Not passed** | Plain-Swedish principles, design system and wireframes exist. | Moderated prototype tasks and teach-back at agreed thresholds, including disabled students and setback/source/share states. |
| 3 | MVP value | **Not passed** | End-to-end confusion→action hypothesis and tight scope are documented. | Prototype evidence that the complete loop creates meaningful clarity and a useful action better enough than existing approaches, without added pressure. |
| 4 | Recommendation quality | **Not passed** | Deterministic rule, separate-dimension, graph, explanation and evaluation designs exist. | Implemented synthetic/domain test harness; two-SYV review; explanation/fairness/path tests; representative user evidence; no critical unsupported claim. |
| 5 | Minor safety | **Not passed** | Privacy/security/safeguarding/accessibility architectures and risk register exist. | DPIA/legal roles/bases, child-understood notices/controls, vendor/TIA, threat model, pentest, incident/deletion/restore/accessibility and safeguarding rehearsals. |
| 6 | Reliable data | **Not passed** | Official-first map, source register and provenance design identify APIs and national rules. | 30-day source rehearsal, field/region coverage, terms/licences, schema drift, freshness/conflicts, correction/rollback and UI reconciliation. |
| 7 | Usage | **Not passed** | One-next-action model and privacy-preserving analytics plan exist. | Controlled student pilot shows purposeful use/useful action and manageable operation—not merely logins. |
| 8 | Parent trust | **Not passed** | Student-scoped, expiring parent conversation flow is designed. | Voluntary student–parent tests show accurate scope understanding, revocation, no systemic coercion and preserved agency. |
| 9 | SYV utility | **Not passed** | Student-owned brief, source trace and correction flow are designed. | SYV/student pilot shows improved preparation/conversation without hidden assessment, replacement or unsustainable work. |
| 10 | Sustainability | **Not passed** | Conflict-free B2B hypothesis, cost model and rejected revenue are documented. | Credible buyer/procurement steps and contribution-margin/runway evidence including stewardship, compliance, support and sales costs. |

## Gate 1 — problem validity

### Desk evidence

- Skolverket’s 2024 study reports that many pupils feel uncertain, have limited knowledge of occupations and higher-education areas, and often choose programmes perceived as broad/open. In that study, 33% answered that choosing school/programme was difficult; it also warns against assuming every student experiences difficulty. [S01](SOURCES.md#product-education-and-data-sources)
- Skolverket’s 2022 evidence review describes the choice as difficult and hard to survey for many and documents large variation in guidance access/content. [S02](SOURCES.md#product-education-and-data-sources)
- The 2025 Grade 9 results show 19,700 pupils lacked eligibility for a national programme, reinforcing the need to test constructive alternatives rather than dead ends. [S08](SOURCES.md#product-education-and-data-sources)

### Why this is not a pass

These sources validate a broad social problem, not MINVÄG’s exact proposed solution, timing, language, differentiation or willingness to use/pay. Close competitors already offer integrated journeys.

### Pass criteria

1. At least 18 student sessions across Grade 8/9, geography, programme certainty, language background, gender, access needs and achievement contexts, recruited ethically.
2. At least 6 parents/supporting adults and 6 SYVs; include non-users and sceptics.
3. At least 70% of target students independently describe a recurring problem matching one of the top three jobs-to-be-done.
4. Existing official/commercial alternatives are observed on equivalent tasks; MINVÄG has a specific unmet job, not only more features.
5. Contradictory findings are documented; scope narrows or stops if criteria fail.

Targets are proposals to pre-register with the researcher before data collection, not current results.

## Gate 2 — comprehension

On a representative clickable-prototype test, at least 80% can without prompting:

- explain the difference between `behörighet`, historical admission points, exploration fit and practical feasibility;
- identify the source and date of a key fact;
- state that a forecast/path is uncertain and not a guarantee;
- find a constructive option and SYV/teacher question after not-yet-eligible/unknown;
- identify and choose/replace one next action;
- accurately predict and revoke parent/SYV share scope.

No critical accessibility blocker; median single-ease score at least 5/7 for each core task. Review thresholds with researchers and do not average away a critical harm case.

## Gate 3 — MVP value

Pass if the **complete** prototype—not isolated attractive screens—shows:

- at least 60% of target participants choose a personally meaningful next action;
- most can name two realistic options and one trade-off;
- before/after clarity improves qualitatively and on the pre-registered measure;
- pressure/reduced-agency guardrails do not worsen;
- comparison against current tools shows meaningful incremental value;
- parents/SYVs agree the proposed handoff is worth further testing.

If only eligibility, source checking or SYV preparation proves valuable, narrow to that job rather than building the broad platform.

## Gate 4 — recommendation quality

Pass criteria:

- 100% of approved critical national eligibility golden cases and rule boundary cases pass; unknown never becomes not eligible.
- Every rule has authority, version, valid interval, test IDs and two independent qualified reviewers.
- Recommendations expose independent dimensions, reasons/counterpoint, alternatives, provenance and unknowns; no universal score/admission probability.
- Every displayed path edge has correct semantics/evidence; no implied guaranteed `leads to`.
- AI, if enabled, cannot alter structured results; zero invented critical facts and approved groundedness/action/fallback thresholds pass.
- Counterfactual and exposure audits find no unexplained material disparity/stereotyped narrowing.
- Students and SYVs correctly understand and judge sampled outputs safe/useful.

## Gate 5 — minor safety

Pass criteria:

- Completed DPIA and records of processing; controller/processor roles and legal bases per deployment.
- Child-readable information/control/share flows pass comprehension tests.
- No personnummer, ad tracking, hidden profiling, covert adult access or unnecessary sensitive data.
- Vendor/subprocessor/transfer/training reviews and contracts complete.
- Threat model and independent penetration test have no unresolved critical/high findings.
- End-to-end export/deletion/restriction/revoke and backup restore/tombstone exercises pass.
- WCAG 2.2 AA target/manual assistive-technology audit has no critical core-task blocker.
- Safeguarding roles, scope/hours, urgent-help content and incident tabletop are approved/rehearsed.

Any confirmed cross-student disclosure, unlawful processing or unresolved safeguarding duty stops the live pilot.

## Gate 6 — reliable data

Pass criteria:

- 30-day ingestion rehearsal against Skolverket/Susa-navet/Planned Educations, selected regional admissions, JobTech/JobEd, SCB and any transit/event source used.
- Completeness, duplicates, update latency, schema drift, unmatched entities, source outage and conflicts measured per field/region.
- Terms/licences allow the intended retrieval, retention, transformation, display and attribution.
- Each displayed claim meets its freshness policy or is visibly stale/unknown/conflicted.
- Source-to-snapshot-to-claim-to-API-to-UI samples reconcile.
- An authoritative correction and dataset rollback are rehearsed; critical rule correction/suppression meets approved response target.

Swedish national programme coverage does not justify a claim of nationally complete local admissions/open-house coverage.

## Gate 7 — usage

Pass after a controlled student-only pilot if:

- the pre-registered useful-next-action rate meets target (proposal: at least 50% complete, schedule or deliberately replace within 14 days);
- at least 70% in sampled follow-up call the action understandable and appropriate;
- purposeful return/update and end-to-end completion show value beyond initial class instruction;
- dropout/decline/harm reasons are reviewed and no systemic pressure/confusion appears;
- correction, support, data and safety operation remains manageable;
- no critical guardrail breach.

No streaks, points or teacher monitoring may be added to manufacture usage.

## Gate 8 — parent trust

Pass after an opt-in subset if:

- at least 80% of students and invited adults independently predict what is/is not shared and how long;
- revoke works immediately and access history is understood;
- no covert monitoring, parent edit/rank control or grade/private-history default;
- student-reported ownership/pressure does not materially worsen;
- coercion/misuse reports are safely handled;
- accessibility and shared-device tests pass.

Pause the feature on systemic misunderstanding even if an aggregate percentage is met.

## Gate 9 — SYV utility

Pass if:

- briefs improve conversation/preparation or at minimum do not add material burden while producing a clear quality gain;
- at least 90% of critical synthetic/live-reviewed cases are judged safe/correct by qualified reviewers;
- students say the brief represents their questions and is not an assessment;
- source/correction workflow is usable and operationally manageable;
- no standing/bulk access, hidden label, official-record implication or replacement claim appears.

## Gate 10 — sustainability

Pass if:

- representative buyers demonstrate budget authority and credible procurement steps, not only free-pilot praise;
- Gates 1–9 evidence supports ongoing value/trust;
- contribution-margin path includes real cloud, source/data stewardship, support/onboarding, compliance/audit and sales/procurement costs;
- sales cycle and implementation work are financeable;
- no revenue depends on pay-to-rank, lead sale, advertising, surveillance or data reuse;
- source/vendor continuity and exit paths are viable;
- funded 12–18 month operating/downside plan and a clear stop point are approved.

## Gate sign-off record

| Gate | Accountable approver role(s) | Name(s) | Decision | Date | Evidence link |
| ---: | --- | --- | --- | --- | --- |
| 1 | Product research + founder | — | Not submitted | — | — |
| 2 | Design/research + accessibility | — | Not submitted | — | — |
| 3 | Product + student advisory reviewer | — | Not submitted | — | — |
| 4 | Product safety + two SYVs + engineering/fairness | — | Not submitted | — | — |
| 5 | DPO/legal + security + safeguarding + accessibility | — | Not submitted | — | — |
| 6 | Data owner + domain reviewer | — | Not submitted | — | — |
| 7 | Product research + pilot sponsor | — | Not submitted | — | — |
| 8 | Student safety/privacy + parent research | — | Not submitted | — | — |
| 9 | SYV lead + participating student reviewer | — | Not submitted | — | — |
| 10 | Founder/board + finance + product governance | — | Not submitted | — | — |
