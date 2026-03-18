# IceWarp Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-ice-warp?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-ice-warp)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for IceWarp, an enterprise collaboration platform providing email, TeamChat, and conferencing services.

## Application Type

**Basic (JWT token + xoxp session)**

This connector uses a multi-step token flow against a self-hosted IceWarp server. An initial access token and refresh token are stored in the application settings. On each request, the connector automatically refreshes the JWT access token and exchanges it for a short-lived TeamChat xoxp token (cached in Redis for ~23 hours). The IceWarp server host is extracted from the JWT payload.

| Field | Description |
|---|---|
| `token` | Your IceWarp access token |
| `refresh_token` | Your IceWarp refresh token (used to renew the access token) |

## Components

| Class | Type | Description |
|---|---|---|
| `IceWarpListChannelsConnector` | Connector | Lists all TeamChat channels via `GET /teamchatapi/channels.list` |
| `IceWarpPostChatMessageConnector` | Connector | Posts a message to a TeamChat channel via `POST /teamchatapi/chat.postMessage` |

## Setup

### Credentials

IceWarp is a self-hosted enterprise platform. Contact your IceWarp server administrator to obtain an **access token** and **refresh token** for API access.

### API Documentation

IceWarp TeamChat API: [https://www.icewarp.com/product/api-teamchat/](https://www.icewarp.com/product/api-teamchat/)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-ice-warp @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-ice-warp @orchesty/nodejs-sdk
```

The `IceWarpApplication` requires `CacheService`, `Redis`, and `CurlSender` from the SDK:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import CacheService from '@orchesty/nodejs-sdk/dist/lib/Cache/CacheService';
import Redis from '@orchesty/nodejs-sdk/dist/lib/Storage/Redis/Redis';
import CurlSender from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/CurlSender';
import IceWarpApplication from '@orchesty/connector-ice-warp/dist/IceWarpApplication';
import IceWarpListChannelsConnector from '@orchesty/connector-ice-warp/dist/Connector/IceWarpListChannelsConnector';
import IceWarpPostChatMessageConnector from '@orchesty/connector-ice-warp/dist/Connector/IceWarpPostChatMessageConnector';

const app = new IceWarpApplication(container.get(CacheService), container.get(Redis), container.get(CurlSender));
container.setApplication(app);
container.setNode(new IceWarpListChannelsConnector(), app);
container.setNode(new IceWarpPostChatMessageConnector(), app);
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
