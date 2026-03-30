# Base.com Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-base?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-base)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for Base.com, an e-commerce marketplace management tool for orders, shipments, and warehouse operations.

## Application Type

**Basic**

This connector authenticates using an API token sent in the `X-BLToken` request header. All API calls are made via `POST` to a single endpoint (`https://api.baselinker.com/connector.php`), with the operation specified as a `method` field in the `multipart/form-data` body.

| Field | Description |
|---|---|
| `token` | Your Base.com API token |

## Components

| Class | Type | Description |
|---|---|---|
| `CourierFields` | Connector | Fetches available fields for a given courier code |
| `CouriersList` | Connector | Retrieves the list of all available couriers |
| `CreatePackage` | Connector | Creates a shipment package for an order using a courier |
| `CreatePackageManual` | Connector | Manually registers a package with a provided tracking number |
| `GetLabel` | Connector | Retrieves the shipping label (base64) for a courier package |
| `Inventories` | Connector | Returns all inventories with languages, price groups, and warehouses |
| `InventoryWarehouses` | Connector | Returns all warehouses across all inventories |
| `OrderPaymentsHistory` | Connector | Retrieves payment history for a specific order |
| `OrderStatusList` | Connector | Returns the list of order statuses |
| `Orders` | Connector | Fetches orders with rich filtering options |
| `SetOrderStatus` | Connector | Sets the status of a specific order |
| `UpdateInventoryProductsStock` | Connector | Updates stock quantities for products in an inventory |
| `InventoryProductsData` | Batch | Fetches full product data for specified product IDs in an inventory |
| `InventoryProductsList` | Batch | Paginates through all products in an inventory with filtering |
| `JournalList` | Batch | Fetches journal/activity log entries since a tracked last log ID |
| `OrderExtraFields` | Batch | Retrieves all custom extra fields defined for orders |

## Setup

### Credentials

1. Log in to your Base.com account.
2. Navigate to **Integrations → API** to find your API token.
3. In Orchesty, open the Base.com application settings and paste the token into the **API token** field.

### API Documentation

Base.com (Baselinker) API Reference: [https://api.baselinker.com/](https://api.baselinker.com/)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-base @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-base @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import BaseApplication from '@orchesty/connector-base/dist/BaseApplication';
import CouriersList from '@orchesty/connector-base/dist/Connector/CouriersList';
import Orders from '@orchesty/connector-base/dist/Connector/Orders';
import SetOrderStatus from '@orchesty/connector-base/dist/Connector/SetOrderStatus';
import InventoryProductsList from '@orchesty/connector-base/dist/Batch/InventoryProductsList';
import JournalList from '@orchesty/connector-base/dist/Batch/JournalList';
// ... import remaining nodes as needed

const app = new BaseApplication();
container.setApplication(app);
container.setNode(new CouriersList(), app);
container.setNode(new Orders(), app);
container.setNode(new SetOrderStatus(), app);
container.setNode(new InventoryProductsList(), app);
container.setNode(new JournalList(), app);
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
