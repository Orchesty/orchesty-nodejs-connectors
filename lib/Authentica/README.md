# Authentica Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-authentica?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-authentica)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for Authentica Fulfillment, a simple solution for outsourcing logistics that connects your e-commerce or accounting solution for automated order processing.

## Application Type

**Basic (client credentials)**

This connector authenticates using a Client ID and Client Secret. An access token is fetched automatically via the `POST /token` endpoint using the OAuth 2.0 client credentials flow and cached for its lifetime.

| Field | Description |
|---|---|
| `client_id` | Your Authentica API client ID |
| `client_secret` | Your Authentica API client secret |
| `Shop ID` | Optional shop identifier (used as URL prefix for shop-scoped endpoints) |

## Components

| Class | Type | Description |
|---|---|---|
| `AuthenticaCreateOrder` | Connector | Creates a new fulfillment order via `POST /shop/{shopId}/order` |
| `AuthenticaCreateProduct` | Connector | Creates a new product via `POST /shop/{shopId}/product` |
| `AuthenticaCreateReceipt` | Connector | Creates a new inbound stock receipt via `POST /shop/{shopId}/receipt` |
| `AuthenticaGetCarriersConnector` | Connector | Retrieves available carriers via `GET /shop/{shopId}/carrier` |
| `AuthenticaGetOrder` | Connector | Fetches a single order by ID via `GET /shop/{shopId}/order/{id}` |
| `AuthenticaGetOrderStatus` | Connector | Fetches available order statuses via `GET /applinth/order-statuses` |
| `AuthenticaGetReceipt` | Connector | Fetches a single receipt by ID via `GET /shop/{shopId}/receipt/{id}` |
| `AuthenticaGetShippingMethods` | Connector | Fetches available delivery methods via `GET /applinth/delivery-methods` |
| `AuthenticaPostLabel` | Connector | Posts a shipping label (print code + base64 data) via `POST /applinth/label` |
| `AuthenticaPutOrders` | Connector | Bulk upserts orders via `PUT /applinth/orders` |
| `AuthenticaPutProducts` | Connector | Bulk upserts products via `PUT /applinth/products` |
| `AuthenticaUpdateOrder` | Connector | Updates an existing order via `PUT /shop/{shopId}/order/{id}` |
| `AuthenticaUpdateProduct` | Connector | Updates an existing product via `PUT /shop/{shopId}/product/{id}` |
| `AuthenticaUpdateReceipt` | Connector | Updates an existing receipt via `PUT /shop/{shopId}/receipt/{id}` |
| `AuthenticaGetStock` | Batch | Paginates through stock movement events via `GET /applinth/stock` (50 per page) |
| `AuthenticaGetStockAvailable` | Batch | Paginates through available stock per SKU via `GET /applinth/stock/available` (100 per page) |

## Setup

### Credentials

Contact Authentica support or your account manager to obtain your API **Client ID** and **Client Secret**. API access is available to Authentica customers — documentation and credentials are provided directly by Authentica.

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-authentica @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-authentica @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import CacheService from '@orchesty/nodejs-sdk/dist/lib/Cache/CacheService';
import AuthenticaApplication from '@orchesty/connector-authentica/dist/AuthenticaApplication';
import AuthenticaCreateOrder from '@orchesty/connector-authentica/dist/Connector/AuthenticaCreateOrder';
import AuthenticaCreateProduct from '@orchesty/connector-authentica/dist/Connector/AuthenticaCreateProduct';
import AuthenticaGetOrder from '@orchesty/connector-authentica/dist/Connector/AuthenticaGetOrder';
import AuthenticaGetStock from '@orchesty/connector-authentica/dist/Batch/AuthenticaGetStock';
import AuthenticaGetStockAvailable from '@orchesty/connector-authentica/dist/Batch/AuthenticaGetStockAvailable';
// ... import remaining nodes as needed

const app = new AuthenticaApplication(container.get(CacheService));
container.setApplication(app);
container.setNode(new AuthenticaCreateOrder(), app);
container.setNode(new AuthenticaCreateProduct(), app);
container.setNode(new AuthenticaGetOrder(), app);
container.setNode(new AuthenticaGetStock(), app);
container.setNode(new AuthenticaGetStockAvailable(), app);
```

> **Note:** `AuthenticaApplication` requires a `CacheService` instance. This is provided automatically by the Orchesty SDK DI container.

## License

This connector is released under the **Apache License 2.0**. See the [LICENSE](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE) file for the full license text.

## Contributing

Contributions are welcome! This connector is part of the open-source [Orchesty Node.js Connectors](https://github.com/Orchesty/orchesty-nodejs-connectors) monorepo.

For guidelines on how to create or update connectors — including project setup, coding conventions, and how to write tests — please refer to the **[Contributing to Connectors](https://orchesty.io/community/contributing-to-connectors)** guide.

All contributions should include:
- Source code in `src/` following the existing connector structure
- Tests in `src/**/__tests__/` with `input.json`, `mock.json`, and `output.json` fixtures
- An updated `CHANGELOG.md` entry
