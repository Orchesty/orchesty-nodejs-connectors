# Pinya HR Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-pinya?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-pinya)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for Pinya HR, a Czech HR management system for employee administration, attendance tracking, and absence management.

## Application Type

**Basic (cached token with auto-refresh)**

This connector authenticates using a Tenant GUID, Secret Key, and Secret Key Identifier. An access token is obtained from the Pinya authentication endpoint and cached automatically using `CacheService`. The token is refreshed before expiry. The application requires a `CacheService` instance to be injected via its constructor.

| Field | Description |
|---|---|
| `tenantGuid` | Your Pinya HR tenant GUID |
| `secretKey` | Your Pinya HR secret key |
| `secretKeyIdentifier` | Your Pinya HR secret key identifier |

## Components

| Class | Type | Description |
|---|---|---|
| `PinyaJobTitlesConnector` | Connector | Fetches up to 150 job titles via `GET /system/job-titles` |
| `PinyaAbsencesBatch` | Batch | Paginates through all employee absences (50 per page) via `GET /absences` |
| `PinyaEmployeesBatch` | Batch | Paginates through all employees (50 per page) via `GET /employees` |

## Setup

### Credentials

1. Log in to your [Pinya HR](https://cloud.pinya.hr/) account.
2. Navigate to the API settings and generate your integration credentials: **Tenant GUID**, **Secret Key**, and **Secret Key Identifier**.
3. In Orchesty, open the Pinya HR application settings and fill in all three fields.

For more information on API access, see the [Pinya HR API module page](https://www.pinya.hr/funkce-a-moduly/api).

### API Documentation

Pinya HR API: [https://api.pinya.hr/index.html](https://api.pinya.hr/index.html)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-pinya @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-pinya @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container. The `PinyaApplication` requires a `CacheService` instance:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import CacheService from '@orchesty/nodejs-sdk/dist/lib/Cache/CacheService';
import PinyaApplication from '@orchesty/connector-pinya/dist/PinyaApplication';
import PinyaJobTitlesConnector from '@orchesty/connector-pinya/dist/Connector/PinyaJobTitlesConnector';
import PinyaAbsencesBatch from '@orchesty/connector-pinya/dist/Batch/PinyaAbsencesBatch';
import PinyaEmployeesBatch from '@orchesty/connector-pinya/dist/Batch/PinyaEmployeesBatch';

const app = new PinyaApplication(container.get(CacheService));
container.setApplication(app);
container.setNode(new PinyaJobTitlesConnector(), app);
container.setNode(new PinyaAbsencesBatch(), app);
container.setNode(new PinyaEmployeesBatch(), app);
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
