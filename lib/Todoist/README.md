# Todoist Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-todoist?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-todoist)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for Todoist, a task manager and to-do list application for professionals and small businesses with projects, comments, and notifications.

## Application Type

**OAuth 2.0**

This connector uses the Todoist OAuth 2.0 authorization flow. After entering your credentials in Orchesty, you will be redirected to Todoist to authorize access.

| Field | Description |
|---|---|
| `client_id` | Your Todoist app Client ID |
| `client_secret` | Your Todoist app Client Secret |

## Components

| Class | Type | Description |
|---|---|---|
| `TodoistCreateNewTaskConnector` | Connector | Creates a new task via `POST /tasks` |
| `TodoistCreateProjectConnector` | Connector | Creates a new project via `POST /projects` |
| `TodoistGetAllProjectsBatch` | Batch | Fetches all projects via `GET /projects` |

## Setup

### Credentials

1. Log in to [Todoist](https://todoist.com/) and navigate to the [App Management Console](https://developer.todoist.com/appconsole.html).
2. Create a new app and note the **Client ID** and **Client Secret**.
3. Add the Orchesty redirect URL to the **OAuth Redirect URL** list.
4. In Orchesty, open the Todoist application settings, enter both values, and complete the OAuth authorization flow.

### API Documentation

Todoist REST API: [https://developer.todoist.com/rest/v2/](https://developer.todoist.com/rest/v2/)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-todoist @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-todoist @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import { OAuth2Provider } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import TodoistApplication from '@orchesty/connector-todoist/dist/TodoistApplication';
import TodoistCreateNewTaskConnector from '@orchesty/connector-todoist/dist/Connector/TodoistCreateNewTaskConnector';
import TodoistCreateProjectConnector from '@orchesty/connector-todoist/dist/Connector/TodoistCreateProjectConnector';
import TodoistGetAllProjectsBatch from '@orchesty/connector-todoist/dist/Batch/TodoistGetAllProjectsBatch';

const app = new TodoistApplication(container.get(OAuth2Provider));
container.setApplication(app);
container.setNode(new TodoistCreateNewTaskConnector(), app);
container.setNode(new TodoistCreateProjectConnector(), app);
container.setNode(new TodoistGetAllProjectsBatch(), app);
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
