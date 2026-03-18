# Fabis Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-fabis?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-fabis)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for Fabis, an application for managing employee training, medical examinations, and workplace incidents in a single platform.

## Application Type

**Basic (client credentials)**

This connector extends Basic application but internally uses a client credentials OAuth2 token flow. It exchanges a Client ID and Client Secret for a Bearer access token, which is cached and automatically refreshed before expiry.

| Field | Description |
|---|---|
| `client_id` | Your Fabis client ID |
| `client_secret` | Your Fabis client secret |

## Components

| Class | Type | Description |
|---|---|---|
| `FabisImportBatchConnector` | Connector | Batch-imports an array of employee records (personal data, employment, addresses) via `POST /api/v1/Import/Batch` |

## Setup

### Credentials

Access to the Fabis API requires a contractual arrangement. Contact your Fabis/Precontrol account representative to obtain your **client ID** and **client secret** for API access at `api.precontrol.cz`.

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-fabis @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-fabis @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import CacheService from '@orchesty/nodejs-sdk/dist/lib/Cache/CacheService';
import FabisApplication from '@orchesty/connector-fabis/dist/FabisApplication';
import FabisImportBatchConnector from '@orchesty/connector-fabis/dist/Connector/FabisImportBatchConnector';

const app = new FabisApplication(container.get(CacheService));
container.setApplication(app);
container.setNode(new FabisImportBatchConnector(), app);
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
