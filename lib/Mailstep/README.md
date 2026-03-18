# Mailstep Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-mailstep?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-mailstep)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for Mailstep (Mailship), a professional fulfilment service providing warehousing, order management, and shipping for e-commerce merchants.

## Application Type

**Basic**

This connector authenticates using a username and password. A Bearer token is obtained automatically via the Mailship login endpoint (`POST /api/login/user`) and cached using `CacheService` to minimize authentication requests. The application requires a `CacheService` instance to be injected via its constructor.

| Field | Description |
|---|---|
| `user` | Your Mailship account username |
| `password` | Your Mailship account password |
| `eshop_id` | ID of your e-shop in the Mailship system |

## Components

| Class | Type | Description |
|---|---|---|
| `MailstepGetExpeditionConnector` | Connector | Fetches a single expedition (order) by ID via `GET /expedition/{id}` |
| `MailstepGetProductStockConnector` | Connector | Fetches stock levels for a single product-warehouse combination via `GET /product-stock/{id}` |
| `MailstepGetStockAdviceConnector` | Connector | Fetches a single inbound stock advice by ID via `GET /stock-advice/{id}` |
| `MailstepGetSupplierConnector` | Connector | Fetches a single supplier by ID via `GET /supplier/{id}` |
| `MailstepPostExpeditionConnector` | Connector | Creates a new expedition (order) via `POST /expedition` |
| `MailstepPostProductConnector` | Connector | Creates a new product via `POST /product` |
| `MailstepPutExpeditionConnector` | Connector | Updates an existing expedition by ID via `PUT /expedition/{id}` |
| `MailstepPutProductConnector` | Connector | Updates an existing product by ID via `PUT /product/{id}` |
| `MailstepSendExpeditionConnector` | Connector | Dispatches an expedition for fulfilment via `PUT /expedition/{id}/send` |
| `MailstepGetCarrierListBatch` | Batch | Paginates through all carriers via `POST /carrier/list` |
| `MailstepGetCarrierServiceListBatch` | Batch | Paginates through all carrier services via `POST /carrier-service/list` |
| `MailstepGetEshopListBatch` | Batch | Paginates through all e-shops via `POST /eshop/list` |
| `MailstepGetExpeditionListBatch` | Batch | Paginates through expeditions filtered by e-shop via `POST /expedition/list` |
| `MailstepGetInboundReceiptListBatch` | Batch | Paginates through inbound receipts via `POST /inbound-receipt/list` |
| `MailstepGetOutboundReceiptListBatch` | Batch | Paginates through outbound receipts via `POST /outbound-receipt/list` |
| `MailstepGetProductListBatch` | Batch | Paginates through products filtered by e-shop via `POST /product/list` |
| `MailstepGetProductStockListBatch` | Batch | Paginates through product stock levels via `POST /product-stock/list` |
| `MailstepGetStockMovementListBatch` | Batch | Paginates through stock movements via `POST /stock-movement/list` |
| `MailstepGetWarehouseListBatch` | Batch | Paginates through all warehouses via `POST /warehouse/list` |
| `MailstepGetWmsListBatch` | Batch | Paginates through all WMS systems via `POST /wms/list` |
| `MailstepSubscribeWebhooksBatch` | Batch | Registers webhook subscriptions for the configured e-shop via `POST /eshop-webhook` |
| `MailstepUnsubscribeWebhooksBatch` | Batch | Removes registered webhook subscriptions via `DELETE /eshop-webhook/{webhookId}` |

## Setup

### Credentials

1. Contact the [Mailstep / Mailship](https://www.mailship.eu) onboarding team to create an account.
2. Once your account is active, obtain your login credentials (username and password).
3. Find your **E-shop ID** in the Mailship partner portal.
4. In Orchesty, open the Mailstep application settings and fill in the **User**, **Password**, and **Eshop ID** fields.

### API Documentation

Mailship Developer Portal: [https://developer.mailship.com/dev/](https://developer.mailship.com/dev/)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-mailstep @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-mailstep @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container. The `MailstepApplication` requires a `CacheService` instance:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import CacheService from '@orchesty/nodejs-sdk/dist/lib/Cache/CacheService';
import MailstepApplication from '@orchesty/connector-mailstep/dist/MailstepApplication';
import MailstepPostExpeditionConnector from '@orchesty/connector-mailstep/dist/Connector/MailstepPostExpeditionConnector';
import MailstepGetExpeditionListBatch from '@orchesty/connector-mailstep/dist/Batch/MailstepGetExpeditionListBatch';

const app = new MailstepApplication(container.get(CacheService));
container.setApplication(app);
container.setNode(new MailstepPostExpeditionConnector(), app);
container.setNode(new MailstepGetExpeditionListBatch(), app);
// Register additional nodes as needed
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
