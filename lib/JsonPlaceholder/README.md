# JSONPlaceholder Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-json-placeholder?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-json-placeholder)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for JSONPlaceholder, a free fake REST API for testing and prototyping.

## Application Type

**No authentication required**

This connector does not require any credentials or authorization. It connects to `https://jsonplaceholder.typicode.com` directly without application installation (`isInstallable = false`).

## Components

| Class | Type | Description |
|---|---|---|
| `JsonPlaceholderGetPostConnector` | Connector | Fetches a single post by ID via `GET /posts/{id}` |
| `JsonPlaceholderGetCommentConnector` | Connector | Fetches a single comment by ID via `GET /comments/{id}` |
| `JsonPlaceholderGetUserConnector` | Connector | Fetches a single user by ID via `GET /users/{id}` |
| `JsonPlaceholderGetPostListBatch` | Batch | Fetches a filtered list of posts via `GET /posts` |
| `JsonPlaceholderGetCommentListBatch` | Batch | Fetches a filtered list of comments via `GET /comments` |
| `JsonPlaceholderGetUserListBatch` | Batch | Fetches a filtered list of users via `GET /users` |

## Setup

No credentials are required. This connector is intended for development, testing, and prototyping Orchesty topologies without connecting to a real external service.

### API Documentation

JSONPlaceholder: [https://jsonplaceholder.typicode.com/](https://jsonplaceholder.typicode.com/)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-json-placeholder @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-json-placeholder @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import JsonPlaceholderApplication from '@orchesty/connector-json-placeholder/dist/JsonPlaceholderApplication';
import JsonPlaceholderGetPostConnector from '@orchesty/connector-json-placeholder/dist/Connector/JsonPlaceholderGetPostConnector';
import JsonPlaceholderGetCommentConnector from '@orchesty/connector-json-placeholder/dist/Connector/JsonPlaceholderGetCommentConnector';
import JsonPlaceholderGetUserConnector from '@orchesty/connector-json-placeholder/dist/Connector/JsonPlaceholderGetUserConnector';
import JsonPlaceholderGetPostListBatch from '@orchesty/connector-json-placeholder/dist/Batch/JsonPlaceholderGetPostListBatch';
import JsonPlaceholderGetCommentListBatch from '@orchesty/connector-json-placeholder/dist/Batch/JsonPlaceholderGetCommentListBatch';
import JsonPlaceholderGetUserListBatch from '@orchesty/connector-json-placeholder/dist/Batch/JsonPlaceholderGetUserListBatch';

const app = new JsonPlaceholderApplication();
container.setApplication(app);
container.setNode(new JsonPlaceholderGetPostConnector(), app);
container.setNode(new JsonPlaceholderGetCommentConnector(), app);
container.setNode(new JsonPlaceholderGetUserConnector(), app);
container.setNode(new JsonPlaceholderGetPostListBatch(), app);
container.setNode(new JsonPlaceholderGetCommentListBatch(), app);
container.setNode(new JsonPlaceholderGetUserListBatch(), app);
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
