# Allegro Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-allegro?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-allegro)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for Allegro, a Polish online e-commerce platform offering products in all key categories.

## Application Type

**OAuth 2.0**

This connector uses the OAuth 2.0 authorization code flow. After entering your Client ID and Client Secret in Orchesty, you will be redirected to Allegro to authorize access.

| Field | Description |
|---|---|
| `client_id` | OAuth application client ID from the Allegro Developer Portal |
| `client_secret` | OAuth application client secret from the Allegro Developer Portal |
| `Environment` | Allegro API environment hostname (e.g. `allegro.pl` for production) |

## Components

| Class | Type | Description |
|---|---|---|
| `AllegroCreateDraftOfferConnector` | Connector | Creates a new draft sale offer via `POST /sale/offers` |
| `AllegroGetOrderDetailConnector` | Connector | Fetches a single order detail via `GET /order/checkout-forms/{id}` |
| `AllegroGetProductDetailConnector` | Connector | Fetches product details via `GET /sale/products/{productId}` |
| `AllegroProposeProductConnector` | Connector | Submits a new product proposal via `POST /sale/product-proposals` |
| `AllegroGetAvailableProductsBatch` | Batch | Lists all fulfillment-available products with offset-based pagination (`GET /fulfillment/available-products`) |
| `AllegroGetUsersOrderListBatch` | Batch | Lists all user orders with offset-based pagination (`GET /order/checkout-forms`) |

## Setup

### Credentials

1. Log in to the [Allegro Developer Portal](https://developer.allegro.pl).
2. Create a new application and note the **Client ID** and **Client Secret**.
3. Set the **Redirect URI** in your app settings to the OAuth callback URL provided by Orchesty.
4. In Orchesty, open the Allegro application settings and fill in:
   - **Client Id** — paste your Client ID
   - **Client Secret** — paste your Client Secret
   - **Environment** — enter `allegro.pl` for production (or another market domain, e.g. `allegro.sk`)
5. Complete the OAuth authorization flow by clicking **Authorize** in Orchesty.

### API Documentation

Allegro REST API Reference: [https://developer.allegro.pl/documentation](https://developer.allegro.pl/documentation)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-allegro @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-allegro @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import AllegroApplication from '@orchesty/connector-allegro/dist/AllegroApplication';
import AllegroCreateDraftOfferConnector from '@orchesty/connector-allegro/dist/Connector/AllegroCreateDraftOfferConnector';
import AllegroGetOrderDetailConnector from '@orchesty/connector-allegro/dist/Connector/AllegroGetOrderDetailConnector';
import AllegroGetProductDetailConnector from '@orchesty/connector-allegro/dist/Connector/AllegroGetProductDetailConnector';
import AllegroProposeProductConnector from '@orchesty/connector-allegro/dist/Connector/AllegroProposeProductConnector';
import AllegroGetAvailableProductsBatch from '@orchesty/connector-allegro/dist/Batch/AllegroGetAvailableProductsBatch';
import AllegroGetUsersOrderListBatch from '@orchesty/connector-allegro/dist/Batch/AllegroGetUsersOrderListBatch';

const allegroApp = new AllegroApplication();
container.setApplication(allegroApp);
container.setNode(new AllegroCreateDraftOfferConnector(), allegroApp);
container.setNode(new AllegroGetOrderDetailConnector(), allegroApp);
container.setNode(new AllegroGetProductDetailConnector(), allegroApp);
container.setNode(new AllegroProposeProductConnector(), allegroApp);
container.setNode(new AllegroGetAvailableProductsBatch(), allegroApp);
container.setNode(new AllegroGetUsersOrderListBatch(), allegroApp);
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
