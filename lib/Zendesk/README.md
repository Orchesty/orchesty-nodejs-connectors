# Zendesk Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-zendesk?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-zendesk)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for Zendesk, a customer support platform for managing tickets, users, and automation triggers.

## Application Type

**OAuth 2.0**

This connector uses the Zendesk OAuth 2.0 authorization flow with subdomain-based auth and token URLs. After entering your credentials in Orchesty, you will be redirected to your Zendesk instance to authorize access.

| Field | Description |
|---|---|
| `subdomain` | Your Zendesk subdomain (e.g. `mycompany` from `mycompany.zendesk.com`) |
| `client_id` | Your Zendesk OAuth app Client ID |
| `client_secret` | Your Zendesk OAuth app Client Secret |

## Components

| Class | Type | Description |
|---|---|---|
| `ZendeskCreateTicketConnector` | Connector | Creates a new support ticket via `POST /api/v2/tickets.json` |
| `ZendeskCreateTriggerConnector` | Connector | Creates an automation trigger via `POST /api/v2/triggers` |
| `ZendeskCreateUserConnector` | Connector | Creates a new user via `POST /api/v2/users.json` |
| `ZendeskDeleteTriggerConnector` | Connector | Deletes a trigger by ID via `DELETE /api/v2/triggers/{id}` |
| `ZendeskCreateWebhookConnector` | Batch | Registers webhook subscriptions via `POST /api/v2/webhooks` |
| `ZendeskDeleteWebhookConnector` | Batch | Deletes registered webhooks via `DELETE /api/v2/webhooks/{webhookId}` |
| `ZendeskListTicketsBatch` | Batch | Paginates through tickets (100 per page) via `GET /api/v2/tickets.json` |
| `ZendeskListUsersBatch` | Batch | Paginates through users (100 per page) via `GET /api/v2/users.json` |

## Setup

### Credentials

1. Log in to your Zendesk admin panel and navigate to **Admin Center → Apps and integrations → OAuth clients**.
2. Create a new OAuth client and note the **Client ID** and **Client Secret**.
3. Add the Orchesty redirect URL to the **Redirect URLs** list.
4. Your **subdomain** is the part before `.zendesk.com` in your Zendesk URL.
5. In Orchesty, open the Zendesk application settings, enter all three values, and complete the OAuth authorization flow.

### API Documentation

Zendesk API Reference: [https://developer.zendesk.com/api-reference/](https://developer.zendesk.com/api-reference/)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-zendesk @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-zendesk @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import { OAuth2Provider } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import ZendeskApplication from '@orchesty/connector-zendesk/dist/ZendeskApplication';
import ZendeskCreateTicketConnector from '@orchesty/connector-zendesk/dist/Connector/ZendeskCreateTicketConnector';
import ZendeskCreateUserConnector from '@orchesty/connector-zendesk/dist/Connector/ZendeskCreateUserConnector';
import ZendeskCreateTriggerConnector from '@orchesty/connector-zendesk/dist/Connector/ZendeskCreateTriggerConnector';
import ZendeskDeleteTriggerConnector from '@orchesty/connector-zendesk/dist/Connector/ZendeskDeleteTriggerConnector';
import ZendeskCreateWebhookConnector from '@orchesty/connector-zendesk/dist/Batch/ZendeskCreateWebhookConnector';
import ZendeskDeleteWebhookConnector from '@orchesty/connector-zendesk/dist/Batch/ZendeskDeleteWebhookConnector';
import ZendeskListTicketsBatch from '@orchesty/connector-zendesk/dist/Batch/ZendeskListTicketsBatch';
import ZendeskListUsersBatch from '@orchesty/connector-zendesk/dist/Batch/ZendeskListUsersBatch';

const app = new ZendeskApplication(container.get(OAuth2Provider));
container.setApplication(app);
container.setNode(new ZendeskCreateTicketConnector(), app);
container.setNode(new ZendeskCreateUserConnector(), app);
container.setNode(new ZendeskCreateTriggerConnector(), app);
container.setNode(new ZendeskDeleteTriggerConnector(), app);
container.setNode(new ZendeskCreateWebhookConnector(), app);
container.setNode(new ZendeskDeleteWebhookConnector(), app);
container.setNode(new ZendeskListTicketsBatch(), app);
container.setNode(new ZendeskListUsersBatch(), app);
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
