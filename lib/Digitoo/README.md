# Digitoo Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-digitoo?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-digitoo)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for Digitoo, a cloud-based application that automates and digitalizes the accounting process without the need of manual data entry.

## Application Type

**Basic**

This connector authenticates using an Admin API access token sent as a Bearer token in the `Authorization` header.

| Field | Description |
|---|---|
| `token` | Your Digitoo Admin API access token |

## Components

| Class | Type | Description |
|---|---|---|
| `DigitooGetDocument` | Connector | Fetches a document's file content by ID and returns it as a base64-encoded string via `GET /api/documents/{documentId}/file` |
| `DigitooMarkAsExported` | Connector | Marks a document as successfully exported via `POST /api/documents/{documentId}/mark-as-exported` |
| `DigitooMarkAsExportErrored` | Connector | Marks a document as failed to export with an error message via `POST /api/documents/{documentId}/mark-as-export-errored` |
| `DigitooAddRegisters` | Connector | Upserts register options (VAT codes, cost centers, etc.) for a given register type via `PUT /api/registers` |
| `DigitooDocumentsByStatusBatch` | Batch | Paginates through all documents with `ready-to-export` status via `GET /api/documents` |

## Setup

### Credentials

1. Log in to your Digitoo account.
2. Navigate to **Settings → Workspace** and locate the **API access token** for your workspace's service account.
3. Copy the token and paste it into the **Admin API access token** field in Orchesty.

### API Documentation

Digitoo API Reference: [https://docs.digitoo.ai/api-reference/documents](https://docs.digitoo.ai/api-reference/documents)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-digitoo @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-digitoo @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import DigitooApplication from '@orchesty/connector-digitoo/dist/DigitooApplication';
import DigitooGetDocument from '@orchesty/connector-digitoo/dist/Connector/DigitooGetDocument';
import DigitooMarkAsExported from '@orchesty/connector-digitoo/dist/Connector/DigitooMarkAsExported';
import DigitooMarkAsExportErrored from '@orchesty/connector-digitoo/dist/Connector/DigitooMarkAsExportErrored';
import DigitooAddRegisters from '@orchesty/connector-digitoo/dist/Connector/DigitooAddRegisters';
import DigitooDocumentsByStatusBatch from '@orchesty/connector-digitoo/dist/Batch/DigitooDocumentsByStatusBatch';

const app = new DigitooApplication();
container.setApplication(app);
container.setNode(new DigitooGetDocument(), app);
container.setNode(new DigitooMarkAsExported(), app);
container.setNode(new DigitooMarkAsExportErrored(), app);
container.setNode(new DigitooAddRegisters(), app);
container.setNode(new DigitooDocumentsByStatusBatch(), app);
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
