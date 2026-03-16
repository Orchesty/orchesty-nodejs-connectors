# Alza Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-alza?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-alza)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for Alza, one of the largest online consumer electronics retailers and marketplaces in Central Europe.

## Application Type

**Basic**

This connector authenticates using HMAC-SHA1 request signing. Each request is signed with a token derived from your client ID, secret, and a timestamp, appended as a query parameter.

| Field | Description |
|---|---|
| `Client` | Your Alza partner client ID |
| `Secret` | Your Alza partner secret used for HMAC-SHA1 request signing |
| `Server` | Base URL of the Alza API server (e.g. `https://marketplace.alza.cz`) |
| `Api path` | API path prefix (default: `/rest/api/v1`) |

## Components

| Class | Type | Description |
|---|---|---|
| `AlzaCancelOrderConnector` | Connector | Cancels an existing order via `DELETE /order/{orderId}` |
| `AlzaConfirmOrderConnector` | Connector | Confirms an order with shipping and delivery details via `POST /order/{orderId}/confirm` |
| `AlzaCreateShipmentConnector` | Connector | Creates a shipment via `POST /shipment` |
| `AlzaInsetrOrderConnector` | Connector | Inserts a new order with items and pricing via `POST /order/{orderId}` |
| `AlzaTrackAndTraceConnector` | Connector | Sends a track & trace status update for a package via `POST /track` |

## Setup

### Credentials

1. Contact Alza partner support to obtain your **Client ID** and **Secret** for API access.
2. Confirm the correct **Server** URL for your market (e.g. `https://marketplace.alza.cz` for Czech Republic).
3. In Orchesty, open the Alza application settings and fill in:
   - **Client** — paste your partner client ID
   - **Secret** — paste your partner secret
   - **Server** — paste the API server base URL
   - **Api path** — leave as `/rest/api/v1` unless instructed otherwise by Alza

### API Documentation

Alza Marketplace API Reference: [https://trade.alza.cz/en/info/api](https://trade.alza.cz/en/info/api)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-alza @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-alza @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import AlzaApplication from '@orchesty/connector-alza/dist/AlzaApplication';
import AlzaCancelOrderConnector from '@orchesty/connector-alza/dist/Connector/AlzaCancelOrderConnector';
import AlzaConfirmOrderConnector from '@orchesty/connector-alza/dist/Connector/AlzaConfirmOrderConnector';
import AlzaCreateShipmentConnector from '@orchesty/connector-alza/dist/Connector/AlzaCreateShipmentConnector';
import AlzaInsetrOrderConnector from '@orchesty/connector-alza/dist/Connector/AlzaInsetrOrderConnector';
import AlzaTrackAndTraceConnector from '@orchesty/connector-alza/dist/Connector/AlzaTrackAndTraceConnector';

const alzaApp = new AlzaApplication();
container.setApplication(alzaApp);
container.setNode(new AlzaCancelOrderConnector(), alzaApp);
container.setNode(new AlzaConfirmOrderConnector(), alzaApp);
container.setNode(new AlzaCreateShipmentConnector(), alzaApp);
container.setNode(new AlzaInsetrOrderConnector(), alzaApp);
container.setNode(new AlzaTrackAndTraceConnector(), alzaApp);
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
