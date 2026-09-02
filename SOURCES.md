# MINVÄG source register

<!-- markdownlint-disable MD013 -->

> **Verification date:** 2026-09-02
> **Policy:** Important product facts must reference a source ID below. Every production claim will additionally store field-level applicability dates and retrieval timestamps. “High confidence” means confidence that the source says what is recorded here—not certainty that the underlying world will remain unchanged.

## Source classes and precedence

1. **Binding law/regulation and official rule owner** for legal and eligibility rules.
2. **Official authority data/API** for schools, programmes, education, admissions, labour and finance facts.
3. **Official statistics/research** for population patterns and market/problem evidence.
4. **Provider-supplied data** for a provider’s own offering; verify against authority identifiers where possible.
5. **Licensed aggregators** only to fill operational gaps; never silently override an authority.
6. **Editorial/AI synthesis** is explanation, not source-of-truth.

Confidence vocabulary: **High** (direct primary source), **Medium** (primary but scope/age/completeness limits), **Low** (secondary, self-claim, ambiguous, or not independently confirmed).

## Product, education, and data sources

| ID | Source | Owner/type | Data/applicability date | Last verified | Confidence | Intended use / caveat |
| --- | --- | --- | --- | --- | --- | --- |
| S01 | [Jag vet inte vad jag vill bli – eleverna om sina gymnasieval](https://www.skolverket.se/sok-publikationer/publikationsserier/rapporter/2024/jag-vet-inte-vad-jag-vill-bli---eleverna-om-sina-gymnasieval) | Skolverket study | Published 2024 | 2026-09-02 | High | Problem evidence. Study-specific sample; do not generalise 33% to every cohort without caveat. |
| S02 | [Kunskapsöversikt om faktorer som styr elevers val](https://www.skolverket.se/download/18.16539ce17f698887ee10f0/1648714122374/Bilaga%202%20-%20Kunskaps%C3%B6verikt%20om%20faktorer%20som%20styr%20elevers%20val%20av%20utbildning%20p%C3%A5%20gymnasial%20niv%C3%A5.pdf) | Skolverket evidence review | Published 2022 | 2026-09-02 | High | Problem, equity, information and SYV-access evidence. |
| S03 | [Early work against gender-bound choices](https://www.skolinspektionen.se/globalassets/02-beslut-rapporter-stat/granskningsrapporter/tkg/2024/konsbundna-val/larares-arbete-med-att-tidigt-motverka-konsbundna-val.pdf) | Skolinspektionen review | Published 2024 | 2026-09-02 | High | Bias risk and need for broad, earlier guidance; reviewed sample, not all schools. |
| S04 | [Behörighet och mottagande i gymnasieskolan](https://www.skolverket.se/styrning-och-ansvar/regler-och-ansvar/stod-for-gymnasieantagning/behorighet-och-mottagande-i-gymnasieskolan) | Skolverket rule guidance | Current page as at verification | 2026-09-02 | High | Canonical national-program eligibility rules. Version and legal references must be captured at ingestion. |
| S05 | [Gy25 – ämnesbetyg](https://www.skolverket.se/forandringar-inom-skolomradet/skola-i-forandring/gy25----amnesbetyg-pa-gymnasial-niva) | Skolverket reform guidance | Applies to education begun after 2025-06-30; transition to 2030-06-30 | 2026-09-02 | High | Model Gy25 subject levels and Gy11 courses concurrently. |
| S06 | [Gymnasieprogrammen (Gy25)](https://www.skolverket.se/undervisning/gymnasieskolan/program-och-amnen-i-gymnasieskolan/gymnasieprogrammen-gy25) | Skolverket programme catalogue | Gy25; from 2025-07-01 | 2026-09-02 | High | 18 national programmes (6 higher-ed preparatory, 12 vocational), plus other programme types. |
| S07 | [Om introduktionsprogram](https://utbildningsguiden.skolverket.se/gymnasieskolan/gymnasieskolans-program/om-introduktionsprogram/) | Skolverket student guidance | Current page as at verification | 2026-09-02 | High | Four introduction programmes and purpose. Local availability still requires offering data. |
| S08 | [Slutbetyg i grundskolan våren 2025](https://www.skolverket.se/download/18.241f11d019d722f42b719c33/1776153333787/pdf13315.pdf) | Skolverket official statistics | Spring 2025 | 2026-09-02 | High | 19,700 pupils lacked national-program eligibility. Snapshot; never infer individual outcome. |
| S09 | [Elever i gymnasieskolan 2025/26](https://www.skolverket.se/download/18.4a4f973719c9357f7ba26278/1772531020461/pdf13382.pdf) | Skolverket official statistics | Academic year 2025/26 | 2026-09-02 | High | Market context: 375,449 total pupils; 338k national and 37k introduction programmes. |
| S10 | [Pedagogisk personal 2025/26](https://www.skolverket.se/download/18.36c8f18d19d24bbf9162c6bb/1775049846504/pdf13397.pdf) | Skolverket official statistics | Academic year 2025/26 | 2026-09-02 | High | 2,830 practising SYVs / 2,150 FTE across school system; not a direct availability measure per target student. |
| S11 | [Skolverket open APIs](https://www.skolverket.se/om-skolverket/oppna-data) | Skolverket API catalogue | Current | 2026-09-02 | High | Syllabus, school-unit register, Planned Educations, Susa-navet. Validate endpoint terms and schemas in spike. |
| S12 | [Planned Educations API](https://www.skolverket.se/om-skolverket/oppna-data/api-for-skolor-utbildningar-och-statistik-planned-education) | Skolverket REST API | v3 current | 2026-09-02 | High | Planned offerings, school statistics, related documents; missing means unknown, not zero. |
| S13 | [Susa-navet API](https://www.skolverket.se/om-skolverket/oppna-data/api-for-utbildningstillfallen-susa-navet) | Skolverket REST API | New API active 2026-04-01 | 2026-09-02 | High | Daily national education offerings; incremental changes. Completeness depends on upstream providers. |
| S14 | [Skolenhetsregistret API](https://www.skolverket.se/om-skolverket/oppna-data/api-for-skolenhetsregistret) | Skolverket REST API | Current | 2026-09-02 | High | Canonical school-unit identities, status, addresses. |
| S15 | [UHR: Gy25](https://www.uhr.se/syv/svenska-meriter-i-antagningen/om-gy25/) | UHR official guidance | Gy25 transition | 2026-09-02 | High | Higher-education merit/eligibility transition; link out for decisions. |
| S16 | [Antagning.se: gymnasieexamen 2014+](https://www.antagning.se/sv/betyg-och-behorighet/gymnasieskolan/gymnasieexamen-2014-och-framat/) | UHR/Antagning official guidance | Current page as at verification | 2026-09-02 | High | Higher-education basic/specific eligibility. Never substitute for official application/admission. |
| S17 | [Studera.nu antagningsstatistik](https://www.studera.nu/sa-kommer-du-in/anmalan-och-antagning/antagningsstatistik/) | UHR official service | Historical terms | 2026-09-02 | High | Historical higher-ed admissions context, not future guarantee. |
| S18 | [YH tillträde](https://www.myh.se/yrkeshogskolan/for-utbildningsanordnare/tilltrade-till-utbildning) | MYH official guidance | Current page as at verification | 2026-09-02 | High | YH eligibility and real competence; provider performs admission. |
| S19 | [JobTech Development open data](https://data.arbetsformedlingen.se/) | Arbetsförmedlingen API/data catalogue | Current | 2026-09-02 | High | Occupations, skills, job postings and forecasts. Dataset-specific dates required. |
| S20 | [JobEd Connect](https://data.arbetsformedlingen.se/dataservice/jobed-connect/) | Arbetsförmedlingen API | Current | 2026-09-02 | High | Education↔occupation/skill mapping candidate. Relationship semantics must remain explicit. |
| S21 | [SCB open data/API](https://www.scb.se/vara-tjanster/oppna-data/) | SCB official API | Current; per table dates | 2026-09-02 | High | Official statistics; CC0 for SCB data, rate/size limits. Do not label processed values as raw SCB. |
| S22 | [SCB salary structure statistics](https://www.scb.se/hitta-statistik/statistik-efter-amne/arbetsmarknad/loner-och-arbetskostnader/lonestrukturstatistik-hela-ekonomin/) | SCB official statistics | Annual/table-specific | 2026-09-02 | High | Salary distributions via SSYK; never promise individual salary. Show year, population and measure. |
| S23 | [CSN studiemedel](https://www.csn.se/bidrag-och-lan/studiemedel.html) | CSN official guidance | Current/rule-period specific | 2026-09-02 | High | Link and explain carefully; amounts/rules are volatile and need valid periods. |
| S24 | [Regional planning and dimensioning](https://www.skolverket.se/regler-och-ansvar/forandringar-inom-skolomradet/regional-planering-och-dimensionering-av-gymnasial-utbildning/planering-och-dimensionering-inom-gymnasieskolan) | Skolverket official guidance | Applies to education starting 2025 onward | 2026-09-02 | High | Labour demand is a planning input alongside youth demand—not a command to an individual. |
| S25 | [ResRobot v2.1 licence](https://www.trafiklab.se/sv/api/trafiklab-apis/resrobot-v21/license/) | Trafiklab/Samtrafiken API | Current | 2026-09-02 | High | National transit candidate, CC0 data; key/rate terms require spike. Avoid transmitting precise home coordinates. |
| S26 | [Beda API connection information](https://www.uhr.se/digitalisering-for-universitet-och-hogskolor/digitala-tjanster-for-larosaten/betygsdatabasen-beda/information-om-anslutning-till-bedas-api/) | UHR restricted administrative service | Current page as at verification | 2026-09-02 | High | Retrieval purposes are limited to listed admission/administrative uses; not a general consumer student-profile API. |
| S27 | [Elever och skolenheter i grundskolan 2025/26](https://www.skolverket.se/download/18.5f56aa0719d2185a9521012/1774422766089/pdf13391.pdf) | Skolverket official statistics | Academic year 2025/26 | 2026-09-02 | High | Market/problem context: approximately 1.1 million compulsory-school pupils; not proof of product demand. |

## Privacy, safety, AI, and accessibility sources

| ID | Source | Owner/type | Applicability date | Last verified | Confidence | Intended use / caveat |
| --- | --- | --- | --- | --- | --- | --- |
| L01 | [Personuppgifter om barn](https://www.imy.se/verksamhet/dataskydd/det-har-galler-enligt-gdpr/introduktion-till-gdpr/personuppgifter/personuppgifter-om-barn/) | IMY guidance | Current | 2026-09-02 | High | Child consent capacity is contextual; ages 13–16 require case-by-case understanding assessment. |
| L02 | [Samtycke](https://www.imy.se/verksamhet/dataskydd/det-har-galler-enligt-gdpr/rattslig-grund/samtycke/) | IMY guidance | Current | 2026-09-02 | High | Swedish information-society consent threshold is 13, but consent may not be the right legal basis. Obtain counsel. |
| L03 | [DPIA: when required](https://www.imy.se/verksamhet/dataskydd/det-har-galler-enligt-gdpr/konsekvensbedomning/nar-ska-en-konsekvensbedomning-genomforas/) | IMY guidance | Current | 2026-09-02 | High | Children, scoring/profiling, new technology, and large-scale school processing are high-risk criteria. MINVÄG treats DPIA as mandatory before pilot. |
| L04 | [Automated decision-making](https://www.imy.se/verksamhet/dataskydd/innovationsportalen/vagledning-om-gdpr-och-ai/gdpr-och-ai/automatiserat-beslutsfattande/) | IMY guidance | Current | 2026-09-02 | High | Avoid solely automated decisions with legal/similarly significant effect; MINVÄG is guidance only. |
| L05 | [Third-country transfers](https://www.imy.se/verksamhet/dataskydd/det-har-galler-enligt-gdpr/overforing-till-tredje-land/) | IMY guidance | Current | 2026-09-02 | High | Vendor location is insufficient; remote access may be transfer. Complete transfer assessment. |
| L06 | [EU AI Act consolidated text](https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng) | EU law | Consolidated 2026-07-27 | 2026-09-02 | High | Education access/admission and level assessment can be high-risk. Current consolidated timing indicates Annex III high-risk requirements from 2027-12-02. Obtain counsel; classification depends on intended use and profiling. |
| L07 | [AI Act transparency FAQ](https://digital-strategy.ec.europa.eu/en/faqs/transparency-obligations-under-article-50-ai-act) | EU Commission guidance | Article 50 from 2026-08-02 | 2026-09-02 | High | Tell users when they interact with AI where applicable; label AI-generated/synthetic content as required. |
| L08 | [DSA Article 28 text](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32022R2065) | EU law | Applicable under DSA | 2026-09-02 | High | If MINVÄG becomes an online platform, minors require high privacy/safety and no profiled ads; current MVP avoids public user content. Scope needs counsel. |
| L09 | [Commission guidelines on minors online](https://eur-lex.europa.eu/eli/C/2025/5519/oj/eng) | EU Commission guidance | Published 2025 | 2026-09-02 | High | Safety-by-design benchmark: private defaults, minimisation, recommender fairness, child-friendly reporting. Apply as best practice even if scope uncertain. |
| L10 | [Digital accessibility](https://www.digg.se/kunskap-och-stod/digital-tillganglighet) | DIGG guidance | Current | 2026-09-02 | High | DOS Act may apply to public/publicly funded deployments. Target EN 301 549 and WCAG regardless. |
| L11 | [WCAG and Swedish accessibility law](https://pts.se/digital-inkludering/standarder/web-content-accessibility-wcag--tillgangligt-webbinnehall/) | PTS guidance | LPTT from 2025-06-28 | 2026-09-02 | High | Private scope depends on service type; WCAG 2.2 AA is the product baseline. |

## Competitor/product sources

Competitor features are public self-descriptions unless marked official. They may change and have not been independently tested. Confidence is therefore usually **Medium**.

| ID | Source | Owner/type | Page date | Last verified | Confidence | What was observable |
| --- | --- | --- | --- | --- | --- | --- |
| C01 | [Digital SYV](https://digitalsyv.se/) | Product site | Current page | 2026-09-02 | Medium | Free app; school/program exploration, personality tests, work contacts, paths, further education; public claims only. |
| C02 | [Gymnasium.se about](https://www.gymnasium.se/om-oss/) and [school marketing](https://skola.gymnasium.se/) | Keystone product/sales sites | Current pages | 2026-09-02 | Medium | Directory, comparison, reviews, quizzes, merit calculator; commercial education marketing and advertising. |
| C03 | [Utbildningsguiden](https://utbildningsguiden.skolverket.se/) | Skolverket official service | Current page | 2026-09-02 | High | Authoritative system/program guidance, school/program comparison, merit and eligibility tools. |
| C04 | “Gymnasio” | No verified Swedish product located | Searches as at date | 2026-09-02 | Low | Name/domain ambiguous; no competitor profile should be invented. Founder should provide URL/legal name. |
| C05 | [Skolkoll about](https://skolkoll.se/om/) and [open data](https://skolkoll.se/data/) | Skolspegeln AB product site | Current pages | 2026-09-02 | Medium | Official-source aggregation, provenance, comparisons, open CC BY 4.0 exports; independent-project claim and disclosed employment connection. Verify licence chain before reuse. |
| C06 | [Skoolie](https://www.skoolie.se/) | Product site | Current page | 2026-09-02 | Medium | B2B student plans, grades/eligibility, education/occupation data, SYV/school/municipality views, AI-support claims. |
| C07 | [Ednia methodology](https://ednia.se/info/metodologi) | Product site | Current page | 2026-09-02 | Medium | Public-data school comparison and weighted ranking. Method describes factors but not all exact weights. |
| C08 | [Gymnasiekoll test](https://gymnasiekoll.se/gymnasietest/) | Product site | Current page | 2026-09-02 | Medium | Gymnasium test/directory. Ownership/training-data claims require re-verification before publication. |
| C09 | [FrågaSYV](https://www.fragasyv.se/) | Product site | Current page | 2026-09-02 | Medium | Q&A and AI-SYV positioned as complement to counsellors. |

## Known gaps requiring direct confirmation

- Completeness and refresh behaviour of Susa-navet v3, Planned Educations v3 and JobEd for the exact MVP fields.
- A national, consistently licensed source for local gymnasium final admission cut-offs; regional publication formats vary. Planned Educations appears to expose some admission data, but field coverage must be measured.
- School-level practical details (special profiles, support, open-house dates, local subject offerings) often come from provider pages and need verification workflows.
- “Gymnasio” identity.
- Exact legal basis and controller arrangement for direct-to-consumer versus school-procured use.
- Vendor transfer locations, subprocessors, retention and model-training terms.

## Claim presentation rule

A production fact card must be able to show:

```text
Källa: Skolverket
Gäller för: Gy25, utbildning som börjar efter 30 juni 2025
Data från: 2026-08-25
Senast kontrollerad av MINVÄG: 2 september 2026
Säkerhet: Hög för nationell regel
```

If any required field is unknown, display **“Uppgift saknas”** or **“Inte verifierad”**—never manufacture a value.
