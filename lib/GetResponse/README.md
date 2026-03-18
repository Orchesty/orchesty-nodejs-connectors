# GetResponse Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-get-response?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-get-response)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for GetResponse, a comprehensive marketing software platform for creating content, boosting sales, and increasing traffic.

## Application Type

**Basic**

This connector authenticates using an API key sent in the `X-Auth-Token` request header.

| Field | Description |
|---|---|
| `api_key` | Your GetResponse API key |

## Components

| Class | Type | Description |
|---|---|---|
| `GetResponseGetAccountsConnector` | Connector | Fetches the authenticated account's profile details via `GET /accounts` |
| `GetResponseGetContact` | Batch | Paginates through all contacts (100 per page) via `GET /contacts` |

## Setup

### Credentials

1. Log in to your [GetResponse](https://app.getresponse.com) account.
2. Navigate to **Profile → Integrations & API → API**.
3. Copy your **API key**.
4. Paste it into the **Api key** field in Orchesty.

### API Documentation

GetResponse API v3: [https://apidocs.getresponse.com/v3](https://apidocs.getresponse.com/v3)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-get-response @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-get-response @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import GetResponseApplication from '@orchesty/connector-get-response/dist/GetResponseApplication';
import GetResponseGetAccountsConnector from '@orchesty/connector-get-response/dist/Connector/GetResponseGetAccountsConnector';
import GetResponseGetContact from '@orchesty/connector-get-response/dist/Batch/GetResponseGetContact';

const app = new GetResponseApplication();
container.setApplication(app);
container.setNode(new GetResponseGetAccountsConnector(), app);
container.setNode(new GetResponseGetContact(), app);
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
