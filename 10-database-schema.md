# 10 — Database schema

<!-- markdownlint-disable MD013 -->

> **Status:** Conceptual PostgreSQL schema for review; names/types may change
> **Principles:** immutable important facts, explicit unknowns, data minimisation, tenant isolation, time-aware claims

## 1. Conventions

- UUIDv7-like sortable UUIDs internally; never expose sequential IDs.
- `country_code char(2)` and `framework_version` on country-dependent entities/rules.
- `timestamptz` in UTC for system time; local date/academic term as typed values.
- `valid_from/valid_to` = real-world applicability; `recorded_at/superseded_at` = system knowledge time.
- Soft deletion is not the privacy deletion mechanism. User-facing rows are hard/anonymised-deleted by the deletion workflow; only narrowly justified audit tombstones remain.
- Free text is exceptional, length-limited, excluded from analytics/search by default and safety reviewed.
- `unknown` is a domain state, not silently represented as `false` or `0`.

## 2. Identity, organisations and relationships

```text
accounts
- id uuid PK
- status enum(active, locked, deletion_pending)
- preferred_locale text default 'sv-SE'
- created_at, last_login_at
- deletion_requested_at nullable

account_identifiers                  -- separate encrypted/tokenised identity vault
- id uuid PK
- account_id uuid FK
- type enum(email, passkey)
- lookup_hash bytea UNIQUE
- encrypted_value bytea nullable
- verified_at, created_at

sessions
- id_hash bytea PK
- account_id uuid nullable FK          -- nullable anonymous session
- created_at, expires_at, revoked_at
- device_label text nullable

student_profiles
- id uuid PK
- account_id uuid UNIQUE FK
- country_code char(2) default 'SE'
- school_year enum(8, 9, other) nullable
- region_code text nullable             -- coarse only
- created_at, updated_at

organisations
- id uuid PK
- type enum(school_unit, provider, municipality, pilot_partner)
- authority_identifier text nullable
- name text
- status enum(active, suspended)

organisation_memberships
- organisation_id uuid FK
- account_id uuid FK
- role enum(syv, data_steward, support, privacy_admin, security_admin)
- status, approved_by, valid_from, valid_to
- PK(organisation_id, account_id, role)

share_grants
- id uuid PK
- student_profile_id uuid FK
- recipient_account_id uuid nullable FK
- token_hash bytea nullable UNIQUE
- recipient_type enum(parent, syv)
- purpose enum(parent_conversation, syv_preparation)
- scopes text[]                         -- allowlisted server-side enum values
- payload_snapshot_id uuid FK
- granted_at, expires_at, revoked_at

share_access_events
- id uuid PK
- share_grant_id uuid FK
- occurred_at
- action enum(opened, printed, commented)
- actor_account_id uuid nullable
- security_context jsonb                -- minimised; retention-limited
```

Do not model “guardian” as legally verified unless verification exists. Product text should say invited adult/supporter where appropriate.

## 3. Living profile

```text
profile_observations
- id uuid PK
- student_profile_id uuid FK
- kind enum(interest, value_priority, activity, work_style, dislike, goal, practical_preference)
- concept_code text nullable             -- approved taxonomy where possible
- value jsonb                            -- schema per kind; no arbitrary object
- origin enum(student_explicit, imported, inferred)
- confidence enum(not_applicable, low, medium, high)
- observed_at, created_at, superseded_at
- source_interaction_id uuid nullable

student_subject_results
- id uuid PK
- student_profile_id uuid FK
- subject_code text
- result enum(pass, not_pass, unknown)
- grade_symbol text nullable             -- validate Swedish scale/version; optional for pure eligibility
- framework_version text
- origin enum(student_self_reported)     -- MVP only
- observed_at, created_at, superseded_at
- UNIQUE current(student_profile_id, subject_code, framework_version)

student_goals
- id uuid PK
- student_profile_id uuid FK
- statement text                         -- short, student-authored
- time_horizon enum(now, gymnasium, after_gymnasium, someday)
- state enum(active, archived)
- created_at, updated_at
```

