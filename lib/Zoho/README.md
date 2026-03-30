# Zoho Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-zoho?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-zoho)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for Zoho Creator, a low-code application platform for managing form submissions and report data in custom Zoho apps.

## Application Type

**OAuth 2.0**

This connector uses the Zoho OAuth 2.0 authorization flow via `https://accounts.zoho.eu/oauth/v2/auth`. The API domain is determined from the token response and used to build all request URLs. Requests use a `Zoho-oauthtoken {access_token}` authorization header.

| Field (Authorization) | Description |
|---|---|
| `client_id` | Your Zoho app Client ID |
| `client_secret` | Your Zoho app Client Secret |

| Field (Creator Settings) | Description |
|---|---|
| `account_owner_name` | Zoho Creator account owner name |
| `app_link_name` | Link name of the Zoho Creator application |
| `form_link_name` | Link name of the form within the app |
| `report_link_name` | Link name of the report within the app |

## Components

| Class | Type | Description |
|---|---|---|
| `ZohoAddRecordsConnector` | Connector | Adds a record to a Zoho Creator form via `POST /{accountOwnerName}/{appLink}/form/{formLink}` |
| `ZohoGetRecordsConnector` | Connector | Fetches a single record from a Zoho Creator report via `GET /{accountOwnerName}/{appLink}/report/{reportLink}/{recordId}` |

## Setup

### Credentials

1. Log in to the [Zoho API Console](https://api-console.zoho.eu/) and create a new **Self Client** or **Web-based application**.
2. Copy the **Client ID** and **Client Secret**.
3. Add the Orchesty redirect URL to the **Authorized Redirect URIs** list.
4. In Orchesty, open the Zoho application settings, enter both values, and complete the OAuth authorization flow.
5. After authorization, fill in the **Creator Settings** form with your application and form/report link names from your Zoho Creator app.

### API Documentation

Zoho Creator API v2: [https://www.zoho.com/creator/help/api/v2/](https://www.zoho.com/creator/help/api/v2/)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-zoho @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-zoho @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import { OAuth2Provider } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import ZohoApplication from '@orchesty/connector-zoho/dist/ZohoApplication';
import ZohoAddRecordsConnector from '@orchesty/connector-zoho/dist/Connector/ZohoAddRecordsConnector';
import ZohoGetRecordsConnector from '@orchesty/connector-zoho/dist/Connector/ZohoGetRecordsConnector';

const app = new ZohoApplication(container.get(OAuth2Provider));
container.setApplication(app);
container.setNode(new ZohoAddRecordsConnector(), app);
container.setNode(new ZohoGetRecordsConnector(), app);
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
