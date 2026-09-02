import type { CareerArea, ObservationId, Programme, Subject } from "./types";

const programmeBase =
  "https://www.skolverket.se/undervisning/gymnasieskolan/program-och-amnen-i-gymnasieskolan/gymnasieprogrammen-gy25/nationella-program/programs";

export const programmes: Programme[] = [
  {
    id: "teknik",
    code: "TE25",
    name: "Teknikprogrammet",
    shortName: "Teknik",
    kind: "högskoleförberedande",
    summary: "Utforska teknik, design och problemlösning med en tydlig teoretisk grund.",
    activities: ["lösa tekniska problem", "utveckla idéer och modeller", "arbeta med matematik och teknik"],
    consider: "Programmet innehåller mycket teori. Fundera på hur du trivs med att läsa, räkna och arbeta i projekt.",
    themes: ["losa-problem", "skapa", "forsta", "fordjupa"],
    possiblePaths: ["tekniska högskoleutbildningar", "andra högskoleutbildningar beroende på behörighet", "ett fjärde tekniskt år som separat möjlighet"],
    sourceUrl: `${programmeBase}/TE25`,
    accent: "blue",
  },
  {
    id: "el-energi",
    code: "EE25",
    name: "El- och energiprogrammet",
    shortName: "El & energi",
    kind: "yrkesprogram",
    summary: "Arbeta praktiskt och teoretiskt med el, energi, datorer eller automation.",
    activities: ["installera och felsöka", "förstå tekniska system", "arbeta säkert och noggrant"],
    consider: "Arbetet kan kräva noggrannhet, säkerhetstänk och att du löser problem steg för steg.",
    themes: ["praktiskt", "losa-problem", "tydliga-resultat", "forsta"],
    possiblePaths: ["arbete inom programmets yrkesområden", "yrkeshögskola", "vidare studier om behörighetskraven är uppfyllda"],
    sourceUrl: `${programmeBase}/EE25`,
    accent: "teal",
  },
  {
    id: "samhall",
    code: "SA25",
    name: "Samhällsvetenskapsprogrammet",
    shortName: "Samhälle",
    kind: "högskoleförberedande",
    summary: "Fördjupa dig i samhälle, människor och hur världen hänger ihop.",
    activities: ["diskutera samhällsfrågor", "läsa, skriva och analysera", "undersöka människors villkor"],
    consider: "Det är ett teoretiskt program med mycket läsning, resonemang och skrivande.",
    themes: ["forsta", "manniskor", "fordjupa", "hjalpa"],
    possiblePaths: ["högskoleutbildningar inom flera områden", "samhälls- och beteendevetenskapliga utbildningar", "andra vägar beroende på särskild behörighet"],
    sourceUrl: `${programmeBase}/SA25`,
    accent: "violet",
  },
  {
    id: "natur",
    code: "NA25",
    name: "Naturvetenskapsprogrammet",
    shortName: "Natur",
    kind: "högskoleförberedande",
    summary: "Undersök naturvetenskapliga frågor genom teori, matematik och laborationer.",
    activities: ["räkna och resonera", "göra undersökningar", "förstå naturvetenskapliga samband"],
    consider: "Programmet har en hög teoretisk nivå och mycket matematik och naturvetenskap.",
    themes: ["fordjupa", "losa-problem", "forsta"],
    possiblePaths: ["naturvetenskapliga och tekniska högskoleutbildningar", "andra högskoleutbildningar", "vägar som kräver särskild behörighet behöver alltid kontrolleras"],
    sourceUrl: `${programmeBase}/NA25`,
    accent: "teal",
  },
  {
    id: "vard-omsorg",
    code: "VO25",
    name: "Vård- och omsorgsprogrammet",
    shortName: "Vård & omsorg",
    kind: "yrkesprogram",
    summary: "Lär dig om hälsa, vård, omsorg och möten med människor.",
    activities: ["stödja och bemöta människor", "arbeta med hälsa och omsorg", "samarbeta och ta ansvar"],
    consider: "Vård och omsorg innebär nära kontakt med människor och situationer som kan vara krävande.",
    themes: ["hjalpa", "manniskor", "praktiskt", "variation"],
    possiblePaths: ["arbete inom vård och omsorg", "yrkeshögskola", "vidare studier om behörighetskraven är uppfyllda"],
    sourceUrl: `${programmeBase}/VO25`,
    accent: "coral",
  },
  {
    id: "barn-fritid",
    code: "BF25",
    name: "Barn- och fritidsprogrammet",
    shortName: "Barn & fritid",
    kind: "yrkesprogram",
    summary: "Utforska pedagogiskt och socialt arbete, fritid och hälsa.",
    activities: ["leda aktiviteter", "möta och stödja människor", "planera tillsammans med andra"],
    consider: "Du behöver vara beredd på att kommunicera, samarbeta och ta ansvar för andra.",
    themes: ["hjalpa", "manniskor", "rorelse", "variation"],
    possiblePaths: ["arbete inom pedagogiska eller sociala verksamheter", "yrkeshögskola", "vidare studier om behörighetskraven är uppfyllda"],
    sourceUrl: `${programmeBase}/BF25`,
    accent: "amber",
  },
  {
    id: "bygg-anlaggning",
    code: "BA25",
    name: "Bygg- och anläggningsprogrammet",
    shortName: "Bygg & anläggning",
    kind: "yrkesprogram",
    summary: "Lär genom praktiskt arbete inom byggande, mark eller anläggning.",
    activities: ["bygga och mäta", "använda verktyg och material", "planera ett arbete säkert"],
    consider: "Arbetet kan vara fysiskt och sker ibland utomhus eller på skiftande arbetsplatser.",
    themes: ["praktiskt", "tydliga-resultat", "rorelse", "skapa"],
    possiblePaths: ["arbete inom bygg och anläggning", "yrkeshögskola", "vidare studier om behörighetskraven är uppfyllda"],
    sourceUrl: `${programmeBase}/BA25`,
    accent: "amber",
  },
  {
    id: "ekonomi",
    code: "EK25",
    name: "Ekonomiprogrammet",
    shortName: "Ekonomi",
    kind: "högskoleförberedande",
    summary: "Fördjupa dig i ekonomi, juridik och hur organisationer fungerar.",
    activities: ["analysera ekonomiska frågor", "arbeta med idéer och företagande", "läsa och resonera om juridik"],
    consider: "Det är ett teoretiskt program med läsning, analys, matematik och skriftliga uppgifter.",
    themes: ["losa-problem", "forsta", "fordjupa", "manniskor"],
    possiblePaths: ["högskoleutbildningar inom ekonomi och juridik", "andra högskoleutbildningar", "särskild behörighet behöver kontrolleras för varje utbildning"],
    sourceUrl: `${programmeBase}/EK25`,
    accent: "blue",
  },
  {
    id: "estetiska",
    code: "ES25",
    name: "Estetiska programmet",
    shortName: "Estetiska",
    kind: "högskoleförberedande",
    summary: "Utveckla ett estetiskt uttryck och kombinera skapande med teoretiska studier.",
    activities: ["skapa och gestalta", "öva och ge respons", "utveckla idéer i projekt"],
    consider: "Du arbetar både praktiskt skapande och teoretiskt. Lokala profiler och eventuella prov måste kontrolleras med skolan.",
    themes: ["skapa", "fordjupa", "variation"],
    possiblePaths: ["högskoleutbildningar inom flera områden", "konstnärliga utbildningar med egna urval", "andra vägar beroende på behörighet"],
    sourceUrl: `${programmeBase}/ES25`,
    accent: "violet",
  },
  {
    id: "fordon-transport",
    code: "FT25",
    name: "Fordons- och transportprogrammet",
    shortName: "Fordon & transport",
    kind: "yrkesprogram",
    summary: "Arbeta med fordon, teknik, service eller transport i praktiska miljöer.",
    activities: ["felsöka och underhålla", "arbeta med fordon och system", "planera säkert och noggrant"],
    consider: "Arbetsmiljö, säkerhet och praktisk problemlösning är viktiga delar.",
    themes: ["praktiskt", "losa-problem", "rorelse", "tydliga-resultat"],
    possiblePaths: ["arbete inom fordon eller transport", "yrkeshögskola", "vidare studier om behörighetskraven är uppfyllda"],
    sourceUrl: `${programmeBase}/FT25`,
    accent: "coral",
  },
  {
    id: "frisor-stylist",
    code: "FR25",
    name: "Frisör- och stylistprogrammet",
    shortName: "Frisör & stylist",
    kind: "yrkesprogram",
    summary: "Utveckla hantverk, form och service inom frisör- och stylistområdet.",
    activities: ["arbeta kreativt och praktiskt", "möta kunder", "öva teknik och noggrannhet"],
    consider: "Yrkesområdet innebär kundkontakt, mycket övning och ofta arbete stående.",
    themes: ["skapa", "manniskor", "praktiskt", "tydliga-resultat"],
    possiblePaths: ["arbete eller företagande inom yrkesområdet", "fortsatt yrkesutbildning", "vidare studier om behörighetskraven är uppfyllda"],
    sourceUrl: `${programmeBase}/FR25`,
    accent: "violet",
  },
  {
    id: "forsaljning-service",
    code: "FS25",
    name: "Försäljnings- och serviceprogrammet",
    shortName: "Försäljning & service",
    kind: "yrkesprogram",
    summary: "Lär dig om handel, service, kommunikation och möten med kunder.",
    activities: ["hjälpa och bemöta kunder", "planera försäljning", "kommunicera i olika kanaler"],
    consider: "Tempot och mängden kundkontakt kan variera mycket mellan arbetsplatser.",
    themes: ["manniskor", "variation", "hjalpa", "tydliga-resultat"],
    possiblePaths: ["arbete inom handel och service", "yrkeshögskola eller företagande", "vidare studier om behörighetskraven är uppfyllda"],
    sourceUrl: `${programmeBase}/FS25`,
    accent: "blue",
  },
  {
    id: "hotell-turism",
    code: "HT25",
    name: "Hotell- och turismprogrammet",
    shortName: "Hotell & turism",
    kind: "yrkesprogram",
    summary: "Utforska värdskap, resor, upplevelser och service.",
    activities: ["planera upplevelser", "möta gäster", "lösa praktiska situationer"],
    consider: "Arbetstider och tempo kan variera, och du möter ofta många olika människor.",
    themes: ["variation", "manniskor", "hjalpa", "rorelse"],
    possiblePaths: ["arbete inom hotell och besöksnäring", "yrkeshögskola", "vidare studier om behörighetskraven är uppfyllda"],
    sourceUrl: `${programmeBase}/HT25`,
    accent: "coral",
  },
  {
    id: "humanistiska",
    code: "HU25",
    name: "Humanistiska programmet",
    shortName: "Humanistiska",
    kind: "högskoleförberedande",
    summary: "Fördjupa dig i språk, kultur, historia och människors idéer.",
    activities: ["läsa och tolka", "använda språk", "resonera om kultur och idéer"],
    consider: "Programmet är teoretiskt och innehåller mycket läsning, språk och analys.",
    themes: ["fordjupa", "forsta", "skapa"],
    possiblePaths: ["humanistiska och samhällsvetenskapliga högskoleutbildningar", "andra högskoleutbildningar", "särskild behörighet behöver kontrolleras"],
    sourceUrl: `${programmeBase}/HU25`,
    accent: "violet",
  },
  {
    id: "industritekniska",
    code: "IN25",
    name: "Industritekniska programmet",
    shortName: "Industriteknik",
    kind: "yrkesprogram",
    summary: "Arbeta med tillverkning, teknik, processer och kvalitet.",
    activities: ["styra och förstå maskiner", "mäta och kontrollera kvalitet", "förbättra praktiska processer"],
    consider: "Noggrannhet, säkerhet och teknisk problemlösning är centralt.",
    themes: ["praktiskt", "losa-problem", "tydliga-resultat", "forsta"],
    possiblePaths: ["arbete inom industri och produktion", "yrkeshögskola", "vidare studier om behörighetskraven är uppfyllda"],
    sourceUrl: `${programmeBase}/IN25`,
    accent: "teal",
  },
  {
    id: "naturbruk",
    code: "NB25",
    name: "Naturbruksprogrammet",
    shortName: "Naturbruk",
    kind: "yrkesprogram",
    summary: "Lär i och om naturen, till exempel djur, skog, mark eller odling.",
    activities: ["arbeta praktiskt utomhus", "ta hand om djur eller naturresurser", "använda redskap och teknik"],
    consider: "Arbetet kan vara fysiskt, väderberoende och innebära ansvar för levande miljöer.",
    themes: ["rorelse", "praktiskt", "variation", "hjalpa"],
    possiblePaths: ["arbete inom naturbruksområden", "yrkeshögskola", "vidare studier om behörighetskraven är uppfyllda"],
    sourceUrl: `${programmeBase}/NB25`,
    accent: "teal",
  },
  {
    id: "restaurang-livsmedel",
    code: "RL25",
    name: "Restaurang- och livsmedelsprogrammet",
    shortName: "Restaurang & livsmedel",
    kind: "yrkesprogram",
    summary: "Arbeta med mat, råvaror, hantverk och service.",
    activities: ["laga eller tillverka", "planera och samarbeta", "arbeta med kvalitet och service"],
    consider: "Tempot kan vara högt och arbetstiderna kan variera inom yrkesområdet.",
    themes: ["praktiskt", "skapa", "manniskor", "tydliga-resultat"],
    possiblePaths: ["arbete inom restaurang och livsmedel", "yrkeshögskola eller företagande", "vidare studier om behörighetskraven är uppfyllda"],
    sourceUrl: `${programmeBase}/RL25`,
    accent: "amber",
  },
  {
    id: "vvs-fastighet",
    code: "VF25",
    name: "VVS- och fastighetsprogrammet",
    shortName: "VVS & fastighet",
    kind: "yrkesprogram",
    summary: "Lär dig om installation, drift, fastigheter och tekniska system.",
    activities: ["installera och underhålla", "felsöka system", "arbeta praktiskt och säkert"],
    consider: "Arbetet kan ske på olika platser och kräver säkerhet, noggrannhet och problemlösning.",
    themes: ["praktiskt", "losa-problem", "tydliga-resultat", "variation"],
    possiblePaths: ["arbete inom VVS, kyl eller fastighet", "yrkeshögskola", "vidare studier om behörighetskraven är uppfyllda"],
    sourceUrl: `${programmeBase}/VF25`,
    accent: "blue",
  },
];

