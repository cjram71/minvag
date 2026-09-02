# 19 — API specification

<!-- markdownlint-disable MD013 -->

> **Status:** Review contract v0.1, not implemented
> **Companion:** [OpenAPI 3.1 draft](schemas/openapi.yaml)
> **Base:** `/v1`; JSON UTF-8; timestamps RFC 3339 UTC; dates ISO 8601

## 1. Principles

- BFF-style REST API shaped for the Swedish mobile web client, while domain contracts remain reusable.
- Structured truth comes before prose: eligibility, claim kind, dates and states are enums/fields.
- Important fact-bearing responses include `claimRefs` and an `asOf` time.
- `unknown`/missing is explicit; never substitute `false`, zero or empty string.
- No universal recommendation/match score property.
- A write is performed only by an explicit user/API action, never by AI output.
- Public catalogue and private profile endpoints are separate for cache/access safety.
- Country/framework/date are explicit at rule/data boundaries.
- Backward-compatible additive change inside `/v1`; breaking semantic change requires a new version or negotiated deprecation.

## 2. Authentication

| Context | Mechanism | Notes |
| --- | --- | --- |
| Public catalogue | None | Rate-limited; public cache where source terms allow. |
| Anonymous discovery/evaluation | Secure first-party session cookie | Short-lived random session; no cross-site identity. |
| Student account | HttpOnly Secure SameSite cookie after passkey/magic-link authentication | CSRF/origin protection for writes. |
| SYV/admin | Same plus high-assurance MFA/organisation role | No standing student access. |
| Parent/SYV share payload | High-entropy bearer token sent in `Authorization: Share …` | Token placed in URL fragment during invitation bootstrap, not query/path; hash stored server-side. |

Do not put email, student/account IDs, share tokens or profile content in URLs, referrers or analytics.

## 3. Common headers

### Request

- `X-Request-ID`: optional UUID supplied by trusted client; server generates otherwise.
- `Idempotency-Key`: required UUID for retryable POSTs that create grants, paths, actions, reports or privacy requests.
- `X-CSRF-Token`: required for authenticated browser writes where cookie-based.
- `Accept-Language: sv-SE` (only Swedish response content in MVP).

### Response

- `X-Request-ID`.
- `Content-Language: sv-SE`.
- `Cache-Control: public, max-age=…` for approved public versioned catalogue; `private, no-store` for all personal/share/admin responses.
- `Deprecation` and `Sunset` when an endpoint/field is deprecated.

Rate-limit responses use `429` and coarse retry metadata; limits do not reveal whether an account exists.

## 4. Error envelope

```json
{
  "error": {
    "code": "MISSING_INPUT",
    "message": "Vi behöver fler uppgifter för att kunna avgöra behörigheten.",
    "fieldErrors": [
      {"path": "/subjectResults/3/result", "code": "REQUIRED", "message": "Välj ett svar."}
    ],
    "requestId": "018f…",
    "helpUrl": "/hjalp/felkoder#missing-input"
  }
}
```

`message` is safe for users; internal stack/source/provider details remain in restricted logs. Core codes:

`VALIDATION_ERROR`, `UNAUTHENTICATED`, `NOT_AUTHORISED`, `NOT_FOUND`, `CONFLICT`, `STALE_WRITE`, `MISSING_INPUT`, `RULE_UNAVAILABLE`, `SOURCE_CONFLICT`, `SOURCE_UNAVAILABLE`, `SHARE_EXPIRED`, `RATE_LIMITED`, `TEMPORARILY_UNAVAILABLE`.

A cross-user forbidden resource normally returns `404`; security audit records the denial.

## 5. Provenance contracts

### Claim reference

```json
{
  "claimId": "uuid",
  "kind": "authority_rule",
  "label": "Källa: Skolverket",
  "status": "active",
  "appliesFrom": "2025-07-01",
  "appliesTo": null,
  "dataDate": "2026-09-01",
  "verifiedAt": "2026-09-02T09:20:00Z"
}
```

### Full source sheet

`GET /v1/claims/{claimId}` returns source owner/type/original URL, exact applicability, retrieved/verified dates, quality dimensions, transformation summary, conflicts and product uses. It never exposes restricted storage URLs or internal credentials.

## 6. Endpoint catalogue

### Public catalogue

