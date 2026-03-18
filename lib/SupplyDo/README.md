# Supply.Do Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-supplydo?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-supplydo)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for Supply.Do, a warehouse and fulfillment management system for e-commerce order processing and inventory management.

## Application Type

**Basic**

This connector authenticates using a Bearer token sent in the `Authorization` header. The base URL is configurable per instance.

| Field | Description |
|---|---|
| `baseUrl` | Your Supply.Do instance URL (e.g. `https://your-instance.supply.do`) |
| `bearerToken` | Your Supply.Do Bearer token |

## Components

| Class | Type | Description |
|---|---|---|
| `SupplyDoCreateOrderHistory` | Connector | Creates selling order history entries via `POST /items/selling_order_history` |
| `SupplyDoCreateProductBatchWarehouse` | Connector | Creates product batch warehouse records via `POST /items/product_batch_warehouse` |
| `SupplyDoCreatePurchaseOrderHistory` | Connector | Creates purchase order history entries via `POST /items/purchase_order_history` |
| `SupplyDoCreateReturn` | Connector | Creates return records via `POST /items/return` |
| `SupplyDoGetCarriers` | Connector | Retrieves carriers filtered by ecommerce ID via `GET /items/carrier` |
| `SupplyDoGetProductBatchWarehouse` | Connector | Retrieves product batch warehouse records via `GET /items/product_batch_warehouse` |
| `SupplyDoGetSellingOrder` | Connector | Retrieves a single selling order with transport details via `GET /items/selling_order/{id}` |
| `SupplyDoGetWarehouses` | Connector | Retrieves available warehouses via `GET /items/warehouse` |
| `SupplyDoSetTrackingNumber` | Connector | Updates the tracking number on a selling order via `PATCH /items/selling_order/{id}` |
| `SupplyDoUpdateEcommerce` | Connector | Updates ecommerce active/installed flags via `PATCH /items/ecommerce/{user}` |
| `SupplyDoUpdateProductBatchWarehouse` | Connector | Updates a product batch warehouse record via `PATCH /items/product_batch_warehouse/{id}` |
| `SupplyDoUpsertOrders` | Connector | Upserts selling orders via `POST /hanaboso/items/selling_order` |
| `SupplyDoUpsertProduct` | Connector | Upserts products with brand, batch, and supplier data via `POST /hanaboso/items/product` |
| `SupplyDoGetCacheProductDetail` | Batch | Paginates cache product details updated since last run via `GET /items/cache_product_detail` (1000 per page) |
| `SupplyDoGetOrderHistory` | Batch | Paginates selling order history filtered by status and last run via `GET /items/selling_order_history` (1000 per page) |
| `SupplyDoGetProducts` | Batch | Paginates products with full supplier/price/brand fields via `GET /items/product` (1000 per page) |
| `SupplyDoGetProductsStocks` | Batch | Paginates product stocks updated since last run via `GET /items/product_batch_warehouse` (1000 per page) |
| `SupplyDoGetPurchaseOrders` | Batch | Paginates purchase orders with warehouse and history fields via `GET /items/purchase_order` (1000 per page) |
| `SupplyDoGetSellingOrders` | Batch | Paginates selling orders in `processing` status via `GET /items/selling_order` (1000 per page) |

## Setup

### Credentials

1. Contact your Supply.Do administrator to obtain API access credentials.
2. Note your Supply.Do instance **URL** and your **Bearer token**.
3. In Orchesty, open the Supply.Do application settings and fill in both fields.

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-supplydo @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-supplydo @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import SupplyDoApplication from '@orchesty/connector-supplydo/dist/SupplyDoApplication';
import SupplyDoGetSellingOrder from '@orchesty/connector-supplydo/dist/Connector/SupplyDoGetSellingOrder';
import SupplyDoUpsertOrders from '@orchesty/connector-supplydo/dist/Connector/SupplyDoUpsertOrders';
import SupplyDoUpsertProduct from '@orchesty/connector-supplydo/dist/Connector/SupplyDoUpsertProduct';
import SupplyDoSetTrackingNumber from '@orchesty/connector-supplydo/dist/Connector/SupplyDoSetTrackingNumber';
import SupplyDoGetSellingOrders from '@orchesty/connector-supplydo/dist/Batch/SupplyDoGetSellingOrders';
import SupplyDoGetProducts from '@orchesty/connector-supplydo/dist/Batch/SupplyDoGetProducts';
import SupplyDoGetProductsStocks from '@orchesty/connector-supplydo/dist/Batch/SupplyDoGetProductsStocks';
import SupplyDoGetPurchaseOrders from '@orchesty/connector-supplydo/dist/Batch/SupplyDoGetPurchaseOrders';
import SupplyDoGetOrderHistory from '@orchesty/connector-supplydo/dist/Batch/SupplyDoGetOrderHistory';

const app = new SupplyDoApplication();
container.setApplication(app);
container.setNode(new SupplyDoGetSellingOrder(), app);
container.setNode(new SupplyDoUpsertOrders(), app);
container.setNode(new SupplyDoUpsertProduct(), app);
container.setNode(new SupplyDoSetTrackingNumber(), app);
container.setNode(new SupplyDoGetSellingOrders(), app);
container.setNode(new SupplyDoGetProducts(), app);
container.setNode(new SupplyDoGetProductsStocks(), app);
container.setNode(new SupplyDoGetPurchaseOrders(), app);
container.setNode(new SupplyDoGetOrderHistory(), app);
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
