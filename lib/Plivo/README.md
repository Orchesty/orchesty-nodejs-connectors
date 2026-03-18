# Plivo Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-plivo?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-plivo)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for Plivo, a cloud-based communication platform that allows businesses to send and receive SMS and WhatsApp messages in over 190 countries.

## Application Type

**Basic**

This connector authenticates using an Auth ID and Auth Token encoded as HTTP Basic auth (`auth_id:auth_token` Base64-encoded in the `Authorization` header).

| Field | Description |
|---|---|
| `Authorization_id` | Your Plivo Auth ID |
| `Authorization_token` | Your Plivo Auth Token |

## Components

| Class | Type | Description |
|---|---|---|
| `PlivoSendSMSConector` | Connector | Sends an SMS message via `POST /v1/Account/{auth_id}/Message/` |

## Setup

### Credentials

1. Log in to the [Plivo Console](https://console.plivo.com/).
2. On the dashboard, find your **Auth ID** and **Auth Token**.
3. In Orchesty, open the Plivo application settings and enter both values.

### API Documentation

Plivo Messaging API: [https://www.plivo.com/docs/messaging/api/message/](https://www.plivo.com/docs/messaging/api/message/)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-plivo @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-plivo @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import PlivoApplication from '@orchesty/connector-plivo/dist/PlivoApplication';
import PlivoSendSMSConector from '@orchesty/connector-plivo/dist/Connector/PlivoSendSMSConector';

const app = new PlivoApplication();
container.setApplication(app);
container.setNode(new PlivoSendSMSConector(), app);
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
