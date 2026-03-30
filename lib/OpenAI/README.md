# OpenAI Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-open-ai?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-open-ai)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for OpenAI, enabling you to get answers, find inspiration, and build more productive workflows using the OpenAI API.

## Application Type

**Basic**

This connector authenticates using an API key sent as a Bearer token in the `Authorization` header. Optionally, an Organization ID and Project ID can be specified to route requests to a specific organization or project.

| Field | Description |
|---|---|
| `api_key` | Your OpenAI API key (required) |
| `organization_id` | OpenAI Organization ID — routes usage to a specific org (optional) |
| `project_id` | OpenAI Project ID — routes usage to a specific project (optional) |

## Components

| Class | Type | Description |
|---|---|---|
| `OpenAIPostResponseConnector` | Connector | Sends a request to the OpenAI Responses API via `POST /v1/responses` and returns the generated response |

## Setup

### Credentials

1. Log in to [platform.openai.com](https://platform.openai.com/).
2. Navigate to **Settings → API keys** and create a new secret key.
3. Copy the key immediately — it will not be shown again.
4. Optionally, find your **Organization ID** under **Settings → Organization → General** and your **Project ID** under **Settings → Projects**.
5. In Orchesty, open the OpenAI application settings and fill in the **Api key** field (and optionally the other two fields).

### API Documentation

OpenAI API Reference: [https://platform.openai.com/docs/api-reference/](https://platform.openai.com/docs/api-reference/)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-open-ai @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-open-ai @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import OpenAIApplication from '@orchesty/connector-open-ai/dist/OpenAIApplication';
import OpenAIPostResponseConnector from '@orchesty/connector-open-ai/dist/Connector/OpenAIPostResponseConnector';

const app = new OpenAIApplication();
container.setApplication(app);
container.setNode(new OpenAIPostResponseConnector(), app);
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