No personality table, diagnosis, protected-characteristic profile, exact address or inferred household income. Fairness research attributes, if ethically necessary, live in a separately consented/controlled research system—not the recommendation profile.

## 4. Source registry and temporal claims

```text
sources
- id uuid PK
- owner_name text
- source_type enum(law, authority_api, authority_page, official_statistics, provider, licensed_aggregator, editorial)
- base_url text
- precedence_tier smallint
- licence_id uuid nullable
- active boolean

source_endpoints
- id uuid PK
- source_id uuid FK
- url_template text
- schema_version text
- expected_cadence interval nullable
- terms_checked_at, terms_url

source_snapshots
- id uuid PK
- source_endpoint_id uuid FK
- requested_at, received_at
- http_status smallint
- content_hash bytea
- object_key text nullable
- licence_permits_retention boolean
- parser_version text nullable
- quality_status enum(received, quarantined, validated, published, rejected)

entities
- id uuid PK
- country_code char(2)
- entity_type enum(education_framework, provider, school_unit, programme, specialisation, subject, subject_level, credential, education_offering, occupation, skill, industry, region, transit_stop)
- canonical_label text
- status enum(active, inactive, unknown)
- created_at

external_identifiers
- entity_id uuid FK
- source_id uuid FK
- identifier_type text
- identifier_value text
- valid_from, valid_to
- match_method enum(authority_direct, reviewed_merge, exact_crosswalk)
- match_confidence enum(high, medium, low)
- UNIQUE(source_id, identifier_type, identifier_value, valid_from)

claims
- id uuid PK
- subject_entity_id uuid FK
- predicate_code text
- object_entity_id uuid nullable FK
- value jsonb nullable                   -- typed by predicate schema
- source_snapshot_id uuid FK
- valid_from, valid_to nullable
- observed_at, recorded_at, superseded_at nullable
- authority_confidence enum(high, medium, low)
- coverage_confidence enum(complete, partial, unknown)
- status enum(active, stale, conflicted, suppressed, superseded)
- transformation_id uuid nullable

claim_conflicts
- id uuid PK
- claim_a_id, claim_b_id uuid FK
- field_scope text
- detected_at
- severity enum(critical, high, normal)
- resolution enum(open, authority_a, authority_b, both_contextual, unknown, withdrawn) nullable
- rationale text nullable
- resolved_by uuid nullable
- resolved_at nullable

transformations
- id uuid PK
- name, code_version, configuration_hash text
- input_snapshot_ids uuid[]
- executed_at
```

A claim is immutable. Correction creates/supersedes claims and logs rationale. JSON values are validated by a predicate registry; arbitrary untyped JSON is prohibited.

## 5. Education/rule domain

```text
education_frameworks
- entity_id uuid PK FK entities
- framework_version text
- effective_from, transition_end nullable

programmes
- entity_id uuid PK FK entities
- programme_code text
- programme_type enum(vocational, higher_ed_preparatory, introduction, special_variant, fourth_technical)
- framework_version text

education_offerings
- entity_id uuid PK FK entities
- school_unit_id uuid FK entities
- programme_id uuid FK entities
- specialisation_id uuid nullable FK
- start_term text
- delivery_mode enum(campus, distance, mixed, unknown)
- status enum(planned, confirmed, cancelled, unknown)

rule_sets
- id uuid PK
- country_code char(2)
- domain enum(gymnasium_eligibility, introduction_eligibility, merit_calculation)
- name text

rule_versions
- id uuid PK
- rule_set_id uuid FK
- semantic_version text
- valid_from, valid_to
- status enum(draft, reviewed, active, retired, blocked)
- definition jsonb                       -- constrained rule DSL
- authority_claim_ids uuid[]
- approved_by uuid[]                     -- at least two for activation
- approved_at
- definition_hash bytea UNIQUE

eligibility_evaluations
- id uuid PK
- student_profile_id uuid nullable FK    -- can be anonymous/ephemeral
- target_entity_id uuid FK
- intended_start_date date
- rule_version_id uuid FK
- input_snapshot jsonb                   -- minimal typed self-report snapshot
- result enum(eligible, not_yet_eligible, unknown, not_applicable)
- missing_inputs text[]
- unmet_requirements text[]
- calculation_trace jsonb
- content_hash bytea
- created_at
- expires_at nullable
```

