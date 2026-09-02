# 17 — UX wireframes

<!-- markdownlint-disable MD013 -->

> **Status:** Low-fidelity review draft; not usability-tested
> **Viewport:** first designed at 360×800 CSS px, then reflowed up
> **Language:** Swedish UI; annotations in English where useful

## 1. Information architecture

```text
/                         Landing
/start                    First choice: explore / compare / eligibility
/jag                      Living profile
/utforska                 Search and browse
/utforska/program/:id     National programme
/utforska/skola/:id       School/offering
/utforska/yrke/:id        Work area/occupation
/rekommendation/:id       Why shown + independent dimensions
/behorighet               Input/result/recovery
/min-vag                  Branching path
/alternativ               Compare 2–3
/nasta                     One next action
/kallor/:claim             Source sheet/conflict
/dela                      Parent/SYV sharing
/syv-underlag              Student-owned brief
/installningar             Account, AI, sharing, privacy
/hjalp                     Wrong/harmful info and support
```

Signed-in mobile bottom navigation:

```text
[ Jag ] [ Utforska ] [ Min väg ] [ Alternativ ] [ Nästa ]
```

At narrow widths labels may wrap to two lines but do not become icon-only. “Nästa” carries no red notification pressure.

## 2. Shared mobile frame

```text
┌──────────────────────────────────┐
│ MINVÄG                   Hjälp   │  56
├──────────────────────────────────┤
│                                  │
│  Page title                       │
│  Short plain-language context     │
│                                  │
│  Content                          │
│                                  │
│                                  │
├──────────────────────────────────┤
│ Primary action (sticky only if    │
│ it never hides focused content)   │
├──────────────────────────────────┤
│ Jag Utforska Min väg Alt. Nästa  │  64 + safe area
└──────────────────────────────────┘
```

Skip link, semantic landmarks, logical focus order and page-title announcement are required. Bottom navigation is absent on public share/landing screens where inappropriate.

## 3. Landing — pressure-free entry

```text
┌──────────────────────────────────┐
│ MINVÄG                     Om oss│
│                                  │
│ Du behöver inte veta             │
│ vad du vill bli.                 │
│                                  │
│ Vi hjälper dig att utforska      │
│ möjligheter, förstå vad som      │
│ krävs och hitta ett litet        │
│ nästa steg. Du bestämmer.        │
│                                  │
│ [ Börja utforska ]               │
│ [ Jag vet redan vad jag söker ]  │
│                                  │
│ 🔒 Prova utan konto              │
│ Vad sparas?                      │
└──────────────────────────────────┘
```

No cookie wall for essential functionality. Optional analytics/AI wording choices appear only when relevant, with equal accept/decline prominence.

## 4. First intent

```text
Vad vill du ha hjälp med just nu?

┌──────────────────────────────────┐
│ Jag vet inte än                  │
│ Börja lugnt med några exempel.   │
└──────────────────────────────────┘
┌──────────────────────────────────┐
│ Utforska program och yrken       │
└──────────────────────────────────┘
┌──────────────────────────────────┐
│ Jämföra alternativ               │
└──────────────────────────────────┘
┌──────────────────────────────────┐
│ Förstå behörighet                │
└──────────────────────────────────┘

[ Hoppa över och sök ]
```

All are valid routes; “I don’t know” is first, not a failure.

## 5. Friendly discovery prompt

```text
┌──────────────────────────────────┐
│ ← Avsluta               Fråga 1  │
│                                  │
│ Vad vill du helst ha mer av      │
│ i en vanlig dag?                 │
│ Välj hur många eller få du vill. │
│                                  │
│ [ □ Skapa något ]                │
│ [ □ Lösa tydliga problem ]       │
│ [ □ Hjälpa andra ]               │
│ [ □ Vara i rörelse ]             │
│ [ □ Förstå hur saker hänger ihop]│
│ [ □ Inget av detta ]             │
│                                  │
│ [ Fortsätt ]                     │
│ Jag vet inte / Hoppa över        │
└──────────────────────────────────┘
```

No progress percentage, timer or “correct” feedback. The selected state uses icon/border/text, not colour only.

## 6. Living profile (“Jag”)

