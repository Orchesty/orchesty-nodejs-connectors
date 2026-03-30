# Personio Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-personio?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-personio)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for Personio, an HR software platform that automates and simplifies HR tasks within a single solution.

## Application Type

**Basic (client credentials)**

This connector uses a Client ID and Client Secret to obtain a Bearer token from the Personio authentication endpoint (`GET /v1/auth`) on each request. The application requires a `CurlSender` instance to be injected via its constructor.

| Field | Description |
|---|---|
| `client_id` | Client ID from the Personio API credentials |
| `client_secret` | Client Secret from the Personio API credentials |

## Components

| Class | Type | Description |
|---|---|---|
| `PersonioGetProjectsBatch` | Batch | Fetches all attendance projects in a single request via `GET /company/attendances/projects` |
| `PersonioListEmployeesBatch` | Batch | Paginates through all employees (200 per page) via `GET /company/employees` |

## Setup

### Credentials

1. Log in to your [Personio](https://app.personio.de/) account as an admin.
2. Navigate to **Settings → API credentials** and create a new API key pair.
3. Copy the **Client ID** and **Client Secret**.
4. In Orchesty, open the Personio application settings and fill in both fields.

### API Documentation

Personio API Reference: [https://developer.personio.de/reference/introduction](https://developer.personio.de/reference/introduction)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-personio @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-personio @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container. The `PersonioApplication` requires a `CurlSender` instance:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import CurlSender from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/CurlSender';
import PersonioApplication from '@orchesty/connector-personio/dist/PersonioApplication';
import PersonioGetProjectsBatch from '@orchesty/connector-personio/dist/Batch/PersonioGetProjectsBatch';
import PersonioListEmployeesBatch from '@orchesty/connector-personio/dist/Batch/PersonioListEmployeesBatch';

const app = new PersonioApplication(container.get(CurlSender));
container.setApplication(app);
container.setNode(new PersonioGetProjectsBatch(), app);
container.setNode(new PersonioListEmployeesBatch(), app);
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
