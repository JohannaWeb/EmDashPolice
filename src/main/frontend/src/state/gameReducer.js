export const evidenceOptions = [
  {key: "dash", label: "Em dash pattern"},
  {key: "generic", label: "Generic polish"},
  {key: "template", label: "Template phrases"},
  {key: "buzzword", label: "Buzzwords"},
  {key: "specific", label: "Specific detail"},
  {key: "revision", label: "Revision trail"},
  {key: "contradiction", label: "Contradiction"},
  {key: "human", label: "Human texture"}
];

export const initialStatus = {
  name: "Em Dash Police",
  caseCount: 0,
  shiftSeconds: 480
};

export const initialState = {
  cases: [],
  status: initialStatus,
  index: 0,
  score: 0,
  strikes: 0,
  time: initialStatus.shiftSeconds,
  active: false,
  locked: true,
  selectedEvidence: [],
  interviewedCaseIds: [],
  riskTag: "Awaiting work",
  verdict: {
    kind: "",
    text: "Loading case files."
  }
};

export function getCurrentCase(state) {
  return state.cases[state.index];
}

export function countMatchingEvidence(selectedEvidence, item) {
  return selectedEvidence.filter((evidence) => item.clues.includes(evidence)).length;
}

export function getDifficultyBonus(item) {
  if (item.difficulty === "Hard") {
    return 40;
  }
  if (item.difficulty === "Medium") {
    return 20;
  }
  return 0;
}

export function getSuspicionLevel(selectedEvidence, item) {
  if (!item) {
    return 0;
  }

  const suspiciousClues = ["dash", "generic", "template", "buzzword"];
  const humanClues = ["human", "specific", "revision", "contradiction"];
  const suspicious = selectedEvidence.filter((evidence) => suspiciousClues.includes(evidence)).length;
  const human = selectedEvidence.filter((evidence) => humanClues.includes(evidence)).length;
  const raw = item.ai ? 45 + suspicious * 16 - human * 10 : 35 + suspicious * 12 - human * 14;

  return Math.max(5, Math.min(95, raw));
}

function finalVerdict(message, state) {
  return {
    kind: "",
    text: `${message} Final score: ${state.score}. Strikes: ${state.strikes}.`
  };
}

export function gameReducer(state, action) {
  switch (action.type) {
    case "gameDataLoaded":
      return {
        ...state,
        cases: action.payload.cases,
        status: action.payload.status,
        time: action.payload.status.shiftSeconds,
        riskTag: "Awaiting work",
        verdict: {
          kind: "",
          text: "Case files loaded. Begin Shift when ready."
        }
      };

    case "gameDataFailed":
      return {
        ...state,
        riskTag: "Offline",
        verdict: {
          kind: "wrong",
          text: "Case files could not be loaded. Start Quarkus and refresh the page."
        }
      };

    case "shiftStarted":
      if (state.active || state.cases.length === 0) {
        return state;
      }

      return {
        ...state,
        index: 0,
        score: 0,
        strikes: 0,
        time: state.status.shiftSeconds,
        active: true,
        locked: false,
        selectedEvidence: [],
        interviewedCaseIds: [],
        riskTag: "Unstamped",
        verdict: {
          kind: "",
          text: "Mark evidence, then stamp the work."
        }
      };

    case "timerTicked":
      if (!state.active) {
        return state;
      }

      if (state.time <= 1) {
        const closedState = {
          ...state,
          time: 0,
          active: false,
          locked: true,
          riskTag: "Closed"
        };
        return {
          ...closedState,
          verdict: finalVerdict("The clock hit zero. The desk is closed.", closedState)
        };
      }

      return {
        ...state,
        time: state.time - 1
      };

    case "evidenceToggled":
      if (state.locked || !state.active) {
        return state;
      }

      return {
        ...state,
        selectedEvidence: state.selectedEvidence.includes(action.payload)
          ? state.selectedEvidence.filter((item) => item !== action.payload)
          : [...state.selectedEvidence, action.payload]
      };

    case "interviewRequested": {
      const item = getCurrentCase(state);
      if (!state.active || state.locked || !item || state.interviewedCaseIds.includes(item.id)) {
        return state;
      }

      const nextState = {
        ...state,
        time: Math.max(0, state.time - 20),
        score: Math.max(0, state.score - 5),
        interviewedCaseIds: [...state.interviewedCaseIds, item.id],
        verdict: {
          kind: "",
          text: "Interview note added to the file. Time docked: 20 seconds."
        }
      };

      if (nextState.time === 0) {
        return {
          ...nextState,
          active: false,
          locked: true,
          riskTag: "Closed",
          verdict: finalVerdict("The interview used the last minute. The desk is closed.", nextState)
        };
      }

      return nextState;
    }

    case "caseStamped": {
      const item = getCurrentCase(state);
      if (state.locked || !state.active || !item) {
        return state;
      }

      const correct = action.payload.decisionAi === item.ai;
      const matchingEvidence = countMatchingEvidence(state.selectedEvidence, item);
      const falseEvidence = state.selectedEvidence.length - matchingEvidence;

      if (correct) {
        const evidenceBonus = Math.min(matchingEvidence, 4) * 12;
        const penalty = falseEvidence * 8;
        const caseBonus = getDifficultyBonus(item);
        const awarded = Math.max(35, 80 + evidenceBonus + caseBonus - penalty);

        return {
          ...state,
          score: state.score + awarded,
          locked: true,
          riskTag: action.payload.decisionAi ? "AI use" : "Human",
          verdict: {
            kind: "correct",
            text: `Correct stamp. ${item.explanation} Award: ${awarded}.`
          }
        };
      }

      const nextState = {
        ...state,
        score: Math.max(0, state.score - 40),
        strikes: state.strikes + 1,
        locked: true,
        riskTag: action.payload.decisionAi ? "AI use" : "Human",
        verdict: {
          kind: "wrong",
          text: `Bad call. ${item.explanation} Evidence matched: ${matchingEvidence}.`
        }
      };

      if (nextState.strikes >= 3) {
        return {
          ...nextState,
          active: false,
          riskTag: "Closed",
          verdict: finalVerdict("Three bad calls. Internal Affairs has taken the stamp pad.", nextState)
        };
      }

      return nextState;
    }

    case "nextCaseRequested": {
      if (!state.locked || !state.active) {
        return state;
      }

      const nextIndex = state.index + 1;
      if (nextIndex >= state.cases.length) {
        const closedState = {
          ...state,
          active: false,
          riskTag: "Closed"
        };
        return {
          ...closedState,
          verdict: finalVerdict("All files processed.", closedState)
        };
      }

      return {
        ...state,
        index: nextIndex,
        locked: false,
        selectedEvidence: [],
        riskTag: "Unstamped",
        verdict: {
          kind: "",
          text: "Mark evidence, then stamp the work."
        }
      };
    }

    default:
      return state;
  }
}