| Method/path | Purpose |
| --- | --- |
| `GET /catalog/programmes` | Search/list national programmes by framework/type. |
| `GET /catalog/programmes/{id}` | Programme detail, structure and source refs. |
| `GET /catalog/school-units` | Search verified units by coarse region. |
| `GET /catalog/school-units/{id}` | Unit detail and source status. |
| `GET /catalog/offerings` | Filter current/planned offering instances by programme/term/region. |
| `GET /catalog/occupations` | Search bounded occupation/task catalogue. |
| `GET /catalog/occupations/{id}` | Tasks/skills/signals and possible route refs. |
| `GET /claims/{id}` | Source/provenance sheet. |
| `GET /coverage` | Field/region freshness/completeness disclosure. |

All lists use cursor pagination (`page[cursor]`, `page[limit]` max 50) and stable `sort`. Search strings are length-limited; no arbitrary query DSL.

### Profile/discovery

| Method/path | Purpose |
| --- | --- |
| `GET /profile` | Current profile and controls. |
| `GET /profile/observations` | Current explicit observations. |
| `POST /profile/observations` | Add approved typed observation. |
| `PATCH /profile/observations/{id}` | Replace/supersede value. |
| `DELETE /profile/observations/{id}` | Remove from active profile and future explanations. |
| `PUT /profile/subject-results/{subjectCode}` | Set pass/not-pass/unknown self-report. |
| `DELETE /profile/subject-results/{subjectCode}` | Remove subject result. |
| `POST /profile/reset` | Explicit re-auth/confirmation; clears personalisation inputs. |

Profile observation `kind/value` follows server-published allowlisted schemas. No arbitrary personality, diagnosis or free-form attribute keys.

### Eligibility

`POST /eligibility/evaluations` can run in a short-lived anonymous session or account.

Request:

```json
{
  "targetEntityId": "uuid-of-programme-or-offering",
  "countryCode": "SE",
  "frameworkVersion": "GY25",
  "intendedStartDate": "2027-08-15",
  "subjectResults": [
    {"subjectCode": "SV_OR_SVA", "result": "pass", "origin": "student_self_reported"},
    {"subjectCode": "EN", "result": "pass", "origin": "student_self_reported"},
    {"subjectCode": "MA", "result": "unknown", "origin": "student_self_reported"}
  ],
  "persist": false
}
```

Response:

```json
{
  "id": "uuid",
  "asOf": "2026-09-02T10:00:00Z",
  "result": "unknown",
  "inputOriginLabel": "Betyg du själv fyllt i",
  "rule": {"version": "SE-GYM-ELIG-2026.2", "validFrom": "2025-07-01"},
  "requirements": [
    {"code": "BASE_MATH", "state": "missing_input", "subjectCodes": ["MA"]}
  ],
  "missingInputs": ["MA"],
  "unmetRequirements": [],
  "calculationTrace": ["…structured reviewed step…"],
  "explanation": {
    "heading": "Vi kan inte avgöra ännu",
    "body": "Vi saknar uppgift om matematik.",
    "generatedBy": "template",
    "claimRefs": ["uuid"]
  },
  "allowedNextActionCodes": ["CHECK_SUBJECT_WITH_TEACHER", "PREPARE_SYV_QUESTION"]
}
```

HTTP `200` is correct for `not_yet_eligible` and `unknown`; those are domain outcomes, not API errors. `409 SOURCE_CONFLICT` is reserved for a critical unresolved rule conflict preventing calculation.

### Recommendations

| Method/path | Purpose |
| --- | --- |
| `POST /recommendation-runs` | Create versioned candidate set from explicit current observations. |
| `GET /recommendation-runs/{id}` | Retrieve exact run/lineage while retained. |
| `POST /recommendation-runs/{id}/alternatives` | Ask for a meaningfully different bounded set; no learning from click. |
| `POST /recommendation-candidates/{id}/dismiss` | User dismisses; optional allowlisted reason, no free text required. |

Candidate:

```json
{
  "entity": {"id": "uuid", "type": "programme", "label": "Teknikprogrammet"},
  "displayOrder": 2,
  "sortReason": "student_evidence",
  "eligibility": {"state": "unknown", "evaluationId": "uuid"},
  "explorationFit": {
    "reasons": [
      {"observationId": "uuid", "text": "Du valde att lösa problem."}
    ],
    "counterpoint": "Programmet innehåller mycket teori. Vill du utforska hur det känns?",
    "inferenceConfidence": "medium"
  },
  "historicalAdmission": {"state": "unavailable", "claimRefs": []},
  "feasibility": {"offeringState": "region_not_selected", "claimRefs": []},
  "resilience": {"state": "mapped", "relationshipRefs": ["uuid"]},
  "claimRefs": ["uuid"]
}
```

