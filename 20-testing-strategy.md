# 20 — Testing strategy

<!-- markdownlint-disable MD013 -->

> **Status:** Proposed risk-based strategy; no tests have run
> **Release posture:** consequential rule, source, privacy, safety and accessibility failures block pilot

## 1. Quality risks

| Risk | Severity | Primary verification |
| --- | ---: | --- |
| Wrong eligibility / unknown treated as not eligible | Critical | Rule golden/property/mutation tests + dual SYV review |
| Eligibility confused with admission | Critical | API contract + content snapshot + student teach-back |
| Unsupported/pathway fact or stale offering | High | Data contracts, provenance completeness, source reconciliation |
| Cross-student/tenant/share access | Critical | Authorisation matrix, BOLA/fuzz/penetration tests |
| Harmful deterministic/AI wording | High | Content lint, synthetic safety set, student/SYV review, fallback tests |
| Biased option exposure | High | Counterfactual/subgroup/exposure tests and qualitative review |
| Student loses sharing/profile control | Critical | End-to-end share/revoke/delete/rights tests |
| Inaccessible core task | High | Automated + manual assistive-tech + disabled-user research |
| Upstream/model outage blocks journey | High | fault injection and degradation tests |
| Analytics/logs leak minor data | Critical | schema/DLP/log capture and retention/deletion tests |

## 2. Test layers

| Layer | Focus | Approximate emphasis |
| --- | --- | --- |
| Static | Type/schema/lint, forbidden fields/terms, dependency/security scans | Every change |
| Unit | Rule operators, source precedence, state machines, transformations, redaction | Largest automated layer |
| Property/mutation | Unknown propagation, temporal intervals, monotonic rule properties, parser robustness | High-risk logic |
| Contract | OpenAPI, source schemas, provider adapters, queue/idempotency | Every interface |
| Integration | PostgreSQL RLS, transactions, dataset publication, AI validation, mail/share bootstrap | Key boundaries |
| End-to-end | 16 required screens and degraded states on mobile/desktop | Focused critical journeys |
| Human/domain | SYV rule/path review, content, student comprehension, accessibility | Before gate/release |
| Operational | Load, recovery, incident, source outage, deletion/export, rollback | Before pilot and exercises |

Avoid a giant brittle UI suite. Put rule/provenance/authorisation truth in fast lower-layer tests and retain a small set of real-browser journeys.

## 3. Test data

- Synthetic student identities/profiles only in dev/test/stage.
- Approved fixtures describe fictional subject results and interests; no production copies, recordings or vendor sample child data.
- Official public source snapshots may be stored only under source terms and scrubbed of unexpected personal data.
- Research data stays in a separate controlled environment and is never a test fixture.
- Fixture generator supports framework/date, unknowns, region coverage, source conflicts and varied Swedish text length.
- A data manifest records fixture purpose, expected outcome, reviewer, source/rule version and expiry.

## 4. Eligibility rule verification

### Golden-case families

| Case | Input summary | Expected state |
| --- | --- | --- |
| Vocational minimum | Swedish/SVA + English + mathematics pass; five other distinct subjects pass | `eligible` |
| Vocational only four others | All input known | `not_yet_eligible`; count requirement named |
| Vocational mathematics unknown | Other requirements pass | `unknown`; never `not_yet_eligible` |
| Higher-ed preparatory count | Base + nine other distinct subjects | Depends on programme-specific subjects |
| Economics/humanities/social sciences | Base + nine, includes geography/history/religion/social studies | `eligible` |
| Same family missing required SO subject | Enough total, all known | `not_yet_eligible`; exact subject named |
| Natural science/technology | Base + nine, includes biology/physics/chemistry | `eligible` |
| Same family with chemistry unknown | Enough possible count | `unknown` |
| Arts | Base + nine others without SO/NO group condition | `eligible` (separate local skills test may remain unknown) |
| Programme-oriented choice | Each official alternative combination | Exact result/trace from active rule version |
| Duplicate subject code | Repeated input | Validation error, not inflated count |
| Swedish and SVA | Alternative requirement semantics | Count/trace exactly as official rule; no double-count |
| Future/past start date | Rule versions differ | Correct version pinned; no default to newest |
| Critical rule conflict | Two unresolved authority claims | Calculation blocked with verification handoff |

