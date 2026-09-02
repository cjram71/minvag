# 18 — Design system

<!-- markdownlint-disable MD013 -->

> **Name:** MINVÄG Calm
> **Status:** Proposed foundations; colour/component combinations require implementation audit and user testing
> **Goal:** complexity underneath, calm clarity on top

## 1. Experience principles

1. **One question at a time** when input is demanding.
2. **One primary action** per view.
3. **Possibility language**, never destiny.
4. **Progressive disclosure** for rules/provenance, never hidden essentials.
5. **Neutral setbacks:** unknown/not-yet states are recoverable, not failure.
6. **Text plus structure:** never communicate status with colour/icon alone.
7. **Real control:** skip, edit, reset, neutral browse, replace and decline are visible.
8. **No engagement theatre:** no streaks, countdowns, confetti, completion pressure or infinite feed.
9. **Source as interface:** trust details are reachable where the fact appears.
10. **Accessibility by default**, not a separate mode.

## 2. Voice and tone (Swedish)

### Voice

Calm, warm, concise, concrete, non-judgmental, youth-respecting—not childish or bureaucratic.

| Prefer | Avoid | Why |
| --- | --- | --- |
| “Du behöver inte veta än.” | “Upptäck ditt drömyrke!” | Reduces pressure and hype. |
| “Kan passa att utforska.” | “Din perfekta match.” | Possibility, not verdict. |
| “Du har sagt att … är viktigt just nu.” | “Du är en kreativ person.” | Observation, not identity. |
| “Kraven ser uppfyllda ut enligt det du fyllt i.” | “Du kommer in.” | Eligibility is not admission. |
| “Inte ännu.” | “Misslyckad / obehörig elev.” | State, not label. |
| “Uppgift saknas.” | Empty dash or guessed value | Honest unknown. |
| “Tidigare antagningsläge – inte en prognos.” | “Din chans: 78%.” | No false prediction. |
| “Fråga din SYV.” | “AI-SYV har bestämt …” | Human role and accountability. |

### Sentence rules

- Put the answer first, reason second.
- One idea per sentence; mostly ≤20 words, but do not damage meaning.
- Explain `behörighet`, `meritvärde`, `antagningspoäng`, `inriktning`, `prognos` at first use.
- Prefer verbs and concrete examples; avoid nominalisations.
- Use Swedish date words where space permits: `2 september 2026`.
- Do not use ALL CAPS for emphasis.
- Avoid idioms that translate poorly or imply ability/worth.

## 3. Foundation tokens

### Colour

| Token | Hex | Intended use | Checked pair |
| --- | ---: | --- | --- |
| `ink.strong` | `#17202A` | Main text | 14.99:1 on warm canvas |
| `ink.muted` | `#4F5D6B` | Secondary text, never tiny | 6.15:1 on warm canvas |
| `brand.navy` | `#17324D` | Wordmark, dark surfaces | 13.13:1 with white |
| `action.blue` | `#235EA8` | Primary actions/links | 6.49:1 with white |
| `support.teal` | `#147D75` | Secondary action/accent | 4.98:1 with white |
| `canvas.warm` | `#F7F4EE` | App background | — |
| `surface.white` | `#FFFFFF` | Cards/forms | — |
| `info.soft` | `#E8F0FA` | Info background | use ink text |
| `positive.ink` | `#0B6B3A` | Positive status text | 5.81:1 on `#E6F3F1` |
| `positive.soft` | `#E6F3F1` | Positive background | — |
| `attention.ink` | `#9A5B00` | Warning/unknown text | 4.92:1 on `#FFF3D6` |
| `attention.soft` | `#FFF3D6` | Warning/unknown background | — |
| `critical.ink` | `#A12626` | Harm/security error text | 6.42:1 on `#FCEAEA` |
| `critical.soft` | `#FCEAEA` | Critical background | — |
| `border.default` | `#C8D0D8` | Structural borders | not sole information carrier |
| `focus.ring` | `#7B2CBF` | 3px focus indicator | verify on every surface |

