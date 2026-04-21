import {useReducer} from "react";
import {CaseFile} from "./components/CaseFile.jsx";
import {RulesPanel} from "./components/RulesPanel.jsx";
import {StampPanel} from "./components/StampPanel.jsx";
import {Topbar} from "./components/Topbar.jsx";
import {useGameData} from "./hooks/useGameData.js";
import {useShiftTimer} from "./hooks/useShiftTimer.js";
import {gameReducer, getCurrentCase, getSuspicionLevel, initialState} from "./state/gameReducer.js";

function caseLabelFor(state) {
  return state.cases.length > 0 && state.index < state.cases.length ? `Case ${state.index + 1}` : "Closed";
}

export function App() {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const item = getCurrentCase(state);
  const controlsEnabled = state.active && !state.locked && Boolean(item);
  const dossierVisible = Boolean(item && state.interviewedCaseIds.includes(item.id));

  useGameData(dispatch);
  useShiftTimer(state.active, dispatch);

  return (
    <main className="game-shell" aria-label="Em Dash Police desk">
      <Topbar
        status={state.status}
        caseLabel={caseLabelFor(state)}
        score={state.score}
        strikes={state.strikes}
        time={state.time}
      />

      <section className="desk">
        <RulesPanel
          active={state.active}
          canStart={!state.active && state.cases.length > 0}
          onStart={() => dispatch({type: "shiftStarted"})}
        />

        <CaseFile
          item={item}
          active={state.active}
          locked={state.locked}
          riskTag={state.riskTag}
          selectedEvidence={state.selectedEvidence}
          controlsEnabled={controlsEnabled}
          dossierVisible={dossierVisible}
          suspicion={getSuspicionLevel(state.selectedEvidence, item)}
          onToggleEvidence={(evidence) => dispatch({type: "evidenceToggled", payload: evidence})}
          onRequestInterview={() => dispatch({type: "interviewRequested"})}
        />

        <StampPanel
          controlsEnabled={controlsEnabled}
          active={state.active}
          locked={state.locked}
          verdict={state.verdict}
          onStampAi={() => dispatch({type: "caseStamped", payload: {decisionAi: true}})}
          onStampHuman={() => dispatch({type: "caseStamped", payload: {decisionAi: false}})}
          onNextCase={() => dispatch({type: "nextCaseRequested"})}
        />
      </section>
    </main>
  );
}