export const careerAreas: CareerArea[] = [
  {
    id: "teknik-system",
    title: "Teknik & system",
    eyebrow: "Yrkesområde",
    summary: "Problem, system och lösningar — från el och automation till digital utveckling.",
    tasks: ["felsöka varför något inte fungerar", "bygga eller förbättra en lösning", "samarbeta kring tekniska krav"],
    programmeIds: ["teknik", "el-energi", "industritekniska"],
    theme: "losa-problem",
    caveat: "Olika roller kräver olika utbildningar. Programmen nedan är möjliga startpunkter, inte krav eller löften.",
  },
  {
    id: "manniskor-halsa",
    title: "Människor & hälsa",
    eyebrow: "Yrkesområde",
    summary: "Stöd, hälsa, lärande och möten där andra människors behov står i centrum.",
    tasks: ["lyssna och bemöta", "planera stöd eller aktiviteter", "samarbeta med kollegor och närstående"],
    programmeIds: ["vard-omsorg", "barn-fritid", "samhall"],
    theme: "hjalpa",
    caveat: "Vissa roller kräver legitimation eller vidare utbildning. Kontrollera alltid den specifika vägen.",
  },
  {
    id: "skapande-kommunikation",
    title: "Skapande & kommunikation",
    eyebrow: "Yrkesområde",
    summary: "Form, uttryck, berättelser och idéer som ska nå eller användas av andra.",
    tasks: ["utveckla en idé", "prova form, text, bild eller material", "ta emot respons och förbättra"],
    programmeIds: ["estetiska", "frisor-stylist", "forsaljning-service"],
    theme: "skapa",
    caveat: "Kreativa yrken har många vägar. Arbetsprover, erfarenhet eller vidare utbildning kan spela roll.",
  },
  {
    id: "samhalle-sprak",
    title: "Samhälle & språk",
    eyebrow: "Yrkesområde",
    summary: "Förstå människor, idéer, lagar, språk och hur samhället förändras.",
    tasks: ["läsa och analysera information", "förklara komplexa frågor", "samtala, skriva och undersöka"],
    programmeIds: ["samhall", "humanistiska", "ekonomi"],
    theme: "forsta",
    caveat: "Det här är ett brett område. De flesta konkreta roller kräver ett senare, mer specifikt utbildningsval.",
  },
  {
    id: "bygga-driva",
    title: "Bygga, installera & driva",
    eyebrow: "Yrkesområde",
    summary: "Synliga resultat genom hantverk, installation, underhåll och praktisk problemlösning.",
    tasks: ["mäta, montera eller installera", "planera ett säkert arbete", "hitta och åtgärda fel"],
    programmeIds: ["bygg-anlaggning", "vvs-fastighet", "el-energi"],
    theme: "praktiskt",
    caveat: "Behörigheter och certifieringar kan krävas senare beroende på yrke och arbetsuppgift.",
  },
  {
    id: "natur-miljo",
    title: "Natur, djur & miljö",
    eyebrow: "Yrkesområde",
    summary: "Praktiskt och kunskapsbaserat arbete med natur, djur, odling eller resurser.",
    tasks: ["sköta en levande miljö", "observera och lösa praktiska problem", "använda teknik och redskap"],
    programmeIds: ["naturbruk", "natur", "teknik"],
    theme: "rorelse",
    caveat: "Arbetsplatser och utbildningskrav varierar mycket. Se varje länk som en möjlighet att undersöka.",
  },
  {
    id: "service-upplevelser",
    title: "Service & upplevelser",
    eyebrow: "Yrkesområde",
    summary: "Möten, värdskap och lösningar som hjälper en kund eller gäst här och nu.",
    tasks: ["förstå vad någon behöver", "lösa oväntade situationer", "planera service eller upplevelser"],
    programmeIds: ["hotell-turism", "forsaljning-service", "restaurang-livsmedel"],
    theme: "manniskor",
    caveat: "Arbetstider, tempo och arbetsmiljö skiljer sig mellan roller och arbetsplatser.",
  },
  {
    id: "fordon-produktion",
    title: "Fordon & produktion",
    eyebrow: "Yrkesområde",
    summary: "Maskiner, flöden och praktiska system som behöver fungera säkert och noggrant.",
    tasks: ["felsöka och underhålla", "styra eller använda teknisk utrustning", "kontrollera kvalitet"],
    programmeIds: ["fordon-transport", "industritekniska", "el-energi"],
    theme: "tydliga-resultat",
    caveat: "Möjliga vägar beror på vald inriktning, lokalt utbud och yrkets krav.",
  },
];

