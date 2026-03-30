# Marketo Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-marketo?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-marketo)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for Marketo Engage, a marketing automation platform designed to help businesses assess and automate marketing tasks.

## Application Type

**Basic (client credentials)**

This connector uses a Client ID and Client Secret to obtain a Bearer token from the Marketo identity endpoint (`/identity/oauth/token?grant_type=client_credentials`) on each request. The base URL of your Marketo instance is configurable. The application requires a `CurlSender` instance to be injected via its constructor.

| Field | Description |
|---|---|
| `client_id` | Client ID from your Marketo LaunchPoint integration |
| `client_secret` | Client Secret from your Marketo LaunchPoint integration |
| `marketo url` | Base URL of your Marketo instance (e.g. `https://xxx-YYY-zzz.mktorest.com`) |

## Components

| Class | Type | Description |
|---|---|---|
| `MarketoCreateEmailConnector` | Connector | Creates a new email asset via `POST /rest/asset/v1/emails.json` |
| `MarketoGetEmailsBatch` | Batch | Paginates through all Marketo email assets (200 per page) via `GET /rest/asset/v1/emails.json` |
| `MarketoGetFilesBatch` | Batch | Paginates through all Marketo file assets (200 per page) via `GET /rest/asset/v1/files.json` |

## Setup

### Credentials

1. Log in to [Marketo Engage](https://app.marketo.com/) and navigate to **Admin → LaunchPoint**.
2. Create a new service with the type **Custom** and note the **Client ID** and **Client Secret**.
3. Find your instance **base URL** under **Admin → Web Services** (REST API endpoint URL, e.g. `https://xxx-YYY-zzz.mktorest.com`).
4. In Orchesty, open the Marketo application settings and fill in the three fields.

### API Documentation

Adobe Marketo Engage REST API: [https://developer.adobe.com/marketo-apis/](https://developer.adobe.com/marketo-apis/)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-marketo @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-marketo @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container. The `MarketoApplication` requires a `CurlSender` instance:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import CurlSender from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/CurlSender';
import MarketoApplication from '@orchesty/connector-marketo/dist/MarketoApplication';
import MarketoCreateEmailConnector from '@orchesty/connector-marketo/dist/Connector/MarketoCreateEmailConnector';
import MarketoGetEmailsBatch from '@orchesty/connector-marketo/dist/Batch/MarketoGetEmailsBatch';
import MarketoGetFilesBatch from '@orchesty/connector-marketo/dist/Batch/MarketoGetFilesBatch';

const app = new MarketoApplication(container.get(CurlSender));
container.setApplication(app);
container.setNode(new MarketoCreateEmailConnector(), app);
container.setNode(new MarketoGetEmailsBatch(), app);
container.setNode(new MarketoGetFilesBatch(), app);
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
