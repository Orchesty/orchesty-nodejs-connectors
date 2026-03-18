# Intercom Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-intercom?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-intercom)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for Intercom, a customer communications platform that shows you who is using your product and makes it easy to personally communicate with them.

## Application Type

**OAuth 2.0**

This connector uses the Intercom OAuth 2.0 authorization flow. After entering your credentials in Orchesty, you will be redirected to Intercom to authorize access.

| Field | Description |
|---|---|
| `client_id` | OAuth Client ID from the Intercom Developer Hub |
| `client_secret` | OAuth Client Secret from the Intercom Developer Hub |

## Components

| Class | Type | Description |
|---|---|---|
| `IntercomCreateContactConnector` | Connector | Creates a new contact via `POST /contacts` |
| `IntercomListAllContactsBatch` | Batch | Paginates through all contacts using cursor-based pagination via `GET /contacts` |

## Setup

### Credentials

1. Go to the [Intercom Developer Hub](https://app.intercom.com/a/apps/_/developer-hub) and create or open an app.
2. Navigate to the **Authentication** section and note the **Client ID** and **Client Secret**.
3. Add the Orchesty OAuth callback URL to the **Redirect URLs** list.
4. In Orchesty, open the Intercom application settings, enter the credentials, and complete the OAuth authorization flow.

### API Documentation

Intercom API Reference: [https://developers.intercom.com/docs/](https://developers.intercom.com/docs/)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-intercom @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-intercom @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import { OAuth2Provider } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import IntercomApplication from '@orchesty/connector-intercom/dist/IntercomApplication';
import IntercomCreateContactConnector from '@orchesty/connector-intercom/dist/Connector/IntercomCreateContactConnector';
import IntercomListAllContactsBatch from '@orchesty/connector-intercom/dist/Batch/IntercomListAllContactsBatch';

const app = new IntercomApplication(container.get(OAuth2Provider));
container.setApplication(app);
container.setNode(new IntercomCreateContactConnector(), app);
container.setNode(new IntercomListAllContactsBatch(), app);
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