export const observationLabels: Record<ObservationId, string> = {
  skapa: "Skapa något",
  "losa-problem": "Lösa tydliga problem",
  hjalpa: "Hjälpa andra",
  rorelse: "Vara i rörelse",
  forsta: "Förstå hur saker hänger ihop",
  praktiskt: "Arbeta praktiskt",
  manniskor: "Möta människor",
  variation: "Ha variation",
  fordjupa: "Fördjupa mig",
  "tydliga-resultat": "Se tydliga resultat",
};

export const discoverySteps: Array<{
  eyebrow: string;
  title: string;
  description: string;
  options: ObservationId[];
}> = [
  {
    eyebrow: "En lugn start",
    title: "Vad vill du helst ha mer av i en vanlig dag?",
    description: "Välj hur många eller få du vill. Det finns inget rätt svar.",
    options: ["skapa", "losa-problem", "hjalpa", "rorelse", "forsta"],
  },
  {
    eyebrow: "Sätt att arbeta",
    title: "Vilket sätt låter minst tråkigt just nu?",
    description: "Du kan ändra dig när som helst.",
    options: ["praktiskt", "manniskor", "fordjupa", "variation", "tydliga-resultat"],
  },
  {
    eyebrow: "Det du vill undersöka",
    title: "Vad känns värt att prova mer av?",
    description: "Det här blir ett startspår, inte en etikett på dig.",
    options: ["skapa", "losa-problem", "hjalpa", "praktiskt", "forsta", "manniskor"],
  },
];

