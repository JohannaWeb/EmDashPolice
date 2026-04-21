import {Meter} from "./Meter.jsx";
import {formatTime} from "../utils/format.js";

export function Topbar({status, caseLabel, score, strikes, time}) {
  return (
    <section className="topbar" aria-label="Shift status">
      <div className="brand">
        <img src="/assets/badge.svg" alt="" className="badge" />
        <div>
          <p className="eyebrow">Checkpoint 08</p>
          <h1>{status.name}</h1>
        </div>
      </div>

      <div className="meters">
        <Meter value={caseLabel} label="Desk" />
        <Meter value={score} label="Score" />
        <Meter value={strikes} label="Strikes" />
        <Meter value={formatTime(time)} label="Shift" />
      </div>
    </section>
  );
}
