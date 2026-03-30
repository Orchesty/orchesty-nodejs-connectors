# HubSpot Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-hubspot?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-hubspot)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for HubSpot, a CRM platform offering tools for marketing, sales, content management, and customer service.

## Application Type

This package provides two application variants:

**OAuth 2.0 (`HubSpotApplication`)** — The primary application using HubSpot's OAuth 2.0 authorization flow. Also implements webhook support for real-time notifications.

| Field | Description |
|---|---|
| `client_id` | OAuth Client ID from your HubSpot app |
| `client_secret` | OAuth Client Secret from your HubSpot app |
| `app_id` | Your HubSpot App ID (required for webhook management) |

**Basic (`HubSpotApplicationBasic`)** — An alternative using a static API token (Private App token), suitable for simpler integrations without the OAuth flow.

| Field | Description |
|---|---|
| `token` | Your HubSpot Private App access token |

## Components

| Class | Type | Description |
|---|---|---|
| `HubSpotCreateContactConnector` | Connector | Creates a new CRM contact via `POST /crm/v3/objects/contacts` |
| `HubSpotAddEmailToListConnector` | Connector | Adds contacts to a list by email via `POST /contacts/v1/lists/{listId}/add` |
| `HubSpotSendTransactionEmailConnector` | Connector | Sends a transactional email via `POST /marketing/v3/transactional/single-email/send` |

### Webhook Subscriptions

| Event | Description |
|---|---|
| `contact.creation` | Triggered when a new contact is created |
| `contact.deletion` | Triggered when a contact is deleted |

## Setup

### Credentials (OAuth 2.0)

1. Log in to your [HubSpot Developer](https://developers.hubspot.com) account.
2. Navigate to **Apps** and create a new app (or open an existing one).
3. Under **Auth**, note your **Client ID** and **Client Secret**.
4. Add the Orchesty OAuth callback URL to the **Redirect URLs** list.
5. Note your **App ID** from the app overview page.
6. In Orchesty, open the HubSpot application settings, enter the credentials, and complete the OAuth authorization flow.

### Credentials (Basic / Private App)

1. In HubSpot, navigate to **Settings → Integrations → Private Apps**.
2. Create a new Private App and assign the required scopes.
3. Copy the generated **Access Token** and paste it into the **token** field in Orchesty.

### API Documentation

HubSpot API Reference: [https://developers.hubspot.com/docs/api/overview](https://developers.hubspot.com/docs/api/overview)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-hubspot @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-hubspot @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import { OAuth2Provider } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import HubSpotApplication from '@orchesty/connector-hubspot/dist/HubSpotApplication';
import HubSpotCreateContactConnector from '@orchesty/connector-hubspot/dist/Connector/HubSpotCreateContactConnector';
import HubSpotAddEmailToListConnector from '@orchesty/connector-hubspot/dist/Connector/HubSpotAddEmailToListConnector';
import HubSpotSendTransactionEmailConnector from '@orchesty/connector-hubspot/dist/Connector/HubSpotSendTransactionEmailConnector';

const app = new HubSpotApplication(container.get(OAuth2Provider));
container.setApplication(app);
container.setNode(new HubSpotCreateContactConnector(), app);
container.setNode(new HubSpotAddEmailToListConnector(), app);
container.setNode(new HubSpotSendTransactionEmailConnector(), app);
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
