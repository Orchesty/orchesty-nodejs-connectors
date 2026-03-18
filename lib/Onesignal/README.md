# OneSignal Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-onesignal?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-onesignal)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for OneSignal, the market-leading customer engagement solution offering mobile and web push notifications, in-app messaging, SMS, and email.

## Application Type

**Basic**

This connector authenticates using a REST API key sent as a `Basic` token in the `Authorization` header.

| Field | Description |
|---|---|
| `api_key` | Your OneSignal REST API key |

## Components

| Class | Type | Description |
|---|---|---|
| `OnesignalCreateAppConnector` | Connector | Creates a new OneSignal app via `POST /apps` |
| `OnesignalViewAppsBatch` | Batch | Fetches all OneSignal apps and emits each as a batch item via `GET /apps` |

## Setup

### Credentials

1. Log in to your [OneSignal Dashboard](https://app.onesignal.com/).
2. Navigate to your organization settings and locate the **Organization API Key** (used for app management operations).
3. Copy the key and paste it into the **api_key** field in Orchesty.

### API Documentation

OneSignal REST API Reference: [https://documentation.onesignal.com/reference/](https://documentation.onesignal.com/reference/)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-onesignal @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-onesignal @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import OnesignalApplication from '@orchesty/connector-onesignal/dist/OnesignalApplication';
import OnesignalCreateAppConnector from '@orchesty/connector-onesignal/dist/Connector/OnesignalCreateAppConnector';
import OnesignalViewAppsBatch from '@orchesty/connector-onesignal/dist/Batch/OnesignalViewAppsBatch';

const app = new OnesignalApplication();
container.setApplication(app);
container.setNode(new OnesignalCreateAppConnector(), app);
container.setNode(new OnesignalViewAppsBatch(), app);
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
