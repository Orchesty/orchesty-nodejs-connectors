# Airtable Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-airtable?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-airtable)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for Airtable, a low-code platform for building collaborative apps. Customize your workflow, collaborate, and achieve ambitious outcomes.

## Application Type

**Basic**

This connector authenticates using a personal access token sent as a `Bearer` token in the `Authorization` header.

| Field | Description |
|---|---|
| `token` | Your Airtable personal access token or API key |
| `base_id` | The ID of the Airtable base to connect to |
| `table_name` | The name of the table within the base |

## Components

| Class | Type | Description |
|---|---|---|
| `AirtableNewRecordConnector` | Connector | Creates a new record in the configured base and table via `POST /v0/{base_id}/{table_name}` |

## Setup

### Credentials

1. Log in to your Airtable account at [airtable.com](https://airtable.com).
2. Navigate to **Account → Developer hub → Personal access tokens**.
3. Create a new token with the required scopes (at minimum `data.records:write` for creating records).
4. Copy the generated token.
5. Find your **Base ID** — open the base in Airtable, go to **Help → API documentation**. The base ID starts with `app` and is shown in the URL and API docs.
6. In Orchesty, open the Airtable application settings and fill in:
   - **API Key** — paste your personal access token
   - **Base id** — paste your base ID (e.g. `appXXXXXXXXXXXXXX`)
   - **Table name** — enter the exact name of the table (e.g. `Contacts`)

### API Documentation

Airtable API Reference: [https://airtable.com/developers/web/api/introduction](https://airtable.com/developers/web/api/introduction)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-airtable @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-airtable @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import AirtableApplication from '@orchesty/connector-airtable/dist/AirtableApplication';
import AirtableNewRecordConnector from '@orchesty/connector-airtable/dist/Connector/AirtableNewRecordConnector';

const airtableApp = new AirtableApplication();
container.setApplication(airtableApp);
container.setNode(new AirtableNewRecordConnector(), airtableApp);
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
