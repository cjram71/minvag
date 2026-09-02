# MINVÄG working prototype

<!-- markdownlint-disable MD013 -->

A Swedish-first, mobile-first interactive prototype built from the Phase 0 review package.

## Important boundary

This is **not a production service** and must not be used to make a real application decision. It has no accounts, backend, live local school/admissions feed, analytics or AI. User choices and self-reported subject states stay in the current browser's `localStorage` until cleared.

National Gy25 programme names/types and the displayed eligibility-rule categories are based on current Skolverket sources linked in the interface. Descriptions are short editorial prototype copy and need domain/content review before production.

## Run

```bash
npm install
npm run dev
```

## Check

```bash
npm run check
npm run build
```

The implementation deliberately demonstrates truthful unknown/stale states rather than inventing local schools, admissions cut-offs or labour-market values.
