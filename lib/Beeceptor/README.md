# Beeceptor Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-beeceptor?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-beeceptor)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for Beeceptor, an online mock API server that lets you deploy a mock API in seconds — no downloads, no dependencies, no delays.

## Application Type

**Basic**

This connector authenticates against any Beeceptor endpoint URL. User and password are optional and used only when the mock endpoint requires HTTP Basic authentication.

| Field | Description |
|---|---|
| `url` | The full Beeceptor endpoint URL (e.g. `https://my-endpoint.free.beeceptor.com`) |
| `user` | Optional username for Basic authentication |
| `password` | Optional password for Basic authentication |

## Components

This package provides only the `BeeceptorApplication` class. It is intended as a foundation for building custom connectors that target Beeceptor mock endpoints during development and testing — no pre-built connectors or batch nodes are included.

## Setup

### Credentials

1. Sign up or log in at [beeceptor.com](https://beeceptor.com).
2. Create a new endpoint — a unique URL will be generated (e.g. `https://my-app.free.beeceptor.com`).
3. In Orchesty, open the Beeceptor application settings and fill in:
   - **Url** — paste your Beeceptor endpoint URL
   - **User** and **Password** — only if your endpoint requires Basic auth (optional)

### API Documentation

Beeceptor Documentation: [https://beeceptor.com/docs/](https://beeceptor.com/docs/)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-beeceptor @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-beeceptor @orchesty/nodejs-sdk
```

Register the application in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import BeeceptorApplication from '@orchesty/connector-beeceptor/dist/BeeceptorApplication';

const app = new BeeceptorApplication();
container.setApplication(app);
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
