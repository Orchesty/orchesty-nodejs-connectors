# Stripe Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-stripe?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-stripe)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for Stripe, a developer-friendly payment platform for accepting and managing online payments.

## Application Type

**Basic**

This connector authenticates using a Stripe API key sent as a Bearer token in the `Authorization` header. Requests use `application/x-www-form-urlencoded` content type as required by the Stripe API.

| Field | Description |
|---|---|
| `api_key` | Your Stripe secret API key |

## Components

| Class | Type | Description |
|---|---|---|
| `StripeCreatePaymentConnector` | Connector | Creates a charge/payment via `POST https://api.stripe.com/v1/charges`; requires `amount`, `currency`, `source`, and `description` in the input |

## Setup

### Credentials

1. Log in to the [Stripe Dashboard](https://dashboard.stripe.com/).
2. Navigate to **Developers → API keys**.
3. Copy your **Secret key** (starts with `sk_live_` for production or `sk_test_` for testing).
4. In Orchesty, open the Stripe application settings and paste the key into the **API Key** field.

> Use `sk_test_` keys during development to avoid real charges.

### API Documentation

Stripe API: [https://stripe.com/docs/api/charges/create](https://stripe.com/docs/api/charges/create)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-stripe @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-stripe @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import StripeApplication from '@orchesty/connector-stripe/dist/StripeApplication';
import StripeCreatePaymentConnector from '@orchesty/connector-stripe/dist/Connector/StripeCreatePaymentConnector';

const app = new StripeApplication();
container.setApplication(app);
container.setNode(new StripeCreatePaymentConnector(), app);
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
