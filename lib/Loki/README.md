# Loki Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-loki?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-loki)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for Grafana Loki, an open-source log aggregation system that uses a small index and highly compressed chunks to simplify operations and significantly lower storage costs.

## Application Type

**Basic**

This connector supports optional HTTP Basic authentication (username + password). Authentication is not required for deployments that are accessible without credentials. An optional `X-Scope-OrgID` tenant header can be configured for multi-tenant Loki setups.

| Field | Description |
|---|---|
| `url` | Full URL of your Loki instance (e.g. `http://loki:3100`) |
| `tenant` | Tenant ID for multi-tenant Loki deployments (optional) |
| `user` | Username for HTTP Basic authentication (optional) |
| `password` | Password for HTTP Basic authentication (optional) |

## Components

| Class | Type | Description |
|---|---|---|
| `LokiGetQueryListBatch` | Batch | Executes a LogQL range query and paginates through results via `GET /loki/api/v1/query_range` |

## Setup

### Credentials

1. Ensure your Loki instance is running and accessible from Orchesty.
2. If your Loki deployment requires authentication, provide a username and password.
3. For multi-tenant Grafana Cloud setups, enter your **Tenant ID** (also called `X-Scope-OrgID`).
4. In Orchesty, fill in the **Url** field with the base URL of your Loki instance.

### API Documentation

Grafana Loki HTTP API: [https://grafana.com/docs/loki/latest/reference/loki-http-api/](https://grafana.com/docs/loki/latest/reference/loki-http-api/)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-loki @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-loki @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import LokiApplication from '@orchesty/connector-loki/dist/LokiApplication';
import LokiGetQueryListBatch from '@orchesty/connector-loki/dist/Batch/LokiGetQueryListBatch';

const app = new LokiApplication();
container.setApplication(app);
container.setNode(new LokiGetQueryListBatch(), app);
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
