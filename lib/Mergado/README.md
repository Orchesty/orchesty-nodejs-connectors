# Mergado Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-mergado?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-mergado)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for Mergado, a platform that helps e-shops automate the flow of product data to search engines and advertising systems such as Google Shopping, Heureka, and Zboží.

## Application Type

**OAuth 2.0**

This connector uses the Mergado OAuth 2.0 authorization code flow. After entering your credentials in Orchesty, you will be redirected to Mergado to authorize access.

| Field | Description |
|---|---|
| `client_id` | OAuth Client ID from the Mergado Developers Center |
| `client_secret` | OAuth Client Secret from the Mergado Developers Center |

## Components

| Class | Type | Description |
|---|---|---|
| `MergadoGetUserConnector` | Connector | Fetches details of a Mergado user by ID via `GET /users/{id}/` |
| `MergadoGetProjectConnector` | Connector | Fetches details of a Mergado project by ID via `GET /projects/{id}/` |
| `MergadoCreateElementConnector` | Connector | Creates a new element in a project via `POST /projects/{id}/elements` |
| `MergadoListAppsBatch` | Batch | Paginates through all Mergado apps (99 per page) via `GET /apps/` |

## Setup

### Credentials

1. Register or log in at the [Mergado Developers Center](https://developers.mergado.com/).
2. Create a new application to obtain a **Client ID** and **Client Secret**.
3. Add the Orchesty OAuth callback URL as an allowed redirect URI.
4. In Orchesty, open the Mergado application settings, enter the credentials, and complete the OAuth authorization flow.

### API Documentation

Mergado Apps API: [https://mergado.github.io/docs/](https://mergado.github.io/docs/)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-mergado @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-mergado @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import { OAuth2Provider } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import MergadoApplication from '@orchesty/connector-mergado/dist/MergadoApplication';
import MergadoGetUserConnector from '@orchesty/connector-mergado/dist/Connector/MergadoGetUserConnector';
import MergadoGetProjectConnector from '@orchesty/connector-mergado/dist/Connector/MergadoGetProjectConnector';
import MergadoCreateElementConnector from '@orchesty/connector-mergado/dist/Connector/MergadoCreateElementConnector';
import MergadoListAppsBatch from '@orchesty/connector-mergado/dist/Batch/MergadoListAppsBatch';

const app = new MergadoApplication(container.get(OAuth2Provider));
container.setApplication(app);
container.setNode(new MergadoGetUserConnector(), app);
container.setNode(new MergadoGetProjectConnector(), app);
container.setNode(new MergadoCreateElementConnector(), app);
container.setNode(new MergadoListAppsBatch(), app);
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
