# Fapi Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-fapi?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-fapi)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for Fapi, a Czech platform for simple online sales — invoicing, orders, and digital product delivery.

## Application Type

**Basic**

This connector authenticates using a username and password encoded as HTTP Basic auth (`user:password` Base64-encoded in the `Authorization` header).

| Field | Description |
|---|---|
| `user` | Your Fapi username |
| `password` | Your Fapi API password |

## Components

| Class | Type | Description |
|---|---|---|
| `FapiGetInvoiceConnector` | Connector | Retrieves a single invoice by ID via `GET /invoices/{id}` |
| `FapiPostInvoiceLabelConnector` | Connector | Assigns labels to an invoice via `POST /invoice-labels/{id}` |
| `FapiGetItemTemplateListBatch` | Batch | Paginated list of item templates via `GET /item_templates` |
| `FapiGetLabelListBatch` | Batch | Paginated list of invoice labels via `GET /labels` |
| `FapiGetProjectListBatch` | Batch | Paginated list of projects via `GET /projects` |
| `FapiGetShippingMethodListBatch` | Batch | Paginated list of shipping methods via `GET /shipping-methods` |
| `FapiSubscribeWebhooksBatch` | Batch | Subscribes webhooks by creating connection entries via `POST /connections` |
| `FapiUnsubscribeWebhooksBatch` | Batch | Unsubscribes webhooks by deleting connection entries via `DELETE /connections/{webhookId}` |

## Setup

### Credentials

1. Log in to your [Fapi](https://www.fapi.cz) account.
2. Navigate to **My Account → API Keys**.
3. Create a new API key (name it after your integration for easy reference).
4. Use your Fapi **username** and the generated **API key as the password** in Orchesty.

### API Documentation

Fapi API Reference: [https://web.fapi.cz/api-doc/](https://web.fapi.cz/api-doc/)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-fapi @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-fapi @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import FapiApplication from '@orchesty/connector-fapi/dist/FapiApplication';
import FapiGetInvoiceConnector from '@orchesty/connector-fapi/dist/Connector/FapiGetInvoiceConnector';
import FapiPostInvoiceLabelConnector from '@orchesty/connector-fapi/dist/Connector/FapiPostInvoiceLabelConnector';
import FapiGetItemTemplateListBatch from '@orchesty/connector-fapi/dist/Batch/FapiGetItemTemplateListBatch';
import FapiGetLabelListBatch from '@orchesty/connector-fapi/dist/Batch/FapiGetLabelListBatch';
import FapiGetProjectListBatch from '@orchesty/connector-fapi/dist/Batch/FapiGetProjectListBatch';
import FapiGetShippingMethodListBatch from '@orchesty/connector-fapi/dist/Batch/FapiGetShippingMethodListBatch';
import FapiSubscribeWebhooksBatch from '@orchesty/connector-fapi/dist/Batch/FapiSubscribeWebhooksBatch';
import FapiUnsubscribeWebhooksBatch from '@orchesty/connector-fapi/dist/Batch/FapiUnsubscribeWebhooksBatch';

const app = new FapiApplication();
container.setApplication(app);
container.setNode(new FapiGetInvoiceConnector(), app);
container.setNode(new FapiPostInvoiceLabelConnector(), app);
container.setNode(new FapiGetItemTemplateListBatch(), app);
container.setNode(new FapiGetLabelListBatch(), app);
container.setNode(new FapiGetProjectListBatch(), app);
container.setNode(new FapiGetShippingMethodListBatch(), app);
container.setNode(new FapiSubscribeWebhooksBatch(), app);
container.setNode(new FapiUnsubscribeWebhooksBatch(), app);
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
