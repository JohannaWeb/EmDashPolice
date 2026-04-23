# Em Dash Police

Em Dash Police is a small Quarkus-hosted browser game about inspecting writing samples for possible AI usage. The backend serves case data as JSON, and the frontend is a React/Vite app built into Quarkus static resources.

https://emdashpolice-production.up.railway.app/

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

## Deployment

This repo is set up for a split deployment:

- Railway hosts the Quarkus app and API.
- Vercel hosts the static React frontend.

### Railway

`railway.json` configures Railway to:

- install frontend dependencies
- build the Vite frontend into Quarkus static resources
- package the Quarkus app with Maven
- start `target/quarkus-app/quarkus-run.jar`

Quarkus is configured to honor Railway's runtime port with:

```properties
quarkus.http.port=${PORT:8080}
```

Set this Railway environment variable if you deploy the frontend separately on Vercel:

```text
QUARKUS_HTTP_CORS_ENABLED=true
QUARKUS_HTTP_CORS_ORIGINS=https://your-vercel-project.vercel.app
```

If you add a custom Vercel domain, include that origin too as a comma-separated list.

### Vercel

`vercel.json` configures Vercel to:

- install dependencies from `src/main/frontend`
- run the Vite build in `vercel` mode
- publish `src/main/frontend/dist`

The frontend package declares `node >=20.19.0`, which matches Vite 7's current runtime requirement.

Set this Vercel environment variable:

```text
VITE_API_BASE_URL=https://your-railway-app.up.railway.app
```

An example is included in [src/main/frontend/.env.example](/home/jalmeida/projects/emdashpolice/src/main/frontend/.env.example).

The frontend now reads `VITE_API_BASE_URL` and falls back to same-origin `/api` locally and on single-origin deployments.

## Docker

This repo includes a multi-stage [Dockerfile](/home/jalmeida/projects/emdashpolice/Dockerfile) that:

- builds the React frontend with Node 20
- packages the Quarkus app with Maven and Java 21
- runs the app on a slim Java 21 runtime image

Build the image:

```bash
make docker-build
```

Run it locally:

```bash
make docker-run
```

Or directly:

```bash
docker build -t emdashpolice .
docker run --rm -p 8080:8080 emdashpolice
```

The container serves the game and API on `http://localhost:8080`. You can override the HTTP port with the `PORT` environment variable, the same way Railway does.
