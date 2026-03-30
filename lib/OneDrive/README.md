# OneDrive Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-one-drive?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-one-drive)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for Microsoft OneDrive, a cloud storage service that lets you store, protect, and share files from anywhere on all your devices.

## Application Type

**OAuth 2.0**

This connector uses the Microsoft OAuth 2.0 authorization flow via the Azure Active Directory endpoint. After entering your credentials in Orchesty, you will be redirected to Microsoft to authorize access. The connector communicates with the Microsoft Graph API (`https://graph.microsoft.com/v1.0/`).

| Field | Description |
|---|---|
| `client_id` | Application (client) ID from the Azure portal |
| `client_secret` | Client Secret from the Azure portal |

## Components

| Class | Type | Description |
|---|---|---|
| `OneDriveUploadFileConnector` | Connector | Uploads a file to the authenticated user's OneDrive root via `PUT /me/drive/root:/{name}:/content` |

## Setup

### Credentials

1. Log in to the [Azure portal](https://portal.azure.com/) and navigate to **Azure Active Directory → App registrations**.
2. Register a new application and note the **Application (client) ID**.
3. Under **Certificates & secrets**, create a new **Client Secret**.
4. Under **API permissions**, add `Files.ReadWrite` from the Microsoft Graph.
5. Add the Orchesty OAuth callback URL to the **Redirect URIs**.
6. In Orchesty, open the OneDrive application settings, enter the credentials, and complete the OAuth authorization flow.

### API Documentation

OneDrive REST API via Microsoft Graph: [https://learn.microsoft.com/en-us/onedrive/developer/rest-api/](https://learn.microsoft.com/en-us/onedrive/developer/rest-api/)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-one-drive @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-one-drive @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import { OAuth2Provider } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import OneDriveApplication from '@orchesty/connector-one-drive/dist/OneDriveApplication';
import OneDriveUploadFileConnector from '@orchesty/connector-one-drive/dist/Connector/OneDriveUploadFileConnector';

const app = new OneDriveApplication(container.get(OAuth2Provider));
container.setApplication(app);
container.setNode(new OneDriveUploadFileConnector(), app);
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
