# Customer.io Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-customer-io?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-customer-io)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for Customer.io, an automated messaging platform for tech-savvy marketers to send data-driven emails, push notifications, in-app messages, and SMS.

## Application Type

**Basic**

This connector authenticates using a Site ID and API Key encoded as HTTP Basic auth (`site_id:api_key` Base64-encoded in the `Authorization` header).

| Field | Description |
|---|---|
| `site_id` | Your Customer.io site ID |
| `api_key` | Your Customer.io API key |

## Components

| Class | Type | Description |
|---|---|---|
| `CustomerIoAddCustomer` | Connector | Creates or updates a customer record by identifier via `PUT /customers/{identifier}` |

## Setup

### Credentials

1. Log in to your Customer.io account.
2. Navigate to **Settings → Account Settings → API Credentials**.
3. Copy your **Site ID** and **API Key** from the Tracking API section.
4. In Orchesty, open the Customer.io application settings and fill in:
   - **site id** — paste your Site ID
   - **api key** — paste your API Key

### API Documentation

Customer.io Track API Reference: [https://customer.io/docs/api/track/](https://customer.io/docs/api/track/)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-customer-io @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-customer-io @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import CustomerIoApplication from '@orchesty/connector-customer-io/dist/CustomerIoApplication';
import CustomerIoAddCustomer from '@orchesty/connector-customer-io/dist/Connector/CustomerIoAddCustomer';

const app = new CustomerIoApplication();
container.setApplication(app);
container.setNode(new CustomerIoAddCustomer(), app);
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
