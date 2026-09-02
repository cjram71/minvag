import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { emptySubjectResults } from "./eligibility";
import type { AppState } from "./types";

const STORAGE_KEY = "minvag-prototype-state-v1";

export const initialState: AppState = {
  hasStarted: false,
  observations: [],
  savedProgrammes: [],
  compareProgrammes: [],
  subjectResults: emptySubjectResults(),
  eligibilityTarget: "teknik",
  nextActionIndex: 0,
  nextActionState: "proposed",
  questions: ["Vad skiljer vardagen mellan de program jag jämför?"],
  personalisation: true,
  share: { active: false, scopes: ["shortlist", "questions"] },
};

function loadState(): AppState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialState;
    const parsed = JSON.parse(raw) as Partial<AppState>;
    return {
      ...initialState,
      ...parsed,
      share: { ...initialState.share, ...parsed.share },
      subjectResults: { ...initialState.subjectResults, ...parsed.subjectResults },
    };
  } catch {
    return initialState;
  }
}

export function usePrototypeState(): [AppState, Dispatch<SetStateAction<AppState>>, () => void] {
  const [state, setState] = useState<AppState>(loadState);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // The app remains usable when storage is blocked.
    }
  }, [state]);

  const reset = () => {
    window.localStorage.removeItem(STORAGE_KEY);
    setState({ ...initialState, subjectResults: emptySubjectResults() });
  };

  return [state, setState, reset];
}

export function downloadState(state: AppState): void {
  const safeExport = {
    exportedAt: new Date().toISOString(),
    prototype: true,
    data: state,
  };
  const blob = new Blob([JSON.stringify(safeExport, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "minvag-prototyp-mina-uppgifter.json";
  anchor.click();
  URL.revokeObjectURL(url);
}
