# 02 — Student journey

<!-- markdownlint-disable MD013 -->

> **Status:** Review draft
> **Primary persona:** an unsure Swedish Grade 8 student
> **Design objective:** clarity and agency, not engagement volume

## Journey promise

The student can always say **“Jag vet inte”**, skip, change their mind, inspect why something is shown, and leave with one useful action. A session is successful even if the student does not choose a programme.

## End-to-end journey

| Stage | Student thought | Experience | System responsibility | Healthy exit |
| --- | --- | --- | --- | --- |
| 0. Arrive | “Måste jag redan veta?” | Landing says no career decision is required. Try anonymously or save later. | No account wall; child-readable privacy summary. | Student understands it is exploratory. |
| 1. JAG | “Vad vet jag om mig själv?” | 3–7 short prompts, examples, skips, and a growing set of editable observations. | Save only explicit answers; show “just nu”; no personality inference. | Two current priorities/curiosities. |
| 2. UTFORSKA | “Vad finns det?” | A small diverse set of tasks, work areas, occupations and programmes; search remains available. | Ground cards in verified claims; explain why shown; include something different. | Two items saved, one dismissed with optional reason. |
| 3. FÖRSTÅ | “Vad betyder det här i vardagen?” | Plain-language day-in-the-life, study content, possible routes, facts/forecasts/unknowns. | Keep pathways potential; sources/dates visible. | Student can describe an option in their own words. |
| 4. VERKLIGHETSKOLL | “Kan det fungera för mig?” | Eligibility, missing inputs/requirements, historical admission context, and travel displayed separately. | Deterministic rules; no admission promise; coarse location. | Student sees what is known and what needs verification. |
| 5. MIN VÄG | “Hur kan en väg se ut?” | Save one route with at least one optional branch and a doubt/note. | Store a draft possibility, never a prescribed plan. | A path named “Spår jag utforskar”. |
| 6. MINA ALTERNATIV | “Vad skiljer alternativen?” | Compare at most 3; highlight trade-offs and unknowns. | No winner badge or opaque score. | Student names a meaningful trade-off. |
| 7. NÄSTA STEG | “Vad gör jag nu?” | One small action with time estimate and reason. Replace, snooze or decline. | Select only from safe verified action catalogue. | Action chosen or intentionally declined. |
| 8. SAMTAL | “Vad ska jag fråga?” | Build a two-minute SYV brief and optionally invite a parent conversation. | Student previews and shares; grants are scoped/revocable. | Better human conversation, student still owner. |
| 9. Return | “Har något ändrats?” | Gentle prompt to review grades, priorities, sources and path. | Show change history and newly stale facts; no guilt/streak. | Student updates or confirms current state. |

## First-session happy path (8–12 minutes; hypothesis)

1. **Landing:** “Du behöver inte veta vad du vill bli.”
2. Choose “Jag vill börja utan konto.”
3. Answer: “Mer av?” → `skapa`, `lösa problem`; “Helst?” → `jobba tillsammans ibland`; skip values question.
4. See: “Du har sagt detta just nu” with edit controls.
5. Receive four exploration cards: two close, one adjacent, one deliberately different.
6. Open a programme card and an occupation card.
7. Save both; choose “Hur kan vägen se ut?”
8. See a potential pathway with branches and source notes.
9. Choose next action: “Jämför Teknikprogrammet och El- och energiprogrammet — cirka 5 min.”
10. Create an account only if choosing “Spara till nästa gång.”

Time is a design hypothesis; tests determine the right pace.

## Scenario A — “I have no idea”

### Starting point

The student selects: **“Jag vet inte än.”**

### Product behaviour

- Start from situations, not careers: “Vilken uppgift låter minst tråkig?”
- Offer visual examples and an “inget av detta” option.
- Reflect exact wording: “Du valde …”, not “Du är en …”.
- After two answers, permit exploration; never require a full quiz.
- Show an adjacent or surprising option with a clear reason: “För att bredda, inte för att vi tror att detta är rätt.”

### Failure to avoid

A pseudo-psychological test returning “Du är analytisk, därför ska du bli programmerare.”

## Scenario B — currently not eligible

### Starting point for eligibility

The student manually enters self-reported grades or marks some subjects unknown.

### Result model

```text
Behörighet just nu: Inte ännu
Det här bygger på betygen du själv har fyllt i.

För [program] behövs godkänt i:
✓ svenska/svenska som andraspråk
✓ engelska
! matematik — saknas eller ej godkänt
✓ 5 andra ämnen

Det här kan du göra:
1. Kontrollera med din lärare om uppgiften stämmer.
2. Spara frågan: “Vad behöver jag visa för att nå godkänt i matematik?”
3. Se introduktionsprogram och andra möjliga vägar.

Det här säger inget om vad du kan klara senare.
```

