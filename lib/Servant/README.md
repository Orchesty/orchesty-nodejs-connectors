# Servant Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-servant?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-servant)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for Servant (Webskladservant), a Czech warehouse management system (WMS) for e-commerce order and inventory operations.

## Application Type

**Basic**

This connector authenticates using a username and password against the Servant SOAP API at `https://www.webskladservant.cz/impl/SAPI/V5/?wsdl`. Most operations use SOAP; `ServantGetWarehouses` uses a REST endpoint.

| Field | Description |
|---|---|
| `user` | Your Servant account username (email) |
| `password` | Your Servant account password |

> **Note:** The `getRequestDto()` method is intentionally not supported — SOAP operations are invoked directly using the `soap` npm package. The `warehouse_id` field is used in the application context to specify the default warehouse.

## Components

| Class | Type | Description |
|---|---|---|
| `ServantGetCarriers` | Connector | Retrieves available carriers via SOAP action `GetCarriers` |
| `ServantGetWarehouses` | Connector | Retrieves available warehouses via `GET https://www.webskladservant.cz/impl/SAPI/rest.php?type=warehouses` |
| `ServantImportIssue` | Connector | Imports an issue/dispatch order via SOAP action `ImportIssue` |
| `ServantImportProducts` | Connector | Imports product definitions via SOAP action `ImportProducts` |
| `ServantGetInventory` | Batch | Fetches all inventory items via SOAP action `GetInventory`; merges duplicates by item code |
| `ServantGetIssueOrdersByDate` | Batch | Fetches issue orders within a date interval via SOAP action `GetIssueOrdersByDate`; tracks last run with a 14-day offset |

## Setup

### Credentials

1. Log in to your [Webskladservant](https://www.webskladservant.cz/) account.
2. In the Orchesty Servant application settings, enter your **User** (email) and **Password**.
3. Set the **Warehouse ID** if required for your configuration.

Contact your Servant account manager for API access and credentials if needed.

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-servant @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-servant @orchesty/nodejs-sdk
```

This connector uses the `soap` package to communicate with the Servant WSDL endpoint. Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import ServantApplication from '@orchesty/connector-servant/dist/ServantApplication';
import ServantGetCarriers from '@orchesty/connector-servant/dist/Connector/ServantGetCarriers';
import ServantGetWarehouses from '@orchesty/connector-servant/dist/Connector/ServantGetWarehouses';
import ServantImportIssue from '@orchesty/connector-servant/dist/Connector/ServantImportIssue';
import ServantImportProducts from '@orchesty/connector-servant/dist/Connector/ServantImportProducts';
import ServantGetInventory from '@orchesty/connector-servant/dist/Batch/ServantGetInventory';
import ServantGetIssueOrdersByDate from '@orchesty/connector-servant/dist/Batch/ServantGetIssueOrdersByDate';

const app = new ServantApplication();
container.setApplication(app);
container.setNode(new ServantGetCarriers(), app);
container.setNode(new ServantGetWarehouses(), app);
container.setNode(new ServantImportIssue(), app);
container.setNode(new ServantImportProducts(), app);
container.setNode(new ServantGetInventory(), app);
container.setNode(new ServantGetIssueOrdersByDate(), app);
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
