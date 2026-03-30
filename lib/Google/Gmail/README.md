# Gmail Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-google-gmail?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-google-gmail)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for Gmail, Google's email service used by individuals and businesses worldwide.

## Application Type

**OAuth 2.0**

This connector uses Google OAuth 2.0 with the `auth/gmail.compose` scope. After entering your credentials in Orchesty, you will be redirected to Google to authorize access.

| Field | Description |
|---|---|
| `client_id` | OAuth Client ID from the Google Cloud Console |
| `client_secret` | OAuth Client Secret from the Google Cloud Console |

## Components

| Class | Type | Description |
|---|---|---|
| `GmailGetProfile` | Connector | Fetches the Gmail profile for a user via `GET /gmail/v1/users/{userId}/profile` |

## Setup

### Credentials

1. Go to the [Google Cloud Console](https://console.cloud.google.com) and open your project.
2. Navigate to **APIs & Services → Credentials**.
3. Create an **OAuth 2.0 Client ID** (type: Web application).
4. Add the Orchesty OAuth callback URL to **Authorized redirect URIs**.
5. Copy the **Client ID** and **Client Secret**.
6. Enable the **Gmail API** under **APIs & Services → Library**.
7. In Orchesty, open the Gmail application settings, enter the credentials, and complete the OAuth authorization flow.

### API Documentation

Gmail API Reference: [https://developers.google.com/gmail/api/reference/rest](https://developers.google.com/gmail/api/reference/rest)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-google-gmail @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-google-gmail @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import { OAuth2Provider } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import GmailApplication from '@orchesty/connector-google-gmail/dist/GmailApplication';
import GmailGetProfile from '@orchesty/connector-google-gmail/dist/Connector/GmailGetProfile';

const app = new GmailApplication(container.get(OAuth2Provider));
container.setApplication(app);
container.setNode(new GmailGetProfile(), app);
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
