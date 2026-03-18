# Bigcommerce Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-bigcommerce?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-bigcommerce)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for BigCommerce, an e-commerce platform for building and scaling online stores.

## Application Type

**OAuth 2.0**

This connector uses the BigCommerce OAuth 2.0 authorization flow. After entering your credentials in Orchesty, you will be redirected to BigCommerce to authorize access.

| Field | Description |
|---|---|
| `client_id` | OAuth application Client ID from the BigCommerce Developer Portal |
| `client_secret` | OAuth application Client Secret from the BigCommerce Developer Portal |
| `store_hash` | Your BigCommerce store hash (unique store identifier) |

## Components

| Class | Type | Description |
|---|---|---|
| `BigcommerceCreateOrderConnector` | Connector | Creates a new order via `POST /stores/{store_hash}/v2/orders` |
| `BigcommerceCreateProductConnector` | Connector | Creates a new catalog product via `POST /stores/{store_hash}/v3/catalog/products` |

## Setup

### Credentials

1. Log in to the [BigCommerce Developer Portal](https://developer.bigcommerce.com).
2. Create a new app and note the **Client ID** and **Client Secret**.
3. Set the **Redirect URI** to the OAuth callback URL provided by Orchesty.
4. Find your **Store Hash** in your BigCommerce store control panel URL (e.g. `store.mybigcommerce.com/manage` → the hash is shown in the API path).
5. In Orchesty, open the BigCommerce application settings and fill in all fields.
6. Complete the OAuth authorization flow by clicking **Authorize** in Orchesty.

### API Documentation

BigCommerce REST Management API Reference: [https://developer.bigcommerce.com/docs/rest-management](https://developer.bigcommerce.com/docs/rest-management)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-bigcommerce @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-bigcommerce @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import { OAuth2Provider } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import BigcommerceApplication from '@orchesty/connector-bigcommerce/dist/BigcommerceApplication';
import BigcommerceCreateOrderConnector from '@orchesty/connector-bigcommerce/dist/Connector/BigcommerceCreateOrderConnector';
import BigcommerceCreateProductConnector from '@orchesty/connector-bigcommerce/dist/Connector/BigcommerceCreateProductConnector';

const app = new BigcommerceApplication(container.get(OAuth2Provider));
container.setApplication(app);
container.setNode(new BigcommerceCreateOrderConnector(), app);
container.setNode(new BigcommerceCreateProductConnector(), app);
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
