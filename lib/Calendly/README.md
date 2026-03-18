# Calendly Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-calendly?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-calendly)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for Calendly, a simple scheduling tool for businesses that eliminates email back and forth, helping save time and increase sales.

## Application Type

**OAuth 2.0**

This connector uses the Calendly OAuth 2.0 authorization flow. After entering your credentials in Orchesty, you will be redirected to Calendly to authorize access.

| Field | Description |
|---|---|
| `client_id` | OAuth application Client ID from the Calendly Developer Portal |
| `client_secret` | OAuth application Client Secret from the Calendly Developer Portal |

## Components

| Class | Type | Description |
|---|---|---|
| `CalendlyGetUserConnector` | Connector | Retrieves a single Calendly user by UUID via `GET /users/{uuid}` |
| `CalendlyInviteUserConnector` | Connector | Invites a user to an organization via `POST /organizations/{uuid}/invitations` |
| `CalendlyListEventsBatch` | Batch | Paginates through all scheduled events via `GET /scheduled_events` using cursor-based pagination |

## Setup

### Credentials

1. Log in to the [Calendly Developer Portal](https://developer.calendly.com).
2. Create a new OAuth application.
3. Note the **Client ID** and **Client Secret**.
4. Set the **Redirect URI** to the OAuth callback URL provided by Orchesty.
5. In Orchesty, open the Calendly application settings and fill in:
   - **Client Id** — paste your Client ID
   - **Client Secret** — paste your Client Secret
6. Complete the OAuth authorization flow by clicking **Authorize** in Orchesty.

### API Documentation

Calendly API Reference: [https://developer.calendly.com/api-docs](https://developer.calendly.com/api-docs)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-calendly @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-calendly @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import { OAuth2Provider } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import CalendlyApplication from '@orchesty/connector-calendly/dist/CalendlyApplication';
import CalendlyGetUserConnector from '@orchesty/connector-calendly/dist/Connector/CalendlyGetUserConnector';
import CalendlyInviteUserConnector from '@orchesty/connector-calendly/dist/Connector/CalendlyInviteUserConnector';
import CalendlyListEventsBatch from '@orchesty/connector-calendly/dist/Batch/CalendlyListEventsBatch';

const app = new CalendlyApplication(container.get(OAuth2Provider));
container.setApplication(app);
container.setNode(new CalendlyGetUserConnector(), app);
container.setNode(new CalendlyInviteUserConnector(), app);
container.setNode(new CalendlyListEventsBatch(), app);
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
