# Money S4 / S5 Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-moneys4-5?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-moneys4-5)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for Money S4 and Money S5, Czech ERP information systems designed to optimize and automate business processes in small and medium-sized enterprises.

## Application Type

**Basic (client credentials)**

This package provides two separate application classes — `MoneyS4Application` and `MoneyS5Application` — that share a common base. Both use an OAuth2 client credentials flow to obtain a Bearer token from the Money REST API (`POST /connect/token`). The token is cached automatically to minimize authentication overhead. Both applications require a `CacheService` instance to be injected via their constructor.

| Field | Description |
|---|---|
| `client_id` | Client ID generated in the Money REST API settings |
| `client_secret` | Client Secret generated in the Money REST API settings |
| `url` | Base URL of your Money S4/S5 REST API instance |

## Components

The connectors in this package work with both Money S4 and Money S5.

| Class | Type | Description |
|---|---|---|
| `MoneyS45CreateCompany` | Connector | Creates a new company record via `POST /v2.0/Company` |
| `MoneyS45CreateIssuedInvoice` | Connector | Creates a new issued invoice via `POST /v2.0/IssuedInvoice` |
| `MoneyS45CreateOrder` | Connector | Creates a received order via `GET /v2.0/ReceivedOrder` |
| `MoneyS45GetCompanies` | Connector | Retrieves a list of companies with optional filtering via `GET /v2.0/Company` |

## Setup

### Credentials

1. In Money S4/S5, navigate to **Administration → Data Exchange → REST API**.
2. Go to **API Configuration** and enable the REST API module, entering the Money Server URL and port.
3. Navigate to **API Keys** and generate a new key, selecting **ClientCredentials** as the authentication type.
4. Copy the generated **Client ID** and **Client Secret**.
5. In Orchesty, open the Money S4 or Money S5 application settings and fill in all three fields.

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-moneys4-5 @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-moneys4-5 @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container. Both applications require a `CacheService` instance:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import CacheService from '@orchesty/nodejs-sdk/dist/lib/Cache/CacheService';
import MoneyS4Application from '@orchesty/connector-moneys4-5/dist/MoneyS4Application';
import MoneyS5Application from '@orchesty/connector-moneys4-5/dist/MoneyS5Application';
import MoneyS45CreateCompany from '@orchesty/connector-moneys4-5/dist/Connector/MoneyS4-5CreateCompany';
import MoneyS45CreateIssuedInvoice from '@orchesty/connector-moneys4-5/dist/Connector/MoneyS4-5CreateIssuedInvoice';
import MoneyS45CreateOrder from '@orchesty/connector-moneys4-5/dist/Connector/MoneyS4-5CreateOrder';
import MoneyS45GetCompanies from '@orchesty/connector-moneys4-5/dist/Connector/MoneyS4-5GetCompanies';

const s4App = new MoneyS4Application(container.get(CacheService));
container.setApplication(s4App);

const s5App = new MoneyS5Application(container.get(CacheService));
container.setApplication(s5App);

// Connectors are shared between both applications
container.setNode(new MoneyS45CreateCompany(), s4App);
container.setNode(new MoneyS45CreateIssuedInvoice(), s4App);
container.setNode(new MoneyS45CreateOrder(), s4App);
container.setNode(new MoneyS45GetCompanies(), s4App);
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
