# Merk Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-merk?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-merk)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for Merk (Imper), a Czech company database and marketing tool that provides detailed business information to help users find new opportunities and improve their business.

## Application Type

**Basic**

This connector authenticates using an API key sent as a `Token` in the `Authorization` header.

| Field | Description |
|---|---|
| `api_key` | Your Merk API key |

## Components

| Class | Type | Description |
|---|---|---|
| `MerkGetCompanyConnector` | Connector | Fetches full company details by registration number, VAT number, or other identifiers via `GET /company/` |
| `MerkSuggestConnector` | Connector | Searches and suggests companies by name, email, registration number, or bank account via `GET /suggest/` |

## Setup

### Credentials

1. Register or log in at [merk.cz](https://www.merk.cz/).
2. Navigate to the API section and generate a free or paid API key at [merk.cz/api/about/](https://www.merk.cz/api/about/).
3. Copy your **API key** and paste it into the **Api key** field in Orchesty.

### API Documentation

Merk API Reference: [https://api.merk.cz/docs/](https://api.merk.cz/docs/)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-merk @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-merk @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import MerkApplication from '@orchesty/connector-merk/dist/MerkApplication';
import MerkGetCompanyConnector from '@orchesty/connector-merk/dist/Connector/MerkGetCompanyConnector';
import MerkSuggestConnector from '@orchesty/connector-merk/dist/Connector/MerkSuggestConnector';

const app = new MerkApplication();
container.setApplication(app);
container.setNode(new MerkGetCompanyConnector(), app);
container.setNode(new MerkSuggestConnector(), app);
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
