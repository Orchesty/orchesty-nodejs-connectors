# Zoom Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-zoom?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-zoom)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for Zoom, a video communications and team chat platform for sending messages to channels and users.

## Application Type

**OAuth 2.0**

This connector uses the Zoom OAuth 2.0 authorization flow. After entering your credentials in Orchesty, you will be redirected to Zoom to authorize access.

| Field | Description |
|---|---|
| `client_id` | Your Zoom app Client ID |
| `client_secret` | Your Zoom app Client Secret |

## Components

| Class | Type | Description |
|---|---|---|
| `ZoomSendMessageConnector` | Connector | Sends a chat message to a Zoom channel via `POST /v2/chat/users/{userId}/messages`; requires `userId` and `toChannel` in the input payload |

## Setup

### Credentials

1. Log in to the [Zoom Marketplace](https://marketplace.zoom.us/) and navigate to **Develop → Build App**.
2. Choose **OAuth** as the app type and create the app.
3. Under **App Credentials**, copy the **Client ID** and **Client Secret**.
4. Add the Orchesty redirect URL to the **Redirect URL for OAuth** list.
5. In Orchesty, open the Zoom application settings, enter both values, and complete the OAuth authorization flow.

### Required Scopes

`chat_message:write:admin`

### API Documentation

Zoom Team Chat API: [https://developers.zoom.us/docs/api/rest/reference/chat/methods/](https://developers.zoom.us/docs/api/rest/reference/chat/methods/)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-zoom @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-zoom @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import { OAuth2Provider } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import ZoomApplication from '@orchesty/connector-zoom/dist/ZoomApplication';
import ZoomSendMessageConnector from '@orchesty/connector-zoom/dist/Connector/ZoomSendMessageConnector';

const app = new ZoomApplication(container.get(OAuth2Provider));
container.setApplication(app);
container.setNode(new ZoomSendMessageConnector(), app);
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
