# Shoptet Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-shoptet?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-shoptet)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for Shoptet, the largest Czech e-commerce platform for building and managing online stores.

This package contains **two application variants**:
- **`PluginShoptetApplication`** — for Shoptet addon developers using the OAuth 2.0 plugin authorization flow.
- **`ShoptetPremiumApplication`** — for Shoptet Premium eshop owners using a private API token for direct access.

## Application Types

### PluginShoptetApplication (OAuth 2.0 Plugin)

Used for building Shoptet addons and partner integrations. Acquires an OAuth 2.0 access code from the Orchesty-hosted Shoptet OAuth server, then exchanges it for a Shoptet API access token on each request.

> This class is abstract. Extend it to implement your specific addon lifecycle (install, uninstall, webhooks).

| Field | Description |
|---|---|
| `client_id` | Shoptet App Client ID |
| `client_secret` | Shoptet App Client Secret |

### ShoptetPremiumApplication (Private API Token)

Used for direct Shoptet Premium eshop access. Sends the `Shoptet-Private-API-Token` header with every request.

| Field | Description |
|---|---|
| `token` | Your Shoptet private API token |

## Components

All components are shared between both application variants.

| Class | Type | Description |
|---|---|---|
| `ShoptetGetAllOrders` | Connector | Triggers an async snapshot job for all orders via `GET /api/orders/snapshot` |
| `ShoptetGetAllProducts` | Connector | Triggers an async snapshot job for all products via `GET /api/products/snapshot` |
| `ShoptetGetEshopInfo` | Connector | Retrieves full eshop info (statuses, currencies, languages) via `GET /api/eshop` |
| `ShoptetGetListOfStocks` | Connector | Retrieves all stocks/warehouses via `GET /api/stocks` |
| `ShoptetGetOrderDetail` | Connector | Retrieves a single order by code via `GET /api/orders/{code}` |
| `ShoptetGetPaymentMethods` | Connector | Retrieves all payment methods via `GET /api/payment-methods` |
| `ShoptetGetProductDetail` | Connector | Retrieves a single product by GUID via `GET /api/products/{guid}` |
| `ShoptetGetShippingMethods` | Connector | Retrieves all shipping methods via `GET /api/shipping-methods` |
| `ShoptetJobFinishedWebhook` | Connector | Handles `job:finished` webhooks; fetches job result and updates timestamps via `GET /api/system/jobs/{eventInstance}` |
| `ShoptetUpdateOrderStatus` | Connector | Updates order status via `PATCH /api/orders/{id}/status` |
| `ShoptetUpdateRemarkForOrder` | Connector | Updates order remark/tracking note via `PATCH /api/orders/{id}/notes` |
| `ShoptetUpdateStockMovements` | Connector | Updates stock movements (quantity adjustments) via `PATCH /api/stocks/{stockId}/movements` |
| `ShoptetGetOrderChangesList` | Batch | Paginates incremental order changes since last run via `GET /api/orders/changes` (1000 per page) |
| `ShoptetGetOrdersList` | Batch | Paginates all orders via `GET /api/orders` (1000 per page) |
| `ShoptetGetProductChangesList` | Batch | Paginates incremental product changes since last run via `GET /api/products/changes` (1000 per page) |
| `ShoptetGetProductsList` | Batch | Paginates all products via `GET /api/products` (1000 per page) |
| `ShoptetProductDetailWithSet` | Batch | Enriches order items with product-set details via `GET /api/products/{guid}?include=setItems` |
| `ShoptetSubscribeWebhooks` | Batch | Registers webhook subscriptions via `POST /api/webhooks` |
| `ShoptetUnsubscribeWebhooks` | Batch | Deletes registered webhooks via `DELETE /api/webhooks/{id}` |

## Setup

### Credentials (Premium / Direct Access)

1. Log in to your [Shoptet Premium](https://www.shoptet.cz/) admin.
2. Navigate to **Administration → API** and copy your **Private API Token**.
3. In Orchesty, open the Shoptet Premium application settings and paste the token.

### Credentials (Plugin / OAuth)

1. Register as a [Shoptet Partner](https://www.shoptet.cz/partneri/) and create a Shoptet addon.
2. Obtain your **Client ID** and **Client Secret** from the Shoptet partner portal.
3. Use these in the `PluginShoptetApplication` authorization form in Orchesty.

### API Documentation

Shoptet API: [https://api.docs.shoptet.com/](https://api.docs.shoptet.com/)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-shoptet @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-shoptet @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import ShoptetPremiumApplication from '@orchesty/connector-shoptet/dist/ShoptetPremiumApplication';
import ShoptetGetAllOrders from '@orchesty/connector-shoptet/dist/Connector/ShoptetGetAllOrders';
import ShoptetGetOrderDetail from '@orchesty/connector-shoptet/dist/Connector/ShoptetGetOrderDetail';
import ShoptetGetProductDetail from '@orchesty/connector-shoptet/dist/Connector/ShoptetGetProductDetail';
import ShoptetUpdateOrderStatus from '@orchesty/connector-shoptet/dist/Connector/ShoptetUpdateOrderStatus';
import ShoptetUpdateStockMovements from '@orchesty/connector-shoptet/dist/Connector/ShoptetUpdateStockMovements';
import ShoptetGetOrdersList from '@orchesty/connector-shoptet/dist/Batch/ShoptetGetOrdersList';
import ShoptetGetProductsList from '@orchesty/connector-shoptet/dist/Batch/ShoptetGetProductsList';
import ShoptetGetOrderChangesList from '@orchesty/connector-shoptet/dist/Batch/ShoptetGetOrderChangesList';
import ShoptetSubscribeWebhooks from '@orchesty/connector-shoptet/dist/Batch/ShoptetSubscribeWebhooks';
import ShoptetUnsubscribeWebhooks from '@orchesty/connector-shoptet/dist/Batch/ShoptetUnsubscribeWebhooks';

const app = new ShoptetPremiumApplication();
container.setApplication(app);
container.setNode(new ShoptetGetAllOrders(), app);
container.setNode(new ShoptetGetOrderDetail(), app);
container.setNode(new ShoptetGetProductDetail(), app);
container.setNode(new ShoptetUpdateOrderStatus(), app);
container.setNode(new ShoptetUpdateStockMovements(), app);
container.setNode(new ShoptetGetOrdersList(), app);
container.setNode(new ShoptetGetProductsList(), app);
container.setNode(new ShoptetGetOrderChangesList(), app);
container.setNode(new ShoptetSubscribeWebhooks(), app);
container.setNode(new ShoptetUnsubscribeWebhooks(), app);
// ... register remaining connectors and batches similarly
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
