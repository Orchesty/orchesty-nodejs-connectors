# Mall.cz Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-mall?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-mall)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for Mall.cz, the largest Czech online marketplace where thousands of e-shops offer their products under one roof.

## Application Type

**Basic**

This connector authenticates using a `client_id` API key passed as a query parameter on every request to the Mall Partner API (`https://mpapi.mallgroup.com/v1/`).

| Field | Description |
|---|---|
| `client_id` | Your Mall Partner API client ID (found in the Partner Portal) |

## Components

| Class | Type | Description |
|---|---|---|
| `MallGetOrderDetailConnector` | Connector | Fetches a single order by ID via `GET /orders/{orderId}` |
| `MallGetProductDetailConnector` | Connector | Fetches the full detail of a single product via `GET /products/{productId}` |
| `MallPostProductConnector` | Connector | Creates a new product listing via `POST /products` |
| `MallPutOrdersConnector` | Connector | Updates an existing order's state via `PUT /orders/{id}` |
| `MallPutProductConnector` | Connector | Updates an existing product listing via `PUT /products/{id}` |
| `MallGetOrderListBatch` | Batch | Paginates through all orders (1000 per page) via `GET /orders` |
| `MallGetProductListBatch` | Batch | Paginates through all product listings (1000 per page) via `GET /products` |

## Setup

### Credentials

1. Log in to the [Mall Partner Portal](https://partners.mallgroup.com/cz/).
2. Navigate to **Partner → API** and copy your **Client ID**.
3. In Orchesty, open the Mall.cz application settings and paste your Client ID into the **Client Id** field.

### API Documentation

Mall Partner API: [https://knowledgebase.mallgroup.com/en/uvodni-informace-api/](https://knowledgebase.mallgroup.com/en/uvodni-informace-api/)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-mall @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-mall @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import MallApplication from '@orchesty/connector-mall/dist/MallApplication';
import MallGetOrderDetailConnector from '@orchesty/connector-mall/dist/Connector/MallGetOrderDetailConnector';
import MallGetProductDetailConnector from '@orchesty/connector-mall/dist/Connector/MallGetProductDetailConnector';
import MallPostProductConnector from '@orchesty/connector-mall/dist/Connector/MallPostProductConnector';
import MallPutOrdersConnector from '@orchesty/connector-mall/dist/Connector/MallPutOrdersConnector';
import MallPutProductConnector from '@orchesty/connector-mall/dist/Connector/MallPutProductConnector';
import MallGetOrderListBatch from '@orchesty/connector-mall/dist/Batch/MallGetOrderListBatch';
import MallGetProductListBatch from '@orchesty/connector-mall/dist/Batch/MallGetProductListBatch';

const app = new MallApplication();
container.setApplication(app);
container.setNode(new MallGetOrderDetailConnector(), app);
container.setNode(new MallGetProductDetailConnector(), app);
container.setNode(new MallPostProductConnector(), app);
container.setNode(new MallPutOrdersConnector(), app);
container.setNode(new MallPutProductConnector(), app);
container.setNode(new MallGetOrderListBatch(), app);
container.setNode(new MallGetProductListBatch(), app);
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
