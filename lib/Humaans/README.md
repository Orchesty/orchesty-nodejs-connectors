# Humaans Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-humaans?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-humaans)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for Humaans, an HR platform for onboarding, managing, and growing employees with workflows, time-off tracking, and analytics.

## Application Type

**Basic**

This connector authenticates using an application token sent as a Bearer token in the `Authorization` header.

| Field | Description |
|---|---|
| `application_token` | Your Humaans application token |

## Components

| Class | Type | Description |
|---|---|---|
| `HumaansListCompaniesBatch` | Batch | Paginates through all companies (100 per page) via `GET /companies` |
| `HumaansListPeopleBatch` | Batch | Paginates through all people/employees (100 per page) via `GET /people` |

## Setup

### Credentials

1. Log in to your [Humaans](https://app.humaans.io) account.
2. Navigate to **Settings → Integrations → API**.
3. Generate a new API token.
4. Copy the token and paste it into the **Application token** field in Orchesty.

### API Documentation

Humaans API Documentation: [https://docs.humaans.io/](https://docs.humaans.io/)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-humaans @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-humaans @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import HumaansApplication from '@orchesty/connector-humaans/dist/HumaansApplication';
import HumaansListCompaniesBatch from '@orchesty/connector-humaans/dist/Batch/HumaansListCompaniesBatch';
import HumaansListPeopleBatch from '@orchesty/connector-humaans/dist/Batch/HumaansListPeopleBatch';

const app = new HumaansApplication();
container.setApplication(app);
container.setNode(new HumaansListCompaniesBatch(), app);
container.setNode(new HumaansListPeopleBatch(), app);
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
