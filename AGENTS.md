# AGENTS.md

## Project

Em Dash Police is a Quarkus-hosted browser game about detecting AI-generated text. Quarkus serves the API under `/api/*` and the frontend from `src/main/resources/META-INF/resources`.

## Environment

- SDKMAN is expected to be installed already.
- Use Java 21.
- Prefer `make` targets for local work because the `Makefile` sources SDKMAN before invoking Maven.

## Commands

- `make dev` starts Quarkus dev mode on port 8080.
- `make build` compiles and packages the app.
- `make test` runs Maven tests.
- `make run` runs the packaged Quarkus app after a build.
- `make clean` removes build output.

## Code Layout

- `src/main/java/dev/emdashpolice` contains Quarkus backend code.
- `src/main/frontend` contains the React source app.
- `src/main/frontend/src/components` contains presentational React components.
- `src/main/frontend/src/state` contains reducer state management.
- `src/main/frontend/src/hooks` contains React hooks.
- `src/main/frontend/src/api` contains API clients.
- `src/main/resources/META-INF/resources` contains Quarkus-served static output and local assets.
- `src/main/resources/META-INF/resources/assets` contains game images.

## Game Mechanics

- **Game Loop:** Inspect writing samples, mark evidence, optionally request interviews (at a cost), and stamp as "AI" or "Human".
- **Evidence:** Divided into AI-leaning (`dash`, `generic`, `template`, `buzzword`) and Human-leaning (`human`, `specific`, `revision`, `contradiction`).
- **Suspicion Meter:** Calculates a percentage based on selected evidence and actual case truth. See `getSuspicionLevel` in `gameReducer.js`.
- **Interviews:** Reveal character dossiers but cost 20 seconds and 5 points.
- **Scoring:** Correct stamps award points based on difficulty and matching evidence. False evidence and bad calls (incorrect stamps) penalize the score. 3 bad calls end the game.
- **Em Dashes:** The "em dash" (—) is a primary indicator of AI generation in this game's lore.

## Graphic Standards: Bureaucratic Noir

The game uses a "Bureaucratic Noir" aesthetic. Assets should follow these rules:
- **Style:** Stylized screenprint or woodblock aesthetic. Avoid clean gradients; prefer high-contrast, "dirty" textures and dithered-like patterns.
- **Color Palette:** Desaturated olive-gray (`#4a544d`), tobacco brown (`#70543e`), dirty cream (`#e8e4d8`), and charcoal shadows (`#1a1d1b`). Small accents of "faded red" (`#8b3a3a`) or "postal blue" (`#4b5e7a`) are permitted.
- **SVG Implementation:**
  - Use `<filter>` for grain and texture (e.g., `feTurbulence` + `feColorMatrix`).
  - Use high-contrast paths with sharp angles.
  - Avoid photorealism; favor iconic, expressive silhouettes that look like they were stamped on a dossier.
  - Portrait size: `viewBox="0 0 120 140"`.

## Backend Notes

- **Data Model:** `GameCase.java` (record) defines the case structure.
- **Case Catalog:** `CaseCatalog.java` contains the static list of cases and their metadata (clues, explanations, dossiers).
- **API:** `CaseResource.java` exposes the REST endpoints.

## Working Rules

- Do not commit generated `target/` or `node_modules/` files.
- Keep changes scoped to the game unless the request explicitly broadens the work.
- Preserve existing responsive behavior and the "noir desk" aesthetic when changing UI.
