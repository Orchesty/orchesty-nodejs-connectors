# Shipstation Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-shipstation?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-shipstation)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for ShipStation, a subscription-based shipping and order management software for e-commerce.

## Application Type

**Basic (Webhook)**

This connector implements `IWebhookApplication` and uses HTTP Basic authentication with a Base64-encoded API Key and API Secret. Incoming webhooks from ShipStation trigger order processing flows.

| Field | Description |
|---|---|
| `user` | Your ShipStation API Key |
| `password` | Your ShipStation API Secret |

## Components

| Class | Type | Description |
|---|---|---|
| `ShipstationNewOrderConnector` | Connector | Handles `ORDER_NOTIFY` webhook events by fetching the full order from the `resource_url` provided in the webhook payload via `GET` |

## Setup

### Credentials

1. Log in to [ShipStation](https://app.shipstation.com/).
2. Navigate to **Account → API Settings** (or **Settings → Integrations → API**).
3. Copy your **API Key** and **API Secret**.
4. In Orchesty, open the ShipStation application settings, enter both values, and complete the webhook registration flow.

### Webhooks

This connector uses ShipStation's webhook system. After authorization, use the Orchesty webhook registration to subscribe to the `ORDER_NOTIFY` event. ShipStation will POST to your Orchesty webhook URL when new orders arrive, and the connector fetches the full order payload using the `resource_url` from the webhook body.

### API Documentation

ShipStation API: [https://www.shipstation.com/docs/api/](https://www.shipstation.com/docs/api/)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-shipstation @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-shipstation @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import ShipstationApplication from '@orchesty/connector-shipstation/dist/ShipstationApplication';
import ShipstationNewOrderConnector from '@orchesty/connector-shipstation/dist/Connector/ShipstationNewOrderConnector';

const app = new ShipstationApplication();
container.setApplication(app);
container.setNode(new ShipstationNewOrderConnector(), app);
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