Schema contains no `score`, `matchPercentage`, `rankQuality` or admission probability.

### Paths and comparisons

| Method/path | Purpose |
| --- | --- |
| `GET /paths` / `POST /paths` | List/create student-owned path. |
| `GET /paths/{id}` | Get current version and change notice. |
| `POST /paths/{id}/versions` | Explicitly create a new version with nodes/edges/notes. |
| `DELETE /paths/{id}` | Delete/archive according to explicit request. |
| `POST /path-candidates` | Read-only evidence-backed path search. |
| `GET /comparisons/{id}` / `POST /comparisons` | Persist/retrieve 2–3 option comparison. |

Path edges require `relationshipId` or `certainty: student_hypothesis`; a student hypothesis is never promoted to public graph evidence.

### Next actions

| Method/path | Purpose |
| --- | --- |
| `GET /next-action` | One current proposed/accepted action. |
| `POST /next-actions` | Accept a safe catalogue action. |
| `PATCH /next-actions/{id}` | `snoozed`, `replaced`, `declined`, `completed`. |
| `GET /next-action-catalogue` | Public/approved action definitions. |

Every transition uses optimistic version (`If-Match`) and state-machine validation. Completing an action awards no points/streak.

### Sharing and human handoff

| Method/path | Purpose |
| --- | --- |
| `POST /share-previews` | Produce exact proposed payload, recipient type, scopes and expiry. |
| `POST /shares` | Confirm preview hash and create revocable grant. |
| `GET /shares` | Student lists scope/expiry/last access. |
| `DELETE /shares/{id}` | Immediate revoke. |
| `GET /shared-payload` | Recipient uses Share auth; immutable scoped snapshot. |
| `POST /shared-comments` | Visible, short recipient question if scope allows. |
| `POST /syv-brief-previews` | Build student-owned brief preview. |
| `POST /syv-briefs` | Confirm/share or render accessible print view. |

The create request contains `previewHash`; server rejects if underlying payload changed. No endpoint lets a parent or organisation search students.

### Privacy, feedback and safety

| Method/path | Purpose |
| --- | --- |
| `GET /privacy/data-map` | Child-readable list of stored categories and recipients. |
| `POST /privacy/requests` | Export/access/delete/restrict/object request. |
| `GET /privacy/requests/{id}` | Status and completion explanation. |
| `POST /reports` | Wrong/stale/misleading/harmful/accessibility/security report. |
| `GET /me/sessions` / `DELETE /me/sessions/{id}` | Session visibility/revoke. |

Deletion is async but account becomes inaccessible immediately. Return `202` with status resource and reviewed completion timeline. Sensitive operations require recent authentication.

## 7. Optimistic concurrency and idempotency

- Mutable resources return `ETag: "version"`.
- Client supplies `If-Match`; stale writes receive `412 STALE_WRITE` and current representation link.
- Server stores idempotency result by authenticated/anonymous subject + route + key for a short documented period.
- Reusing a key with different body returns `409 CONFLICT`.
- Worker operations use internal idempotency keys and atomic dataset publication.

## 8. Input safety

- JSON body limit per endpoint; no unbounded arrays/nesting.
- Enums and `additionalProperties: false` on consequential schemas.
- Unicode normalisation for search/display, while preserving source canonical text.
- Free text only for short student note/report/comment endpoints, with length, content and access limits.
- URLs are never fetched because a client supplied one; reports may store text URL for reviewed staff only.
- Coordinates are not accepted for profile; transit uses approved stop ID or coarse region.

## 9. Privacy and observability

API gateway logs method, route template, status, latency, request ID and pseudonymous security subject where needed. It excludes request/response bodies, query search text, grade results, profile observations, path notes, emails and share tokens.

Analytics is a separate allowlisted event API/module. It does not receive raw domain payloads.

## 10. API review/contract testing

- OpenAPI schema lint and breaking-change detection.
- Consumer/provider contract tests for web client and workers.
- Authentication/authorisation matrix and BOLA tests per endpoint.
- Property tests for unknown/missing semantics.
- Golden rule response fixtures with rule/claim versions.
- Cache tests ensuring personal responses are `no-store` and never shared.
- Share token/referrer/log leakage tests.
- Rate/size/nesting/fuzz tests.
- Swedish error/comprehension/accessibility review.

The OpenAPI draft is illustrative and deliberately covers the highest-risk contracts rather than claiming implementation completeness.
