# Tableau Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-tableau?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-tableau)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for Tableau, a leading data visualization and analytics platform for business intelligence and interactive dashboards.

## Application Type

**Basic**

This connector uses Tableau's Personal Access Token (PAT) authentication. The token is automatically fetched via `POST /auth/signin` and cached with a 14-day expiry. All requests use the `X-Tableau-Auth` header.

> **Note:** `TableauApplication` requires `CurlSender` and `DatabaseClient` in its constructor for token caching.

| Field | Description |
|---|---|
| `prefix_site` | Your Tableau Online site prefix (e.g. `mycompany` from `mycompany.online.tableau.com`) |
| `token_name` | Your Tableau Personal Access Token name |
| `token` | Your Tableau Personal Access Token value |
| `content_url` | Your Tableau site content URL (site ID string, often the same as the prefix) |

## Components

| Class | Type | Description |
|---|---|---|
| `TableauCreateConnectedAppConnector` | Connector | Creates a connected application for the site via `POST /sites/{siteId}/connected-applications` |
| `TableauGetConnectedAppConnector` | Connector | Retrieves connected applications for the site via `GET /sites/{siteId}/connected-applications` |

## Setup

### Credentials

1. Log in to your [Tableau Online](https://online.tableau.com/) account.
2. Navigate to **Account → Personal Access Tokens** and create a new token.
3. Note the **token name** and copy the **token value** (it will not be shown again).
4. Your **site prefix** is the subdomain of your Tableau Online URL (e.g. `mycompany` from `mycompany.online.tableau.com`).
5. In Orchesty, open the Tableau application settings and fill in all four fields.

### API Documentation

Tableau REST API: [https://help.tableau.com/current/api/rest_api/en-us/REST/rest_api.htm](https://help.tableau.com/current/api/rest_api/en-us/REST/rest_api.htm)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-tableau @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-tableau @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import CurlSender from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/CurlSender';
import DatabaseClient from '@orchesty/nodejs-sdk/dist/lib/Storage/Database/Client';
import TableauApplication from '@orchesty/connector-tableau/dist/TableauApplication';
import TableauCreateConnectedAppConnector from '@orchesty/connector-tableau/dist/Connector/TableauCreateConnectedAppConnector';
import TableauGetConnectedAppConnector from '@orchesty/connector-tableau/dist/Connector/TableauGetConnectedAppConnector';

const app = new TableauApplication(container.get(CurlSender), container.get(DatabaseClient));
container.setApplication(app);
container.setNode(new TableauCreateConnectedAppConnector(), app);
container.setNode(new TableauGetConnectedAppConnector(), app);
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
