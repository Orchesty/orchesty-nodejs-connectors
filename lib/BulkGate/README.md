# BulkGate Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-bulk-gate?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-bulk-gate)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for BulkGate, a messaging platform that enables companies to send personalized bulk and transactional SMS messages.

## Application Type

**Basic**

This connector authenticates using an Application ID and Application Token. Both credentials are included in every request body alongside the message payload.

| Field | Description |
|---|---|
| `application_id` | Your BulkGate application ID |
| `application_token` | Your BulkGate application token |

## Components

| Class | Type | Description |
|---|---|---|
| `BulkGateGetPromotionalSMSConnector` | Connector | Sends a promotional SMS via `POST /api/1.0/simple/promotional` |
| `BulkGateGetTransactionSMSConnector` | Connector | Sends a transactional SMS via `POST /api/1.0/simple/transactional` |

## Setup

### Credentials

Log in to the [BulkGate Portal](https://portal.bulkgate.com) and navigate to the API administration section to create an application and obtain your **Application ID** and **Application Token**.

### API Documentation

BulkGate HTTP Simple API: [https://help.bulkgate.com/docs/en/http-simple-transactional.html](https://help.bulkgate.com/docs/en/http-simple-transactional.html)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-bulk-gate @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-bulk-gate @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import BulkGateApplication from '@orchesty/connector-bulk-gate/dist/BulkGateApplication';
import BulkGateGetPromotionalSMSConnector from '@orchesty/connector-bulk-gate/dist/Connector/BulkGateGetPromotionalSMSConnector';
import BulkGateGetTransactionSMSConnector from '@orchesty/connector-bulk-gate/dist/Connector/BulkGateGetTransactionSMSConnector';

const app = new BulkGateApplication();
container.setApplication(app);
container.setNode(new BulkGateGetPromotionalSMSConnector(), app);
container.setNode(new BulkGateGetTransactionSMSConnector(), app);
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