export const subjects: Subject[] = [
  { code: "SV", label: "Svenska eller svenska som andraspråk", shortLabel: "Svenska / SVA" },
  { code: "EN", label: "Engelska", shortLabel: "Engelska" },
  { code: "MA", label: "Matematik", shortLabel: "Matematik" },
  { code: "BI", label: "Biologi", shortLabel: "Biologi" },
  { code: "FY", label: "Fysik", shortLabel: "Fysik" },
  { code: "KE", label: "Kemi", shortLabel: "Kemi" },
  { code: "GE", label: "Geografi", shortLabel: "Geografi" },
  { code: "HI", label: "Historia", shortLabel: "Historia" },
  { code: "RE", label: "Religionskunskap", shortLabel: "Religion" },
  { code: "SH", label: "Samhällskunskap", shortLabel: "Samhällskunskap" },
  { code: "BL", label: "Bild", shortLabel: "Bild" },
  { code: "HKK", label: "Hem- och konsumentkunskap", shortLabel: "Hemkunskap" },
  { code: "IDH", label: "Idrott och hälsa", shortLabel: "Idrott" },
  { code: "MS", label: "Moderna språk", shortLabel: "Moderna språk" },
  { code: "MU", label: "Musik", shortLabel: "Musik" },
  { code: "SL", label: "Slöjd", shortLabel: "Slöjd" },
  { code: "TK", label: "Teknik", shortLabel: "Teknik" },
];