Ratios are calculated for the listed pairs; full component states still require automated and manual contrast testing. Reserve critical red for actual error/harm, not not-yet-eligible or an ordinary mismatch.

### Typography

Use platform system fonts to avoid third-party font requests and speed mobile rendering:

```css
font-family: ui-rounded, system-ui, -apple-system, "Segoe UI", sans-serif;
```

Do not depend on rounded glyph availability; test Swedish characters and dyslexia/low-vision readability.

| Token | Mobile size/line height | Weight | Use |
| --- | --- | ---: | --- |
| `display` | 32/38px | 700 | Landing only |
| `h1` | 28/34px | 700 | One per page |
| `h2` | 22/29px | 700 | Sections |
| `h3` | 18/25px | 650 | Cards/groups |
| `body` | 17/26px | 400 | Default copy |
| `body.small` | 15/22px | 400 | Metadata; never critical-only |
| `label` | 16/22px | 600 | Controls |

Respect browser font settings; use rem in implementation. No justified text. Maximum reading line 65 characters; aim 42–55 on mobile.

### Space and shape

- Base grid: 4px.
- Space tokens: 4, 8, 12, 16, 24, 32, 48, 64.
- Card padding: 16px mobile / 24px larger.
- Group gap: 24px; related label/control gap: 8px.
- Radius: 12px controls, 16px cards; no excessive pill shapes for paragraphs.
- Border: 1px default, 2px selected, 3px focus.
- Shadow: subtle only for layering; borders maintain definition in high contrast.
- Minimum pointer target: 44×44 CSS px, with spacing preventing accidental taps.

### Motion

- Default transitions 120–180ms for opacity/colour; no required animation.
- Path branch expansion ≤220ms and does not move focus unexpectedly.
- Respect `prefers-reduced-motion`; remove non-essential transition/scroll.
- No parallax, autoplay, flashing, celebratory particles or countdown motion.

## 4. Iconography and imagery

- Simple outlined icons at 20/24px paired with text for status/actions.
- Icons use current colour but never carry meaning alone.
- Avoid career stereotypes (gender, ethnicity, disability, status, uniforms as essence).
- Use task/environment illustrations more than “a type of person.”
- Alt text describes useful information; decorative images have empty alt.
- Do not generate identifiable student imagery or misleading school photos.

Status set:

- check + “Kraven ser uppfyllda ut”;
- exclamation/info + “Inte ännu”;
- question + “Vi kan inte avgöra”;
- clock + “Planerad / kan ha ändrats”;
- branch + “Flera möjliga vägar”;
- source/document + “Källa och datum.”

## 5. Core components

### Button

Variants: primary blue, secondary outlined, quiet text, destructive critical. One primary per view. Disabled controls explain why; loading keeps label and announces status.

### Choice card

Large target with checkbox/radio semantics, heading, example and selected indicator. Supports `Inget av detta` and skip outside the group.

### Possibility card

Order:

1. title/type;
2. neutral one-sentence summary;
3. why shown (student evidence);
4. eligibility/availability states;
5. source/date hint;
6. actions.

No numeric match, rank badge or promotional label.

### Dimension row

```text
[Label]   [state text + icon]   [details]
```

Each of eligibility, admission context, fit and feasibility is independent. Unknown is explicit.

### Evidence chip

Use sparingly: `Du valde: problemlösning` with edit/remove accessible action. Never label a person.

### Provenance link/sheet

A visible `Källa · datum · status` link opens a heading-focused sheet/page. Not a tooltip-only interaction. External link announced.

### Alert

Types: info, unknown/attention, critical. Includes heading, plain next action and dismiss only when safe. Status updates use appropriate live region without repeated announcements.

### Path

