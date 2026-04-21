export function SuspicionMeter({level}) {
  return (
    <div className="suspicion" aria-label="Suspicion meter">
      <div className="suspicion-header">
        <span>Suspicion</span>
        <strong>{level}%</strong>
      </div>
      <div className="suspicion-track">
        <span style={{width: `${level}%`}} />
      </div>
    </div>
  );
}
