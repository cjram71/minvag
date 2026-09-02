# 23 — Pilot and validation strategy

<!-- markdownlint-disable MD013 -->

> **Status:** Proposed staged protocol
> **Important:** primary discovery and clickable-prototype work comes before a live student-data pilot
> **Pilot purpose:** feasibility, comprehension, safety and value—not national effectiveness claims

## 1. Stages and gates

| Stage | Activity | Data | Exit gate |
| --- | --- | --- | --- |
| A. Discovery | Interviews/contextual tasks with students, parents, SYVs; test problem and alternatives | Separate research data; no product account | Gate 1 problem validity |
| B. Clickable prototype | Three iterative moderated rounds; no real eligibility decision stored | Minimal separate research data, synthetic scenarios | Gates 2 comprehension and 3 MVP value |
| C. Technical/domain rehearsal | Source/API spike, rule corpus, synthetic recommendation and threat/DPIA review | Official public + synthetic only | Gates 4 recommendation quality, 5 minor safety, 6 reliable data (pre-live criteria) |
| D. Student-only feasibility pilot | Small invite-only deployment; core loop, no parent standing link | Minimised product data | Gate 7 usage |
| E. Parent/SYV pilot | Opt-in student-controlled shares in a subset | Exact scoped payloads | Gates 8 parent trust and 9 SYV utility |
| F. Sustainability review | Buyer/procurement, operating cost, support and source stewardship | Aggregates/financial evidence | Gate 10 sustainability |

Stop at a failed gate, investigate/redesign and retest. Do not roll forward on schedule pressure.

## 2. Stage A — problem discovery

### Sample targets (minimum, not statistical representation)

- 18 students across Grade 8/9, region/urban-rural, programme certainty, varied current achievement, gender, language background and access needs.
- 6 parents/guardians/supporting adults with varied education familiarity.
- 6 practising SYVs across municipalities/school types and workload contexts.
- Include people who prefer existing official tools or no digital tool.

Recruit ethically through schools/youth channels with no teacher impact on grades/services. Information, assent/consent/guardian approach, compensation and recording require approved research protocol.

### Topics/tasks

- Last time choosing/exploring education; triggers and workarounds.
- What “a good next step” means.
- Existing services used and why sufficient/insufficient.
- Reactions to no-career-needed and branchable path concepts.
- Eligibility/admission misconception.
- Parent/SYV roles and privacy expectations.
- Disconfirming question: “What would make this unnecessary or worse?”

### Gate 1

Use criteria in [gate review](gate-review.md). Publish top jobs, variations, contradictory evidence and scope change. Do not force desk evidence into a pass.

## 3. Stage B — prototype validation

### Rounds

- Round 1: 5–6 students, navigation/language/pressure.
- Round 2: 5–6 different students, revised core loop and setback/source states.
- Round 3: 6–8 different students including assistive technology/access needs; confirm rather than merely discover.
- Parent and SYV concept tasks alongside, but no live sharing.

### Scenarios

1. Unsure student with no profile.
2. Direct search/confident student.
3. Unknown subject inputs.
4. Not-yet-eligible for an aspirational option.
5. Historical admission above/around/below current self-report with explicit no-prediction language.
6. Planned/cancelled offering and source conflict.
7. Gender-nontraditional vocational/academic option.
8. Branching path and changed-source notice.
9. Parent share preview/revocation.
10. SYV brief.

### Gate 2 comprehension

At least 80% independently teach back eligibility vs admission, identify source/date/uncertainty, recover constructively and retain sharing control; no critical accessibility blocker.

### Gate 3 MVP value

Pass if target students can complete the end-to-end loop, at least 60% choose a personally meaningful next action, qualitative clarity improves without increased pressure, and existing alternatives do not clearly solve it as well/safely. Final thresholds require researcher approval before data collection.

## 4. Stage C — pre-live technical and safety rehearsal

- 30-day source ingestion/reliability report.
- Two-SYV rule golden-case approval.
- Synthetic recommendation/path evaluation and fairness counterfactuals.
- Child-readable notice and sharing comprehension.
- Completed DPIA/controller/processor/basis/transfer/vendor decisions.
- Threat model, independent penetration test, incident/deletion/export/restore/source-rollback exercises.
- Accessibility audit/manual assistive-tech tests.
- Support and safeguarding protocol; no promise of monitoring beyond staffing.
- AI evaluation/kill switch/template fallback, or remove AI.

No child account is opened until Gates 4–6 and applicable Gate 5 safety sign-off pass.

## 5. Pilot partner selection

Seek 2–3 partners with deliberate variation:

- one larger urban/suburban and one smaller/rural context;
- varied gymnasium offerings/travel realities;
- committed SYV, school lead, DPO/privacy, IT/security and safeguarding contact;
- willingness to accept no ranking, ads, student surveillance or compulsory use;
- ability to recruit inclusively and provide device/access support;
- data/controller agreement and transparent communication;
- no partner with commercial influence over recommendation visibility.

Start local offering/admission depth only where source completeness is measured. Publish coverage gaps.

## 6. Stage D — student feasibility pilot

