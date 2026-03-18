# Box Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-box?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-box)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for Box, a cloud content management platform that keeps all your business files in one place for simple online collaboration.

## Application Type

**OAuth 2.0**

This connector uses the Box OAuth 2.0 authorization flow. After entering your credentials in Orchesty, you will be redirected to Box to authorize access.

| Field | Description |
|---|---|
| `client_id` | OAuth application Client ID from the Box Developer Console |
| `client_secret` | OAuth application Client Secret from the Box Developer Console |

## Components

| Class | Type | Description |
|---|---|---|
| `BoxGetCollaborationConnector` | Connector | Retrieves a single collaboration by ID via `GET /collaborations/{collaboration_id}` |
| `BoxGetUserConnector` | Connector | Retrieves a single user by ID via `GET /users/{user_id}` |
| `BoxListTasksBatch` | Batch | Lists all tasks assigned to a file via `GET /files/{file_id}/tasks` |

## Setup

### Credentials

1. Log in to the [Box Developer Console](https://app.box.com/developers/console).
2. Create a new application and select the **OAuth 2.0** authentication method.
3. Note the **Client ID** and **Client Secret** from the configuration tab.
4. Set the **Redirect URI** to the OAuth callback URL provided by Orchesty.
5. In Orchesty, open the Box application settings and fill in:
   - **Client Id** — paste your Client ID
   - **Client Secret** — paste your Client Secret
6. Complete the OAuth authorization flow by clicking **Authorize** in Orchesty.

### API Documentation

Box API Reference: [https://developer.box.com/reference](https://developer.box.com/reference)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-box @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-box @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import { OAuth2Provider } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import BoxApplication from '@orchesty/connector-box/dist/BoxApplication';
import BoxGetCollaborationConnector from '@orchesty/connector-box/dist/Connector/BoxGetCollaborationConnector';
import BoxGetUserConnector from '@orchesty/connector-box/dist/Connector/BoxGetUserConnector';
import BoxListTasksBatch from '@orchesty/connector-box/dist/Batch/BoxListTasksBatch';

const app = new BoxApplication(container.get(OAuth2Provider));
container.setApplication(app);
container.setNode(new BoxGetCollaborationConnector(), app);
container.setNode(new BoxGetUserConnector(), app);
container.setNode(new BoxListTasksBatch(), app);
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
