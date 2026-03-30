# Fakturoid Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-fakturoid?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-fakturoid)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for Fakturoid, an online invoicing service for freelancers and small businesses.

## Application Type

**Basic**

This connector authenticates using a username and API key encoded as HTTP Basic auth (`username:api_key` Base64-encoded in the `Authorization` header). Requests are scoped to a specific Fakturoid account (slug).

| Field | Description |
|---|---|
| `account` | Your Fakturoid account slug (subdomain part of your account URL) |
| `user` | Your Fakturoid username (email address) |
| `password` | Your Fakturoid API key |

## Components

| Class | Type | Description |
|---|---|---|
| `FakturoidCreateNewInvoiceConnector` | Connector | Creates a new invoice via `POST /accounts/{account}/invoices.json` |
| `FakturoidCreateNewSubjectConnector` | Connector | Creates a new subject (contact) via `POST /accounts/{account}/subjects.json` |
| `FakturoidGetAccountDetailConnector` | Connector | Retrieves account details via `GET /accounts/{account}/account.json` |

## Setup

### Credentials

1. Log in to your [Fakturoid](https://app.fakturoid.cz) account.
2. Your **account slug** is visible in your account URL (e.g. `https://app.fakturoid.cz/mycompany` → slug is `mycompany`).
3. Navigate to **Settings → User Account → API**.
4. Copy the **API key** shown on that page.
5. In Orchesty, open the Fakturoid application settings and fill in:
   - **Account** — your account slug
   - **Username** — your Fakturoid login email
   - **API key** — paste your API key

### API Documentation

Fakturoid API v3: [https://www.fakturoid.cz/api/v3](https://www.fakturoid.cz/api/v3)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-fakturoid @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-fakturoid @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import FakturoidApplication from '@orchesty/connector-fakturoid/dist/FakturoidApplication';
import FakturoidCreateNewInvoiceConnector from '@orchesty/connector-fakturoid/dist/Connector/FakturoidCreateNewInvoiceConnector';
import FakturoidCreateNewSubjectConnector from '@orchesty/connector-fakturoid/dist/Connector/FakturoidCreateNewSubjectConnector';
import FakturoidGetAccountDetailConnector from '@orchesty/connector-fakturoid/dist/Connector/FakturoidGetAccountDetailConnector';

const app = new FakturoidApplication();
container.setApplication(app);
container.setNode(new FakturoidCreateNewInvoiceConnector(), app);
container.setNode(new FakturoidCreateNewSubjectConnector(), app);
container.setNode(new FakturoidGetAccountDetailConnector(), app);
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
