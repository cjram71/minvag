import { describe, expect, it } from "vitest";
import { getProgramme } from "./data";
import { emptySubjectResults, evaluateEligibility } from "./eligibility";
import type { SubjectResult } from "./types";

function results(passes: string[], failures: string[] = []): Record<string, SubjectResult> {
  const state = emptySubjectResults();
  for (const code of passes) state[code] = "pass";
  for (const code of failures) state[code] = "not_pass";
  return state;
}

const base = ["SV", "EN", "MA"];

describe("deterministic gymnasium eligibility guidance", () => {
  it("marks a vocational programme eligible with base plus five other passing subjects", () => {
    const programme = getProgramme("el-energi")!;
    const outcome = evaluateEligibility(programme, results([...base, "BI", "FY", "KE", "GE", "HI"]));
    expect(outcome.state).toBe("eligible");
  });

  it("returns unknown rather than not eligible when a required input is missing", () => {
    const programme = getProgramme("teknik")!;
    const outcome = evaluateEligibility(
      programme,
      results(["SV", "EN", "BI", "FY", "KE", "GE", "HI", "RE", "SH", "BL", "HKK", "IDH"]),
    );
    expect(outcome.state).toBe("unknown");
    expect(outcome.missingInputs).toContain("Matematik");
  });

  it("requires biology, physics and chemistry for technology", () => {
    const programme = getProgramme("teknik")!;
    const outcome = evaluateEligibility(
      programme,
      results([...base, "BI", "FY", "GE", "HI", "RE", "SH", "BL", "HKK", "IDH", "MS"], ["KE"]),
    );
    expect(outcome.state).toBe("not_yet");
    expect(outcome.unmetRequirements).toContain("Godkänt i Kemi");
  });

  it("requires the four social science subjects for the social science programme", () => {
    const programme = getProgramme("samhall")!;
    const outcome = evaluateEligibility(
      programme,
      results([...base, "GE", "HI", "RE", "BI", "FY", "KE", "BL", "HKK", "IDH"], ["SH"]),
    );
    expect(outcome.state).toBe("not_yet");
    expect(outcome.unmetRequirements).toContain("Godkänt i Samhällskunskap");
  });

  it("does not require the social or natural science group for arts", () => {
    const programme = getProgramme("estetiska")!;
    const outcome = evaluateEligibility(
      programme,
      results([...base, "BI", "FY", "GE", "HI", "BL", "HKK", "IDH", "MS", "MU"]),
    );
    expect(outcome.state).toBe("eligible");
  });
});
