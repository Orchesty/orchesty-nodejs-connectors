# Upgates Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-upgates?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-upgates)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for Upgates, a Czech e-commerce platform for creating and managing online stores.

## Application Type

**Basic**

This connector authenticates using HTTP Basic auth (Login + API Key, Base64-encoded). The store URL is configurable per instance.

| Field | Description |
|---|---|
| `user` | Your Upgates login username |
| `password` | Your Upgates API key |
| `upgatesUrl` | Your Upgates store URL (e.g. `https://my-store.upgates.com`) |

## Components

| Class | Type | Description |
|---|---|---|
| `UpgatesGetOrderStates` | Connector | Retrieves available order states via `GET /api/v2/orders/states` |
| `UpgatesGetPayments` | Connector | Retrieves payment methods via `GET /api/v2/payments` |
| `UpgatesGetProductParameters` | Connector | Fetches product parameters via `GET /api/v2/products/parameters/` |
| `UpgatesGetShipments` | Connector | Retrieves shipment methods via `GET /api/v2/shipments` |
| `UpgatesUpdateOrder` | Connector | Updates one or more orders via `PUT /api/v2/orders` |
| `UpgatesUpdateStock` | Connector | Updates stock quantities for products via `PUT /api/v2/products` |
| `UpgatesDeleteWebhooks` | Connector | Deletes all registered webhooks via `DELETE /api/v2/webhooks?ids={ids}` |
| `UpgatesCreateWebhooks` | Batch | Registers webhook subscriptions via `POST /api/v2/webhooks` |
| `UpgatesGetOrders` | Batch | Paginates through orders via `GET /api/v2/orders`; supports date-cursor filtering |
| `UpgatesGetProducts` | Batch | Paginates through products via `GET /api/v2/products`; supports date-cursor filtering |

## Setup

### Credentials

1. Log in to your [Upgates](https://www.upgates.com/) admin panel.
2. Navigate to **Settings → API** and note your **API key**.
3. In Orchesty, open the Upgates application settings and fill in your login username, API key, and store URL.

### API Documentation

Upgates API: [https://api.upgates.com/](https://api.upgates.com/)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-upgates @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-upgates @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import UpgatesApplication from '@orchesty/connector-upgates/dist/UpgatesApplication';
import UpgatesGetOrderStates from '@orchesty/connector-upgates/dist/Connector/UpgatesGetOrderStates';
import UpgatesUpdateOrder from '@orchesty/connector-upgates/dist/Connector/UpgatesUpdateOrder';
import UpgatesUpdateStock from '@orchesty/connector-upgates/dist/Connector/UpgatesUpdateStock';
import UpgatesDeleteWebhooks from '@orchesty/connector-upgates/dist/Connector/UpgatesDeleteWebhooks';
import UpgatesCreateWebhooks from '@orchesty/connector-upgates/dist/Batch/UpgatesCreateWebhooks';
import UpgatesGetOrders from '@orchesty/connector-upgates/dist/Batch/UpgatesGetOrders';
import UpgatesGetProducts from '@orchesty/connector-upgates/dist/Batch/UpgatesGetProducts';

const app = new UpgatesApplication();
container.setApplication(app);
container.setNode(new UpgatesGetOrderStates(), app);
container.setNode(new UpgatesUpdateOrder(), app);
container.setNode(new UpgatesUpdateStock(), app);
container.setNode(new UpgatesDeleteWebhooks(), app);
container.setNode(new UpgatesCreateWebhooks(), app);
container.setNode(new UpgatesGetOrders(), app);
container.setNode(new UpgatesGetProducts(), app);
// ... register remaining connectors similarly
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
