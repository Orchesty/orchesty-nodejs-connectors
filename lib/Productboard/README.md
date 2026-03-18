# Productboard Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-productboard?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-productboard)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for Productboard, a customer-driven product management system that empowers teams to get the right products to market faster.

## Application Type

**Basic**

This connector authenticates using a personal API token sent as a Bearer token in the `Authorization` header.

| Field | Description |
|---|---|
| `token` | Your Productboard API access token |

## Components

| Class | Type | Description |
|---|---|---|
| `ProductboardCreateNewFeatureConnector` | Connector | Creates a new feature (or subfeature) via `POST /features` |
| `ProductboardListAllFeaturesBatch` | Batch | Paginates through all features (100 per page) via `GET /features` |
| `ProductboardListAllProductsBatch` | Batch | Paginates through all products (100 per page) via `GET /products` |

## Setup

### Credentials

1. Log in to [Productboard](https://app.productboard.com/).
2. Navigate to **Profile settings → API tokens** and create a new token.
3. Copy the token and paste it into the **Token** field in Orchesty.

### API Documentation

Productboard Public API: [https://developer.productboard.com/](https://developer.productboard.com/)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-productboard @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-productboard @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import ProductboardApplication from '@orchesty/connector-productboard/dist/ProductboardApplication';
import ProductboardCreateNewFeatureConnector from '@orchesty/connector-productboard/dist/Connector/ProductboardCreateNewFeatureConnector';
import ProductboardListAllFeaturesBatch from '@orchesty/connector-productboard/dist/Batch/ProductboardListAllFeaturesBatch';
import ProductboardListAllProductsBatch from '@orchesty/connector-productboard/dist/Batch/ProductboardListAllProductsBatch';

const app = new ProductboardApplication();
container.setApplication(app);
container.setNode(new ProductboardCreateNewFeatureConnector(), app);
container.setNode(new ProductboardListAllFeaturesBatch(), app);
container.setNode(new ProductboardListAllProductsBatch(), app);
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
