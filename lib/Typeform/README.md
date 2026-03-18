# Typeform Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-typeform?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-typeform)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for Typeform, a web-based platform for building interactive surveys, forms, and apps without writing code.

## Application Type

**OAuth 2.0**

This connector uses the Typeform OAuth 2.0 authorization flow. After entering your credentials in Orchesty, you will be redirected to Typeform to authorize access.

| Field | Description |
|---|---|
| `client_id` | Your Typeform app Client ID |
| `client_secret` | Your Typeform app Client Secret |

## Components

| Class | Type | Description |
|---|---|---|
| `TypeformCreateFormConnector` | Connector | Creates a new form via `POST /forms` |
| `TypeformCreateWorkspaceConnector` | Connector | Creates a new workspace via `POST /workspaces` |
| `TypeformUpdateFormConnector` | Connector | Updates an existing form via `PUT /forms/{form_id}` |

## Setup

### Credentials

1. Log in to [Typeform](https://www.typeform.com/) and navigate to **Admin → Developer apps**.
2. Create a new app and note the **Client ID** and **Client Secret**.
3. Add the Orchesty redirect URL to the **Redirect URIs** list.
4. In Orchesty, open the Typeform application settings, enter both values, and complete the OAuth authorization flow.

### API Documentation

Typeform API: [https://www.typeform.com/developers/](https://www.typeform.com/developers/)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-typeform @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-typeform @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import { OAuth2Provider } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import TypeformApplication from '@orchesty/connector-typeform/dist/TypeformApplication';
import TypeformCreateFormConnector from '@orchesty/connector-typeform/dist/Connector/TypeformCreateFormConnector';
import TypeformCreateWorkspaceConnector from '@orchesty/connector-typeform/dist/Connector/TypeformCreateWorkspaceConnector';
import TypeformUpdateFormConnector from '@orchesty/connector-typeform/dist/Connector/TypeformUpdateFormConnector';

const app = new TypeformApplication(container.get(OAuth2Provider));
container.setApplication(app);
container.setNode(new TypeformCreateFormConnector(), app);
container.setNode(new TypeformCreateWorkspaceConnector(), app);
container.setNode(new TypeformUpdateFormConnector(), app);
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
