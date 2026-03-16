# Amazon Selling Partner Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-amazon-apps-selling-partner?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-amazon-apps-selling-partner)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for the Amazon Selling Partner API (SP-API), enabling sellers and vendors to manage orders, catalog listings, and shipments on Amazon marketplaces.

## Application Type

**Basic (SP-API authorization)**

This connector authenticates using Amazon SP-API credentials. An authorization code is fetched via the SP-API authorization endpoint and used as a Bearer token for subsequent requests.

| Field | Description |
|---|---|
| `selling_partner_id` | Your Amazon Selling Partner ID (merchant token) |
| `developer_id` | Your registered Amazon developer ID |
| `mws_auth_token` | Your MWS authorization token |

## Components

| Class | Type | Description |
|---|---|---|
| `AmazonCreateShipmentConnector` | Connector | Creates a new shipment via `POST /shipping/v1/shipments` |
| `AmazonGetListingsItemConnector` | Connector | Retrieves a listings item for a seller/SKU via `GET /listings/2021-08-01/items/{sellerId}/{sku}` |
| `AmazonPutListingsItemConnector` | Connector | Creates or replaces a listings item via `PUT /listings/2021-08-01/items/{sellerId}/{sku}` |
| `AmazonGetOrdersBatch` | Batch | Lists orders for one or more marketplaces with cursor-based pagination via `GET /orders/v0/orders` |
| `AmazonListCatalogItemsBatch` | Batch | Lists catalog items for a marketplace via `GET /catalog/v0/items` |

## Setup

### Credentials

1. Register as an Amazon developer at [developer.amazonservices.com](https://developer.amazonservices.com).
2. Create a Selling Partner API application and note your **Developer ID**.
3. Authorize your application for a seller account to obtain the **Selling Partner ID** and **MWS Auth Token**.
4. In Orchesty, open the Amazon Selling Partner application settings and fill in:
   - **Selling partner Id** — paste your Selling Partner ID
   - **Developer Id** — paste your Developer ID
   - **MWS auth token** — paste your MWS Authorization Token

### API Documentation

Amazon Selling Partner API Reference: [https://developer-docs.amazon.com/sp-api/](https://developer-docs.amazon.com/sp-api/)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-amazon-apps-selling-partner @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-amazon-apps-selling-partner @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import CurlSender from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/CurlSender';
import AmazonApplication from '@orchesty/connector-amazon-apps-selling-partner/dist/AmazonApplication';
import AmazonCreateShipmentConnector from '@orchesty/connector-amazon-apps-selling-partner/dist/Connector/AmazonCreateShipmentConnector';
import AmazonGetListingsItemConnector from '@orchesty/connector-amazon-apps-selling-partner/dist/Connector/AmazonGetListingsItemConnector';
import AmazonPutListingsItemConnector from '@orchesty/connector-amazon-apps-selling-partner/dist/Connector/AmazonPutListingsItemConnector';
import AmazonGetOrdersBatch from '@orchesty/connector-amazon-apps-selling-partner/dist/Batch/AmazonGetOrdersBatch';
import AmazonListCatalogItemsBatch from '@orchesty/connector-amazon-apps-selling-partner/dist/Batch/AmazonListCatalogItemsBatch';

const amazonApp = new AmazonApplication(container.get(CurlSender));
container.setApplication(amazonApp);
container.setNode(new AmazonCreateShipmentConnector(), amazonApp);
container.setNode(new AmazonGetListingsItemConnector(), amazonApp);
container.setNode(new AmazonPutListingsItemConnector(), amazonApp);
container.setNode(new AmazonGetOrdersBatch(), amazonApp);
container.setNode(new AmazonListCatalogItemsBatch(), amazonApp);
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
