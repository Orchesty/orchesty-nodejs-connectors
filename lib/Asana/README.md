# Asana Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-asana?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-asana)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for Asana, a collaborative information manager for workspace that helps you organize people and tasks effectively.

## Application Type

**OAuth 2.0**

This connector uses the OAuth 2.0 authorization code flow. After entering your Client ID and Client Secret in Orchesty, you will be redirected to Asana to authorize access.

| Field | Description |
|---|---|
| `client_id` | OAuth application Client ID from the Asana Developer Console |
| `client_secret` | OAuth application Client Secret from the Asana Developer Console |

## Components

| Class | Type | Description |
|---|---|---|
| `AsanaCreateTaskConnector` | Connector | Creates a new task via `POST /api/1.0/tasks` |

## Setup

### Credentials

1. Open the [Asana Developer Console](https://app.asana.com/0/developer-console).
2. Create a new application and note the **Client ID** and **Client Secret**.
3. Set the **Redirect URI** in your app settings to the OAuth callback URL provided by Orchesty.
4. In Orchesty, open the Asana application settings and fill in:
   - **Client Id** — paste your Client ID
   - **Client Secret** — paste your Client Secret
5. Complete the OAuth authorization flow by clicking **Authorize** in Orchesty.

### API Documentation

Asana REST API Reference: [https://developers.asana.com/reference](https://developers.asana.com/reference)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-asana @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-asana @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import { OAuth2Provider } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import AsanaApplication from '@orchesty/connector-asana/dist/AsanaApplication';
import AsanaCreateTaskConnector from '@orchesty/connector-asana/dist/Connector/AsanaCreateTaskConnector';

const app = new AsanaApplication(container.get(OAuth2Provider));
container.setApplication(app);
container.setNode(new AsanaCreateTaskConnector(), app);
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