Rule activation requires authority evidence and dual review. Evaluations pin the version forever for explainability; the UI can offer recalculation under a new version.

## 6. Knowledge graph and student paths

```text
relationship_types
- code text PK
- subject_types text[]
- object_types text[]
- semantics text
- directed boolean
- requires_authority boolean

entity_relationships
- id uuid PK
- subject_entity_id uuid FK
- relationship_type_code text FK
- object_entity_id uuid FK
- framework_version text nullable
- directness enum(direct, indirect)
- strength enum(required, common, possible, related)
- valid_from, valid_to nullable
- status enum(active, conflicted, suppressed, superseded)

relationship_evidence
- relationship_id uuid FK
- claim_id uuid FK
- evidence_role enum(defines, supports, limits, contradicts)
- PK(relationship_id, claim_id)

student_paths
- id uuid PK
- student_profile_id uuid FK
- title text
- state enum(draft, active, archived)
- created_at, updated_at

student_path_versions
- id uuid PK
- student_path_id uuid FK
- version integer
- graph_snapshot_at timestamptz
- created_by enum(student, accepted_syv_suggestion)
- created_at
- UNIQUE(student_path_id, version)

student_path_nodes
- id uuid PK
- path_version_id uuid FK
- entity_id uuid nullable FK
- custom_label text nullable
- node_kind enum(current_stage, possibility, milestone, question, unknown)
- position jsonb                         -- bounded visual coordinates/order

student_path_edges
- id uuid PK
- path_version_id uuid FK
- from_node_id, to_node_id uuid FK
- relationship_id uuid nullable FK
- label text nullable
- certainty enum(verified_rule, supported_possibility, student_hypothesis, unknown)

student_path_notes
- id uuid PK
- path_version_id uuid FK
- node_id uuid nullable FK
- text text
- type enum(interest, concern, question)
- created_at
```

Knowledge graph updates never silently alter a saved path version. A change impact process can propose a new version.

## 7. Recommendations, comparison and actions

```text
recommendation_runs
- id uuid PK
- student_profile_id uuid FK
- profile_snapshot_hash bytea
- catalogue_version text
- algorithm_version text
- created_at

recommendation_candidates
- run_id uuid FK
- entity_id uuid FK
- display_order smallint
- sort_reason enum(relevance, diversity, student_saved, nearby, alternative)
- eligibility_evaluation_id uuid nullable FK
- fit_evidence jsonb                    -- observation IDs + reason type, not prose only
- feasibility_claim_ids uuid[]
- admission_claim_ids uuid[]
- resilience_relationship_ids uuid[]
- inference_confidence enum(low, medium, high)
- counterpoint_code text
- PRIMARY KEY(run_id, entity_id)

comparisons
- id uuid PK
- student_profile_id uuid FK
- entity_ids uuid[] CHECK cardinality between 2 and 3
- created_at, updated_at

next_action_catalogue
- code text PK
- category enum(explore, verify, compare, ask_syv, ask_teacher, talk, visit_official, attend_event)
- title_template text
- safety_level enum(standard, needs_verified_target)
- active boolean

student_actions
- id uuid PK
- student_profile_id uuid FK
- action_code text FK
- target_entity_id uuid nullable FK
- rationale_claim_ids uuid[]
- state enum(proposed, accepted, snoozed, replaced, declined, completed)
- proposed_at, due_at nullable, state_changed_at
- predecessor_id uuid nullable FK
```

A recommendation does not store one total score. Fit evidence points back to editable observations. Delete an observation and future runs cannot use it; existing run retention follows the privacy schedule.

## 8. AI, content and review