export const eligibilitySource = {
  title: "Behörighet och mottagande i gymnasieskolan",
  owner: "Skolverket",
  type: "Nationell regelvägledning",
  sourceUrl:
    "https://www.skolverket.se/styrning-och-ansvar/regler-och-ansvar/stod-for-gymnasieantagning/behorighet-och-mottagande-i-gymnasieskolan",
  applies: "Nationella gymnasieprogram · Gy25",
  verified: "2 september 2026",
  updated: "Kontrollera originalkällan inför ett verkligt val",
};

export const programmeSource = {
  title: "Nationella program (Gy25)",
  owner: "Skolverket",
  type: "Officiell programlista",
  sourceUrl: `${programmeBase.replace(/\/programs$/, "")}`,
  applies: "Utbildning som påbörjas efter 30 juni 2025",
  verified: "2 september 2026",
  updated: "Skolverkets sida: 9 december 2025",
};

export function getProgramme(id: string | undefined): Programme | undefined {
  return programmes.find((programme) => programme.id === id);
}

export function getCareerArea(id: string | undefined): CareerArea | undefined {
  return careerAreas.find((area) => area.id === id);
}

export function reasonFor(programme: Programme, observations: ObservationId[]): string {
  const matching = programme.themes.find((theme) => observations.includes(theme));
  return matching
    ? `Du valde “${observationLabels[matching].toLowerCase()}”.`
    : "Visas för att bredda det du kan utforska.";
}

export function recommendedProgrammes(observations: ObservationId[], offset = 0): Programme[] {
  if (observations.length === 0) {
    return programmes.slice(offset, offset + 5);
  }

  const ranked = programmes
    .map((programme, index) => ({
      programme,
      relevance: programme.themes.filter((theme) => observations.includes(theme)).length,
      index,
    }))
    .sort((a, b) => b.relevance - a.relevance || a.index - b.index)
    .map(({ programme }) => programme);

  const rotated = [...ranked.slice(offset), ...ranked.slice(0, offset)];
  const close = rotated.filter((programme) => programme.themes.some((theme) => observations.includes(theme))).slice(0, 3);
  const different = rotated.find((programme) => !programme.themes.some((theme) => observations.includes(theme)));
  const result = [...close];
  if (different && !result.includes(different)) result.push(different);
  for (const programme of rotated) {
    if (result.length >= 5) break;
    if (!result.includes(programme)) result.push(programme);
  }
  return result.slice(0, 5);
}
