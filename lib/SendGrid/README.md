# SendGrid Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-send-grid?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-send-grid)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for SendGrid (Twilio), a cloud-based email delivery platform for sending transactional and marketing emails at scale.

## Application Type

**Basic**

This connector authenticates using a SendGrid API key sent as a Bearer token in the `Authorization` header.

| Field | Description |
|---|---|
| `token` | Your SendGrid API key |

## Components

| Class | Type | Description |
|---|---|---|
| `SendGridSendEmailConnector` | Connector | Sends a transactional email via a SendGrid template using `POST /v3/mail/send` |

## Setup

### Credentials

1. Log in to [SendGrid](https://app.sendgrid.com/).
2. Navigate to **Settings → API Keys** and create a new API key with **Mail Send** permissions.
3. Copy the key immediately — it will not be shown again.
4. In Orchesty, open the SendGrid application settings and paste the key into the **Api key** field.

### API Documentation

SendGrid Mail Send API: [https://docs.sendgrid.com/api-reference/mail-send/mail-send](https://docs.sendgrid.com/api-reference/mail-send/mail-send)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-send-grid @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-send-grid @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import SendGridApplication from '@orchesty/connector-send-grid/dist/SendGridApplication';
import SendGridSendEmailConnector from '@orchesty/connector-send-grid/dist/Connector/SendGridSendEmailConnector';

const app = new SendGridApplication();
container.setApplication(app);
container.setNode(new SendGridSendEmailConnector(), app);
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
