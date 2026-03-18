# Vyfakturuj Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-vyfakturuj?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-vyfakturuj)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for Vyfakturuj.cz, a Czech online invoicing service for creating and managing invoices and contacts.

## Application Type

**Basic**

This connector authenticates using HTTP Basic auth with your user email and API key (Base64-encoded as `email:apikey`).

| Field | Description |
|---|---|
| `user_email` | Your Vyfakturuj account email address |
| `api_key` | Your Vyfakturuj API key |

## Components

| Class | Type | Description |
|---|---|---|
| `VyfakturujCreateContactConnector` | Connector | Creates a new contact via `POST /contact/` |
| `VyfakturujCreateInvoiceConnector` | Connector | Creates a new invoice via `POST /invoice/` |

## Setup

### Credentials

1. Log in to [Vyfakturuj.cz](https://www.vyfakturuj.cz/).
2. Navigate to **Nastavení → API** (Settings → API) and copy your **API key**.
3. In Orchesty, open the Vyfakturuj application settings and enter your account **email** and **API key**.

### API Documentation

Vyfakturuj API: [https://www.vyfakturuj.cz/napoveda/api/](https://www.vyfakturuj.cz/napoveda/api/)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-vyfakturuj @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-vyfakturuj @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import VyfakturujApplication from '@orchesty/connector-vyfakturuj/dist/VyfakturujApplication';
import VyfakturujCreateContactConnector from '@orchesty/connector-vyfakturuj/dist/Connector/VyfakturujCreateContactConnector';
import VyfakturujCreateInvoiceConnector from '@orchesty/connector-vyfakturuj/dist/Connector/VyfakturujCreateInvoiceConnector';

const app = new VyfakturujApplication();
container.setApplication(app);
container.setNode(new VyfakturujCreateContactConnector(), app);
container.setNode(new VyfakturujCreateInvoiceConnector(), app);
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
