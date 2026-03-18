# Vonage Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-vonage?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-vonage)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for Vonage (formerly Nexmo), a cloud communication platform for sending SMS, voice calls, and messaging via API.

## Application Type

**Basic**

This connector authenticates using an API Key and API Secret passed as query parameters in each request (no `Authorization` header is used).

| Field | Description |
|---|---|
| `Api_Key` | Your Vonage API Key |
| `Api_secret` | Your Vonage API Secret |

## Components

| Class | Type | Description |
|---|---|---|
| `VonageSendSMSConnector` | Connector | Sends an SMS message via `POST https://rest.nexmo.com/sms/json` with `api_key`, `api_secret`, `from`, `to`, and `text` as query parameters |

## Setup

### Credentials

1. Log in to the [Vonage Dashboard](https://dashboard.nexmo.com/).
2. On the dashboard home page, copy your **API key** and **API secret**.
3. In Orchesty, open the Vonage application settings and enter both values.

### API Documentation

Vonage SMS API: [https://developer.vonage.com/en/messaging/sms/overview](https://developer.vonage.com/en/messaging/sms/overview)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-vonage @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-vonage @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import VonageApplication from '@orchesty/connector-vonage/dist/VonageApplication';
import VonageSendSMSConnector from '@orchesty/connector-vonage/dist/Connector/VonageSendSMSConnector';

const app = new VonageApplication();
container.setApplication(app);
container.setNode(new VonageSendSMSConnector(), app);
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
