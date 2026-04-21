export function CharacterDossier({item, active, dossierVisible, canRequestInterview, onRequestInterview}) {
  if (!item || !active) {
    return (
      <aside className="character-card" aria-label="Applicant file">
        <div className="portrait placeholder">?</div>
        <div>
          <p className="eyebrow">No applicant</p>
          <h3>Counter empty</h3>
        </div>
      </aside>
    );
  }

  return (
    <aside className="character-card" aria-label="Applicant file">
      <img src={item.portrait} alt="" className="portrait" />
      <div className="character-copy">
        <p className="eyebrow">{item.role}</p>
        <h3>{item.sender}</h3>
        <p className="difficulty">{item.difficulty} file</p>
        <button className="interview" disabled={!canRequestInterview} onClick={onRequestInterview}>
          {dossierVisible ? "Interview Logged" : "Request Interview"}
        </button>
      </div>
      {dossierVisible && <p className="dossier-note">{item.dossier}</p>}
    </aside>
  );
}
