# Magento2 Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-magento2?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-magento2)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for Magento 2, a leading high-performance and scalable e-commerce platform used for online stores.

## Application Type

**Basic**

This connector uses a Magento admin username and password to obtain an API Bearer token. The token is fetched automatically via the Magento REST admin token endpoint and cached for 4 hours to minimize authentication overhead. The application requires a `CacheService` instance to be injected via its constructor.

| Field | Description |
|---|---|
| `user` | Magento admin username |
| `password` | Magento admin password |
| `magentoUrl` | Full URL of your Magento instance (e.g. `https://your-store.example.com`) |

## Components

| Class | Type | Description |
|---|---|---|
| `Magento2GetOrder` | Connector | Fetches a single order by order number via `GET /index.php/rest/default/V1/orders/{orderNumber}` |
| `Magento2GetOrders` | Batch | Paginates through all orders (100 per page) via `GET /index.php/rest/default/V1/orders` |

## Setup

### Credentials

1. Log in to your Magento Admin panel.
2. Navigate to **System → All Users** and create or identify an admin user with API access.
3. Note the **admin username** and **password**.
4. In Orchesty, open the Magento2 application settings and enter:
   - **Username** — Magento admin username
   - **Password** — Magento admin password
   - **Url** — Full URL of your Magento store (e.g. `https://your-store.example.com`)

### API Documentation

Adobe Commerce / Magento REST API: [https://developer.adobe.com/commerce/webapi/rest/](https://developer.adobe.com/commerce/webapi/rest/)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-magento2 @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-magento2 @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container. The `Magento2Application` requires a `CacheService` instance:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import CacheService from '@orchesty/nodejs-sdk/dist/lib/Cache/CacheService';
import Magento2Application from '@orchesty/connector-magento2/dist/Magento2Application';
import Magento2GetOrder from '@orchesty/connector-magento2/dist/Connector/Magento2GetOrder';
import Magento2GetOrders from '@orchesty/connector-magento2/dist/Batch/Magento2GetOrders';

const app = new Magento2Application(container.get(CacheService));
container.setApplication(app);
container.setNode(new Magento2GetOrder(), app);
container.setNode(new Magento2GetOrders(), app);
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
