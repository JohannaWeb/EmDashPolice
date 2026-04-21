export function RulesPanel({active, canStart, onStart}) {
  return (
    <aside className="manual" aria-label="Field manual">
      <h2>Rules</h2>
      <p>Inspect the submitted writing. Stamp only when the file supports the decision.</p>
      <ul>
        <li>Em dashes are evidence, not proof.</li>
        <li>Generic polish and template phrasing add suspicion.</li>
        <li>Concrete personal detail can clear the file.</li>
        <li>Interviews reveal context but cost 20 seconds.</li>
        <li>Three bad calls close the booth.</li>
      </ul>
      <button className="primary" onClick={onStart} disabled={!canStart}>
        {active ? "On Duty" : "Open Booth"}
      </button>
    </aside>
  );
}
