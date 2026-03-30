# WooCommerce Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-woocommerce?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-woocommerce)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for WooCommerce, the open-source e-commerce plugin for WordPress used by small to large online merchants.

## Application Type

**Basic**

This connector authenticates using HTTP Basic auth (Consumer Key + Consumer Secret, Base64-encoded). The store URL is configurable per instance.

| Field | Description |
|---|---|
| `user` | Your WooCommerce Consumer Key |
| `password` | Your WooCommerce Consumer Secret |
| `woocommerceUrl` | Your WordPress store URL (e.g. `https://my-store.com`) |

## Components

| Class | Type | Description |
|---|---|---|
| `WooCommerceAddNote` | Connector | Adds a note to an order via `POST /wp-json/wc/v3/orders/{id}/notes` |
| `WooCommerceCreateProduct` | Connector | Creates a new product via `POST /wp-json/wc/v3/products` |
| `WooCommerceCreateProductCategory` | Connector | Creates a product category via `POST /wp-json/wc/v3/products/categories` |
| `WooCommerceGetOrderNotes` | Connector | Retrieves notes for an order via `GET /wp-json/wc/v3/orders/{id}/notes` |
| `WooCommerceGetOrderStatuses` | Connector | Retrieves available order statuses via `GET /wp-json/wc/v3/reports/orders/totals` |
| `WooCommerceGetPaymentGateways` | Connector | Lists payment gateways via `GET /wp-json/wc/v3/payment_gateways` |
| `WooCommerceGetProduct` | Connector | Fetches a single product by ID via `GET /wp-json/wc/v3/products/{id}` |
| `WooCommerceGetProductVariant` | Connector | Fetches a product variation by ID via `GET /wp-json/wc/v3/products/{productId}/variations/{id}` |
| `WooCommerceGetProductsBySku` | Connector | Finds a product by SKU via `GET /wp-json/wc/v3/products?sku={sku}` |
| `WooCommerceGetSettingsGeneral` | Connector | Retrieves general settings via `GET /wp-json/wc/v3/settings/general` |
| `WooCommerceGetShippingMethods` | Connector | Lists all shipping methods across zones via `GET /wp-json/wc/v3/shipping/zones` |
| `WooCommerceRegisterWebhook` | Connector | Batch-registers webhooks via `POST /wp-json/wc/v3/webhooks/batch` |
| `WooCommerceUnsubscribeWebhooks` | Connector | Batch-deletes registered webhooks via `POST /wp-json/wc/v3/webhooks/batch` |
| `WooCommerceUpdateOrder` | Connector | Updates an existing order via `PUT /wp-json/wc/v3/orders/{id}` |
| `WooCommerceUpdateProduct` | Connector | Updates an existing product via `PUT /wp-json/wc/v3/products/{id}` |
| `WooCommerceUpdateProductQuantity` | Connector | Batch-updates variation stock quantities via `POST /wp-json/wc/v3/products/{productId}/variations/batch` |
| `WooCommerceUpdateProductVariant` | Connector | Updates a product variation via `PUT /wp-json/wc/v3/products/{productId}/variations/{id}` |
| `WooCommerceGetOrders` | Batch | Paginates through orders (100 per page) via `GET /wp-json/wc/v3/orders` |
| `WooCommerceGetProducts` | Batch | Paginates through products (100 per page) via `GET /wp-json/wc/v3/products` |
| `WooCommerceGetVariants` | Batch | Paginates through product variations (100 per page) via `GET /wp-json/wc/v3/products/{id}/variations/` |

## Setup

### Credentials

1. Log in to your WordPress admin and navigate to **WooCommerce → Settings → Advanced → REST API**.
2. Click **Add key**, set **Permissions** to `Read/Write`, and generate the key.
3. Copy the **Consumer Key** and **Consumer Secret**.
4. In Orchesty, open the WooCommerce application settings and enter the Consumer Key as **User**, the Consumer Secret as **Password**, and your store URL.

### API Documentation

WooCommerce REST API: [https://woocommerce.github.io/woocommerce-rest-api-docs/](https://woocommerce.github.io/woocommerce-rest-api-docs/)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-woocommerce @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-woocommerce @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import WooCommerceApplication from '@orchesty/connector-woocommerce/dist/WooCommerceApplication';
import WooCommerceGetOrders from '@orchesty/connector-woocommerce/dist/Batch/WooCommerceGetOrders';
import WooCommerceGetProducts from '@orchesty/connector-woocommerce/dist/Batch/WooCommerceGetProducts';
import WooCommerceUpdateOrder from '@orchesty/connector-woocommerce/dist/Connector/WooCommerceUpdateOrder';
import WooCommerceUpdateProduct from '@orchesty/connector-woocommerce/dist/Connector/WooCommerceUpdateProduct';
import WooCommerceCreateProduct from '@orchesty/connector-woocommerce/dist/Connector/WooCommerceCreateProduct';

const app = new WooCommerceApplication();
container.setApplication(app);
container.setNode(new WooCommerceGetOrders(), app);
container.setNode(new WooCommerceGetProducts(), app);
container.setNode(new WooCommerceUpdateOrder(), app);
container.setNode(new WooCommerceUpdateProduct(), app);
container.setNode(new WooCommerceCreateProduct(), app);
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
