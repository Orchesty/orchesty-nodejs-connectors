# Katana Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-katana?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-katana)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for Katana, a manufacturing ERP providing live inventory and manufacturing management with batch tracking for end-to-end traceability.

## Application Type

**Basic**

This connector authenticates using an API key sent as a Bearer token in the `Authorization` header.

| Field | Description |
|---|---|
| `api_key` | Your Katana API key |

## Components

| Class | Type | Description |
|---|---|---|
| `KatanaCreateCustomerConnector` | Connector | Creates a new customer via `POST /v1/customers` |
| `KatanaCreateProductConnector` | Connector | Creates a new product via `POST /v1/products` |
| `KatanaListProductsBatch` | Batch | Paginates through all products (50 per page) via `GET /v1/products` |

## Setup

### Credentials

1. Log in to your [Katana](https://katanamrp.com) account.
2. Navigate to **Settings → API** and generate a new API key.
3. Copy the key and paste it into the **API key** field in Orchesty.

### API Documentation

Katana API Reference: [https://developer.katanamrp.com/reference/api-introduction](https://developer.katanamrp.com/reference/api-introduction)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-katana @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-katana @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import KatanaApplication from '@orchesty/connector-katana/dist/KatanaApplication';
import KatanaCreateCustomerConnector from '@orchesty/connector-katana/dist/Connector/KatanaCreateCustomerConnector';
import KatanaCreateProductConnector from '@orchesty/connector-katana/dist/Connector/KatanaCreateProductConnector';
import KatanaListProductsBatch from '@orchesty/connector-katana/dist/Batch/KatanaListProductsBatch';

const app = new KatanaApplication();
container.setApplication(app);
container.setNode(new KatanaCreateCustomerConnector(), app);
container.setNode(new KatanaCreateProductConnector(), app);
container.setNode(new KatanaListProductsBatch(), app);
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
