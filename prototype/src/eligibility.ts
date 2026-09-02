import { programmes, subjects } from "./data";
import type { EligibilityResult, Programme, SubjectResult } from "./types";

const BASE_SUBJECTS = ["SV", "EN", "MA"];
const NATURAL_SCIENCE_SUBJECTS = ["BI", "FY", "KE"];
const SOCIAL_SCIENCE_SUBJECTS = ["GE", "HI", "RE", "SH"];

function subjectLabel(code: string): string {
  return subjects.find((subject) => subject.code === code)?.shortLabel ?? code;
}

function requirementGroup(programme: Programme): string[] {
  if (["teknik", "natur"].includes(programme.id)) return NATURAL_SCIENCE_SUBJECTS;
  if (["ekonomi", "humanistiska", "samhall"].includes(programme.id)) return SOCIAL_SCIENCE_SUBJECTS;
  return [];
}

export function emptySubjectResults(): Record<string, SubjectResult> {
  return Object.fromEntries(subjects.map((subject) => [subject.code, "unknown"]));
}

export function evaluateEligibility(
  programme: Programme,
  supplied: Record<string, SubjectResult>,
): EligibilityResult {
  const results = { ...emptySubjectResults(), ...supplied };
  const requiredGroup = requirementGroup(programme);
  const requiredOtherCount = programme.kind === "yrkesprogram" ? 5 : 9;
  const otherSubjects = subjects.filter((subject) => !BASE_SUBJECTS.includes(subject.code));

  const unmet: string[] = [];
  const missing: string[] = [];
  const met: string[] = [];

  for (const code of BASE_SUBJECTS) {
    const result = results[code];
    if (result === "pass") met.push(`Godkänt i ${subjectLabel(code)}`);
    if (result === "not_pass") unmet.push(`Godkänt i ${subjectLabel(code)}`);
    if (result === "unknown") missing.push(subjectLabel(code));
  }

  for (const code of requiredGroup) {
    const result = results[code];
    if (result === "not_pass") unmet.push(`Godkänt i ${subjectLabel(code)}`);
    if (result === "unknown") missing.push(subjectLabel(code));
  }

  const passedOther = otherSubjects.filter((subject) => results[subject.code] === "pass").length;
  const unknownOther = otherSubjects.filter((subject) => results[subject.code] === "unknown").length;

  if (passedOther >= requiredOtherCount) {
    met.push(`Godkänt i minst ${requiredOtherCount} andra ämnen`);
  } else if (passedOther + unknownOther < requiredOtherCount) {
    unmet.push(`Godkänt i minst ${requiredOtherCount} andra ämnen (du har markerat ${passedOther})`);
  } else {
    const needed = requiredOtherCount - passedOther;
    missing.push(`${needed} ytterligare godkänt ämne${needed === 1 ? "" : "n"}`);
  }

  if (requiredGroup.length > 0 && requiredGroup.every((code) => results[code] === "pass")) {
    const label = requiredGroup.map(subjectLabel).join(", ");
    met.push(`De särskilda ämnena: ${label}`);
  }

  const uniqueMissing = [...new Set(missing)];
  const uniqueUnmet = [...new Set(unmet)];

  if (uniqueUnmet.length > 0) {
    return {
      state: "not_yet",
      heading: "Inte ännu – här är vad som saknas",
      summary: "Utifrån det du fyllt i är ett eller flera krav inte uppfyllda just nu. Det säger inget om vad du kan klara senare.",
      missingInputs: uniqueMissing,
      unmetRequirements: uniqueUnmet,
      metRequirements: met,
      ruleVersion: "SE-GYM-ELIG-PROTOTYP-2026.1",
    };
  }

  if (uniqueMissing.length > 0) {
    return {
      state: "unknown",
      heading: "Vi kan inte avgöra ännu",
      summary: "Några uppgifter saknas. MINVÄG gissar inte när underlaget är ofullständigt.",
      missingInputs: uniqueMissing,
      unmetRequirements: [],
      metRequirements: met,
      ruleVersion: "SE-GYM-ELIG-PROTOTYP-2026.1",
    };
  }

  return {
    state: "eligible",
    heading: "Kraven ser uppfyllda ut",
    summary: "Det betyder att du verkar kunna söka utifrån det du själv har fyllt i. Det betyder inte att du säkert blir antagen.",
    missingInputs: [],
    unmetRequirements: [],
    metRequirements: met,
    ruleVersion: "SE-GYM-ELIG-PROTOTYP-2026.1",
  };
}

export function evaluateProgrammeById(
  programmeId: string,
  results: Record<string, SubjectResult>,
): EligibilityResult | undefined {
  const programme = programmes.find((item) => item.id === programmeId);
  return programme ? evaluateEligibility(programme, results) : undefined;
}
