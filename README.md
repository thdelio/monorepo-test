# MonorepoErp

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

NX monorepo containing NestJS APIs, React SPA, workers, and shared libraries.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Infrastructure (Docker)](#infrastructure-docker)
4. [Environment Variables](#environment-variables)
5. [Database Setup](#database-setup)
6. [Running the Project](#running-the-project)
7. [Running Individual Apps](#running-individual-apps)
8. [Building](#building)
9. [Testing](#testing)
10. [Creating a New NestJS App](#creating-a-new-nestjs-app)
11. [Creating a New React App](#creating-a-new-react-app)
12. [Creating a Shared Library](#creating-a-shared-library)
13. [Project Structure](#project-structure)

---

## Prerequisites

Make sure the following tools are installed on your machine before continuing:

| Tool               | Version | Install                            |
| ------------------ | ------- | ---------------------------------- |
| **Node.js**        | >= 20.x | https://nodejs.org                 |
| **pnpm**           | >= 9.x  | See below                          |
| **Docker**         | latest  | https://www.docker.com/get-started |
| **Docker Compose** | v2+     | bundled with Docker Desktop        |

### Install pnpm

```sh
npm install -g pnpm
```

Verify the installation:

```sh
pnpm --version
```

### Install NX CLI (optional but recommended)

```sh
pnpm add -g nx
```

---

## Installation

Clone the repository and install all dependencies:

```sh
git clone <repository-url>
cd monorepo-erp
pnpm install
```

> `pnpm install` installs all workspace dependencies for every app and library in one shot.

---

## Infrastructure (Docker)

The project requires **PostgreSQL**, **Redis**, and **RabbitMQ** running locally. A `docker-compose.yml` is provided under `infra/`.

### Start all services

```sh
pnpm infra:up
```

This starts:

| Service         | Port                         | Credentials                           |
| --------------- | ---------------------------- | ------------------------------------- |
| PostgreSQL 16   | `5432`                       | user: `erp` / pass: `erp` / db: `erp` |
| Redis 7         | `6379`                       | —                                     |
| RabbitMQ 3      | `5672` (AMQP) · `15672` (UI) | user: `erp` / pass: `erp`             |
| Dozzle (log UI) | `8080`                       | —                                     |

### Stop all services

```sh
pnpm infra:down
```

---

## Environment Variables

Each app reads its own `.env` file at startup. Copy the example files and fill in the values:

```sh
# api-web
cp apps/api-web/.env.example apps/api-web/.env

# api-inventory
cp apps/api-inventory/.env.example apps/api-inventory/.env

# api-worker
cp apps/api-worker/.env.example apps/api-worker/.env

# api-cron
cp apps/api-cron/.env.example apps/api-cron/.env

# spa
cp apps/spa/.env.example apps/spa/.env
```

Typical values expected by the NestJS apps:

```env
DATABASE_URL=postgresql://erp:erp@localhost:5432/erp
REDIS_URL=redis://localhost:6379
RABBITMQ_URL=amqp://erp:erp@localhost:5672
```

---

## Database Setup

Run all pending MikroORM migrations to create/update the database schema:

```sh
pnpm db:migrate
```

Optionally seed the database with initial data:

```sh
pnpm db:seed
```

---

## Running the Project

### Run everything at once (API + Inventory + SPA)

```sh
pnpm dev
```

This starts `api-web`, `api-inventory`, and `spa` in parallel with hot-reload enabled.

### Run only the API

```sh
pnpm dev:api
```

### Run only the Worker

```sh
pnpm dev:worker
```

### Run only the SPA

```sh
pnpm dev:spa
```

---

## Running Individual Apps

You can also target any specific app using the NX CLI:

```sh
# Serve an app in development mode
pnpm nx serve <project-name>

# Examples
pnpm nx serve api-web
pnpm nx serve api-inventory
pnpm nx serve api-worker
pnpm nx serve api-cron
pnpm nx serve spa
```

---

## Building

### Build all apps and libraries

```sh
pnpm build
```

### Build a specific app

```sh
pnpm nx build <project-name>

# Examples
pnpm nx build api-web
pnpm nx build spa
```

### Build with a specific configuration

```sh
pnpm nx build api-web --configuration=production
pnpm nx build api-web --configuration=development
```

---

## Testing

### Run all tests

```sh
pnpm test
```

### Run tests for a specific project

```sh
pnpm nx test <project-name>

# Examples
pnpm nx test api-web
pnpm nx test spa
pnpm nx test contracts
```

### Run end-to-end tests (Playwright)

```sh
pnpm test:e2e
```

### Run e2e for a specific app

```sh
pnpm nx e2e spa-e2e
```

---

## Creating a New NestJS App

Use the `@nx/nest` generator to scaffold a new NestJS application inside `apps/`:

```sh
pnpm nx g @nx/nest:app apps/<app-name>
```

**Example — create `api-orders`:**

```sh
pnpm nx g @nx/nest:app apps/api-orders
```

The generator will ask a few questions (bundler, test runner, etc.). Recommended answers:

| Prompt      | Recommended value |
| ----------- | ----------------- |
| Bundler     | `webpack`         |
| Test runner | `jest`            |
| Tags        | `scope:api`       |

After generation, the new app is available at `apps/api-orders/` and can be served immediately:

```sh
pnpm nx serve api-orders
```

### Add the new app to the shared `dev` script (optional)

Open `package.json` at the root and add the new project to the `dev` script:

```json
"dev": "nx run-many --target=serve --projects=apps/api-web,apps/api-inventory,apps/api-orders,spa --parallel"
```

---

## Creating a New React App

Use the `@nx/react` generator to scaffold a new React (Vite) application inside `apps/`:

```sh
pnpm nx g @nx/react:app apps/<app-name>
```

**Example — create `spa-admin`:**

```sh
pnpm nx g @nx/react:app apps/spa-admin
```

Recommended answers:

| Prompt            | Recommended value                   |
| ----------------- | ----------------------------------- |
| Bundler           | `vite`                              |
| Test runner       | `vitest`                            |
| Stylesheet format | `css`                               |
| Routing           | `TanStack Router` or `React Router` |
| Tags              | `scope:spa`                         |

Serve the new app:

```sh
pnpm nx serve spa-admin
```

Build it:

```sh
pnpm nx build spa-admin
```

---

## Creating a Shared Library

Shared code (types, utilities, database entities, etc.) lives under `libs/`. Use the `@nx/js` or `@nx/react` generator depending on whether it's framework-agnostic or React-specific.

### Framework-agnostic library

```sh
pnpm nx g @nx/js:lib libs/<lib-name>

# Example
pnpm nx g @nx/js:lib libs/shared-utils
```

### React component library

```sh
pnpm nx g @nx/react:lib libs/<lib-name>

# Example
pnpm nx g @nx/react:lib libs/ui-components
```

After creation, import the library in any app using its path alias defined in `tsconfig.base.json`:

```ts
import { something } from '@monorepo-erp/<lib-name>';
```

---

## Project Structure

```
monorepo-erp/
├── apps/
│   ├── api-web/          # Main NestJS REST API
│   ├── api-inventory/    # Inventory NestJS API
│   ├── api-worker/       # Background worker (NestJS)
│   ├── api-cron/         # Scheduled jobs (NestJS)
│   ├── spa/              # React SPA (Vite + TanStack Router)
│   └── *-e2e/            # Playwright e2e test suites
├── libs/
│   ├── contracts/        # Shared DTOs, schemas, and types
│   ├── database/         # MikroORM entities and migrations
│   ├── message-broker/   # RabbitMQ/AMQP helpers
│   └── e2e-utils/        # Shared e2e helpers
├── infra/
│   └── docker-compose.yml  # Local dev infrastructure
├── nx.json               # NX workspace configuration
├── pnpm-workspace.yaml   # pnpm workspace definition
└── package.json          # Root scripts and shared dependencies
```

## Generate a library

```sh
npx nx g @nx/js:lib packages/pkg1 --publishable --importPath=@my-org/pkg1
```

## Run tasks

To build the library use:

```sh
npx nx build pkg1
```

To run any task with Nx use:

```sh
npx nx <target> <project-name>
```

These targets are either [inferred automatically](https://nx.dev/concepts/inferred-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) or defined in the `project.json` or `package.json` files.

[More about running tasks in the docs &raquo;](https://nx.dev/features/run-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Versioning and releasing

To version and release the library use

```
npx nx release
```

Pass `--dry-run` to see what would happen without actually releasing the library.

[Learn more about Nx release &raquo;](https://nx.dev/features/manage-releases?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Keep TypeScript project references up to date

Nx automatically updates TypeScript [project references](https://www.typescriptlang.org/docs/handbook/project-references.html) in `tsconfig.json` files to ensure they remain accurate based on your project dependencies (`import` or `require` statements). This sync is automatically done when running tasks such as `build` or `typecheck`, which require updated references to function correctly.

To manually trigger the process to sync the project graph dependencies information to the TypeScript project references, run the following command:

```sh
npx nx sync
```

You can enforce that the TypeScript project references are always in the correct state when running in CI by adding a step to your CI job configuration that runs the following command:

```sh
npx nx sync:check
```

[Learn more about nx sync](https://nx.dev/reference/nx-commands#sync)

## Set up CI!

### Step 1

To connect to Nx Cloud, run the following command:

```sh
npx nx connect
```

Connecting to Nx Cloud ensures a [fast and scalable CI](https://nx.dev/ci/intro/why-nx-cloud?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) pipeline. It includes features such as:

- [Remote caching](https://nx.dev/ci/features/remote-cache?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Task distribution across multiple machines](https://nx.dev/ci/features/distribute-task-execution?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Automated e2e test splitting](https://nx.dev/ci/features/split-e2e-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Task flakiness detection and rerunning](https://nx.dev/ci/features/flaky-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

### Step 2

Use the following command to configure a CI workflow for your workspace:

```sh
npx nx g ci-workflow
```

[Learn more about Nx on CI](https://nx.dev/ci/intro/ci-with-nx#ready-get-started-with-your-provider?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Install Nx Console

Nx Console is an editor extension that enriches your developer experience. It lets you run tasks, generate code, and improves code autocompletion in your IDE. It is available for VSCode and IntelliJ.

[Install Nx Console &raquo;](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Useful links

Learn more:

- [Learn more about this workspace setup](https://nx.dev/nx-api/js?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Learn about Nx on CI](https://nx.dev/ci/intro/ci-with-nx?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Releasing Packages with Nx release](https://nx.dev/features/manage-releases?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [What are Nx plugins?](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

And join the Nx community:

- [Discord](https://go.nx.dev/community)
- [Follow us on X](https://twitter.com/nxdevtools) or [LinkedIn](https://www.linkedin.com/company/nrwl)
- [Our Youtube channel](https://www.youtube.com/@nxdevtools)
- [Our blog](https://nx.dev/blog?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
