# Salesforce Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-sales-force?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-sales-force)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for Salesforce, the world's leading CRM platform for managing customer relationships, sales pipelines, and business processes.

## Application Type

**OAuth 2.0**

This connector uses the Salesforce OAuth 2.0 authorization flow. After entering your credentials in Orchesty, you will be redirected to Salesforce to authorize access. The API base URL is built from your Salesforce instance name: `https://{instance_name}.my.salesforce.com/services/data/v55.0/sobjects`.

| Field | Description |
|---|---|
| `client_id` | Connected App Consumer Key from Salesforce Setup |
| `client_secret` | Connected App Consumer Secret from Salesforce Setup |
| `instance_name` | Your Salesforce instance name (e.g. `mycompany`) |

## Components

| Class | Type | Description |
|---|---|---|
| `SalesForceCreateRecordConnector` | Connector | Creates a new Account record via `POST /Account/` |
| `SalesForceUpdateRecordConnector` | Connector | Updates an existing Account record via `PATCH /Account/{recordId}` |

## Setup

### Credentials

1. Log in to [Salesforce](https://login.salesforce.com/) and navigate to **Setup → App Manager**.
2. Create a new **Connected App**, enable OAuth, and add the Orchesty callback URL to **Callback URLs**.
3. Note the **Consumer Key** (Client ID) and **Consumer Secret** (Client Secret).
4. Your **instance name** is the subdomain of your Salesforce org URL (e.g. `mycompany` from `mycompany.my.salesforce.com`).
5. In Orchesty, open the Salesforce application settings, enter the credentials, and complete the OAuth authorization flow.

### API Documentation

Salesforce REST API: [https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/intro_what_is_rest_api.htm](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/intro_what_is_rest_api.htm)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-sales-force @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-sales-force @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import { OAuth2Provider } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import SalesForceApplication from '@orchesty/connector-sales-force/dist/SalesForceApplication';
import SalesForceCreateRecordConnector from '@orchesty/connector-sales-force/dist/Connector/SalesForceCreateRecordConnector';
import SalesForceUpdateRecordConnector from '@orchesty/connector-sales-force/dist/Connector/SalesForceUpdateRecordConnector';

const app = new SalesForceApplication(container.get(OAuth2Provider));
container.setApplication(app);
container.setNode(new SalesForceCreateRecordConnector(), app);
container.setNode(new SalesForceUpdateRecordConnector(), app);
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
