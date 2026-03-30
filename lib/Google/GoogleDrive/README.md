# Google Drive Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-google-drive?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-google-drive)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for Google Drive, a cloud storage and file sharing service that allows you to store, access, and collaborate on files from any device.

## Application Type

**OAuth 2.0**

This connector uses Google OAuth 2.0 with the `auth/drive.file` scope. After entering your credentials in Orchesty, you will be redirected to Google to authorize access.

| Field | Description |
|---|---|
| `client_id` | OAuth Client ID from the Google Cloud Console |
| `client_secret` | OAuth Client Secret from the Google Cloud Console |

## Components

| Class | Type | Description |
|---|---|---|
| `GoogleDriveCreateDirectoryConnector` | Connector | Creates a new folder in Google Drive via `POST /drive/v3/files` |
| `GoogleDriveUpdateFileConnector` | Connector | Updates metadata of an existing Drive file, optionally moving it to a new parent via `PATCH /drive/v3/files/{fileId}` |
| `GoogleDriveUploadFileConnector` | Connector | Uploads a file to Google Drive via multipart upload `POST /upload/drive/v3/files?uploadType=multipart` |

## Setup

### Credentials

1. Go to the [Google Cloud Console](https://console.cloud.google.com) and open your project.
2. Navigate to **APIs & Services → Credentials**.
3. Create an **OAuth 2.0 Client ID** (type: Web application).
4. Add the Orchesty OAuth callback URL to **Authorized redirect URIs**.
5. Copy the **Client ID** and **Client Secret**.
6. Enable the **Google Drive API** under **APIs & Services → Library**.
7. In Orchesty, open the Google Drive application settings, enter the credentials, and complete the OAuth authorization flow.

### API Documentation

Google Drive REST API: [https://developers.google.com/drive/api/reference/rest/v3](https://developers.google.com/drive/api/reference/rest/v3)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-google-drive @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-google-drive @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import { OAuth2Provider } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import GoogleDriveApplication from '@orchesty/connector-google-drive/dist/GoogleDriveApplication';
import GoogleDriveCreateDirectoryConnector from '@orchesty/connector-google-drive/dist/Connector/GoogleDriveCreateDirectoryConnector';
import GoogleDriveUpdateFileConnector from '@orchesty/connector-google-drive/dist/Connector/GoogleDriveUpdateFileConnector';
import GoogleDriveUploadFileConnector from '@orchesty/connector-google-drive/dist/Connector/GoogleDriveUploadFileConnector';

const app = new GoogleDriveApplication(container.get(OAuth2Provider));
container.setApplication(app);
container.setNode(new GoogleDriveCreateDirectoryConnector(), app);
container.setNode(new GoogleDriveUpdateFileConnector(), app);
container.setNode(new GoogleDriveUploadFileConnector(), app);
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
