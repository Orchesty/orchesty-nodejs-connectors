# Slack Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-slack?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-slack)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for Slack, a cloud-based messaging platform for team communication and collaboration.

## Application Type

**OAuth 2.0**

This connector uses the Slack OAuth 2.0 authorization flow (`https://slack.com/oauth/v2/authorize`). After entering your credentials in Orchesty, you will be redirected to Slack to authorize access.

| Field | Description |
|---|---|
| `client_id` | Your Slack app Client ID |
| `client_secret` | Your Slack app Client Secret |

## Components

| Class | Type | Description |
|---|---|---|
| `SlackSendMessageConnector` | Connector | Sends a message with an mrkdwn block to a specified channel via `POST https://slack.com/api/chat.postMessage` |

## Setup

### Credentials

1. Log in to [Slack API](https://api.slack.com/apps) and create a new app (from scratch or from a manifest).
2. Navigate to **OAuth & Permissions** and add the required Bot Token Scopes: `app_mentions:read`, `chat:write`, `chat:write.public`.
3. Under **Basic Information**, copy the **Client ID** and **Client Secret**.
4. Add the Orchesty redirect URL to the **Redirect URLs** list.
5. In Orchesty, open the Slack application settings, enter both values, and complete the OAuth authorization flow.

### API Documentation

Slack API: [https://api.slack.com/](https://api.slack.com/)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-slack @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-slack @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import { OAuth2Provider } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import SlackApplication from '@orchesty/connector-slack/dist/SlackApplication';
import SlackSendMessageConnector from '@orchesty/connector-slack/dist/Connectors/SlackSendMessageConnector';

const app = new SlackApplication(container.get(OAuth2Provider));
container.setApplication(app);
container.setNode(new SlackSendMessageConnector(), app);
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