```text
┌──────────────────────────────────┐
│ Jag                              │
│ Det här har du sagt just nu.     │
│ Du kan ändra allt.               │
│                                  │
│ Viktigt just nu                  │
│ ┌──────────────────────────────┐ │
│ │ Lösa problem          Ändra  │ │
│ │ Du valde detta 2 sep 2026    │ │
│ └──────────────────────────────┘ │
│                                  │
│ Nyfiken på                       │
│ ┌──────────────────────────────┐ │
│ │ Teknik                 Ta bort│ │
│ └──────────────────────────────┘ │
│                                  │
│ Betyg du själv fyllt i           │
│ Inte tillagda                    │
│ [ Lägg till för behörighet ]     │
│                                  │
│ [ Lägg till något ]              │
│ Utforska utan anpassning         │
│ Nollställ min profil             │
└──────────────────────────────────┘
```

“Inferred” observations are absent by default. If any future inference exists, it is a separate section, visibly less authoritative and one-tap removable.

## 7. Explore

```text
┌──────────────────────────────────┐
│ Utforska                         │
│ [ Sök program, uppgifter, yrken ]│
│                                  │
│ [Program] [Yrkesområden] [Skolor]│
│                                  │
│ Förslag att utforska             │
│ ┌──────────────────────────────┐ │
│ │ Teknikprogrammet             │ │
│ │ Kan passa att utforska       │ │
│ │ för att du valt problemlösning│ │
│ │                              │ │
│ │ Behörighet: Okänd            │ │
│ │ Lokalt utbud: välj område    │ │
│ │ [ Varför visas detta? ]      │ │
│ └──────────────────────────────┘ │
│                                  │
│ [ Visa något annorlunda ]        │
│ [ Visa alla utan anpassning ]    │
└──────────────────────────────────┘
```

Card order reason is visible. A paid/commercial field does not exist.

## 8. Programme detail

```text
┌──────────────────────────────────┐
│ ← Utforska                       │
│ Teknikprogrammet                 │
│ Högskoleförberedande · Gy25      │
│                                  │
│ Kort sagt                        │
│ Du arbetar med teknik, design …  │
│ [ Lyssna ]                       │
│                                  │
│ Du kan få göra                    │
│ • …                              │
│                                  │
│ Det kan vara bra att veta        │
│ • Studietakten kan …             │
│                                  │
│ Behörighet        [ Kontrollera ]│
│ Möjliga vägar     [ Visa grenar ]│
│ Skolor nära val   [ Välj område ]│
│                                  │
│ Källa: Skolverket                │
│ Gäller Gy25 · kontrollerad 2 sep │
│ [ Visa källa och osäkerhet ]     │
│                                  │
│ [ Lägg till i Min väg ]          │
│ [ Jämför ]                       │
└──────────────────────────────────┘
```

“Lyssna” uses accessible text-to-speech implementation only after privacy/accessibility review; it is not required to save audio.

## 9. School/offering detail

```text
[School unit name]
[Municipality] · School unit ID available in sources

Status for [programme, start term]
◷ Planerad utbildning
Kontrollera med skolan innan du bestämmer dig.

Ungefärlig resa
Välj hållplats eller område — inte hemadress
[ Välj start ]

Öppet hus
15 oktober, 17.00
Källa: skolans officiella sida
Kontrollerad: 1 september
[ Öppna original ]

Tidigare antagningsläge
Uppgift saknas för vald omgång.
[ Öppna regional antagning ]

[Report wrong information]
```

No reviews, league table or “best school” badge.

## 10. Eligibility input

```text
┌──────────────────────────────────┐
│ Behörighet                       │
│ Detta är en vägledning, inte     │
│ skolans officiella besked.       │
│                                  │
│ Program: [ Teknikprogrammet  ▾ ] │
│ Start:   [ Hösten 2027        ▾ ]│
│                                  │
│ Fyll i det du vet                │
│ Svenska/SVA  ( )E eller mer      │
│              ( )Inte godkänt     │
│              (•)Vet inte         │
│ Engelska     ...                 │
│ Matematik    ...                 │
│ Biologi      ...                 │
│ Fysik        ...                 │
│ Kemi         ...                 │
│ Övriga godkända ämnen [  —  ]    │
│                                  │
│ Uppgifterna kommer från dig.     │
│ [ Kontrollera behörighet ]       │
└──────────────────────────────────┘
```

Use full subject list in implementation rather than relying on an error-prone count where special subject groups matter. Inputs save only after clear request/account policy.

## 11. Eligibility results

### Eligible from supplied input

