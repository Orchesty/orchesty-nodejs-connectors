# Discord Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-discord?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-discord)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for Discord, an all-in-one voice and text chat platform widely used by communities and teams.

## Application Type

**Basic (Discord Bot token)**

This connector authenticates using a Discord Bot token sent as `Bot {token}` in the `Authorization` header. The application also requires the Client ID to generate the bot invite URL.

| Field | Description |
|---|---|
| `token` | Your Discord Bot token |
| `client_id` | Your Discord application Client ID (used to generate the bot invite URL) |

## Components

| Class | Type | Description |
|---|---|---|
| `DiscordSendMessageConnector` | Connector | Sends a rich embed message (title, description, color, image) to a channel via `POST /api/channels/{channelId}/messages` |

## Setup

### Credentials

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications) and create a new application.
2. Navigate to **Bot** and click **Add Bot**.
3. Under the **Token** section, click **Reset Token** and copy the token.
4. Note your **Application ID** (Client ID) from the **General Information** tab.
5. In Orchesty, open the Discord application settings and fill in:
   - **Bot token** — paste your Bot token
   - **Client id** — paste your Application ID
6. After saving, Orchesty will generate a bot invite URL — use it to add the bot to your Discord server.

### API Documentation

Discord API Reference: [https://discord.com/developers/docs/reference](https://discord.com/developers/docs/reference)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-discord @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-discord @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import DiscordApplication from '@orchesty/connector-discord/dist/DiscordApplication';
import DiscordSendMessageConnector from '@orchesty/connector-discord/dist/Connector/DiscordSendMessageConnector';

const app = new DiscordApplication();
container.setApplication(app);
container.setNode(new DiscordSendMessageConnector(), app);
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
