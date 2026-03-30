# Raynet CRM Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-raynet-crm?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-raynet-crm)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for RAYNET CRM, an online CRM software that helps salespeople and managers keep track of business easily.

## Application Type

**Basic**

This connector authenticates using a username and API key encoded as HTTP Basic auth. Every request also includes the `X-Instance-Name` header to identify the specific RAYNET CRM instance.

| Field | Description |
|---|---|
| `user` | Your RAYNET CRM username |
| `password` | Your RAYNET CRM API key |
| `instanceName` | Your RAYNET CRM instance name (e.g. `my-company`) |

## Components

| Class | Type | Description |
|---|---|---|
| `RaynetCRMGetVoipByTel` | Connector | Searches persons/companies/leads by phone number via `GET /voip/searchByTel` |
| `RaynetCRMUniversalActivityDetail` | Connector | Fetches details of a CRM activity by entity type and ID via `GET /{entityType}/{id}` |
| `RaynetCRMUniversalCreateActivity` | Connector | Creates a new CRM activity of any entity type via `PUT /{entityType}` |
| `RaynetCRMUniversalUpdateActivity` | Connector | Updates an existing CRM activity by ID via `POST /{entityType}/{id}` |
| `RaynetCRMUniversalDeleteActivity` | Connector | Deletes a CRM activity by entity type and ID via `DELETE /{entityType}/{id}` |
| `RaynetCRMGetClients` | Batch | Paginates through all client companies (1000 per page) via `GET /company` |
| `RaynetCRMGetContactPersons` | Batch | Paginates through all contact persons (1000 per page) via `GET /person` |
| `RaynetCRMGetActivities` | Batch | Paginates through activities modified since last run via `GET /activity` |
| `RaynetCRMSubscribeWebhook` | Batch | Registers webhook subscriptions for CRM entity events via `PUT /webhook` |
| `RaynetCRMUnregisterWebhook` | Batch | Removes a registered webhook subscription via `DELETE /webhook/{id}` |

## Setup

### Credentials

1. Log in to your [RAYNET CRM](https://app.raynet.cz/) account.
2. Navigate to **Settings → API** and note your **API key**.
3. Your **instance name** is the subdomain visible in your RAYNET CRM URL (e.g. `my-company` from `my-company.raynet.cz`).
4. In Orchesty, open the Raynet CRM application settings and fill in the **User**, **ApiKey**, and **Instance name** fields.

### API Documentation

RAYNET CRM API: [https://app.raynet.cz/api/doc/](https://app.raynet.cz/api/doc/)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-raynet-crm @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-raynet-crm @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import RaynetCRMApplication from '@orchesty/connector-raynet-crm/dist/RaynetCRMApplication';
import RaynetCRMGetVoipByTel from '@orchesty/connector-raynet-crm/dist/Connector/RaynetCRMGetVoipByTel';
import RaynetCRMUniversalCreateActivity from '@orchesty/connector-raynet-crm/dist/Connector/RaynetCRMUniversalCreateActivity';
import RaynetCRMUniversalUpdateActivity from '@orchesty/connector-raynet-crm/dist/Connector/RaynetCRMUniversalUpdateActivity';
import RaynetCRMUniversalActivityDetail from '@orchesty/connector-raynet-crm/dist/Connector/RaynetCRMUniversalActivityDetail';
import RaynetCRMUniversalDeleteActivity from '@orchesty/connector-raynet-crm/dist/Connector/RaynetCRMUniversalDeleteActivity';
import RaynetCRMGetClients from '@orchesty/connector-raynet-crm/dist/Batch/RaynetCRMGetClients';
import RaynetCRMGetContactPersons from '@orchesty/connector-raynet-crm/dist/Batch/RaynetCRMGetContactPersons';
import RaynetCRMGetActivities from '@orchesty/connector-raynet-crm/dist/Batch/RaynetCRMGetActivities';
import RaynetCRMSubscribeWebhook from '@orchesty/connector-raynet-crm/dist/Batch/RaynetCRMSubscribeWebhook';
import RaynetCRMUnregisterWebhook from '@orchesty/connector-raynet-crm/dist/Batch/RaynetCRMUnregisterWebhook';

const app = new RaynetCRMApplication();
container.setApplication(app);
container.setNode(new RaynetCRMGetVoipByTel(), app);
container.setNode(new RaynetCRMUniversalCreateActivity(), app);
container.setNode(new RaynetCRMUniversalUpdateActivity(), app);
container.setNode(new RaynetCRMUniversalActivityDetail(), app);
container.setNode(new RaynetCRMUniversalDeleteActivity(), app);
container.setNode(new RaynetCRMGetClients(), app);
container.setNode(new RaynetCRMGetContactPersons(), app);
container.setNode(new RaynetCRMGetActivities(), app);
container.setNode(new RaynetCRMSubscribeWebhook(), app);
container.setNode(new RaynetCRMUnregisterWebhook(), app);
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
