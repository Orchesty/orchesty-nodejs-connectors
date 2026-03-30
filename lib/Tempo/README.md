# Tempo Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-tempo?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-tempo)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for Tempo, a project management and time tracking platform offering resource management, cost tracking, and predictive scheduling for teams.

## Application Type

**Basic**

This connector authenticates using a Bearer token in the `Authorization` header.

| Field | Description |
|---|---|
| `token` | Your Tempo API token |

## Components

| Class | Type | Description |
|---|---|---|
| `CreateWorklogConnector` | Connector | Creates a new worklog entry via `POST /worklogs` |
| `UpdateWorklogConnector` | Connector | Updates an existing worklog by ID via `PUT /worklogs/{id}` |
| `WorklogsListBatch` | Batch | Paginates through worklogs for a date range via `GET /worklogs?limit=999&from={start}&to={end}` |

## Setup

### Credentials

1. Log in to your [Tempo](https://app.tempo.io/) account.
2. Navigate to **Settings → API integration** and generate a new API token.
3. Copy the token and paste it into the **token** field in the Orchesty Tempo application settings.

### API Documentation

Tempo API: [https://apidocs.tempo.io/](https://apidocs.tempo.io/)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-tempo @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-tempo @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import TempoApplication from '@orchesty/connector-tempo/dist/TempoApplication';
import CreateWorklogConnector from '@orchesty/connector-tempo/dist/Connector/CreateWorklogConnector';
import UpdateWorklogConnector from '@orchesty/connector-tempo/dist/Connector/UpdateWorklogConnector';
import WorklogsListBatch from '@orchesty/connector-tempo/dist/Batch/WorklogsListBatch';

const app = new TempoApplication();
container.setApplication(app);
container.setNode(new CreateWorklogConnector(), app);
container.setNode(new UpdateWorklogConnector(), app);
container.setNode(new WorklogsListBatch(), app);
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
