# 21 — Analytics and learning strategy

<!-- markdownlint-disable MD013 -->

> **Status:** Proposed, privacy review required
> **Goal:** learn whether students gain clarity and take a useful self-chosen action—not maximise attention

## 1. Measurement principles

1. Measure user outcomes and guardrails, not time-on-site or addiction.
2. First-party, same-origin collection only; no advertising IDs, session replay, heatmaps or cross-site tracking.
3. Event schemas are allowlisted and contain no raw text, grade, email, exact option/entity, exact school/location or share token.
4. Personalisation does not learn from engagement events.
5. Students can use the core service if optional analytics is off.
6. School dashboards never expose individual browsing/profile/grade/action compliance.
7. Quantitative telemetry is paired with voluntary qualitative research and teach-back.
8. Retention and access are purpose-limited and documented in the DPIA.

## 2. Decision questions

| Decision | Question | Evidence |
| --- | --- | --- |
| Problem fit | Do unsure Grade 8 students recognise a recurring job and start without pressure? | Interviews + first-task completion, not traffic. |
| Comprehension | Can students distinguish four recommendation dimensions and uncertainty? | Moderated teach-back score. |
| Action usefulness | Is one next action understood, chosen and useful? | State transition + 14-day student report/interview. |
| Path value | Does branching increase realistic understanding without creating certainty? | Task success + teach-back + return reason. |
| Parent mode | Does conversation support preserve agency? | Student/parent before-after and share-control tasks. |
| SYV mode | Does the brief improve conversation or reduce preparation burden? | SYV time/quality ratings + student ownership. |
| Data trust | Do students notice and use source/date/conflict appropriately? | Source tasks + error reports + source health. |
| Sustainability | Can institutions adopt at acceptable service/stewardship cost? | Pilot operations/procurement evidence. |

## 3. Outcome model

### North-star candidate

**Useful next-action rate (UNAR-14):**

```text
number of activated students who within 14 days
  completed the proposed action
  OR scheduled it
  OR deliberately replaced it with another action
  AND report it was understandable and appropriate where sampled
÷
activated students who were shown an eligible next-action proposal
```

A decline is not a failure; track the reason category separately and review harmful/irrelevant signals. “Completed” is self-reported for off-platform actions, not verified surveillance.

### Activation

Student reaches all of:

- expresses at least one explicit observation **or** chooses neutral browse;
- opens at least two meaningfully different options;
- inspects a reason/reality-check; and
- receives one next action.

This is a learning definition, not a gamified checklist visible as pressure.

### Supporting metrics

- **Clarity delta:** self-report before/after plus an observed explain-two-options task.
- **Dimension comprehension:** correctly explains eligibility vs past admission vs fit vs feasibility.
- **Source literacy:** identifies owner/date and forecast/unknown.
- **Recovery success:** completes a constructive action after not-yet/unknown state.
- **Path understanding:** builds a branch and states it is not guaranteed.
- **Agency:** can change profile, request different option, decline action and revoke share.
- **SYV usefulness:** brief quality and preparation/conversation change.
- **Return with purpose:** updates/reviews a changed path/profile, not raw repeat visits.

## 4. Guardrails

| Guardrail | Signal | Stop/escalate |
| --- | --- | --- |
| Pressure/loss of agency | Student scale/interview; parent triad feedback | Material deterioration versus baseline or recurring harm theme. |
| Factual harm | Unsupported critical claim / wrong rule / misleading historical data | Any confirmed critical case triggers suppression and incident review. |
| Bias | Exposure/outcome differences and stereotype reports | Unexplained material disparity or stereotyped narrowing. |
| Privacy/security | Access anomaly, rights failure, data leakage | Incident plan; critical/high blocks/pauses. |
| Accessibility | Critical task blocker by disability/device | Block release until remediated. |
| Data freshness | SLA breach/unknown/conflict exposure | Field/source degradation banner or suppression. |
| Parent overreach | Student incorrectly predicts scope; covert access attempt | Pause parent mode if systemic. |
| SYV burden | Prep time/support tickets increase materially | Narrow/redesign handoff. |
| AI failure | unsupported fact, schema reject, template fallback | Critical error kill switch; review rates/causes. |

## 5. Minimal event taxonomy

All events include: random event ID, coarse pseudonymous analytics subject, session cohort (not account ID), event time rounded where possible, app version, locale, device class, accessibility preference flags only when strictly needed/approved, experiment ID if applicable, and retention date.

