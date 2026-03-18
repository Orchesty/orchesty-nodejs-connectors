# Sendinblue Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-sendinblue?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-sendinblue)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for Sendinblue (now **Brevo**), a cloud-based email marketing and automation platform for managing email campaigns, transactional emails, and SMS messages.

> **Note:** Sendinblue was rebranded to [Brevo](https://www.brevo.com/) in 2023. This connector still uses the legacy `sendinblue.com` API endpoint (`https://api.sendinblue.com/v3/`) and the `api-key` header for authentication, which remain compatible.

## Application Type

**Basic**

This connector authenticates using an API key sent via the `api-key` header.

| Field | Description |
|---|---|
| `api_key` | Your Sendinblue / Brevo API key |

## Components

| Class | Type | Description |
|---|---|---|
| `SendiblueCreateCampaignConnector` | Connector | Creates an email campaign via `POST /emailCampaigns` |
| `SendinblueSendEmailConnector` | Connector | Sends a transactional email via `POST /smtp/email` |

## Setup

### Credentials

1. Log in to [Brevo](https://app.brevo.com/) (formerly Sendinblue).
2. Navigate to **Profile → SMTP & API** and create a new API key.
3. Copy the key and paste it into the **API key** field in the Orchesty Sendinblue application settings.

### API Documentation

Brevo API Reference: [https://developers.brevo.com/docs/send-a-transactional-email](https://developers.brevo.com/docs/send-a-transactional-email)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-sendinblue @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-sendinblue @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import SendinblueApplication from '@orchesty/connector-sendinblue/dist/SendinblueApplication';
import SendiblueCreateCampaignConnector from '@orchesty/connector-sendinblue/dist/Connector/SendiblueCreateCampaignConnector';
import SendinblueSendEmailConnector from '@orchesty/connector-sendinblue/dist/Connector/SendinblueSendEmailConnector';

const app = new SendinblueApplication();
container.setApplication(app);
container.setNode(new SendiblueCreateCampaignConnector(), app);
container.setNode(new SendinblueSendEmailConnector(), app);
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
