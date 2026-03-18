# Shopify Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-shopify?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-shopify)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for Shopify, a leading e-commerce platform for building and managing online stores with full order, fulfillment, and inventory management capabilities.

## Application Type

**OAuth 2.0**

This connector uses a per-store Shopify OAuth 2.0 authorization flow. The auth and token URLs are constructed dynamically from your store's URL. After entering your credentials in Orchesty, you will be redirected to your Shopify store to authorize access.

> **Note:** `ShopifyApplication` requires `CurlSender` and `OAuth2Provider` in its constructor.

| Field | Description |
|---|---|
| `client_id` | Your Shopify app Client ID (Consumer Key) |
| `client_secret` | Your Shopify app Client Secret |
| `shopify_url` | Your Shopify store URL (e.g. `https://my-store.myshopify.com`) |

## Components

| Class | Type | Description |
|---|---|---|
| `ShopifyAbsoluteUpdateStock` | Connector | Absolutely sets inventory level for a location and item via `POST /admin/api/.../inventory_levels/set.json` |
| `ShopifyCreateFulfillment` | Connector | Creates a new fulfillment for a set of fulfillment orders via `POST /admin/api/.../fulfillments.json` |
| `ShopifyCreateFulfillmentEvent` | Connector | Creates a fulfillment event (status update) via `POST /admin/api/.../orders/{id}/fulfillments/{id}/events.json` |
| `ShopifyGetCarrierServices` | Connector | Retrieves all carrier services via `GET /admin/api/.../carrier_services.json` |
| `ShopifyGetFulfillmentOrder` | Connector | Retrieves a single fulfillment order by ID via `GET /admin/api/.../fulfillment_orders/{id}.json` |
| `ShopifyGetFulfillmentOrders` | Connector | Retrieves fulfillment orders for an order via `GET /admin/api/.../orders/{id}/fulfillment_orders.json` |
| `ShopifyGetInventoryLocation` | Connector | Retrieves all inventory locations via `GET /admin/api/.../locations.json` |
| `ShopifyGetOrderDetail` | Connector | Retrieves a single order by ID via `GET /admin/api/.../orders/{id}` |
| `ShopifyGetShippingZones` | Connector | Retrieves all shipping zones via `GET /admin/api/.../shipping_zones.json` |
| `ShopifyGetVariantDetail` | Connector | Retrieves a product variant by ID via `GET /admin/api/.../variants/{id}.json` |
| `ShopifyUpdateOrder` | Connector | Updates fields on an existing order via `PUT /admin/api/.../orders/{id}.json` |
| `ShopifyUpdateTrackingInfo` | Connector | Updates tracking info on a fulfillment via `POST /admin/api/.../fulfillments/{id}/update_tracking.json` |
| `ShopifyGetFulfillmentOrders` (Batch) | Batch | Retrieves fulfillments for a fulfillment order via `GET /admin/api/.../fulfillment_orders/{id}/fulfillments.json` |
| `ShopifyGetFulfillments` | Batch | Retrieves all fulfillment orders for an order via `GET /admin/api/.../orders/{id}/fulfillment_orders.json` |
| `ShopifyGetOrderList` | Batch | Paginates through orders (cursor-based) via `GET /admin/api/.../orders.json?limit=100` |
| `ShopifyGetProductsList` | Batch | Paginates through products (cursor-based) via `GET /admin/api/.../products.json?limit=100` |
| `ShopifyRegisterWebhook` | Batch | Registers webhook subscriptions on the Shopify store via `POST /admin/api/2024-01/webhooks.json` |
| `ShopifyUnregisterWebhook` | Batch | Deletes registered webhooks via `DELETE /admin/api/2024-01/webhooks/{id}.json` |

## Setup

### Credentials

1. Log in to your [Shopify Partner Dashboard](https://partners.shopify.com/) or create a Shopify app in the Shopify Admin.
2. Create a new app and note the **Client ID** and **Client Secret**.
3. Add the Orchesty callback URL to your app's **Allowed redirection URL(s)**.
4. In Orchesty, open the Shopify application settings, enter the credentials and your store URL, then complete the OAuth authorization flow.

### API Documentation

Shopify Admin REST API: [https://shopify.dev/docs/api/admin-rest](https://shopify.dev/docs/api/admin-rest)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-shopify @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-shopify @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import CurlSender from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/CurlSender';
import { OAuth2Provider } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import ShopifyApplication from '@orchesty/connector-shopify/dist/ShopifyApplication';
import ShopifyAbsoluteUpdateStock from '@orchesty/connector-shopify/dist/Connector/ShopifyAbsoluteUpdateStock';
import ShopifyCreateFulfillment from '@orchesty/connector-shopify/dist/Connector/ShopifyCreateFulfillment';
import ShopifyGetOrderDetail from '@orchesty/connector-shopify/dist/Connector/ShopifyGetOrderDetail';
import ShopifyUpdateOrder from '@orchesty/connector-shopify/dist/Connector/ShopifyUpdateOrder';
import ShopifyGetOrderList from '@orchesty/connector-shopify/dist/Batch/ShopifyGetOrderList';
import ShopifyGetProductsList from '@orchesty/connector-shopify/dist/Batch/ShopifyGetProductsList';
import ShopifyRegisterWebhook from '@orchesty/connector-shopify/dist/Batch/ShopifyRegisterWebhook';
import ShopifyUnregisterWebhook from '@orchesty/connector-shopify/dist/Batch/ShopifyUnregisterWebhook';

const app = new ShopifyApplication(container.get(CurlSender), container.get(OAuth2Provider));
container.setApplication(app);
container.setNode(new ShopifyAbsoluteUpdateStock(), app);
container.setNode(new ShopifyCreateFulfillment(), app);
container.setNode(new ShopifyGetOrderDetail(), app);
container.setNode(new ShopifyUpdateOrder(), app);
container.setNode(new ShopifyGetOrderList(), app);
container.setNode(new ShopifyGetProductsList(), app);
container.setNode(new ShopifyRegisterWebhook(), app);
container.setNode(new ShopifyUnregisterWebhook(), app);
// ... register remaining connectors and batches similarly
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
