# Česká pošta Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-ceska-posta?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-ceska-posta)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for Česká pošta, the national postal operator providing a full postal service within the Czech Republic.

## Application Type

**Basic (HMAC-SHA256 signed requests)**

This connector authenticates using an API token and a secret key. Every request is signed with a time-stamped HMAC-SHA256 signature derived from the request body hash, a nonce, and the current Unix timestamp. This is a B2B enterprise API requiring a contracted account with Česká pošta.

| Field | Description |
|---|---|
| `api_token` | Your Česká pošta B2B API token |
| `secret_key` | Your secret key used for HMAC-SHA256 request signing |

## Components

| Class | Type | Description |
|---|---|---|
| `CeskaPostaGetSendParcelsConnector` | Connector | Retrieves results of a parcel send transaction by ID via `GET /sendParcels/idTransaction/{idTransaction}` |
| `CeskaPostaParcelPrintingConnector` | Connector | Generates parcel label printouts (base64 PDF) for given parcel codes via `POST /parcelPrinting` |
| `CeskaPostaParcelStatusConnector` | Connector | Retrieves tracking status and history for a list of parcel IDs via `POST /parcelStatus` |

## Setup

### Credentials

API access to Česká pošta B2B services requires a contractual relationship with Česká pošta. Contact your Česká pošta account representative or the B2B support team to obtain your **API token** and **secret key**.

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-ceska-posta @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-ceska-posta @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import CeskaPostaApplication from '@orchesty/connector-ceska-posta/dist/CeskaPostaApplication';
import CeskaPostaGetSendParcelsConnector from '@orchesty/connector-ceska-posta/dist/Connector/CeskaPostaGetSendParcelsConnector';
import CeskaPostaParcelPrintingConnector from '@orchesty/connector-ceska-posta/dist/Connector/CeskaPostaParcelPrintingConnector';
import CeskaPostaParcelStatusConnector from '@orchesty/connector-ceska-posta/dist/Connector/CeskaPostaParcelStatusConnector';

const app = new CeskaPostaApplication();
container.setApplication(app);
container.setNode(new CeskaPostaGetSendParcelsConnector(), app);
container.setNode(new CeskaPostaParcelPrintingConnector(), app);
container.setNode(new CeskaPostaParcelStatusConnector(), app);
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