| Event | Allowed properties | Explicitly prohibited |
| --- | --- | --- |
| `journey_started` | entry intent category, anonymous/account | search text, referrer detail, email |
| `discovery_step` | prompt code, action `answered/skipped/none` | selected value/text unless separately approved aggregate taxonomy is necessary |
| `explore_list_viewed` | content type, personalised true/false, count | entity/school/occupation ID |
| `option_opened` | content type, position band, order reason category | exact option ID/title |
| `reason_opened` | dimension, source sheet opened yes/no | profile observation/value |
| `eligibility_task` | stage `started/completed`, result class only if DPIA approves | subject/grade/programme/school IDs |
| `source_sheet_opened` | claim kind, stale/conflict/current category | URL/claim ID if linkable to student |
| `path_action` | `created/branch_added/archived`, node/branch count band | path content/entity IDs/notes |
| `comparison_completed` | number 2/3, dimensions opened | exact alternatives |
| `next_action_transition` | action category, state, days bucket | free-text action/target identity |
| `share_control` | recipient type, previewed/created/revoked/expired, scope count | token, recipient/student ID, payload |
| `privacy_control` | request type/status | exported/deleted content |
| `content_reported` | issue category, severity after review | report text, claim/entity in analytics |
| `ai_delivery` | use case, template/AI/fallback, validation category, latency band | prompt/output/profile/claim IDs |

Security, domain audit and source health logs are separate from product analytics with different access/retention.

## 6. Identity and aggregation

- Analytics pseudonym is distinct from account/profile/session/security IDs and rotated on logout/reset/expiry as appropriate.
- Link to account only if a necessary longitudinal metric has passed DPIA/basis review; otherwise use short session/cohort analysis.
- Do not fingerprint devices.
- Organisation reporting requires minimum cell size proposed at 10, suppresses small cells and cannot filter to an individual or sensitive combination.
- Avoid geography below approved region and do not combine rare attributes.
- Differential privacy may be evaluated for public/long-term reporting, but it does not replace minimisation.

## 7. Dashboards

### Product learning

- Gate/task cohorts and confidence intervals.
- Drop-off at intent/prompt/reality-check/action without raw session replay.
- Guardrail panel displayed before growth metrics.
- Broken source/unknown/fallback categories.

### Source operations

- Feed fetch/publication, freshness, conflicts, missing coverage and downstream impact.
- Separate from user-level data.

### Pilot school/municipality

Only after role/legal/student-agency review:

- invited/activated count;
- aggregate comprehension/action research outcomes;
- aggregate technical/accessibility issues;
- no named student, exact path, grades, careers, individual action completion or “risk” list.

## 8. Qualitative learning

- Baseline and follow-up interviews with students, including non-completers and action decliners.
- Observed teach-back and emotional-safety prompts.
- Parent/student paired interviews separately and together.
- SYV brief review and session debrief.
- Accessibility sessions with assistive technology.
- Source/data steward incident retrospectives.

Store research data separately under an approved protocol; do not merge raw transcripts with product analytics.

## 9. Experiments

Experiments are not default. Before any A/B test:

- named decision and genuine equipoise;
- no variant weakens safety, privacy, source visibility, access or student control;
- no manipulation of urgency, rewards, parent pressure or commercial visibility;
- sample/analysis plan and stop criteria;
- fairness/accessibility review;
- choice/legal basis/notice where required;
- results include guardrails and uncertainty, not p-value alone.

Prefer moderated prototype comparison for consequential wording and eligibility states.

## 10. Metric interpretation

- Time-on-task can mean engagement or confusion; pair with success/ease.
- More saved options can mean curiosity or overload; no maximum target.
- More parent shares are not inherently good.
- Low not-yet-eligible continuation may reveal harmful wording or real external distress.
- Source-sheet open rate is not trust; test understanding.
- Action completion does not prove the recommendation was good; collect appropriateness and adverse feedback.
- Cohort statistics do not establish causality without a suitable design.

## 11. Retention and access

Proposed: event-level data ≤90 days then approved non-identifying aggregates. Access restricted to named product analyst/privacy roles; exports controlled/audited; no vendor reuse. Deletion/reset breaks personal linkage and deletes linked events where technically/legally required. Final design/legal basis/periods require DPIA approval.

## 12. Pilot analysis

Pre-register:

- Gate thresholds and primary outcome;
- recruitment/attrition and missing-data handling;
- subgroups feasible and ethical to inspect;
- baseline/comparator design;
- qualitative coding and negative-case review;
- confidence intervals and practical significance;
- adverse event/incident reporting;
- no claim of national effectiveness from a small convenience pilot.

Publish a short honest report including failures and excluded/missing data.
