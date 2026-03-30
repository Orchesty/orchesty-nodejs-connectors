# Webflow Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-webflow?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-webflow)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for Webflow, a visual website builder and e-commerce platform for managing sites, products, and content via API.

## Application Type

**Basic**

This connector authenticates using a Bearer API key sent in the `Authorization` header. An `api_version=1.0.0` query parameter is appended to every request.

| Field | Description |
|---|---|
| `apiKey` | Your Webflow API key |

## Components

| Class | Type | Description |
|---|---|---|
| `WebflowAddProductConnector` | Connector | Creates a new product (with SKU) in a Webflow site via `POST /sites/{siteId}/products`; the `siteId` is taken from the input payload |

## Setup

### Credentials

1. Log in to your [Webflow](https://webflow.com/) account.
2. Navigate to **Site Settings → Integrations → API Access** and generate a new API key.
3. Copy the API key and paste it into the **Api key** field in the Orchesty Webflow application settings.

### API Documentation

Webflow Data API: [https://developers.webflow.com/data/reference/ecommerce/products/create](https://developers.webflow.com/data/reference/ecommerce/products/create)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-webflow @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-webflow @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import WebflowApplication from '@orchesty/connector-webflow/dist/WebflowApplication';
import WebflowAddProductConnector from '@orchesty/connector-webflow/dist/Connector/WebflowAddProductConnector';

const app = new WebflowApplication();
container.setApplication(app);
container.setNode(new WebflowAddProductConnector(), app);
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
