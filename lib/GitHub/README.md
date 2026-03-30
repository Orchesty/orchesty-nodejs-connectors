# GitHub Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-git-hub?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-git-hub)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for GitHub, a service that helps developers store and manage their code, as well as track and control changes to their code.

## Application Type

**Basic (Personal Access Token) + Webhooks**

This connector authenticates using a GitHub Personal Access Token (PAT) sent as a Bearer token. It also implements the `IWebhookApplication` interface, supporting webhook subscriptions for repository events.

| Field | Description |
|---|---|
| `token` | Your GitHub Personal Access Token |

## Components

| Class | Type | Description |
|---|---|---|
| `GitHubGetAppConnector` | Connector | Fetches details of a GitHub App by slug via `GET /apps/{appSlug}` |
| `GitHubGetRepositoryConnector` | Connector | Fetches details of a repository via `GET /repos/{org}/{repo}` |
| `GitHubRepositoriesBatch` | Batch | Paginates through all repositories in an organization via `GET /orgs/{org}/repos` (100 per page) |

### Webhook Subscriptions

| Event | Description |
|---|---|
| `issues` | Triggered when issues are opened, edited, deleted, or otherwise changed |
| `pull-request` | Triggered when pull requests are opened, edited, closed, or otherwise changed |

## Setup

### Credentials

1. Log in to your [GitHub](https://github.com) account.
2. Navigate to **Settings → Developer settings → Personal access tokens → Tokens (classic)**.
3. Click **Generate new token** and select the required scopes (e.g. `repo`, `read:org`).
4. Copy the generated token and paste it into the **Token** field in Orchesty.

### API Documentation

GitHub REST API: [https://docs.github.com/en/rest](https://docs.github.com/en/rest)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-git-hub @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-git-hub @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import GitHubApplication from '@orchesty/connector-git-hub/dist/GitHubApplication';
import GitHubGetAppConnector from '@orchesty/connector-git-hub/dist/Connector/GitHubGetAppConnector';
import GitHubGetRepositoryConnector from '@orchesty/connector-git-hub/dist/Connector/GitHubGetRepositoryConnector';
import GitHubRepositoriesBatch from '@orchesty/connector-git-hub/dist/Batch/GitHubRepositoriesBatch';

const app = new GitHubApplication();
container.setApplication(app);
container.setNode(new GitHubGetAppConnector(), app);
container.setNode(new GitHubGetRepositoryConnector(), app);
container.setNode(new GitHubRepositoriesBatch(), app);
```

## License

This connector is released under the **Apache License 2.0**. See the [LICENSE](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE) file for the full license text.

## Contributing

Contributions are welcome! This connector is part of the open-source [Orchesty Node.js Connectors](https://github.com/Orchesty/orchesty-nodejs-connectors) monorepo.

For guidelines on how to create or update connectors — including project setup, coding conventions, and how to write tests — please refer to the **[Contributing to Connectors](https://orchesty.io/community/contributing-to-connectors)** guide.

All contributions should include:
- Source code in `src/` following the existing connector structure
- Tests in `src/**/__tests__/` with `input.json`, `mock.json`, and `output.json` fixtures
- An updated `CHANGELOG.md` entry
