import {CharacterDossier} from "./CharacterDossier.jsx";
import {EvidencePanel} from "./EvidencePanel.jsx";
import {MarkedDocument} from "./MarkedDocument.jsx";
import {SuspicionMeter} from "./SuspicionMeter.jsx";

const emptyDocument =
  "No document on the counter. Start the shift, inspect the writing, mark the evidence, then stamp the decision.";

export function CaseFile({
  item,
  active,
  locked,
  riskTag,
  selectedEvidence,
  controlsEnabled,
  dossierVisible,
  suspicion,
  onToggleEvidence,
  onRequestInterview
}) {
  const hasVisibleDocument = item && (active || !locked);

  return (
    <section className="case-file" aria-label="Current writing sample">
      <div className="file-header">
        <div>
          <p className="eyebrow">{item && active ? item.sender : "Applicant"}</p>
          <h2>{item && active ? item.title : "Booth closed"}</h2>
        </div>
        <div className="file-flags">
          {item && active && <span className="difficulty-tag">{item.difficulty}</span>}
          <span className="risk">{riskTag}</span>
        </div>
      </div>

      <CharacterDossier
        item={item}
        active={active}
        dossierVisible={dossierVisible}
        canRequestInterview={controlsEnabled && !dossierVisible}
        onRequestInterview={onRequestInterview}
      />
      <SuspicionMeter level={suspicion} />

      <article className="document">
        {hasVisibleDocument ? <MarkedDocument text={item.text} /> : emptyDocument}
      </article>

      <EvidencePanel
        selectedEvidence={selectedEvidence}
        controlsEnabled={controlsEnabled}
        onToggleEvidence={onToggleEvidence}
      />
    </section>
  );
}
