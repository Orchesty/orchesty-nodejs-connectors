# Wedo Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-wedo?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-wedo)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for Wedo (InTime bridge), a Czech logistics and parcel shipment tracking platform.

## Application Type

**Basic**

This connector authenticates using a username and password encoded as a Base64 credential in the `Authorization` header.

| Field | Description |
|---|---|
| `userName` | Your Wedo/InTime bridge username |
| `password` | Your Wedo/InTime bridge password |

## Components

| Class | Type | Description |
|---|---|---|
| `WedoGetPackageBatch` | Batch | Fetches all packages via `GET /package` and emits each as a batch item |

## Setup

### Credentials

1. Contact your Wedo/InTime account manager to obtain API access credentials.
2. In Orchesty, open the Wedo application settings and enter your **username** and **password**.

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-wedo @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-wedo @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import WedoApplication from '@orchesty/connector-wedo/dist/WedoApplication';
import WedoGetPackageBatch from '@orchesty/connector-wedo/dist/Batch/WedoGetPackageBatch';

const app = new WedoApplication();
container.setApplication(app);
container.setNode(new WedoGetPackageBatch(), app);
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
