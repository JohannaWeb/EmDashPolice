const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL ?? "").replace(/\/$/, "");

function apiUrl(path) {
  return `${apiBaseUrl}${path}`;
}

export async function fetchGameData(options = {}) {
  const [statusResponse, casesResponse] = await Promise.all([
    fetch(apiUrl("/api/status"), options),
    fetch(apiUrl("/api/cases"), options)
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
