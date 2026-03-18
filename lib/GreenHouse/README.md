# Greenhouse Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-green-house?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-green-house)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for Greenhouse, a leading hiring software platform for growing companies.

## Application Type

**Basic**

This connector authenticates using a username and password encoded as HTTP Basic auth against the Greenhouse Harvest API.

| Field | Description |
|---|---|
| `username` | Your Greenhouse API key (used as the username in Basic auth) |
| `password` | Leave empty or set to any value — Greenhouse Harvest API only uses the API key |

## Components

| Class | Type | Description |
|---|---|---|
| `GreenHouseAddCandidateConnector` | Connector | Creates a new candidate record via `POST /v1/candidates` |
| `GreenHouseListAppBatch` | Batch | Paginates through all job applications (500 per page) via `GET /v1/applications` |
| `GreenHouseListCandidatesBatch` | Batch | Paginates through all candidates (500 per page) via `GET /v1/candidates` |

## Setup

### Credentials

1. Log in to your [Greenhouse](https://app.greenhouse.io) account.
2. Navigate to **Configure → Dev Center → API Credential Management**.
3. Create a new API key of type **Harvest**.
4. Copy the generated key and paste it into the **username** field in Orchesty (leave **password** empty).

### API Documentation

Greenhouse Harvest API: [https://developers.greenhouse.io/harvest.html](https://developers.greenhouse.io/harvest.html)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-green-house @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-green-house @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import GreenHouseApplication from '@orchesty/connector-green-house/dist/GreenHouseApplication';
import GreenHouseAddCandidateConnector from '@orchesty/connector-green-house/dist/Connector/GreenHouseAddCandidateConnector';
import GreenHouseListAppBatch from '@orchesty/connector-green-house/dist/Batch/GreenHouseListAppBatch';
import GreenHouseListCandidatesBatch from '@orchesty/connector-green-house/dist/Batch/GreenHouseListCandidatesBatch';

const app = new GreenHouseApplication();
container.setApplication(app);
container.setNode(new GreenHouseAddCandidateConnector(), app);
container.setNode(new GreenHouseListAppBatch(), app);
container.setNode(new GreenHouseListCandidatesBatch(), app);
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
