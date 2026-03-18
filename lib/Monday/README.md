# Monday Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-monday?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-monday)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for monday.com, a customizable work management platform designed to help teams track projects, visualize data, and collaborate efficiently.

## Application Type

**Basic**

This connector authenticates using a personal API token sent directly in the `Authorization` header. All requests are made to the monday.com GraphQL API endpoint (`https://api.monday.com/v2`).

| Field | Description |
|---|---|
| `api_key` | Your monday.com personal API token |

## Components

| Class | Type | Description |
|---|---|---|
| `MondayCreateBoardConnector` | Connector | Creates a new board via a `create_board` GraphQL mutation |
| `MondayCreateGroupConnector` | Connector | Creates a new group within an existing board via a `create_group` GraphQL mutation |
| `MondayCreateItemConnector` | Connector | Creates a new item in a board via a `create_item` GraphQL mutation |

## Setup

### Credentials

1. Log in to [monday.com](https://monday.com/).
2. Click on your avatar in the top-right corner and go to **Developers → My Access Tokens**.
3. Copy your personal **API token**.
4. In Orchesty, open the Monday application settings and paste the token into the **API key** field.

### API Documentation

monday.com API Reference: [https://developer.monday.com/api-reference/](https://developer.monday.com/api-reference/)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-monday @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-monday @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import MondayApplication from '@orchesty/connector-monday/dist/MondayApplication';
import MondayCreateBoardConnector from '@orchesty/connector-monday/dist/Connector/MondayCreateBoardConnector';
import MondayCreateGroupConnector from '@orchesty/connector-monday/dist/Connector/MondayCreateGroupConnector';
import MondayCreateItemConnector from '@orchesty/connector-monday/dist/Connector/MondayCreateItemConnector';

const app = new MondayApplication();
container.setApplication(app);
container.setNode(new MondayCreateBoardConnector(), app);
container.setNode(new MondayCreateGroupConnector(), app);
container.setNode(new MondayCreateItemConnector(), app);
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