### Scale

Invite roughly 80–150 students to learn about onboarding/operations, targeting at least 40 meaningful activations. This is not powered to establish causal effectiveness or subgroup parity; perform a power/precision calculation before any stronger claim.

### Duration

8–12 weeks across a meaningful exploration period, avoiding only final-deadline panic where possible. Relative duration is proposed; school calendar/research plan determines dates.

### Core workflow

- optional orientation in class plus private try-without-account;
- no teacher sees individual path/grades/actions;
- baseline clarity/problem measure;
- student uses core loop on their own or in an approved session;
- one next action with 14-day follow-up;
- optional interview, separate from service;
- technical/source/accessibility support;
- withdrawal and deletion at any time.

### Data

Product: minimum account/profile/path/action/share/security fields. Research: separately consented baseline/follow-up and optional interview. No session replay or raw AI prompts. School gets minimum-cell aggregate feasibility report.

### Gate 7 usage

- useful next-action metric meets pre-registered target;
- target students return for a purposeful update/review where appropriate;
- dropout/decline reasons show no systemic pressure/confusion;
- error/support/source-stewardship load is operationally manageable;
- guardrails remain within threshold.

“Many logins” alone cannot pass.

## 7. Stage E — parent trust subset

After student-only evidence, invite a voluntary subset (e.g. 12–20 student–adult pairs) where the student actively chooses sharing.

Test:

- both independently predict shared/not-shared fields;
- parent uses conversation cards and visible comments;
- student revokes;
- before/after pressure and decision ownership;
- misuse/coercion reporting;
- accessibility and shared-device conditions.

Gate 8 passes only if at least 80% correctly understand scope/control, no systemic covert access is possible, and student-reported ownership/pressure does not materially worsen. Review any harm regardless of percentage.

## 8. Stage E — SYV utility subset

Use 6–10 SYVs and 20–30 voluntary student briefs if feasible. Compare routine preparation/conversation to brief-assisted sessions using a practical within-SYV or matched approach.

Measure:

- prep time distribution;
- question/fact quality and missing verification;
- conversation usefulness;
- correction reports/support workload;
- student report that brief reflected them and did not become an assessment;
- unsafe/incorrect case review.

Gate 9 passes only if briefs improve or at least do not worsen workload while materially improving preparation/conversation, ≥90% critical synthetic/live-reviewed cases are safe, and student agency remains strong.

## 9. Stage F — buyer/sustainability validation

- structured buyer/procurement interviews;
- at least two credible next procurement/budget steps beyond free-pilot enthusiasm;
- full cost-to-serve including data stewardship, compliance, support and sales cycle;
- contract/controller model acceptance;
- source/vendor/licence continuity;
- downside runway/stop plan.

Gate 10 criteria are in [business model](22-business-model.md#12-sustainability-gate-10).

## 10. Safeguarding and support

Before any live stage:

- named safeguarding lead per partner and MINVÄG;
- scope/hours/response expectations visible to student;
- reviewed Swedish urgent-help signposting;
- no open-ended AI counselling;
- process for coercive family/share concern, wrong guidance, data incident and distressed student;
- minimum necessary case data, restricted role and deletion schedule;
- school duties/escalation defined contractually and in participant information;
- researcher distress protocol and withdrawal without consequence.

## 11. Accessibility and inclusion

- provide compatible school/personal devices and quiet/private option;
- do not exclude students who use screen readers, zoom, switch/keyboard, reading support or limited Swedish;
- alternative assent/research material formats;
- avoid parent availability as a requirement for student-only research unless ethically/legally required;
- reimburse/compensate consistently without coercion;
- document who could not participate and why.

## 12. Pilot operations

Daily/weekly runbook includes:

- source freshness/conflicts and affected screens;
- security/access anomalies;
- reports and safeguarding triage;
- support response and accessibility issues;
- AI fallback/validation if enabled;
- deployment/dataset version and rollback readiness;
- no dashboard checking individual “progress.”

Partners receive a status contact, outage page, incident communication process and exit/deletion plan.

## 13. Stop/pause criteria

Immediately pause affected function/cohort for:

- wrong national eligibility logic or misleading admission prediction;
- confirmed unauthorised student disclosure/cross-tenant access;
- systemic share-scope misunderstanding/coercion;
- recurring harmful/deterministic recommendation language;
- source conflict/staleness without visible degradation;
- critical accessibility blocker;
- unresolved safeguarding duty or unstaffed promise;
- vendor transfer/training term change without review;
- school demand for hidden monitoring/ranking.

Pause broader pilot when root cause could be systemic. Communicate in child-appropriate language and support deletion/withdrawal.

## 14. Pilot report

Publish internally and to partners:

- recruitment, participation, attrition and limitations;
- pre-registered outcomes/guardrails and uncertainty;
- qualitative themes and disconfirming cases;
- accessibility/fairness/safety incidents;
- source coverage/reliability and correction workload;
- product/support/cost findings;
- gate decisions with approvers/dates;
- changes, retest or stop recommendation.

Do not market a feasibility pilot as proof of better educational outcomes.
