# Pipedrive Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-pipedrive?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-pipedrive)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for Pipedrive, a sales pipeline and CRM software built for deal makers to close more deals in less time.

## Application Type

**Basic**

This connector authenticates using a personal API token appended as a query parameter (`?api_token=...`) to every request. The base URL is built dynamically from your Pipedrive subdomain: `https://{subdomain}.pipedrive.com/api/v1`. The connector also supports webhook subscriptions for real-time activity notifications.

| Field | Description |
|---|---|
| `token` | Your Pipedrive personal API token |
| `subdomain` | Your Pipedrive account subdomain (e.g. `yourcompany`) |

## Components

| Class | Type | Description |
|---|---|---|
| `PipedriveAddLeadConnector` | Connector | Creates a new lead via `POST /leads` |
| `PipedriveGetLeadConnector` | Connector | Fetches a single lead by ID via `GET /leads/{id}` |
| `PipedriveUpdateLeadConnector` | Connector | Updates a lead by ID via `PATCH /leads/{id}` |
| `PipedriveDeleteLeadConnector` | Connector | Deletes a lead by ID via `DELETE /leads/{id}` |
| `PipedriveAddNoteConnector` | Connector | Creates a new note via `POST /notes` |
| `PipedriveGetNoteConnector` | Connector | Fetches a single note by ID via `GET /notes/{id}` |
| `PipedriveUpdateNoteConnector` | Connector | Updates a note by ID via `PUT /notes/{id}` |
| `PipedriveDeleteNoteConnector` | Connector | Deletes a note by ID via `DELETE /notes/{id}` |
| `PipedriveGetAllLeadsBatch` | Batch | Paginates through all leads (100 per page) via `GET /leads` |
| `PipedriveGetAllNotesBatch` | Batch | Paginates through all notes (100 per page) via `GET /notes` |

## Setup

### Credentials

1. Log in to your [Pipedrive](https://app.pipedrive.com/) account.
2. Go to **Settings → Personal preferences → API** and copy your **Personal API token**.
3. Note your Pipedrive **subdomain** — visible in the URL when logged in (e.g. `yourcompany` from `yourcompany.pipedrive.com`).
4. In Orchesty, open the Pipedrive application settings and fill in both fields.

### API Documentation

Pipedrive API Reference: [https://developers.pipedrive.com/docs/api/v1/](https://developers.pipedrive.com/docs/api/v1/)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-pipedrive @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-pipedrive @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import PipedriveApplication from '@orchesty/connector-pipedrive/dist/PipedriveApplication';
import PipedriveAddLeadConnector from '@orchesty/connector-pipedrive/dist/Connector/PipedriveAddLeadConnector';
import PipedriveGetLeadConnector from '@orchesty/connector-pipedrive/dist/Connector/PipedriveGetLeadConnector';
import PipedriveUpdateLeadConnector from '@orchesty/connector-pipedrive/dist/Connector/PipedriveUpdateLeadConnector';
import PipedriveDeleteLeadConnector from '@orchesty/connector-pipedrive/dist/Connector/PipedriveDeleteLeadConnector';
import PipedriveAddNoteConnector from '@orchesty/connector-pipedrive/dist/Connector/PipedriveAddNoteConnector';
import PipedriveGetNoteConnector from '@orchesty/connector-pipedrive/dist/Connector/PipedriveGetNoteConnector';
import PipedriveUpdateNoteConnector from '@orchesty/connector-pipedrive/dist/Connector/PipedriveUpdateNoteConnector';
import PipedriveDeleteNoteConnector from '@orchesty/connector-pipedrive/dist/Connector/PipedriveDeleteNoteConnector';
import PipedriveGetAllLeadsBatch from '@orchesty/connector-pipedrive/dist/Batch/PipedriveGetAllLeadsBatch';
import PipedriveGetAllNotesBatch from '@orchesty/connector-pipedrive/dist/Batch/PipedriveGetAllNotesBatch';

const app = new PipedriveApplication();
container.setApplication(app);
container.setNode(new PipedriveAddLeadConnector(), app);
container.setNode(new PipedriveGetLeadConnector(), app);
container.setNode(new PipedriveUpdateLeadConnector(), app);
container.setNode(new PipedriveDeleteLeadConnector(), app);
container.setNode(new PipedriveAddNoteConnector(), app);
container.setNode(new PipedriveGetNoteConnector(), app);
container.setNode(new PipedriveUpdateNoteConnector(), app);
container.setNode(new PipedriveDeleteNoteConnector(), app);
container.setNode(new PipedriveGetAllLeadsBatch(), app);
container.setNode(new PipedriveGetAllNotesBatch(), app);
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
