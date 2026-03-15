# ActiveCampaign Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-active-campaign?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-active-campaign)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for ActiveCampaign, a cloud-based customer experience automation (CXA) platform combining email marketing, marketing automation, sales automation, and CRM for small-to-mid-sized businesses.

## Application Type

**Basic**

This connector authenticates using an API token sent as the `api-token` request header. No OAuth flow is required — credentials are entered directly in Orchesty.

| Field | Description |
|---|---|
| `application_token` | Your ActiveCampaign API key |
| `subdomain` | Your ActiveCampaign account name (the subdomain part of your account URL) |

## Components

| Class | Type | Description |
|---|---|---|
| `ActivateCampaignCreateAccountConnector` | Connector | Creates a new account (organization) via `POST /api/3/accounts` |
| `ActiveCampaignListAccountsBatch` | Batch | Lists all accounts using offset-based pagination (`GET /api/3/accounts`, 50 records per page) |

## Setup

### Credentials

1. Log in to your ActiveCampaign account.
2. Navigate to **Settings → Developer**.
3. Under **API Access**, copy your **API URL** — the subdomain is the part before `.api-us1.com` (e.g. if your URL is `https://mycompany.api-us1.com`, the subdomain is `mycompany`).
4. Copy the **API Key** shown on the same page.
5. In Orchesty, open the ActiveCampaign application settings and fill in:
   - **Application key** — paste your API Key
   - **Account name** — paste your subdomain

### API Documentation

ActiveCampaign API Reference: [https://developers.activecampaign.com/reference](https://developers.activecampaign.com/reference)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-active-campaign @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-active-campaign @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import ActiveCampaignApplication from '@orchesty/connector-active-campaign/dist/ActiveCampaignApplication';
import ActivateCampaignCreateAccountConnector from '@orchesty/connector-active-campaign/dist/Connector/ActivateCampaignCreateAccountConnector';
import ActiveCampaignListAccountsBatch from '@orchesty/connector-active-campaign/dist/Batch/ActiveCampaignListAccountsBatch';

const activeCampaignApp = new ActiveCampaignApplication();
container.setApplication(activeCampaignApp);
container.setNode(new ActivateCampaignCreateAccountConnector(), activeCampaignApp);
container.setNode(new ActiveCampaignListAccountsBatch(), activeCampaignApp);
```

## License

This connector is released under the **Apache License 2.0**. See the [LICENSE](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE) file for the full license text.

## Contributing

Contributions are welcome! This connector is part of the open-source [Orchesty Node.js Connectors](https://github.com/Orchesty/orchesty-nodejs-connectors) monorepo.

For guidelines on how to create or update connectors — including project setup, coding conventions, and how to write tests — please refer to the [Contributing to Connectors](https://orchesty.io/community/contributing-to-connectors) guide.

All contributions should include:
- Source code in `src/` following the existing connector structure
- Tests in `src/**/__tests__/` with `input.json`, `mock.json`, and `output.json` fixtures
- An updated `CHANGELOG.md` entry
