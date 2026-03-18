# Wisepops Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-wisepops?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-wisepops)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for Wisepops, an on-site marketing platform for growing email lists and boosting sales through targeted popups and notifications.

## Application Type

**Basic (Webhook)**

This connector implements `IWebhookApplication` and authenticates using an API key sent via a custom `WISEPOPS-API key="{api_key}"` header. Wisepops delivers collected email events to your Orchesty webhook endpoint.

| Field | Description |
|---|---|
| `api_key` | Your Wisepops API key |

## Components

This connector has no standalone Connector or Batch nodes — all integration logic is handled through the webhook subscription lifecycle built into the Application class.

| Webhook | Event | Description |
|---|---|---|
| Collected Emails | `email` | Triggered when a visitor submits their email via a Wisepops popup |

## Setup

### Credentials

1. Log in to your [Wisepops](https://app.wisepops.com/) account.
2. Navigate to **Settings → Integrations → API** and copy your **API key**.
3. In Orchesty, open the Wisepops application settings, enter the API key, and complete the webhook registration flow.

### Webhooks

After authorization, Orchesty registers a webhook for the `email` event via `POST https://app.wisepops.com/api1/hooks`. When Wisepops detects a form submission, it sends the event to your Orchesty webhook URL.

### API Documentation

Wisepops API: [https://wisepops.com/](https://wisepops.com/)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-wisepops @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-wisepops @orchesty/nodejs-sdk
```

Register the application in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import WisepopsApplication from '@orchesty/connector-wisepops/dist/WisepopsApplication';

const app = new WisepopsApplication();
container.setApplication(app);
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