```text
Behörighet enligt det du fyllt i
✓ Kraven ser uppfyllda ut

Det betyder: Du verkar kunna söka.
Det betyder inte: att du säkert blir antagen.

[ Visa kraven och beräkningen ]
[ Jämför med historik – om den finns ]
```

### Not yet

```text
Behörighet just nu
! Inte ännu

Det här saknas i uppgifterna du fyllt i:
• godkänt i matematik

Det du kan göra härnäst
[ Spara en fråga till min lärare ]

Andra vägar att undersöka
[ Läs om introduktionsprogram ]
[ Förbered fråga till SYV ]

Det här säger inget om vad du kan klara senare.
```

### Unknown

```text
? Vi kan inte avgöra ännu
Vi saknar uppgift om fysik och kemi.
[ Fyll i ] [ Fråga min SYV ]
```

Unknown is never styled as failure.

## 12. Recommendation explanation

```text
Varför visas Teknikprogrammet?

Utifrån det du sagt
• Du valde “lösa problem”.       [Ändra]
• Du sparade teknik som nyfikenhet.[Ta bort]

Verklighetskoll
Behörighet       Okänd             [Kontrollera]
Antagningsläge   Historik saknas   [Varför?]
Praktiskt        Område ej valt    [Välj]
Vägar vidare     Flera möjliga     [Visa]

Något att fundera på
Programmet innehåller mycket …
Stämmer det med vad du vill just nu?

[ Visa ett annat alternativ ]
[ Visa utan anpassning ]
```

No radial chart, “87% match” or winner trophy.

## 13. My Path

```text
┌──────────────────────────────────┐
│ Min väg                          │
│ Ett spår du utforskar –          │
│ inte ett löfte.                  │
│                                  │
│ [ Åk 8: jag är här ]             │
│           │                      │
│      ┌────┴────────┐             │
│      ▼             ▼             │
│ [Teknikprog.] [El- och energi]   │
│      │             │             │
│      ▼             ▼             │
│ [Flera vägar]  [Arbete/YH/…]     │
│                                  │
│ ? Lokalt utbud behöver kollas    │
│ [ Lägg till gren ]               │
│ [ Lägg till fråga ]              │
│ [ Vad har ändrats? ]             │
└──────────────────────────────────┘
```

Provide a linear list alternative with identical information for screen readers and cognitive preference. Pan/zoom is never required.

## 14. Compare

```text
Alternativ (2 av 3)
[Byt] Teknikprogrammet
[Byt] El- och energiprogrammet

Vad gör man mycket av?
A: Teori, teknik, problemlösning
B: Praktiskt och teoretiskt, el/automation
[Visa källor]

Behörighet just nu
A: Okänd – 2 uppgifter saknas
B: Ser uppfylld ut

Tidigare antagning
A: 2025-historik [region] – inte prognos
B: Uppgift saknas

Det du sagt
A: passar “lösa problem”
B: passar “jobba praktiskt”

Vägar vidare
[ Visa grenar, inte poäng ]

[ Spara en fråga om skillnaden ]
```

On desktop, two columns may be used. On mobile, rows keep the question and both answers together; avoid horizontal-scrolling tables.

## 15. Next Step

```text
┌──────────────────────────────────┐
│ Nästa lilla steg                 │
│                                  │
│ Jämför vardagen i två program    │
│ Cirka 5 minuter                  │
│                                  │
│ Varför detta?                    │
│ Du har sparat två spår men inte  │
│ jämfört vad man gör på dem.      │
│                                  │
│ [ Börja jämföra ]                │
│ [ Välj ett annat steg ]          │
│ [ Inte nu ]                      │
│                                  │
│ Inga poäng. Ingen serie att bryta.│
└──────────────────────────────────┘
```

If completed: “Klart. Vill du välja ett nytt steg eller stanna här?” No confetti by default.

## 16. Source sheet

```text
┌──────────────────────────────────┐
│ ← Tillbaka      Om uppgiften     │
│                                  │
│ Behörighetskrav                  │
│ TYP: Nationell regel             │
│                                  │
│ Källa                            │
│ Skolverket                       │
│ [ Öppna originalkällan ↗ ]       │
│                                  │
│ Gäller                           │
│ Teknikprogrammet · Gy25          │
│ Start efter 30 juni 2025         │
│                                  │
│ Datum                            │
│ Hämtad 1 sep 2026                │
│ Kontrollerad 2 sep 2026          │
│                                  │
│ Så använde MINVÄG uppgiften      │
│ Regelversion … jämfördes med     │
│ betyg du själv fyllde i.         │
│                                  │
│ Osäkerhet                        │
│ Betygen är inte skolverifierade. │
│                                  │
│ [ Visa beräkningen ]             │
│ [ Rapportera ett fel ]           │
└──────────────────────────────────┘
```

