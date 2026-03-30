# Wix Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-wix?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-wix)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for Wix, a cloud-based web development platform and e-commerce solution for building online stores and websites.

## Application Type

**OAuth 2.0**

This connector uses the Wix OAuth 2.0 authorization flow. After entering your credentials in Orchesty, you will be redirected to Wix to authorize access.

| Field | Description |
|---|---|
| `client_id` | Your Wix app Client ID |
| `client_secret` | Your Wix app Client Secret |

## Components

| Class | Type | Description |
|---|---|---|
| `WixCreateOrderConnector` | Connector | Creates a new store order via `POST /stores/v2/orders` |
| `WixCreateProductConnector` | Connector | Creates a new store product via `POST /stores/v1/products` |
| `WixGetOrderConnector` | Connector | Retrieves a single order by ID via `GET /stores/v2/orders/{id}` |
| `WixUpdateProductConnector` | Connector | Updates an existing product via `PATCH /stores/v1/products/{productId}` |

## Setup

### Credentials

1. Log in to the [Wix Developer Center](https://dev.wix.com/) and create or open your app.
2. Under **OAuth**, copy the **App ID** (Client ID) and **App Secret Key** (Client Secret).
3. Add the Orchesty redirect URL to the **Redirect URLs** list.
4. In Orchesty, open the Wix application settings, enter both values, and complete the OAuth authorization flow.

### API Documentation

Wix REST API: [https://dev.wix.com/docs/rest](https://dev.wix.com/docs/rest)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-wix @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-wix @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import { OAuth2Provider } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import WixApplication from '@orchesty/connector-wix/dist/WixApplication';
import WixCreateOrderConnector from '@orchesty/connector-wix/dist/Connector/WixCreateOrderConnector';
import WixCreateProductConnector from '@orchesty/connector-wix/dist/Connector/WixCreateProductConnector';
import WixGetOrderConnector from '@orchesty/connector-wix/dist/Connector/WixGetOrderConnector';
import WixUpdateProductConnector from '@orchesty/connector-wix/dist/Connector/WixUpdateProductConnector';

const app = new WixApplication(container.get(OAuth2Provider));
container.setApplication(app);
container.setNode(new WixCreateOrderConnector(), app);
container.setNode(new WixCreateProductConnector(), app);
container.setNode(new WixGetOrderConnector(), app);
container.setNode(new WixUpdateProductConnector(), app);
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
