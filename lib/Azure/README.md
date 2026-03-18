# Azure Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-azure?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-azure)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for Microsoft Azure, currently providing integration with **Power BI** for accessing embedded analytics features.

## Application Type

**OAuth 2.0**

This connector uses the Microsoft identity platform OAuth 2.0 flow (`https://login.microsoftonline.com/common/oauth2/v2.0/authorize`). Requests are made through the Azure SDK — direct HTTP requests are not supported.

| Field | Description |
|---|---|
| `tenantId` | Azure Active Directory tenant ID |
| `clientId` | Azure AD application (client) ID |
| `secret` | Azure AD application client secret |
| `subscriptionId` | Azure subscription ID |
| `organization` | Power BI organization name (used as URL prefix, e.g. `myorg`) |

## Components

| Class | Type | Description |
|---|---|---|
| `PowerBiGetAvailableFeatures` | Connector | Fetches available Power BI features for the configured organization via `GET /availableFeatures` |

## Setup

### Credentials

1. Log in to the [Azure Portal](https://portal.azure.com).
2. Navigate to **Azure Active Directory → App registrations** and register a new application.
3. Note the **Tenant ID** (Directory ID) and **Application (client) ID**.
4. Under **Certificates & secrets**, create a new client secret and copy the value.
5. Note your **Subscription ID** from the Azure subscription overview.
6. In the Power BI admin portal, enable the service principal to use Power BI APIs.
7. In Orchesty, open the Azure application settings and fill in all fields.

### API Documentation

Power BI REST API Reference: [https://learn.microsoft.com/en-us/rest/api/power-bi/](https://learn.microsoft.com/en-us/rest/api/power-bi/)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-azure @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-azure @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import { OAuth2Provider } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import PowerBiApplication from '@orchesty/connector-azure/dist/PowerBi/PowerBiApplication';
import PowerBiGetAvailableFeatures from '@orchesty/connector-azure/dist/PowerBi/Connector/PowerBiGetAvailableFeatures';

const app = new PowerBiApplication(container.get(OAuth2Provider));
container.setApplication(app);
container.setNode(new PowerBiGetAvailableFeatures(), app);
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
