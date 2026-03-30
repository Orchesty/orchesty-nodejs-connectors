# Brani Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-brani?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-brani)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for Brani, a warehouse and order management platform for e-commerce businesses.

## Application Type

**Basic**

This connector authenticates using an API key sent as a Bearer token in the `Authorization` header.

| Field | Description |
|---|---|
| `token` | Your Brani API key |

## Components

| Class | Type | Description |
|---|---|---|
| `BraniEshopInfo` | Connector | Retrieves eshop configuration (order statuses, shipping and payment methods) via `GET /eshop/info` |
| `BraniUpdateEshopInfo` | Connector | Updates eshop configuration via `POST /eshop/info` |
| `BraniUpsertOrder` | Connector | Creates or updates an order with full delivery, billing, and item details via `POST /order/upsert` |
| `BraniUpsertProduct` | Connector | Creates or updates a product including variants and images via `POST /products` |
| `BraniUnsubscribeWebhook` | Connector | Deletes a webhook registration by ID via `DELETE /webhook/{id}` |
| `BraniListSupplies` | Batch | Lists stock supplies, optionally filtered by location and product code via `GET /stock/supplies` |
| `BraniListWebhooks` | Batch | Lists all registered webhooks via `GET /webhook` |
| `BraniListWebhookEvents` | Batch | Paginates through webhook events for a given webhook ID via `GET /webhook/events/{webhookId}` |
| `BraniSubscribeWebhooks` | Batch | Registers any unregistered webhook subscriptions defined in the application via `POST /webhook` |

## Setup

### Credentials

Contact Brani support at [support@brani.cz](mailto:support@brani.cz) to obtain your API key for integration access.

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-brani @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-brani @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import BraniApplication from '@orchesty/connector-brani/dist/BraniApplication';
import BraniEshopInfo from '@orchesty/connector-brani/dist/Connector/BraniEshopInfo';
import BraniUpsertOrder from '@orchesty/connector-brani/dist/Connector/BraniUpsertOrder';
import BraniUpsertProduct from '@orchesty/connector-brani/dist/Connector/BraniUpsertProduct';
import BraniListSupplies from '@orchesty/connector-brani/dist/Batch/BraniListSupplies';
import BraniListWebhookEvents from '@orchesty/connector-brani/dist/Batch/BraniListWebhookEvents';
// ... import remaining nodes as needed

const app = new BraniApplication();
container.setApplication(app);
container.setNode(new BraniEshopInfo(), app);
container.setNode(new BraniUpsertOrder(), app);
container.setNode(new BraniUpsertProduct(), app);
container.setNode(new BraniListSupplies(), app);
container.setNode(new BraniListWebhookEvents(), app);
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
