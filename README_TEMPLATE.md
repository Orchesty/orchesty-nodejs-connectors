# [AppName] Connector

[![npm](https://img.shields.io/npm/v/[PACKAGE_NAME]?color=15ba68)](https://www.npmjs.com/package/[PACKAGE_NAME])
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for [AppName]. [One-sentence description of what the application is and what it does.]

## Application Type

**[Basic | OAuth 2.0]**

<!-- Basic: The application authenticates using an API key or token provided directly in the request.
     OAuth 2.0: The application uses OAuth 2.0 authorization flow with client ID and client secret. -->

| Field | Description |
|---|---|
| `[field_name]` | [What this field is and where to find it] |
| `[field_name]` | [What this field is and where to find it] |

## Components

| Class | Type | Description |
|---|---|---|
| `[ConnectorClassName]` | Connector | [What the connector does, e.g. "Creates a new contact via POST /contacts"] |
| `[BatchClassName]` | Batch | [What the batch node does, e.g. "Lists all contacts using cursor-based pagination"] |

## Setup

### Credentials

> Describe step by step where to obtain the required credentials for this application.

1. Log in to your [AppName] account.
2. Navigate to **[Settings → Section]**.
3. Copy the **[API Key / Token / Client ID]** and paste it into the corresponding field in Orchesty.

### API Documentation

[AppName] API Reference: [https://developers.[appname].com/reference](https://developers.[appname].com/reference)

## Installation & Usage

Install the package:

```bash
npm install [PACKAGE_NAME] @orchesty/nodejs-sdk
# or
pnpm add [PACKAGE_NAME] @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import [AppName]Application from '[PACKAGE_NAME]/dist/[AppName]Application';
import [ConnectorClassName] from '[PACKAGE_NAME]/dist/Connector/[ConnectorClassName]';
import [BatchClassName] from '[PACKAGE_NAME]/dist/Batch/[BatchClassName]';

const [appName]App = new [AppName]Application();
container.setApplication([appName]App);
container.setNode(new [ConnectorClassName](), [appName]App);
container.setNode(new [BatchClassName](), [appName]App);
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