Diagram plus equivalent ordered/branched list. Nodes are links/buttons with visible focus. Every relationship has possibility/requirement wording. No drag-only operation; add/reorder through buttons/menu.

### Comparison

Question-led rows, max three options, sticky names only if zoom/reflow remains usable. No sideways scroll required at 320 CSS px.

### Next-step card

One action, why, time estimate only if evidence-based, primary start, replace, and not now. No points/reward.

### Input

Persistent visible label, example/help, correct autocomplete/inputmode, error linked with `aria-describedby`, no placeholder-only label. Grade state uses radio options (`E eller högre`, `inte godkänt`, `vet inte`) rather than colour.

## 6. State language

| State | Component tone | Example |
| --- | --- | --- |
| Eligible from self-report | Positive but qualified | “Kraven ser uppfyllda ut enligt det du fyllt i.” |
| Not yet eligible | Attention, constructive | “Inte ännu. Matematik saknas. Här är två saker du kan göra.” |
| Unknown | Neutral | “Vi kan inte avgöra. Två uppgifter saknas.” |
| Historical admission | Neutral contextual | “2025-historik – inte en prognos.” |
| Source stale | Attention | “Uppgiften kan ha ändrats. Senast kontrollerad …” |
| Conflict | Attention | “Källorna visar olika saker. Vi gissar inte.” |
| AI fallback | Info | “Du ser vår granskade standardtext.” |
| System error | Calm/clear | “Det gick inte att spara. Dina svar finns kvar på sidan.” |

## 7. Accessibility standard

Target WCAG 2.2 AA and applicable EN 301 549 requirements. Public deployments may be covered by DOS law; private scope may be affected by LPTT depending service classification. [L10, L11](SOURCES.md#privacy-safety-ai-and-accessibility-sources) Apply the baseline regardless of minimum legal scope.

Required design/implementation checks:

- keyboard-only and visible focus not obscured;
- screen reader names, roles, states, headings and error summary;
- 200% text and 400% browser zoom; 320 CSS-px reflow without loss;
- orientation not locked;
- contrast in default/hover/focus/disabled/error states;
- target size and pointer cancellation;
- consistent help/navigation/identification;
- no drag, hover or colour-only requirement;
- timeout warning/extension and no unnecessarily short session;
- status announcements that do not overwhelm;
- reduced motion and no flashing;
- plain language and term definitions;
- accessible authentication without cognitive-function tests;
- HTML before ARIA; native controls where possible.

## 8. Cognitive accessibility

- Start each page with what it is and what happens next.
- Break eligibility input into meaningful groups; save progress safely.
- Keep source details progressively available but show caveat next to the fact.
- Avoid dense dashboards, radar charts and multi-axis scores.
- Keep labels stable across product (`behörighet`, not alternating synonyms).
- Let student pause/return without shame.
- Confirm destructive actions in plain language and offer short undo where privacy-safe.
- Use worked examples that do not imply a single normal family or career.

## 9. Responsive layout

| Width | Pattern |
| --- | --- |
| 320–599 | Single column, bottom navigation, inline comparison rows, path list first. |
| 600–959 | Wider single/two-region cards; bottom or side navigation based on usability. |
| ≥960 | Max-width shell, left navigation, content + optional source summary; max 3 comparison columns. |

DOM order remains logical across layouts. Do not duplicate interactive content for breakpoints.

## 10. Content governance

Every critical content string stores owner, locale, review status, source/claim link if factual, valid/review dates and approved use cases. Two-person domain review for eligibility and setback copy. AI cannot create new design-system status labels or action types.

## 11. Definition of ready

A component is not ready until:

- all states and keyboard/focus behaviour specified;
- Swedish labels tested at 320px and 200% text;
- contrast checked programmatically and visually;
- screen-reader flow tested on at least representative desktop/mobile combinations;
- forced-colours/high-contrast and reduced-motion checked;
- loading/empty/error/stale/conflict/unknown states exist;
- student comprehension test passes for consequential components.
