# Workable Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-workable?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-workable)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for Workable, the world's leading hiring platform for managing recruitment, job postings, and candidates.

## Application Type

**Basic**

This connector authenticates using a Bearer access token in the `Authorization` header. The base URL is constructed from your company subdomain.

| Field | Description |
|---|---|
| `access_token` | Your Workable API access token |
| `subdomain` | Your Workable company subdomain (e.g. `mycompany`) |

## Components

| Class | Type | Description |
|---|---|---|
| `WorkableGetAccountsBatch` | Batch | Fetches all accounts for the configured subdomain via `GET /spi/v3/accounts` |
| `WorkableJobsBatch` | Batch | Paginates through published jobs (cursor-based) via `GET /spi/v3/jobs?state=published` |

## Setup

### Credentials

1. Log in to your [Workable](https://www.workable.com/) account.
2. Navigate to **Settings → Integrations → Access Tokens** and generate a new token.
3. Your **subdomain** is the part of your Workable URL before `.workable.com` (e.g. `mycompany` from `mycompany.workable.com`).
4. In Orchesty, open the Workable application settings and enter both values.

### API Documentation

Workable API: [https://workable.readme.io/reference/](https://workable.readme.io/reference/)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-workable @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-workable @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import WorkableApplication from '@orchesty/connector-workable/dist/WorkableApplication';
import WorkableGetAccountsBatch from '@orchesty/connector-workable/dist/Batch/WorkableGetAccountsBatch';
import WorkableJobsBatch from '@orchesty/connector-workable/dist/Batch/WorkableJobsBatch';

const app = new WorkableApplication();
container.setApplication(app);
container.setNode(new WorkableGetAccountsBatch(), app);
container.setNode(new WorkableJobsBatch(), app);
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
