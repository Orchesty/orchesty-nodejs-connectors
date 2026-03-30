# GO balik Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-gobalik?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-gobalik)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for GO balik, a transport service for parcels and pallets within the Czech Republic and neighbouring countries.

## Application Type

**Basic**

This connector authenticates using a username and password encoded as HTTP Basic auth in the `Authorization` header.

| Field | Description |
|---|---|
| `user` | Your GO balik username (email) |
| `password` | Your GO balik API password |

## Components

| Class | Type | Description |
|---|---|---|
| `GObalikCreateOrderConnector` | Connector | Creates a new shipment order via `POST /api/v1/order/` |
| `GObalikOrderListConnector` | Connector | Retrieves a list of orders filtered by date range and optional ID via `GET /api/v1/order` |
| `GObalikOrderDetailConnector` | Connector | Retrieves full detail of a single order by hash via `GET /api/v1/order/{hash}` |

## Setup

### Credentials

1. Log in to your [GO balik](https://www.go-balik.cz) account.
2. Navigate to **Nastavení** (Settings) and locate your API credentials.
3. Copy your **username** (email) and **API token** and paste them into the corresponding fields in Orchesty.

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-gobalik @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-gobalik @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import GObalikApplication from '@orchesty/connector-gobalik/dist/GObalikApplication';
import GObalikCreateOrderConnector from '@orchesty/connector-gobalik/dist/Connectors/GObalikCreateOrderConnector';
import GObalikOrderListConnector from '@orchesty/connector-gobalik/dist/Connectors/GObalikOrderListConnector';
import GObalikOrderDetailConnector from '@orchesty/connector-gobalik/dist/Connectors/GObalikOrderDetailConnector';

const app = new GObalikApplication();
container.setApplication(app);
container.setNode(new GObalikCreateOrderConnector(), app);
container.setNode(new GObalikOrderListConnector(), app);
container.setNode(new GObalikOrderDetailConnector(), app);
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
