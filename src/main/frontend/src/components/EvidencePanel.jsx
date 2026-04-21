import {evidenceOptions} from "../state/gameReducer.js";

function evidenceClassName(active) {
  return active ? "evidence active" : "evidence";
}

export function EvidencePanel({selectedEvidence, controlsEnabled, onToggleEvidence}) {
  return (
    <div className="evidence-panel" aria-label="Evidence checklist">
      {evidenceOptions.map((option) => (
        <button
          className={evidenceClassName(selectedEvidence.includes(option.key))}
          disabled={!controlsEnabled}
          key={option.key}
          onClick={() => onToggleEvidence(option.key)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
