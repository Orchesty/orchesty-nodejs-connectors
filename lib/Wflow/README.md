# Wflow Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-wflow?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-wflow)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for wflow, a digital accounting platform that automates document processing, extraction, and approval workflows.

## Application Type

**OAuth 2.0**, available in two variants:

| Class | Grant type | Use when |
|---|---|---|
| `WflowApplication` | Authorization Code | A wflow user authorizes Orchesty interactively |
| `WflowClientCredentialsApplication` | Client credentials | Server-to-server access via a wflow API client |

Both classes use the same application name (`wflow`), so installs, nodes and webhook records stay valid when you switch between them. **A worker registers only one of the two classes.** All connectors and batches work with either class.

### Authorization Code (`WflowApplication`)

This variant uses the wflow OAuth 2.0 authorization flow via `https://account.wflow.com/connect/authorize`. After authorization, the selected organization is stored in a separate settings form that is populated dynamically.

> **Note:** `WflowApplication` requires `OAuth2Provider` and `WflowGetOrganizationsConnector` in its constructor.

| Field | Description |
|---|---|
| `client_id` | Your wflow app Client ID |
| `client_secret` | Your wflow app Client Secret |
| `organization` | Selected wflow organization ID (populated after authorization) |

### Client credentials (`WflowClientCredentialsApplication`)

This variant requests access tokens from `https://account.wflow.com/connect/token` using the `client_credentials` grant (scope `uccl_common_api`). Tokens are cached in Redis per user and per client ID/secret pair, so changing the credentials takes effect immediately.

> **Note:** `WflowClientCredentialsApplication` requires `CacheService` in its constructor.

| Field | Description |
|---|---|
| `client_id` | Client ID of the wflow API client |
| `client_secret` | Client Secret of the wflow API client |
| `organization` | wflow organization subdomain, e.g. `hanaboso` (entered manually) |

## Components

| Class | Type | Description |
|---|---|---|
| `WflowGetDocumentConnector` | Connector | Retrieves a document by ID via `GET /{org}/documents/{documentId}` |
| `WflowGetDocumentMainFileConnector` | Connector | Downloads the main file of a document as base64 via `GET /{org}/documents/{documentId}/files/main/download` |
| `WflowGetDocumentTypesConnector` | Connector | Lists available document types via `GET /{org}/documents/types` |
| `WflowGetOrganizationsConnector` | Connector | Lists accessible organizations via `GET /user/myorganizations` |
| `WflowPatchAccountingRulesConnector` | Connector | Updates accounting rules register entries via `PATCH /{org}/registers/accountingrules` |
| `WflowPatchChartOfAccountsConnector` | Connector | Updates chart of accounts register entries via `PATCH /{org}/registers/chartofaccounts` |
| `WflowPatchContractsConnector` | Connector | Updates contracts register entries via `PATCH /{org}/registers/contracts` |
| `WflowPatchCostCentersConnector` | Connector | Updates cost centers register entries via `PATCH /{org}/registers/costcenters` |
| `WflowPatchSeriesConnector` | Connector | Updates series register entries via `PATCH /{org}/registers/series` |
| `WflowPatchVatControlStatementLinesConnector` | Connector | Updates VAT control statement lines via `PATCH /{org}/registers/vatcontrolstatementlines` |
| `WflowPatchVatReturnLinesConnector` | Connector | Updates VAT return lines via `PATCH /{org}/registers/vatreturnlines` |
| `WflowPutDocumentConnector` | Connector | Creates or replaces a document via `PUT /{org}/documents` |
| `WflowUpdateDocumentStateConnector` | Connector | Marks a document export task as processed via `PUT /{org}/documents/{documentId}/task/Export/processed` |
| `WflowSubscribeWebhookBatch` | Batch | Registers webhook subscriptions via `PUT /{org}/webhookregistrations` |
| `WflowUnsubscribeWebhookBatch` | Batch | Removes registered webhook subscriptions via `DELETE /{org}/webhookregistrations/{webhookId}` |

## Setup

### Credentials (Authorization Code)

1. Contact [wflow](https://www.wflow.com/) to obtain API client credentials for your organization.
2. In Orchesty, open the wflow application settings, enter the **Client ID** and **Client Secret**, and complete the OAuth authorization flow.
3. After authorization, select your **organization** from the dropdown (populated automatically from your wflow account).

### Credentials (Client credentials)

1. A wflow administrator creates an API client with grant type **Client credentials** in **Organization management → API clients**.
2. The administrator enables the API client in the organization in **Settings → Integrations → API accesses**.
3. In Orchesty, open the wflow application settings and enter the **Client ID**, **Client Secret** and the **organization subdomain**.

### API Documentation

wflow API: [https://www.wflow.com/](https://www.wflow.com/)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-wflow @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-wflow @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import { OAuth2Provider } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import WflowApplication from '@orchesty/connector-wflow/dist/WflowApplication';
import WflowGetOrganizationsConnector from '@orchesty/connector-wflow/dist/Connector/WflowGetOrganizationsConnector';
import WflowGetDocumentConnector from '@orchesty/connector-wflow/dist/Connector/WflowGetDocumentConnector';
import WflowPutDocumentConnector from '@orchesty/connector-wflow/dist/Connector/WflowPutDocumentConnector';
import WflowUpdateDocumentStateConnector from '@orchesty/connector-wflow/dist/Connector/WflowUpdateDocumentStateConnector';
import WflowSubscribeWebhookBatch from '@orchesty/connector-wflow/dist/Batch/WflowSubscribeWebhookBatch';
import WflowUnsubscribeWebhookBatch from '@orchesty/connector-wflow/dist/Batch/WflowUnsubscribeWebhookBatch';

const getOrgsConnector = new WflowGetOrganizationsConnector();
const app = new WflowApplication(container.get(OAuth2Provider), getOrgsConnector);
container.setApplication(app);
container.setNode(getOrgsConnector, app);
container.setNode(new WflowGetDocumentConnector(), app);
container.setNode(new WflowPutDocumentConnector(), app);
container.setNode(new WflowUpdateDocumentStateConnector(), app);
container.setNode(new WflowSubscribeWebhookBatch(), app);
container.setNode(new WflowUnsubscribeWebhookBatch(), app);
// ... register remaining connectors similarly
```

For the client credentials variant, register `WflowClientCredentialsApplication` instead (not both):

```typescript
import { container } from '@orchesty/nodejs-sdk';
import CacheService from '@orchesty/nodejs-sdk/dist/lib/Cache/CacheService';
import WflowClientCredentialsApplication from '@orchesty/connector-wflow/dist/WflowClientCredentialsApplication';
import WflowGetDocumentConnector from '@orchesty/connector-wflow/dist/Connector/WflowGetDocumentConnector';

const app = new WflowClientCredentialsApplication(container.get(CacheService));
container.setApplication(app);
container.setNode(new WflowGetDocumentConnector(), app);
// ... register remaining connectors similarly (WflowGetOrganizationsConnector is not needed)
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
