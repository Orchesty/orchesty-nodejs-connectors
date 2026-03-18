# Twilio Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-twilio?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-twilio)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for Twilio, a cloud communication platform for building voice, VoIP, and SMS applications via a web API.

## Application Type

**Basic**

This connector authenticates using HTTP Basic auth with your Twilio Account SID and Auth Token (Base64-encoded). The message payload is submitted as `multipart/form-data`.

| Field | Description |
|---|---|
| `user` | Your Twilio Account SID |
| `password` | Your Twilio Auth Token |

## Components

| Class | Type | Description |
|---|---|---|
| `TwilioSendMessage` | Connector | Sends an SMS message via `POST /Accounts/{AccountSid}/Messages`; submits `From`, `To`, and `Body` as `multipart/form-data` |

## Setup

### Credentials

1. Log in to the [Twilio Console](https://console.twilio.com/).
2. On the dashboard, copy your **Account SID** and **Auth Token**.
3. In Orchesty, open the Twilio application settings and enter the Account SID as **User** and the Auth Token as **Password**.

### API Documentation

Twilio SMS API: [https://www.twilio.com/docs/sms/api](https://www.twilio.com/docs/sms/api)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-twilio @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-twilio @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import TwilioApplication from '@orchesty/connector-twilio/dist/TwilioApplication';
import TwilioSendMessage from '@orchesty/connector-twilio/dist/Connector/TwilioSendMessage';

const app = new TwilioApplication();
container.setApplication(app);
container.setNode(new TwilioSendMessage(), app);
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
