# Xero Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-xero?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-xero)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for Xero, a cloud-based accounting platform for managing invoices, contacts, tax rates, and file attachments.

## Application Type

**OAuth 2.0**

This connector uses the Xero OAuth 2.0 authorization flow. After entering your credentials in Orchesty, you will be redirected to Xero to authorize access. The tenant ID and connection ID are fetched automatically after authorization.

| Field | Description |
|---|---|
| `client_id` | Your Xero app Client ID |
| `client_secret` | Your Xero app Client Secret |

## Components

| Class | Type | Description |
|---|---|---|
| `XeroFindContactConnector` | Connector | Finds a contact by name via `GET /contacts?where=Name="{name}"` |
| `XeroPostContactsConnector` | Connector | Creates a new contact via `POST /contacts` |
| `XeroPostInvoiceConnector` | Connector | Creates a new invoice via `POST /invoices` |
| `XeroPutInvoiceConnector` | Connector | Updates (upserts) an existing invoice via `PUT /invoices` |
| `XeroUploadFile` | Connector | Uploads a base64-encoded file to Xero Files via `POST /files.xro/1.0/Files` |
| `XeroFileAssociation` | Connector | Associates an uploaded file with a Xero object via `POST /files.xro/1.0/Files/{FileId}/Associations` |
| `XeroGetAccountsBatch` | Batch | Lists all accounts via `GET /Accounts` |
| `XeroGetContactsBatch` | Batch | Paginates through contacts (100 per page) via `GET /Contacts?page={page}` |
| `XeroGetTaxRatesBatch` | Batch | Lists all tax rates via `GET /TaxRates` |
| `XeroGetTrackingCategoriesBatch` | Batch | Lists all tracking categories via `GET /TrackingCategories` |

## Setup

### Credentials

1. Log in to [Xero Developer](https://developer.xero.com/) and create a new app.
2. Under **OAuth 2.0 Credentials**, copy the **Client ID** and **Client Secret**.
3. Add the Orchesty redirect URL to the **Redirect URIs** list.
4. In Orchesty, open the Xero application settings, enter both values, and complete the OAuth authorization flow. The Tenant ID will be fetched and stored automatically.

### API Documentation

Xero Accounting API: [https://developer.xero.com/documentation/api/accounting/overview](https://developer.xero.com/documentation/api/accounting/overview)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-xero @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-xero @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import { OAuth2Provider } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import DatabaseClient from '@orchesty/nodejs-sdk/dist/lib/Storage/Database/Client';
import CurlSender from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/CurlSender';
import XeroApplication from '@orchesty/connector-xero/dist/XeroApplication';
import XeroFindContactConnector from '@orchesty/connector-xero/dist/Connector/XeroFindContactConnector';
import XeroPostContactsConnector from '@orchesty/connector-xero/dist/Connector/XeroPostContactsConnector';
import XeroPostInvoiceConnector from '@orchesty/connector-xero/dist/Connector/XeroPostInvoiceConnector';
import XeroPutInvoiceConnector from '@orchesty/connector-xero/dist/Connector/XeroPutInvoiceConnector';
import XeroUploadFile from '@orchesty/connector-xero/dist/Connector/XeroUploadFile';
import XeroFileAssociation from '@orchesty/connector-xero/dist/Connector/XeroFileAssociation';
import XeroGetContactsBatch from '@orchesty/connector-xero/dist/Batch/XeroGetContactsBatch';
import XeroGetAccountsBatch from '@orchesty/connector-xero/dist/Batch/XeroGetAccountsBatch';
import XeroGetTaxRatesBatch from '@orchesty/connector-xero/dist/Batch/XeroGetTaxRatesBatch';
import XeroGetTrackingCategoriesBatch from '@orchesty/connector-xero/dist/Batch/XeroGetTrackingCategoriesBatch';

const app = new XeroApplication(
    container.get(OAuth2Provider),
    container.get(DatabaseClient),
    container.get(CurlSender),
);
container.setApplication(app);
container.setNode(new XeroFindContactConnector(), app);
container.setNode(new XeroPostContactsConnector(), app);
container.setNode(new XeroPostInvoiceConnector(), app);
container.setNode(new XeroPutInvoiceConnector(), app);
container.setNode(new XeroUploadFile(), app);
container.setNode(new XeroFileAssociation(), app);
container.setNode(new XeroGetContactsBatch(), app);
container.setNode(new XeroGetAccountsBatch(), app);
container.setNode(new XeroGetTaxRatesBatch(), app);
container.setNode(new XeroGetTrackingCategoriesBatch(), app);
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