Authority details come from [S04](SOURCES.md#product-education-and-data-sources) and active legal references. Two independent domain reviewers approve expected results.

### Properties

- Reordering inputs never changes outcome/trace semantics.
- Duplicate input never increases eligible count.
- Replacing `pass` with `unknown` cannot create `eligible`.
- Replacing `unknown` with `not_pass` may resolve `unknown` to `not_yet_eligible`, never to eligible.
- Adding a distinct relevant passing result cannot make an otherwise identical target less eligible.
- Subject group requirements cannot be satisfied by raw count alone.
- An inactive/future rule cannot be selected outside validity.
- AI/model availability cannot affect structured result.

Mutation testing must prove the suite detects changed counts, missing required subject, swapped comparisons and boundary-date errors.

## 5. Data ingestion/provenance tests

### Adapter contract

- schema/version change, required/optional fields and enum drift;
- pagination/checkpoint/replay/idempotency;
- response type/size/time/decompression boundaries;
- rate limit/retry/partial failure;
- canonical IDs, code sets, dates, locale/decimal formats;
- expected empty feed versus outage;
- terms/licence/attribution metadata.

### Publication invariants

- raw snapshot hash immutable where retention allowed;
- every displayed fact resolves to at least one active claim/source;
- no active critical rule without authority claim and two approvals;
- valid/system time internally consistent;
- deterministic transformation yields same output from same snapshot/version;
- ambiguous entity match quarantined, never name-merged automatically;
- conflicts retained and correct field precedence applied;
- dataset publication atomic and rollback-tested;
- sampled source record reconciles through staging, claim, API and UI.

### Reliability rehearsal

Run 30 days before Gate 6: availability, latency, schema drift, record change, null/duplicate/unmatched rates, correction lag and stale behaviour by source/field/region.

## 6. Recommendation and pathway tests

- Output contains 3–5 candidates or honest insufficient-data response.
- No `score`, match percentage, school quality rank or admission probability in domain/API/analytics/UI.
- Every reason references an active explicit profile observation; deleting it removes future use.
- Eligibility state equals deterministic evaluation.
- Historical admission carries office/year/round/group/statistic and disclaimer.
- Fit, feasibility, eligibility and resilience do not overwrite one another.
- Protected attributes and disallowed proxies are absent from features.
- “Show something different” produces meaningful category/path variation, not relabelled duplicate.
- Ineligible possibility may remain in exploration with constructive route; no hidden exclusion unless user applies eligible-now filter.
- Every path edge has supported relationship or is visibly `student_hypothesis`.
- No unsupported transitivity and no generic “leads to” guarantee.
- Saved graph version remains stable after knowledge update; change notice is explicit.
- What-if displays changed input and only affected dimensions.

## 7. Fairness testing

### Pre-release

- Feature inventory signed to confirm no protected/special-category attributes or covert proxies.
- Counterfactual synthetic pairs vary names/pronouns or irrelevant attributes: output must not change.
- Geography may change local availability/travel, never intrinsic fit.
- Subject results may change eligibility only through published rules; they must not lower exploration worth.
- Exposure coverage reviewed across traditionally gender-coded work areas, vocational/academic routes, urban/rural availability and language complexity.
- Qualitative review with diverse students asks whether options feel narrowed, stereotyped or prestige-biased.

### Pilot

Sensitive demographics for fairness evaluation, if necessary, require a separate voluntary research protocol/store. Use minimum cells and do not feed them to personalisation. Report exposure/outcome differences with uncertainty; investigate before claiming fairness.

Stop on unexplained material disparity, stereotype amplification or exclusion of a meaningful route.

## 8. AI evaluation

See [AI architecture](12-ai-architecture.md#10-evaluation-suite). Automated suite runs on every model/prompt/policy change and daily/weekly sampled synthetic monitor as appropriate.

Required test types:

- immutable result comparison;
- claim entailment and unknown/refusal;
- banned guarantee/personality/admission language;
- allowed action code and source ID validation;
- indirect/direct prompt injection in Swedish/English/Unicode;
- attempts to request secrets/other students/browsing;
- long/malformed/hostile source excerpts;
- provider timeout/rate limit/model change;
- template fallback correctness;
- reading-level and student/SYV review.

No real student prompts are sent to general benchmark services.

## 9. Privacy and security tests

### Authorisation matrix

Test anonymous/student A/student B/parent-share/SYV-share/SYV same school/SYV other organisation/support/data steward/privacy admin/security admin across list/read/write/export/delete. Test object ID substitution, nested resources, bulk endpoints, stale/revoked/expired grants and disabled membership.

### Privacy operations

- anonymous expiry;
- notice/version/choice records;
- parent/SYV payload equals preview hash and exact scopes;
- token absent from query/referrer/log/analytics/history where designed;
- immediate revoke and access history;
- profile observation deletion removes future reason;
- export completeness and another-user isolation;
- delete through DB, queue, objects, cache, analytics linkage, vendor and restored backup tombstones;
- restriction/objection/personalisation-off behaviour;
- no sensitive service-worker/offline cache;
- no request body/free text/grade/email in logs/traces/errors.

### Security

SAST/SCA/secret/IaC/container scans, CSP/header/cookie/CSRF tests, injection/fuzz, parser sandbox/SSRF/archive-bomb fixtures, rate/cost abuse, dependency/build provenance and independent penetration test. Critical/high unresolved findings block pilot.

## 10. Accessibility testing

### Automated on every change

Semantic/lint checks, axe-like rules, colour tokens, form labels, heading/landmark, accessible name, obvious target/ARIA issues. Automated checks are not sufficient.

### Manual per release

- keyboard and switch-like navigation;
- visible/non-obscured focus;
- VoiceOver/Safari iOS and TalkBack/Chrome Android representative combinations;
- NVDA/Firefox or Chrome desktop;
- 200% text and 400% zoom; 320px reflow;
- forced colours/high contrast and colour-vision review;
- reduced motion and orientation;
- error identification/recovery, status announcements and timeout;
- path diagram equivalent list and compare reflow;
- share/delete/authentication flows.

Include disabled students/accessibility specialists in research. No critical task may require drag, hover, colour, memory puzzle or fine pointer.

## 11. Usability/comprehension tests

Use observed tasks and teach-back, not “Do you like it?”:

- Start while unsure.
- Explain what the profile says and change it.
- Explain why a recommendation appeared.
- Distinguish eligibility, historical admission, fit and feasibility.
- Identify source, date, forecast and unknown/conflict.
- Recover from not-yet-eligible without interpreting it as personal failure.
- Build a branch and say whether it is guaranteed.
- Choose/replace a next action.
- Predict/revoke parent and SYV share scope.

Gate 2 thresholds are defined in [gate review](gate-review.md#gate-2--comprehension).

## 12. Performance and reliability

Test representative Swedish mid-range mobile devices/network profiles and production-like data volume:

- Core Web Vitals targets from PRD;
- catalogue search/detail, eligibility, recommendation and path queries p50/p75/p95;
- cold/warm CDN, source-version cache safety;
- concurrency for pilot peak, not speculative national scale;
- AI timeout does not hold core response; templates immediate;
- queue backlog, retry/dead-letter and source slowdown;
- DB failover, backup restore, RPO/RTO;
- deployment/migration rollback and dataset rollback;
- external source, transit, email and AI fault injection.

## 13. Browser/device matrix

Current and previous major iOS Safari, Android Chrome, desktop Chrome/Firefox/Edge/Safari where supported; test school-managed devices and content blockers discovered in research. Publish supported-browser statement. Functional core should work without installing PWA.

## 14. Release evidence

Each release candidate records:

- code/config/source/rule/content/model versions;
- test result links and known flaky tests;
- source freshness/coverage report;
- rule/domain reviewer approvals;
- privacy/security/accessibility checks;
- AI evaluation and fallback test;
- unresolved risks with owner/expiry;
- rollout/monitor/rollback plan.

Production/pilot requires named product, engineering, SYV/domain, privacy, security, accessibility and safeguarding sign-off according to gate status.