### Required alternatives

- Show national introduction-programme explanations, but do not claim a local placement exists until offering data confirms it. [S07](SOURCES.md#product-education-and-data-sources)
- Keep aspirational options saveable as “senare möjlighet.”
- Offer a SYV question and an official source.
- Never label student “obehörig” as an identity or close the journey.

## Scenario C — confident student

A student searching for a named programme should not be forced through discovery. They may:

1. search directly;
2. inspect eligibility and local offerings;
3. compare one adjacent alternative and one meaningfully different option;
4. save next action.

The service supports confidence without affirming it blindly.

## Scenario D — contradictory or missing data

```text
Vi hittar olika uppgifter
Skolverket visar att skolan planerar programmet. Skolans sida saknar samma uppgift.

Vad vi gör:
• visar båda källorna och deras datum
• markerar uppgiften “behöver kontrolleras”
• länkar till skolans kontakt/antagningskansli

Vi gissar inte.
```

The student can still save the option, but any action relying on the conflicting fact becomes “kontrollera med skolan.”

## Scenario E — return after facts change

A change summary says:

- “Ett program du sparat har ny information.”
- what changed, old/new source dates, and potential path impact;
- “Din väg är fortfarande din. Vill du granska den nu eller senare?”

No path silently rewrites itself.

## Emotional design curve

| Moment | Likely risk | Desired feeling | Mechanism |
| --- | --- | --- | --- |
| Arrival | Pressure, embarrassment | Relief | Explicitly normalise uncertainty. |
| Discovery | Feeling tested | Curiosity | No right answers; skip; concrete situations. |
| Recommendation | Being judged | Seen but free | Quote student evidence and make it editable. |
| Eligibility | Shame/finality | Specific hope | “Inte ännu”; missing requirement + action + alternatives. |
| Comparison | Overload | Calm discernment | Three options, progressive disclosure, trade-offs. |
| Next action | Large-plan paralysis | Capability | One small action, replace/decline. |
| Sharing | Loss of control | Supported agency | Preview, scope, expiry, revoke. |

## Navigation and resume model

Bottom navigation in Swedish:

- **Jag**
- **Utforska**
- **Min väg**
- **Alternativ**
- **Nästa**

Each section has one clear primary action. A home summary can say:

```text
Hej! Du utforskar 2 spår.
Nästa lilla steg: jämför två program (5 min)
[Starta] [Välj ett annat]
```

No completion percentage implies that self-knowledge can be “100% complete.”

## Student control inventory

The student can:

- browse without account;
- inspect all stored profile observations;
- see whether an observation is self-entered, calculated, imported or inferred;
- edit/delete/reset observations;
- archive/delete paths;
- turn personalisation off and browse neutrally;
- see and revoke every parent/SYV share;
- export/delete account data;
- ask for a different option;
- report wrong, confusing or harmful information.

## Service blueprint

| Visible student step | Product service | Data/rule work | Human fallback |
| --- | --- | --- | --- |
| Answer discovery prompt | Render approved prompt variant | Store explicit observation with timestamp | Skip/help text |
| Open programme | Compose verified card | Resolve entity + valid claims + source precedence | Official page/SYV |
| Check eligibility | Collect minimum grades | Run pinned deterministic rule version | Explain unknown + SYV |
| View recommendations | Display separated dimensions | Candidate retrieval → constraints → diversity → reasons | Neutral browse if engine down |
| Save possible path | Add branch/note | Validate graph claims and snapshot versions | Manual note if relation unknown |
| Choose action | Show one catalogue action | Eligibility, uncertainty and deadline-aware selector | Student chooses custom note |
| Share brief | Preview exact payload | Create scoped expiring grant + audit | PDF/print handover |

## Research tasks for Gate 2

1. Ask student to start with “I don’t know” and teach back what MINVÄG believes.
2. Ask them to correct one profile observation.
3. Ask what a recommended card means and whether it feels like a verdict.
4. Compare eligibility with historical admission position.
5. Use a deliberately stale and conflicting fact.
6. Recover from a not-yet-eligible state.
7. Identify a source and forecast horizon.
8. Share and revoke a parent/SYV brief.
9. Choose and later report on one next action.

Measure comprehension, observed completion, emotional pressure, perceived ownership and accessibility—not just preference.
