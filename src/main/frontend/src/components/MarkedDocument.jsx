const suspiciousPattern =
  /—|In conclusion|Overall|fast-paced world|brighter future|something for everyone|unlock|leverage|ecosystem|lasting memories|stakeholder|cross-functional|impact|innovation|inclusive|shared purpose|positive impact/gi;

export function MarkedDocument({text}) {
  const parts = [];
  let cursor = 0;
  let match;

  suspiciousPattern.lastIndex = 0;
  while ((match = suspiciousPattern.exec(text)) !== null) {
    if (match.index > cursor) {
      parts.push(text.slice(cursor, match.index));
    }
    parts.push(
      <span className="mark" key={`${match.index}-${match[0]}`}>
        {match[0]}
      </span>
    );
    cursor = match.index + match[0].length;
  }

  if (cursor < text.length) {
    parts.push(text.slice(cursor));
  }

  return parts;
}
