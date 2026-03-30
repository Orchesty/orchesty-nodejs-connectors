# QuickBooks Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-quick-books?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-quick-books)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for QuickBooks Online, Intuit's cloud-based accounting software for small and medium-sized businesses.

## Application Type

**OAuth 2.0**

This connector uses the Intuit OAuth 2.0 authorization flow. After entering your credentials in Orchesty, you will be redirected to Intuit to authorize access. Both sandbox and production environments are supported. When the application is uninstalled, the OAuth refresh token is automatically revoked.

| Field | Description |
|---|---|
| `client_id` | Client ID from the Intuit Developer Portal |
| `client_secret` | Client Secret from the Intuit Developer Portal |
| `environment` | `sandbox` or `production` |

## Components

| Class | Type | Description |
|---|---|---|
| `QuickBooksCreateCustomerConnector` | Connector | Creates a new customer via `POST /customer` |
| `QuickBooksCreateInvoiceConnector` | Connector | Creates a new invoice via `POST /invoice` |
| `QuickBooksCreateItemConnector` | Connector | Creates a new inventory/service item via `POST /item` |
| `QuickBooksUpdateItemConnector` | Connector | Updates an existing item via `POST /item` |
| `QuickBooksFindCustomerConnector` | Connector | Looks up a customer by display name via `GET /query` |
| `QuickBooksUploadAttachmentConnector` | Connector | Uploads a file as a multipart attachment via `POST /upload` |
| `QuickBooksGetDepartmentsBatch` | Batch | Fetches all departments (up to 1000) via `GET /query` |
| `QuickBooksGetTaxRatesBatch` | Batch | Fetches all tax rates (up to 1000) via `GET /query` |

## Setup

### Credentials

1. Log in to the [Intuit Developer Portal](https://developer.intuit.com/) and create an app.
2. Copy the **Client ID** and **Client Secret** from the **Keys & credentials** section.
3. Add the Orchesty OAuth callback URL to the **Redirect URIs**.
4. In Orchesty, open the QuickBooks application settings, enter the credentials, select the **environment** (`sandbox` for testing, `production` for live use), and complete the OAuth authorization flow.

### API Documentation

QuickBooks Online Accounting API: [https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/account](https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/account)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-quick-books @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-quick-books @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import { OAuth2Provider } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import DatabaseClient from '@orchesty/nodejs-sdk/dist/lib/Storage/Database/Client';
import CurlSender from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/CurlSender';
import QuickBooksApplication from '@orchesty/connector-quick-books/dist/QuickBooksApplication';
import QuickBooksCreateCustomerConnector from '@orchesty/connector-quick-books/dist/Connector/QuickBooksCreateCustomerConnector';
import QuickBooksCreateInvoiceConnector from '@orchesty/connector-quick-books/dist/Connector/QuickBooksCreateInvoiceConnector';
import QuickBooksCreateItemConnector from '@orchesty/connector-quick-books/dist/Connector/QuickBooksCreateItemConnector';
import QuickBooksUpdateItemConnector from '@orchesty/connector-quick-books/dist/Connector/QuickBooksUpdateItemConnector';
import QuickBooksFindCustomerConnector from '@orchesty/connector-quick-books/dist/Connector/QuickBooksFindCustomerConnector';
import QuickBooksUploadAttachmentConnector from '@orchesty/connector-quick-books/dist/Connector/QuickBooksUploadAttachmentConnector';
import QuickBooksGetDepartmentsBatch from '@orchesty/connector-quick-books/dist/Batch/QuickBooksGetDepartmentsBatch';
import QuickBooksGetTaxRatesBatch from '@orchesty/connector-quick-books/dist/Batch/QuickBooksGetTaxRatesBatch';

const app = new QuickBooksApplication(
    container.get(OAuth2Provider),
    container.get(DatabaseClient),
    container.get(CurlSender),
);
container.setApplication(app);
container.setNode(new QuickBooksCreateCustomerConnector(), app);
container.setNode(new QuickBooksCreateInvoiceConnector(), app);
container.setNode(new QuickBooksCreateItemConnector(), app);
container.setNode(new QuickBooksUpdateItemConnector(), app);
container.setNode(new QuickBooksFindCustomerConnector(), app);
container.setNode(new QuickBooksUploadAttachmentConnector(), app);
container.setNode(new QuickBooksGetDepartmentsBatch(), app);
container.setNode(new QuickBooksGetTaxRatesBatch(), app);
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
