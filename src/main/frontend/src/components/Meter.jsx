export function Meter({value, label}) {
  return (
    <div>
      <span>{value}</span>
      <small>{label}</small>
    </div>
  );
}