```text
content_templates
- id uuid PK
- use_case text
- locale text
- version integer
- body text
- status enum(draft, reviewed, active, retired)

ai_generations
- id uuid PK
- use_case enum(explanation_simplify, question_suggestion)
- pseudonymous_task_id uuid
- model_policy_version text
- prompt_template_version text
- input_claim_ids uuid[]
- input_observation_ids uuid[]           -- IDs only in record; provider packet is minimized
- output_text_encrypted bytea nullable
- validation_result jsonb
- fallback_used boolean
- created_at, delete_after

reports
- id uuid PK
- reporter_account_id uuid nullable
- entity_id, claim_id, relationship_id uuid nullable
- type enum(wrong, stale, conflict, misleading, harmful, accessibility, security)
- description_encrypted bytea nullable
- severity, status, assigned_role
- created_at, resolved_at

review_decisions
- id uuid PK
- object_type, object_id, decision, rationale
- reviewer_account_id
- created_at
```

Raw free text and model output are not analytics. Retain only what the reviewed operational/legal purpose requires.

## 9. Privacy, audit and analytics

```text
processing_notices
- id uuid PK
- locale, version, audience enum(student, parent, syv)
- effective_from, body_hash

notice_acknowledgements
- account_id uuid
- notice_id uuid
- shown_at
- interaction enum(shown, acknowledged)

privacy_requests
- id uuid PK
- account_id uuid FK
- type enum(access, export, rectify, delete, restrict, object)
- status, requested_at, completed_at
- verification_method text

security_audit_events
- id uuid PK
- occurred_at
- actor_id uuid nullable
- action_code, object_type, object_id
- organisation_id uuid nullable
- result enum(allowed, denied)
- reason_code, correlation_id
- integrity_hash bytea

analytics_events
- id uuid PK
- pseudonymous_subject_id uuid
- event_name text CHECK allowlist
- occurred_at
- properties jsonb CHECK schema_allowlist
- experiment_variant text nullable
- delete_after
```

Legal basis/purpose records are not reduced to a “consent” checkbox. A processing-activity registry maps each table/field/use to purpose, legal basis, controller, recipients and retention in governance documentation.

## 10. Row-level access model

- Student profile rows: owning account only, except exact active share payload snapshots.
- Share recipient sees immutable payload, not source tables.
- SYV organisation role alone grants no profile access.
- Support sees account/service metadata, not grade/profile/path content by default.
- Data steward sees source/claim domain, not student domain.
- Privacy admin runs reviewed requests through controlled workflow.
- Security admin sees security metadata with content redacted.
- Service accounts are split by web, ingest, maintenance and export/deletion tasks.

Use PostgreSQL RLS as defence-in-depth plus mandatory service-layer authorisation. Tests must attempt horizontal/vertical/cross-tenant access for every endpoint.

## 11. Retention proposal for DPIA review

| Data | Default proposal | Trigger |
| --- | --- | --- |
| Anonymous session/profile | 24 hours server-side, or device-only | Expiry/browser clear |
| Active account profile/path | While account active and purpose continues | Annual inactivity prompt; deletion request |
| Self-reported grade superseded versions | 30 days, unless needed to explain active evaluation | Update/deletion |
| Parent/SYV payload | Expiry + 30 days for user recovery, then delete | Revoke/expiry |
| AI text | 30 days maximum for safety QA; zero where not needed | Creation |
| Product analytics | 90 days event-level, then approved aggregates | Event date |
| Security logs | 12 months proposal | Event date/legal need |
| Generated export | 24 hours | Creation/download |
| Backups | Rolling ≤35 days; crypto-erasure/account deletion ledger | Backup age |
| Public source claim history | Source/licence and audit need | Supersession/licence |

Final periods require necessity analysis, DPIA and contracts.

## 12. Required constraints/tests

- one current student observation per supersession chain;
- no active share past expiry/revocation;
- share payload fields are a subset of granted scopes;
- no path edge without either evidence-backed relationship or explicit `student_hypothesis`;
- no active rule version overlap in the same scope;
- authority rule activation has two reviewers;
- recommendation candidate has no universal score property;
- claim validity is internally consistent;
- source snapshot hash immutable;
- deletion covers search indexes, analytics linkage, queues, objects and cache—not only PostgreSQL.
