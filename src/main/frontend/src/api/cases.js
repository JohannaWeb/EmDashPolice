export async function fetchGameData(options = {}) {
  const [statusResponse, casesResponse] = await Promise.all([
    fetch("/api/status", options),
    fetch("/api/cases", options)
  ]);

  if (!statusResponse.ok || !casesResponse.ok) {
    throw new Error("The case desk did not answer.");
  }

  const [status, cases] = await Promise.all([
    statusResponse.json(),
    casesResponse.json()
  ]);

  return {status, cases};
}
