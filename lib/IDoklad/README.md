# iDoklad Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-idoklad?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-idoklad)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for iDoklad, a web service for managing and issuing invoices.

## Application Type

**OAuth 2.0**

This connector uses the iDoklad OAuth 2.0 authorization flow with `idoklad_api` and `offline_access` scopes. After entering your credentials in Orchesty, you will be redirected to iDoklad to authorize access.

| Field | Description |
|---|---|
| `client_id` | OAuth Client ID from the iDoklad developer portal |
| `client_secret` | OAuth Client Secret from the iDoklad developer portal |

## Components

| Class | Type | Description |
|---|---|---|
| `IDokladCreateNewContactConnector` | Connector | Creates a new contact via `POST /v3/Contacts` |
| `IDokladNewInvoiceReceivedConnector` | Connector | Creates a new received invoice via `POST /v3/ReceivedInvoices` |

## Setup

### Credentials

1. Log in to the [iDoklad](https://app.idoklad.cz) portal.
2. Navigate to **Settings → API** and register your application to obtain a **Client ID** and **Client Secret**.
3. Add the Orchesty OAuth callback URL to the authorized redirect URIs.
4. In Orchesty, open the iDoklad application settings, enter the credentials, and complete the OAuth authorization flow.

### API Documentation

iDoklad API Reference: [https://api.idoklad.cz/Help/v3/en](https://api.idoklad.cz/Help/v3/en)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-idoklad @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-idoklad @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import { OAuth2Provider } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import IDokladApplication from '@orchesty/connector-idoklad/dist/IDokladApplication';
import IDokladCreateNewContactConnector from '@orchesty/connector-idoklad/dist/Connector/IDokladCreateNewContactConnector';
import IDokladNewInvoiceReceivedConnector from '@orchesty/connector-idoklad/dist/Connector/IDokladNewInvoiceReceivedConnector';

const app = new IDokladApplication(container.get(OAuth2Provider));
container.setApplication(app);
container.setNode(new IDokladCreateNewContactConnector(), app);
container.setNode(new IDokladNewInvoiceReceivedConnector(), app);
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