## 17. Conflict state

```text
Olika uppgifter

Skolverket
“Planerad utbildning” · hämtad 1 sep

Skolans webbplats
Programmet hittades inte · kontrollerad 2 sep

Vi gissar inte vilket som stämmer.
[ Kontrollera med skolan ]
[ Spara frågan till SYV ]
[ Visa båda källorna ]
```

No alarming red unless immediate harm; use explicit icon/title/text.

## 18. Parent invitation

### Student preview

```text
Bjud in en vuxen till samtal

Det här delas i 7 dagar:
[✓] Dina två valda alternativ
[✓] Jämförelsen
[ ] Din möjliga väg
[✓] Frågorna du valt

Delas inte:
• privata upptäckts-svar
• betyg
• vad du har klickat på

[ Förhandsgranska exakt ]
[ Skapa inbjudan ]
```

### Parent view

```text
Eleven har valt att dela detta
Du kan läsa och ställa synliga frågor.
Eleven äger sin väg.

[Shared comparison]

Bra fråga att börja med:
“Vad känns fortfarande oklart?”

[ Lägg till en synlig fråga ]
Delningen slutar 9 sep 2026.
```

## 19. SYV brief

```text
Inför mitt SYV-samtal

Jag utforskar [2 alternativ]      [Ändra]
Jag undrar över [3 frågor]         [Ändra]
Ta med:
[✓] Behörighetsresultat (självrapporterat)
[✓] Uppgifter som behöver verifieras
[ ] Mina betyg

[ Förhandsgranska ]
[ Dela i 7 dagar ]
[ Skriv ut / spara tillgänglig vy ]
```

Output begins with the student’s questions, not a model judgement.

## 20. Privacy/settings

```text
Dina uppgifter
[ Se vad som sparats ]
[ Ladda ner ]
[ Radera konto och uppgifter ]

Anpassning
[På] Förslag utifrån det jag sagt
[Av] AI-formulerad text

Delningar
Förälder/stödperson · slutar 9 sep [Återkalla]
SYV · öppnad 2 sep                 [Återkalla]

Sessioner
Den här telefonen                  [Logga ut]

Notiser
Alla av (standard)                 [Ändra]
```

## 21. Error, empty and degraded states

| State | Swedish headline | Primary response |
| --- | --- | --- |
| No profile | “Börja var du vill” | Explore neutrally or answer one prompt. |
| No search result | “Vi hittar inget säkert resultat” | Check spelling, broader category, official link. |
| Source stale | “Uppgiften kan ha ändrats” | Show last date and verify action. |
| AI down | “Du ser vår granskade standardtext” | Core flow continues; no scary error. |
| Offline | “Du är offline” | Public cached information labelled with cache date; no edits claimed saved. |
| Share expired | “Delningen har slutat gälla” | Recipient cannot inspect content; student can make a new share. |
| System error | “Det gick inte att spara” | Preserve local form state safely; retry or support ID. |
| Harmful/wrong | “Tack. Vi granskar uppgiften.” | Explain response expectations; urgent help separate. |

## 22. Desktop/tablet adaptation

- Content max width 72rem; reading columns 42–65 characters.
- Detail pages can use main content + sticky source/action summary, but DOM order remains logical.
- Compare uses up to three columns only at sufficient width.
- Path provides diagram and list, not diagram alone.
- Parent/SYV views remain focused; no data-dense institutional dashboard in MVP.

## 23. Prototype test checklist

- Student enters via “Jag vet inte.”
- Student corrects a profile item.
- Student explains why an option appeared.
- Student distinguishes eligibility from historical points.
- Student recovers from not-yet-eligible and unknown.
- Student identifies fact/forecast/inference and source/date.
- Student saves branch and states it is not guaranteed.
- Student chooses/replaces next action.
- Student predicts and revokes parent/SYV access.
- Keyboard, screen reader, 200%/400% zoom, reflow, reduced motion and cognitive walkthrough.

Until observed against Gate 2 thresholds, these wireframes are hypotheses.
