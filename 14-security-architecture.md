# 14 — Security architecture

<!-- markdownlint-disable MD013 -->

> **Status:** Threat-model draft; independent review and test required
> **Security objective:** protect minors’ agency, identity and contextual education data while keeping public education facts trustworthy

## 1. Assets

1. Account identifiers, credentials, recovery and session tokens.
2. Student profile observations, self-reported grades, paths and actions.
3. Parent/SYV share payloads, comments and access history.
4. Organisation membership/role data.
5. Eligibility rules and evaluations.
6. Source registry, snapshots, claims, mappings and correction decisions.
7. AI prompts/outputs/policies and evaluation artifacts.
8. Audit/security logs, encryption keys, code/build/deployment credentials.
9. Product trust and the student’s decision autonomy.

## 2. Adversaries and misuse

- Opportunistic account attacker or token thief.
- Peer/family member on a shared device.
- Abusive adult using an invitation link.
- Compromised/overprivileged school or vendor account.
- Insider with support/admin access.
- Bot/scraper/denial-of-service actor.
- Malicious source/provider content or supply-chain dependency.
- Student testing boundaries, without treating normal exploration as malicious.
- AI prompt-injection/data-exfiltration attempt.
- Commercial actor attempting ranking manipulation.

## 3. Trust zones

```text
Public device/browser
  ↓ TLS/WAF/rate limit
Public edge
  ↓ authenticated/private origin
Web/API runtime ── AI gateway ── approved provider
  ↓ private workload identity
PostgreSQL / queue / encrypted object storage
  ↑ separate identity
Ingestion worker ── constrained egress ── external sources

Admin zone: separate route, MFA, narrow roles, audited elevation
```

Production, stage, test and development use separate cloud accounts/projects, identities, secrets and data. Non-production contains synthetic data only.

## 4. Threat/control matrix

| Threat | Example impact | Prevent/detect/respond controls |
| --- | --- | --- |
| Account/session takeover | Profile/share disclosure | Passkeys preferred, verified magic-link protections, HttpOnly/Secure/SameSite cookies, CSRF defence, session rotation, device/session revoke, anomaly/rate alerts. |
| Shared-device exposure | Family/peer sees grades/path | Neutral notifications, short anonymous expiry, no sensitive offline cache by default, explicit logout/device controls, re-auth for export/share. |
| Broken object/tenant authorisation | One user reads another profile | Deny-by-default service checks, PostgreSQL RLS, opaque IDs, payload snapshots, automated BOLA/cross-tenant tests, access audit. |
| Share-link leakage | Unauthorised parent/SYV view | ≥128-bit random token, hash at rest, one purpose, expiry/revoke, no referrer/analytics, optional recipient verification, access notice. |
| Privilege escalation | Staff browses minors | Split roles, just-in-time/break-glass access, phishing-resistant MFA, dual approval, content redaction, alerts and quarterly review. |
| Injection/XSS/CSRF | Account/data compromise | Contextual output encoding, CSP/nonces, Trusted Types where feasible, sanitisation, CSRF tokens/origin checks, parameterised queries. |
| SSRF/parser attack | Worker reaches metadata/internal service | Egress allowlist, DNS/IP validation, size/time/type/decompression limits, sandboxed parsers, no active document execution. |
| Source poisoning | Wrong programme/rule/path | Source identity/TLS, content hashes, schema/anomaly checks, authority precedence, quarantine, dual review for critical facts, rollback. |
| AI prompt injection | Unsupported advice/data leak | Closed evidence packet, no tools/secrets, source text untrusted, output schema/citation validation, one call and kill switch. |
| Dependency/build compromise | Runtime compromise | Lockfiles, least dependencies, SCA/SAST/secret scans, SBOM, signed build/provenance, protected CI identity, patch SLA. |
| Data exfiltration via logs/analytics | Grades/profile leaked | Allowlisted schemas, central redaction, no raw request bodies/free text, DLP tests, separate restricted security logs. |
| Backup/key theft | Bulk disclosure | Managed KMS/HSM-backed keys, envelope encryption, least key use, rotation, encrypted backups, restore access audit. |
| Availability attack/source outage | Guidance unavailable/stale | WAF/DDoS, quotas, queues/circuit breakers, last-verified read path with banner, template fallback, runbooks. |
| Commercial manipulation | Paid school appears preferred | Recommendation has no paid input; code/data separation; conflict disclosures; audit and review. |
| Enumeration/scraping | Student/account discovery | Generic responses, rate limits, no public profile, token entropy, anti-automation proportional to risk/accessibility. |

## 5. Authentication and recovery

### Student

- Explore without identity.
- Account uses passkey where supported; magic link is fallback.
- Do not use knowledge questions, school roster facts, birth date, personnummer or parent surveillance for recovery.
- Recovery options must be usability-tested with minors and resistant to mailbox sharing.
- Re-authenticate for account deletion, new share, identity change and export.

### SYV/admin

- Organisation lifecycle with verified sponsor.
- Phishing-resistant MFA required; hardware/passkey preferred.
- Shorter sessions, managed-device/conditional access where proportionate.
- Membership expiry and rapid offboarding.
- No shared accounts.

