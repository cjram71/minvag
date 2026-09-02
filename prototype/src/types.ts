export type ProgrammeKind = "yrkesprogram" | "högskoleförberedande";
export type ObservationId =
  | "skapa"
  | "losa-problem"
  | "hjalpa"
  | "rorelse"
  | "forsta"
  | "praktiskt"
  | "manniskor"
  | "variation"
  | "fordjupa"
  | "tydliga-resultat";

export type SubjectResult = "pass" | "not_pass" | "unknown";
export type EligibilityState = "eligible" | "not_yet" | "unknown";

export interface Programme {
  id: string;
  code: string;
  name: string;
  shortName: string;
  kind: ProgrammeKind;
  summary: string;
  activities: string[];
  consider: string;
  themes: ObservationId[];
  possiblePaths: string[];
  sourceUrl: string;
  accent: "blue" | "teal" | "amber" | "violet" | "coral";
}

export interface CareerArea {
  id: string;
  title: string;
  eyebrow: string;
  summary: string;
  tasks: string[];
  programmeIds: string[];
  theme: ObservationId;
  caveat: string;
}

export interface Subject {
  code: string;
  label: string;
  shortLabel: string;
}

export interface EligibilityResult {
  state: EligibilityState;
  heading: string;
  summary: string;
  missingInputs: string[];
  unmetRequirements: string[];
  metRequirements: string[];
  ruleVersion: string;
}

export interface AppState {
  hasStarted: boolean;
  observations: ObservationId[];
  savedProgrammes: string[];
  compareProgrammes: string[];
  subjectResults: Record<string, SubjectResult>;
  eligibilityTarget: string;
  nextActionIndex: number;
  nextActionState: "proposed" | "accepted" | "completed" | "snoozed" | "declined";
  questions: string[];
  personalisation: boolean;
  share: {
    active: boolean;
    scopes: string[];
    createdAt?: string;
  };
}
