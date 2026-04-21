function StampButton({className, disabled, onClick, image}) {
  return (
    <button className={`stamp ${className}`} disabled={disabled} onClick={onClick}>
      <img src={image} alt="" />
    </button>
  );
}

export function StampPanel({controlsEnabled, active, locked, verdict, onStampAi, onStampHuman, onNextCase}) {
  return (
    <aside className="actions" aria-label="Decision stamps">
      <h2>Stamp</h2>
      <StampButton className="stamp-ai" disabled={!controlsEnabled} image="/assets/stamp-ai.svg" onClick={onStampAi} />
      <StampButton
        className="stamp-human"
        disabled={!controlsEnabled}
        image="/assets/stamp-human.svg"
        onClick={onStampHuman}
      />
      <div className={`verdict ${verdict.kind}`} aria-live="polite">
        {verdict.text}
      </div>
      <button className="secondary" disabled={!active || !locked} onClick={onNextCase}>
        Next Case
      </button>
    </aside>
  );
}
