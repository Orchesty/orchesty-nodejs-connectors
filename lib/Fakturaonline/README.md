# FakturaOnline Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-fakturaonline?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-fakturaonline)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for FakturaOnline.cz, an online invoicing software for businesses and freelancers.

## Application Type

**Basic**

This connector authenticates using an API key sent as a Bearer token in the `Authorization` header.

| Field | Description |
|---|---|
| `api_key` | Your FakturaOnline.cz API key |

## Components

| Class | Type | Description |
|---|---|---|
| `FakturaonlineCreateNewInvoiceConnector` | Connector | Creates a new invoice via `POST /v0/invoices` |
| `FakturaonlineGetInvoiceConnector` | Connector | Retrieves a single invoice by ID via `GET /v0/invoices/{id}` |
| `FakturaonlineUpdateInvoiceConnector` | Connector | Updates an existing invoice by ID via `PUT /v0/invoices/{id}` |

## Setup

### Credentials

1. Log in to your [FakturaOnline.cz](https://www.fakturaonline.cz) account.
2. Navigate to **Settings → API** (or contact FakturaOnline support to obtain API access).
3. Copy your **API key** and paste it into the **API key** field in Orchesty.

### API Documentation

FakturaOnline API Reference: [https://api.fakturaonline.cz/](https://api.fakturaonline.cz/)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-fakturaonline @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-fakturaonline @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import FakturaonlineApplication from '@orchesty/connector-fakturaonline/dist/FakturaonlineApplication';
import FakturaonlineCreateNewInvoiceConnector from '@orchesty/connector-fakturaonline/dist/Connector/FakturaonlineCreateNewInvoiceConnector';
import FakturaonlineGetInvoiceConnector from '@orchesty/connector-fakturaonline/dist/Connector/FakturaonlineGetInvoiceConnector';
import FakturaonlineUpdateInvoiceConnector from '@orchesty/connector-fakturaonline/dist/Connector/FakturaonlineUpdateInvoiceConnector';

const app = new FakturaonlineApplication();
container.setApplication(app);
container.setNode(new FakturaonlineCreateNewInvoiceConnector(), app);
container.setNode(new FakturaonlineGetInvoiceConnector(), app);
container.setNode(new FakturaonlineUpdateInvoiceConnector(), app);
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
