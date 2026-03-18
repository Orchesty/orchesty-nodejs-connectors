# PayPal Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-paypal?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-paypal)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for PayPal, one of the most widely used online payment platforms, enabling order creation, payouts, and product catalogue management.

## Application Type

**Basic (client credentials)**

This connector uses a Client ID and Client Secret to obtain a Bearer access token from the PayPal OAuth2 endpoint (`POST /v1/oauth2/token`) on each request. The application requires a `CurlSender` instance to be injected via its constructor.

| Field | Description |
|---|---|
| `client_id` | Client ID from the PayPal Developer Dashboard |
| `client_secret` | Client Secret from the PayPal Developer Dashboard |

## Components

| Class | Type | Description |
|---|---|---|
| `PaypalCreateOrderConnector` | Connector | Creates a new PayPal checkout order via `POST /v2/checkout/orders` |
| `PaypalCreatePayoutConnector` | Connector | Initiates a payout to one or more recipients via `POST /v1/payments/payouts` |
| `PaypalCreateProductConnector` | Connector | Creates a new product in the PayPal catalogue via `POST /v1/catalogs/products` |

## Setup

### Credentials

1. Log in to the [PayPal Developer Dashboard](https://developer.paypal.com/dashboard/).
2. Navigate to **Apps & Credentials** and open or create your app.
3. Copy the **Client ID** and **Client Secret** for your app.
4. In Orchesty, open the PayPal application settings and fill in both fields.

### API Documentation

PayPal REST API: [https://developer.paypal.com/docs/api/overview/](https://developer.paypal.com/docs/api/overview/)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-paypal @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-paypal @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container. The `PaypalApplication` requires a `CurlSender` instance:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import CurlSender from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/CurlSender';
import PaypalApplication from '@orchesty/connector-paypal/dist/PaypalApplication';
import PaypalCreateOrderConnector from '@orchesty/connector-paypal/dist/Connector/PaypalCreateOrderConnector';
import PaypalCreatePayoutConnector from '@orchesty/connector-paypal/dist/Connector/PaypalCreatePayoutConnector';
import PaypalCreateProductConnector from '@orchesty/connector-paypal/dist/Connector/PaypalCreateProductConnector';

const app = new PaypalApplication(container.get(CurlSender));
container.setApplication(app);
container.setNode(new PaypalCreateOrderConnector(), app);
container.setNode(new PaypalCreatePayoutConnector(), app);
container.setNode(new PaypalCreateProductConnector(), app);
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
