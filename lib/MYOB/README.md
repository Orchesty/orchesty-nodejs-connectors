# MYOB Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-myob?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-myob)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for MYOB, an accounting and business management software that helps businesses manage payroll, monitor cash flow, and track finances.

## Application Type

**OAuth 2.0**

This connector uses the MYOB OAuth 2.0 authorization flow. After entering your credentials in Orchesty, you will be redirected to MYOB to authorize access. All API requests include the custom `x-myobapi-version: v2` header required by the MYOB Business API.

| Field | Description |
|---|---|
| `client_id` | OAuth Client ID from the MYOB Developer Portal |
| `client_secret` | OAuth Client Secret from the MYOB Developer Portal |

## Components

| Class | Type | Description |
|---|---|---|
| `MYOBGetEmployeeBatch` | Batch | Paginates through all employees (100 per page) via `GET /Contact/Employee` using OData `$top`/`$skip` |

## Setup

### Credentials

1. Register or log in at the [MYOB Developer Portal](https://developer.myob.com/).
2. Create a new app to receive a **Client ID** and **Client Secret**.
3. Add the Orchesty OAuth callback URL to the list of allowed redirect URIs.
4. In Orchesty, open the MYOB application settings, enter the credentials, and complete the OAuth authorization flow.

### API Documentation

MYOB Business API: [https://developer.myob.com/api/myob-business-api/v2/](https://developer.myob.com/api/myob-business-api/v2/)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-myob @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-myob @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import { OAuth2Provider } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import MYOBApplication from '@orchesty/connector-myob/dist/MYOBApplication';
import MYOBGetEmployeeBatch from '@orchesty/connector-myob/dist/Batch/MYOBGetEmployeeBatch';

const app = new MYOBApplication(container.get(OAuth2Provider));
container.setApplication(app);
container.setNode(new MYOBGetEmployeeBatch(), app);
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
