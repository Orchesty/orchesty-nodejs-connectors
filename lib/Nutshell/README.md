# Nutshell Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-nutshell?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-nutshell)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for Nutshell, an affordable and easy-to-use CRM that helps small-business sales teams win more deals.

## Application Type

**Basic**

This connector authenticates using a username and API key encoded as HTTP Basic auth (`username:api_key` Base64-encoded). All requests are sent to a single JSON-RPC endpoint (`https://app.nutshell.com/api/v1/json`), with the operation specified via the `method` field in the request body.

| Field | Description |
|---|---|
| `user` | Your Nutshell account username (email address) |
| `password` | Your Nutshell API key |

## Components

| Class | Type | Description |
|---|---|---|
| `NutshellGetAccountConnector` | Connector | Retrieves a single CRM account by ID via JSON-RPC `getAccount` |
| `NutshellNewAccountConnector` | Connector | Creates a new CRM account via JSON-RPC `newAccount` |
| `NutshellNewLeadConnector` | Connector | Creates a new sales lead via JSON-RPC `newLead` |
| `NutshellNewTaskConnector` | Connector | Creates a new task via JSON-RPC `newTask` |

## Setup

### Credentials

1. Log in to [Nutshell](https://app.nutshell.com/).
2. Navigate to **Setup → API keys** (or **My Profile → API**).
3. Generate a new API key.
4. In Orchesty, open the Nutshell application settings and enter your **Username** (email) and **API Key**.

### API Documentation

Nutshell Developer Hub: [https://developers.nutshell.com/](https://developers.nutshell.com/)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-nutshell @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-nutshell @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import NutshellApplication from '@orchesty/connector-nutshell/dist/NutshellApplication';
import NutshellGetAccountConnector from '@orchesty/connector-nutshell/dist/Connector/NutshellGetAccountConnector';
import NutshellNewAccountConnector from '@orchesty/connector-nutshell/dist/Connector/NutshellNewAccountConnector';
import NutshellNewLeadConnector from '@orchesty/connector-nutshell/dist/Connector/NutshellNewLeadConnector';
import NutshellNewTaskConnector from '@orchesty/connector-nutshell/dist/Connector/NutshellNewTaskConnector';

const app = new NutshellApplication();
container.setApplication(app);
container.setNode(new NutshellGetAccountConnector(), app);
container.setNode(new NutshellNewAccountConnector(), app);
container.setNode(new NutshellNewLeadConnector(), app);
container.setNode(new NutshellNewTaskConnector(), app);
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
