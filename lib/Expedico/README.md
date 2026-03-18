# Expedico Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-expedico?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-expedico)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for Expedico, a single point for e-commerce parcel delivery, returns handling, and fulfillment services across Europe.

## Application Type

**Basic**

This connector authenticates using an API key and password encoded as HTTP Basic auth (`api_key:password` Base64-encoded in the `Authorization` header).

| Field | Description |
|---|---|
| `user` | Your Expedico API key (ApiKey) |
| `password` | Your Expedico API password |

## Components

| Class | Type | Description |
|---|---|---|
| `ExpedicoCreateParcel` | Connector | Creates a new parcel shipment via `POST /api/v2/parcels` and returns the parcel ID, carrier barcode, and tracking code |
| `ExpedicoGetCarriers` | Connector | Retrieves the list of available carriers via `GET /api/v2/carriers` |
| `ExpedicoGetTrackingInfo` | Batch | Posts a list of parcel IDs to `POST /api/v2/parcels_tracking` and fans out one batch item per tracking record |

## Setup

### Credentials

1. Log in to your Expedico account at [expedico.eu](https://expedico.eu).
2. Navigate to your account settings or contact your Expedico account representative.
3. Obtain your **API key** and **API password**.
4. In Orchesty, open the Expedico application settings and fill in:
   - **ApiKey** — paste your API key
   - **Password** — paste your API password

### API Documentation

Expedico API Reference: [https://expedico.eu/api-docs/](https://expedico.eu/api-docs/)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-expedico @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-expedico @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import ExpedicoApplication from '@orchesty/connector-expedico/dist/ExpedicoApplication';
import ExpedicoCreateParcel from '@orchesty/connector-expedico/dist/Connector/ExpedicoCreateParcel';
import ExpedicoGetCarriers from '@orchesty/connector-expedico/dist/Connector/ExpedicoGetCarriers';
import ExpedicoGetTrackingInfo from '@orchesty/connector-expedico/dist/Batch/ExpedicoGetTrackingInfo';

const app = new ExpedicoApplication();
container.setApplication(app);
container.setNode(new ExpedicoCreateParcel(), app);
container.setNode(new ExpedicoGetCarriers(), app);
container.setNode(new ExpedicoGetTrackingInfo(), app);
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
