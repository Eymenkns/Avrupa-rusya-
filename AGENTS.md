# AGENTS.md

## Cursor Cloud specific instructions

### Overview
This is a **pnpm workspace monorepo** for ChapterLOG, a Turkish logistics company website. It contains:
- **`@workspace/chapterlog`** — React+Vite marketing website (frontend)
- **`@workspace/api-server`** — Express 5 backend API
- **`@workspace/mockup-sandbox`** — UI prototyping tool (optional, has pre-existing type errors)
- **Shared libs** in `lib/` — `db` (Drizzle ORM), `api-spec`, `api-zod`, `api-client-react`

### Prerequisites
- **Node.js 22+** and **pnpm 10+** (enforced via preinstall script; npm/yarn rejected)
- **PostgreSQL 16** — required for `@workspace/db` and the API server

### Starting PostgreSQL
```bash
sudo pg_ctlcluster 16 main start
```
Dev credentials: user `dev`, password `dev`, database `chapterlog`.

### Running services
See `package.json` scripts in each package. Key commands:

| Service | Command | Required Env Vars |
|---|---|---|
| API Server | `PORT=3000 DATABASE_URL="postgresql://dev:dev@localhost:5432/chapterlog" pnpm --filter @workspace/api-server run dev` | `PORT`, `DATABASE_URL` |
| Frontend | `PORT=5173 BASE_PATH=/ pnpm --filter @workspace/chapterlog run dev` | `PORT`, `BASE_PATH` |
| Mockup Sandbox | `PORT=5174 BASE_PATH=/ pnpm --filter @workspace/mockup-sandbox run dev` | `PORT`, `BASE_PATH` |

### Typecheck
```bash
pnpm run typecheck
```
Note: `@workspace/chapterlog` and `@workspace/mockup-sandbox` have pre-existing type errors (framer-motion Variants type narrowing, missing lucide-react icons). The **libs** and **api-server** typecheck cleanly.

### Gotchas
- The API server requires `PORT` and `DATABASE_URL` env vars or it crashes on startup.
- The frontend requires `PORT` and `BASE_PATH` env vars or Vite config throws.
- The frontend contact form posts to `/api/contact` on its own origin. In production, a reverse proxy routes this to the API server. For local dev, either use Vite's proxy config or test the API directly via `curl http://localhost:3000/api/contact`.
- SMTP is optional; without SMTP env vars, contact submissions fall back to JSONL file logging in `logs/contact-submissions.jsonl` relative to the API server working directory.
- The DB schema is currently empty (only placeholder comments in `lib/db/src/schema/index.ts`), so `drizzle-kit push` is a no-op.
- Replit-specific Vite plugins (`@replit/vite-plugin-cartographer`, `@replit/vite-plugin-dev-banner`) are only loaded when `REPL_ID` env var is set; they are safely skipped in local dev.

### TMS / Modaltrans (masraf pipeline)
- Integration package: `@workspace/modaltrans` in `lib/integrations/modaltrans`
- API routes (api-server): `POST /api/tms/expenses`, `POST /api/tms/expenses/:id/sync`, `POST /api/tms/expenses/:id/settle`, `POST /api/tms/expenses/:id/run-pipeline`, `GET /api/tms/shipments/:shipmentId/costs`
- Required env for Modaltrans sync: `MODALTRANS_API_URL` (e.g. `https://demo.modaltrans.com`), `MODALTRANS_BEARER_TOKEN`
- After schema changes: `pnpm --filter @workspace/db run push`
