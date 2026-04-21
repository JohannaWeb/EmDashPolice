# Em Dash Police

Em Dash Police is a small Quarkus-hosted browser game about inspecting writing samples for possible AI usage. The backend serves case data as JSON, and the frontend is a React/Vite app built into Quarkus static resources.

## Requirements

- SDKMAN installed
- Java 21 available through SDKMAN
- Maven available on the PATH
- Node.js and npm available for the React frontend

## Run

Use the Makefile so SDKMAN is loaded before Maven runs:

```bash
make dev
```

Then open http://localhost:8080.

## Useful Commands

```bash
make build
make test
make package
make run
make api-status
make frontend-dev
```

## API

The Quarkus API is available under `/api`.

- `GET /api/status` returns the game name, number of cases, and shift length.
- `GET /api/cases` returns all case files.
- `GET /api/cases/{id}` returns one case file.

Example:

```bash
curl http://localhost:8080/api/status
```

## Frontend

The React frontend source lives in:

```text
src/main/frontend
```

The main `make` targets run `npm --prefix src/main/frontend run build` before Maven. Vite writes the built app into:

```text
src/main/resources/META-INF/resources
```

For frontend-only work, run `make frontend-dev` and keep Quarkus running separately for `/api` proxying.

The current game loop includes evidence tagging, difficulty bonuses, false-evidence penalties, a suspicion meter, and optional interview notes that reveal dossier context at a time cost.

Character portraits are local SVG assets under:

```text
src/main/resources/META-INF/resources/assets
```

## Backend

The Quarkus source lives in:

```text
src/main/java/dev/emdashpolice
```

`CaseCatalog` owns the game data, including case text, clue tags, difficulty, dossiers, and portrait paths. `CaseResource` exposes the JSON endpoints.
