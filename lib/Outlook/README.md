# Outlook Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-outlook?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-outlook)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for Microsoft Outlook, providing email and calendar management in one place through the Microsoft Graph API.

## Application Type

**OAuth 2.0**

This connector uses the Microsoft Azure AD OAuth 2.0 authorization flow. After entering your credentials in Orchesty, you will be redirected to Microsoft to authorize access. The connector communicates with the Microsoft Graph API (`https://graph.microsoft.com/v1.0`) and supports webhook subscriptions for change notifications.

| Field | Description |
|---|---|
| `client_id` | Application (client) ID from the Azure portal |
| `client_secret` | Client Secret from the Azure portal |
| `tenant_id` | Azure Active Directory Tenant ID |

## Components

| Class | Type | Description |
|---|---|---|
| `OutlookCreateEvent` | Connector | Creates a new calendar event via `POST /me/events` |
| `OutlookGetEvent` | Connector | Fetches a single calendar event by ID via `GET /me/events/{id}` |
| `OutlookUpdateEvent` | Connector | Updates an existing calendar event via `PATCH /me/events/{id}` |
| `OutlookDeleteEvent` | Connector | Deletes a calendar event by ID via `DELETE /me/events/{id}` |
| `OutlookGetEvents` | Batch | Paginates through calendar events (1000 per page) via `GET /me/events` |
| `OutlookSubscribeWebhook` | Batch | Registers a Microsoft Graph change-notification webhook via `POST /subscriptions` |
| `OutlookUnsubscribeWebhook` | Batch | Removes a registered webhook subscription via `DELETE /subscriptions/{webhookId}` |

## Setup

### Credentials

1. Log in to the [Azure portal](https://portal.azure.com/) and navigate to **Azure Active Directory → App registrations**.
2. Register a new application and note the **Application (client) ID** and **Directory (tenant) ID**.
3. Under **Certificates & secrets**, create a new **Client Secret**.
4. Under **API permissions**, add the following Microsoft Graph permissions: `Calendars.ReadWrite`, `User.Read`, `offline_access`.
5. Add the Orchesty OAuth callback URL to the **Redirect URIs**.
6. In Orchesty, open the Outlook application settings, enter all three credentials, and complete the OAuth authorization flow.

### API Documentation

Microsoft Graph Calendar API: [https://learn.microsoft.com/en-us/graph/api/resources/calendar](https://learn.microsoft.com/en-us/graph/api/resources/calendar)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-outlook @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-outlook @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import { OAuth2Provider } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import OutlookApplication from '@orchesty/connector-outlook/dist/OutlookApplication';
import OutlookCreateEvent from '@orchesty/connector-outlook/dist/Connector/OutlookCreateEvent';
import OutlookGetEvent from '@orchesty/connector-outlook/dist/Connector/OutlookGetEvent';
import OutlookUpdateEvent from '@orchesty/connector-outlook/dist/Connector/OutlookUpdateEvent';
import OutlookDeleteEvent from '@orchesty/connector-outlook/dist/Connector/OutlookDeleteEvent';
import OutlookGetEvents from '@orchesty/connector-outlook/dist/Batch/OutlookGetEvents';
import OutlookSubscribeWebhook from '@orchesty/connector-outlook/dist/Batch/OutlookSubscribeWebhook';
import OutlookUnsubscribeWebhook from '@orchesty/connector-outlook/dist/Batch/OutlookUnsubscribeWebhook';

const app = new OutlookApplication(container.get(OAuth2Provider));
container.setApplication(app);
container.setNode(new OutlookCreateEvent(), app);
container.setNode(new OutlookGetEvent(), app);
container.setNode(new OutlookUpdateEvent(), app);
container.setNode(new OutlookDeleteEvent(), app);
container.setNode(new OutlookGetEvents(), app);
container.setNode(new OutlookSubscribeWebhook(), app);
container.setNode(new OutlookUnsubscribeWebhook(), app);
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
