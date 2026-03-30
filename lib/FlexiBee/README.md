# FlexiBee Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-flexi-bee?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-flexi-bee)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for FlexiBee (ABRA Flexi), a modern economic system designed for small companies.

## Application Type

**Basic**

This connector authenticates against a self-hosted FlexiBee instance using either HTTP Basic auth (username + password) or a JSON session token obtained via the `/login-logout/login.json` endpoint. The session token is cached for up to 30 minutes.

| Field | Description |
|---|---|
| `flexibeeUrl` | Full URL of your FlexiBee instance (e.g. `https://demo.flexibee.eu`) |
| `user` | Your FlexiBee username |
| `password` | Your FlexiBee password |
| `auth` | Authentication method: `json` (session token) or `http` (Basic auth) |

## Components

| Class | Type | Description |
|---|---|---|
| `FlexiBeeCreateFakturaPrijataConnector` | Connector | Creates a received invoice (`faktura-prijata`) |
| `FlexiBeeCreateFakturaPrijataPrilohaConnector` | Connector | Uploads a PDF attachment to a received invoice |
| `FlexiBeeCreateNewContactConnector` | Connector | Creates a new company/contact via the admin endpoint |
| `FlexiBeeCreateObjednavkaVydanaConnector` | Connector | Creates an issued purchase order (`objednavka-vydana`) |
| `FlexiBeeCreateSkladovyPohybConnector` | Connector | Creates a warehouse stock movement (`skladovy-pohyb`) |
| `FlexiBeeCreateZavazekConnector` | Connector | Creates a liability record (`zavazek`) |
| `FlexiBeeCreateZavazekPrilohaConnector` | Connector | Uploads a PDF attachment to a liability record |
| `FlexiBeeGetCenikKartyConnector` | Connector | Fetches pricelist card details by reference URL |
| `FlexiBeeGetCompaniesConnector` | Connector | Lists all companies on the FlexiBee instance |
| `FlexiBeeGetContactsArrayConnector` | Connector | Retrieves an array of contacts (`kontakt.json`) |
| `FlexiBeeGetFakturaPrijataConnector` | Connector | Fetches a single received invoice by ID |
| `FlexiBeeGetObjednavkaVydanaConnector` | Connector | Fetches a single issued order by ID |
| `FlexiBeeGetSarzeExpiraceKartyConnector` | Connector | Fetches batch/expiry records for a stock card |
| `FlexiBeeGetZavazekConnector` | Connector | Fetches a single liability record by ID |
| `FlexiBeeUpdateObjednavkaPrijataConnector` | Connector | Updates a received purchase order |
| `FlexiBeeUpdateSkladovyPohybConnector` | Connector | Updates a warehouse stock movement |
| `FlexiBeeCleneniDphBatch` | Batch | Paginated list of VAT membership classification records |
| `FlexiBeeCleneniKontrolniHlaseniBatch` | Batch | Paginated list of VAT control statement classification records |
| `FlexiBeeFormaDopravyBatch` | Batch | Paginated list of delivery/transport method codelist entries |
| `FlexiBeeFormaUhradyBatch` | Batch | Paginated list of payment method codelist entries |
| `FlexiBeeGetSkladovyPohybBatch` | Batch | Paginated list of warehouse stock movement records |
| `FlexiBeeObjednavkaPrijataBatch` | Batch | Paginated list of received orders |
| `FlexiBeeObjednavkaVydanaBatch` | Batch | Paginated list of issued orders |
| `FlexiBeePredpisZauctovaniBatch` | Batch | Paginated list of accounting posting templates |
| `FlexiBeeSkladoveKartyBatch` | Batch | Paginated list of warehouse stock cards |
| `FlexiBeeStitkyBatch` | Batch | Paginated list of labels/tags |
| `FlexiBeeStrediskoBatch` | Batch | Paginated list of cost centre records |
| `FlexiBeeTypFakturyPrijateBatch` | Batch | Paginated list of received invoice types |
| `FlexiBeeUcetBatch` | Batch | Paginated list of chart of accounts entries |
| `FlexiBeeZakazkaBatch` | Batch | Paginated list of job/project (zakázka) records |

## Setup

### Credentials

FlexiBee is a self-hosted application. You need your own FlexiBee instance to use this connector. Contact your system administrator or [ABRA Software](https://www.flexibee.eu) for a developer licence and API access.

In Orchesty, fill in:
- **flexibeeUrl** — the full URL of your FlexiBee installation
- **user** / **password** — your FlexiBee login credentials
- **auth** — set to `json` for session token auth (recommended) or `http` for Basic auth

### API Documentation

FlexiBee REST API: [https://www.flexibee.eu/api/](https://www.flexibee.eu/api/)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-flexi-bee @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-flexi-bee @orchesty/nodejs-sdk
```

The `FlexiBeeApplication` requires `CurlSender` and `DatabaseClient` from the SDK:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import CurlSender from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/CurlSender';
import DatabaseClient from '@orchesty/nodejs-sdk/dist/lib/Storage/Database/Client';
import FlexiBeeApplication from '@orchesty/connector-flexi-bee/dist/FexiBeeApplication';
import FlexiBeeCreateFakturaPrijataConnector from '@orchesty/connector-flexi-bee/dist/Connector/FlexiBeeCreateFakturaPrijataConnector';
import FlexiBeeGetCompaniesConnector from '@orchesty/connector-flexi-bee/dist/Connector/FlexiBeeGetCompaniesConnector';
import FlexiBeeObjednavkaPrijataBatch from '@orchesty/connector-flexi-bee/dist/Batch/FlexiBeeObjednavkaPrijataBatch';

const app = new FlexiBeeApplication(container.get(CurlSender), container.get(DatabaseClient));
container.setApplication(app);
container.setNode(new FlexiBeeCreateFakturaPrijataConnector(), app);
container.setNode(new FlexiBeeGetCompaniesConnector(), app);
container.setNode(new FlexiBeeObjednavkaPrijataBatch(), app);
// ... register additional connectors and batches as needed
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
