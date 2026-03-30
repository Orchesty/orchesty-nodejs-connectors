# Sage HR Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-sage-hr?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-sage-hr)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for Sage HR, a cloud-based human resources management solution that helps you remotely track, manage, and engage your employees.

## Application Type

**Basic**

This connector authenticates using an API key sent via the `X-Auth-Token` header. The base URL is built dynamically from your company subdomain: `https://{subdomain}.sage.hr/api/`.

| Field | Description |
|---|---|
| `subdomain` | Your Sage HR company subdomain (e.g. `my-company`) |
| `api_key` | Your Sage HR API key |

## Components

| Class | Type | Description |
|---|---|---|
| `SageHrGetProjectsBatch` | Batch | Paginates through all timesheet projects via `GET /timesheets/projects` |
| `SageHrListEmployeesBatch` | Batch | Paginates through all employees via `GET /employees` |

## Setup

### Credentials

1. Log in to your [Sage HR](https://sagehr.com/) account as an admin.
2. Navigate to **Settings → Integrations → API** and click **Enable API Access**.
3. Copy the generated **API key**.
4. Your **subdomain** is the part of your Sage HR URL before `.sage.hr` (e.g. `my-company` from `my-company.sage.hr`).
5. In Orchesty, open the Sage HR application settings and fill in both fields.

### API Documentation

Sage HR Developer Portal: [https://developer.sage.com/hr/](https://developer.sage.com/hr/)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-sage-hr @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-sage-hr @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import SageHrApplication from '@orchesty/connector-sage-hr/dist/SageHrApplication';
import SageHrGetProjectsBatch from '@orchesty/connector-sage-hr/dist/Batch/SageHrGetProjectsBatch';
import SageHrListEmployeesBatch from '@orchesty/connector-sage-hr/dist/Batch/SageHrListEmployeesBatch';

const app = new SageHrApplication();
container.setApplication(app);
container.setNode(new SageHrGetProjectsBatch(), app);
container.setNode(new SageHrListEmployeesBatch(), app);
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
