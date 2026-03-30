# Trello Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-trello?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-trello)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for Trello, a visual project management tool for organizing tasks on boards, lists, and cards.

## Application Type

**Basic**

This connector authenticates by appending the API key and token as query parameters (`?key={apiKey}&token={token}`) to every request.

| Field | Description |
|---|---|
| `token` | Your Trello API token (Bot token) |
| `apiKey` | Your Trello API key |

## Components

| Class | Type | Description |
|---|---|---|
| `TrelloCreateCardConnector` | Connector | Creates a new card on a Trello list via `POST /1/cards`; requires `idList`, `name`, and `desc` in the input payload |

## Setup

### Credentials

1. Log in to [Trello](https://trello.com/) and navigate to the [Trello Developer Portal](https://developer.atlassian.com/cloud/trello/).
2. Go to **Power-Up Admin Portal** (or use [https://trello.com/power-ups/admin](https://trello.com/power-ups/admin)) to create a new Power-Up and obtain your **API key**.
3. Generate a token by following the link on the API key page (replacing `{your_api_key}` with your actual key):
   `https://trello.com/1/authorize?expiration=never&scope=read,write&response_type=token&key={your_api_key}`
4. In Orchesty, open the Trello application settings and enter both values.

### API Documentation

Trello REST API: [https://developer.atlassian.com/cloud/trello/rest/api-group-cards/](https://developer.atlassian.com/cloud/trello/rest/api-group-cards/)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-trello @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-trello @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import TrelloApplication from '@orchesty/connector-trello/dist/TrelloApplication';
import TrelloCreateCardConnector from '@orchesty/connector-trello/dist/Connector/TrelloCreateCardConnector';

const app = new TrelloApplication();
container.setApplication(app);
container.setNode(new TrelloCreateCardConnector(), app);
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
