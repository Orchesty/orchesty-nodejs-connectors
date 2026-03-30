# ClickUp Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-clickup?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-clickup)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for ClickUp, a cloud-based collaboration and project management tool suitable for businesses of all sizes and industries.

## Application Type

**Basic**

This connector authenticates using a personal API token sent in the `Authorization` header.

| Field | Description |
|---|---|
| `token` | Your ClickUp personal API token |

## Components

| Class | Type | Description |
|---|---|---|
| `ClickupCreateSpaceConnector` | Connector | Creates a new Space in a team via `POST /team/{teamId}/space` |
| `ClickupCreateTaskConnector` | Connector | Creates a new Task in a list via `POST /list/{listId}/task` |
| `ClickupGetUserConnector` | Connector | Retrieves a team member by ID via `GET /team/{teamId}/user/{userId}` |

## Setup

### Credentials

1. Log in to your ClickUp account.
2. Navigate to **Settings → Apps**.
3. Under **API Token**, generate or copy your personal API token.
4. In Orchesty, open the ClickUp application settings and paste the token into the **api_key** field.

### API Documentation

ClickUp API: [https://clickup.com/api/](https://clickup.com/api/)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-clickup @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-clickup @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import ClickupApplication from '@orchesty/connector-clickup/dist/ClickupApplication';
import ClickupCreateSpaceConnector from '@orchesty/connector-clickup/dist/Connector/ClickupCreateSpaceConnector';
import ClickupCreateTaskConnector from '@orchesty/connector-clickup/dist/Connector/ClickupCreateTaskConnector';
import ClickupGetUserConnector from '@orchesty/connector-clickup/dist/Connector/ClickupGetUserConnector';

const app = new ClickupApplication();
container.setApplication(app);
container.setNode(new ClickupCreateSpaceConnector(), app);
container.setNode(new ClickupCreateTaskConnector(), app);
container.setNode(new ClickupGetUserConnector(), app);
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