Passwords, if ever introduced, require modern salted adaptive hashing, breach screening and no arbitrary periodic reset.

## 6. Authorisation

Policy decision inputs:

```text
actor: account, organisation membership, assurance/session state
resource: owner, classification, organisation, purpose
relationship: active explicit share grant and scope
context: expiry, revocation, elevated approval, incident lock
```

Every request returns allow/deny reason and audit ID. Front-end hiding is never authorisation. Batch/export endpoints apply the same row-level rules.

## 7. Encryption and secrets

- TLS 1.2+ with modern configuration externally and TLS internally where supported.
- Managed database/object/backup encryption with customer-managed key separation where justified.
- Application-level envelope encryption for account contact values and operational free text.
- Lookup by keyed hash, not decrypt-and-scan.
- Secrets in managed vault/workload identity, never repository/env files in artefacts/logs.
- Key rotation, disablement and crypto-erasure procedures tested.
- Passwordless tokens stored only as hashes and single-use.

## 8. Web/mobile security baseline

- Server-render first view; minimal third-party JavaScript.
- Strict CSP (`default-src 'self'`) with narrowly listed endpoints; frame-ancestors deny except reviewed preview/admin needs.
- HSTS, nosniff, strict referrer policy, permissions policy disabling unneeded sensors/location/camera/mic.
- No third-party ad pixels, social widgets, session replay or cross-site trackers.
- Service worker caches only public versioned assets/catalogue by default; never profile/grade/share responses.
- Cache-Control `private, no-store` for personal/share/admin responses.
- Safe redirects/return URLs and origin validation.

## 9. Data ingestion security

- Registry of approved domains/endpoints, owners, terms and expected content.
- Worker identity cannot read student tables.
- Conditional fetch, maximum bytes/pages/decompression ratio, content signature/hash.
- Parse in sandbox/container with no cloud metadata credentials and restricted file system.
- Stage → validate → quarantine/publish; critical rules never auto-publish.
- Protect against CSV formula injection, XML external entities, zip bombs, malformed geodata, embedded scripts and instruction text.
- Preserve raw snapshot only if licence permits; malware scan objects.

## 10. AI security

- Only AI gateway has provider credential; use-case-scoped key/quota if possible.
- Request DLP/minimisation before egress; response schema and allowed-ID check.
- No broad system prompt or secrets returned to client.
- Treat model output as untrusted and encode before rendering.
- Adversarial tests include extraction, indirect injection, cross-language attacks and denial/cost amplification.
- Provider breach/behaviour change can be isolated with a global kill switch without taking down core product.

## 11. Secure SDLC and verification

Target OWASP ASVS Level 2 as a practical baseline, with stronger controls around high-value/admin/privacy functions. Required:

- abuse cases/threat model per major feature;
- two-person review for auth, rules, sharing, deletion and AI policy;
- lint/type/unit/integration/authorisation tests;
- SAST, SCA, licence, secret, container/IaC scans;
- dependency update/patch ownership and emergency process;
- production-like staging with synthetic data;
- independent web/API/cloud penetration test before pilot;
- annual test and material-change retest; critical/high findings block launch;
- responsible disclosure/security contact and triage SLA.

## 12. Security logging and privacy

Log security events, not student content:

- login/recovery/session/share actions;
- access denials and cross-tenant attempts;
- role/membership/elevation and export/deletion;
- rule/source/admin changes;
- AI policy/validation failures;
- key/deployment/config changes.

Use UTC, correlation IDs, integrity protection and restricted query roles. IP/user agent retention must be necessary, truncated where possible and documented in the DPIA. Never log grades, discovery answers, path notes, invite tokens or raw prompts.

## 13. Incident response

Severity examples:

- **Critical:** confirmed bulk minor-data access, active cross-tenant bypass, malicious eligibility rule, signing/key compromise.
- **High:** single-student unauthorised disclosure, active share-token weakness, material source poisoning, unsupported harmful recommendation pattern.

Flow: detect → contain (kill switch/token revoke/claim suppress) → preserve evidence → assess scope/risk → notify controller/DPO → legal notification/communication decision → correct → verify → child-appropriate communication → post-incident prevention.

GDPR breach deadlines and school/controller responsibilities must be in contracts/runbooks; never assume the processor notifies authorities directly. Run a tabletop before pilot.

## 14. Safeguarding boundary

Security reporting and child safeguarding are connected but not identical. The product needs:

- visible “Det här känns fel / Jag behöver hjälp” route;
- no promise of 24/7 human monitoring unless staffed;
- reviewed Swedish emergency/support signposting for imminent danger;
- escalation contacts and response times agreed with pilot schools;
- no improvised AI conversation;
- minimum information collection and restricted safeguarding case access.

Exact duties and school escalation need legal/safeguarding review.

## 15. Residual risk and launch blockers

No pilot until:

- DPIA/threat model/controller agreements complete;
- high-risk vendors assessed;
- role and share model usability-tested;
- independent test has no unresolved critical/high finding;
- restore, deletion, source rollback and incident tabletop succeed;
- security owner/on-call and vulnerability process are staffed.
