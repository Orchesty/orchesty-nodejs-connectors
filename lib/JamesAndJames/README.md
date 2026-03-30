# James and James Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-james-and-james?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-james-and-james)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for James and James, an e-commerce fulfilment partner providing order management, warehousing, and shipping services.

## Application Type

**Basic (HMAC-signed)**

This connector authenticates using an API key. It supports both V1 (HMAC query-string signed requests) and V2 (Bearer token as a Base64-encoded JSON object containing an HMAC-MD5 signature). The appropriate method is selected automatically based on the endpoint version.

| Field | Description |
|---|---|
| `baseUrl` | Base URL of your James and James API instance |
| `api_key` | Your James and James API key |

## Components

| Class | Type | Description |
|---|---|---|
| `JamesAndJamesCreateASN` | Connector | Creates a new Advanced Shipment Notice via `POST /asn` |
| `JamesAndJamesCreateOrder` | Connector | Creates a new fulfilment order via `POST /order` |
| `JamesAndJamesCreateProduct` | Connector | Creates a new product in the catalogue via `POST /product` |
| `JamesAndJamesUpdateASN` | Connector | Updates an existing ASN via `PATCH /asn/{asnId}` |
| `JamesAndJamesUpdateOrder` | Connector | Updates an existing order via `PATCH /order/{orderId}` |
| `JamesAndJamesUpdateProduct` | Connector | Updates an existing product via `PATCH /product/{productId}` |
| `JamesAndJamesGetOrders` | Batch | Lists all orders (optionally filtered by status) via `GET /order` |
| `JamesAndJamesGetProductStockV1` | Batch | Fetches product stock levels using the legacy V1 API via `GET /product/stock` |
| `JamesAndJamesGetProductStockV2` | Batch | Fetches product stock levels using the V2 API via `GET /product/stock` |

## Setup

### Credentials

Contact your James and James account manager to obtain your **API URL** and **API key**. In Orchesty, fill in:
- **URL** — your James and James API base URL
- **Api key** — your API key

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-james-and-james @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-james-and-james @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import JamesAndJamesApplication from '@orchesty/connector-james-and-james/dist/JamesAndJamesApplication';
import JamesAndJamesCreateOrder from '@orchesty/connector-james-and-james/dist/Connector/JamesAndJamesCreateOrder';
import JamesAndJamesCreateProduct from '@orchesty/connector-james-and-james/dist/Connector/JamesAndJamesCreateProduct';
import JamesAndJamesCreateASN from '@orchesty/connector-james-and-james/dist/Connector/JamesAndJamesCreateASN';
import JamesAndJamesUpdateOrder from '@orchesty/connector-james-and-james/dist/Connector/JamesAndJamesUpdateOrder';
import JamesAndJamesUpdateProduct from '@orchesty/connector-james-and-james/dist/Connector/JamesAndJamesUpdateProduct';
import JamesAndJamesUpdateASN from '@orchesty/connector-james-and-james/dist/Connector/JamesAndJamesUpdateASN';
import JamesAndJamesGetOrders from '@orchesty/connector-james-and-james/dist/Batch/JamesAndJamesGetOrders';
import JamesAndJamesGetProductStockV2 from '@orchesty/connector-james-and-james/dist/Batch/JamesAndJamesGetProductStockV2';
import JamesAndJamesGetProductStockV1 from '@orchesty/connector-james-and-james/dist/Batch/JamesAndJamesGetProductStockV1';

const app = new JamesAndJamesApplication();
container.setApplication(app);
container.setNode(new JamesAndJamesCreateOrder(), app);
container.setNode(new JamesAndJamesCreateProduct(), app);
container.setNode(new JamesAndJamesCreateASN(), app);
container.setNode(new JamesAndJamesUpdateOrder(), app);
container.setNode(new JamesAndJamesUpdateProduct(), app);
container.setNode(new JamesAndJamesUpdateASN(), app);
container.setNode(new JamesAndJamesGetOrders(), app);
container.setNode(new JamesAndJamesGetProductStockV2(), app);
container.setNode(new JamesAndJamesGetProductStockV1(), app);
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
