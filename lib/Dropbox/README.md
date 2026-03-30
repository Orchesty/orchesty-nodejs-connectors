# Dropbox Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-dropbox?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-dropbox)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for Dropbox, a cloud storage service that lets you store files online, sync them to all your devices, and share them easily.

## Application Type

**OAuth 2.0**

This connector uses the Dropbox OAuth 2.0 authorization flow. After entering your credentials in Orchesty, you will be redirected to Dropbox to authorize access.

| Field | Description |
|---|---|
| `client_id` | OAuth application Client ID from the Dropbox App Console |
| `client_secret` | OAuth application Client Secret from the Dropbox App Console |

## Components

| Class | Type | Description |
|---|---|---|
| `DropboxUploadFile` | Connector | Uploads a file to a specified Dropbox path via `POST https://content.dropboxapi.com/2/files/upload` |

## Setup

### Credentials

1. Go to the [Dropbox App Console](https://www.dropbox.com/developers/apps) and create a new app.
2. Choose **Scoped access** and the appropriate access type (Full Dropbox or App folder).
3. On the app settings page, note the **App key** (Client ID) and **App secret** (Client Secret).
4. Under **OAuth 2**, add the Orchesty OAuth callback URL to the **Redirect URIs** list.
5. In Orchesty, open the Dropbox application settings and fill in:
   - **Client Id** — paste your App key
   - **Client Secret** — paste your App secret
6. Complete the OAuth authorization flow by clicking **Authorize** in Orchesty.

### API Documentation

Dropbox HTTP API Reference: [https://www.dropbox.com/developers/documentation/http](https://www.dropbox.com/developers/documentation/http)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-dropbox @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-dropbox @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import { OAuth2Provider } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import DropboxApplication from '@orchesty/connector-dropbox/dist/DropboxApplication';
import DropboxUploadFile from '@orchesty/connector-dropbox/dist/Connector/DropboxUploadFile';

const app = new DropboxApplication(container.get(OAuth2Provider));
container.setApplication(app);
container.setNode(new DropboxUploadFile(), app);
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
