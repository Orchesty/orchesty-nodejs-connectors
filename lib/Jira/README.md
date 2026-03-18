# Jira Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-jira?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-jira)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for Jira, an issue and bug tracking tool that allows software developers to manage product development.

## Application Type

**Basic**

This connector authenticates using a username and API token encoded as HTTP Basic auth (`user:token` Base64-encoded in the `Authorization` header). The Atlassian instance URL is configured per installation.

| Field | Description |
|---|---|
| `prefix_url` | Full URL of your Atlassian Jira instance (e.g. `https://yourcompany.atlassian.net`) |
| `user` | Your Atlassian account email address |
| `password` | Your Atlassian API token (not your password) |
| `bug_type` | Jira issue type ID for bugs |
| `task_type` | Jira issue type ID for tasks |
| `story_type` | Jira issue type ID for stories |

## Components

| Class | Type | Description |
|---|---|---|
| `JiraCreateIssueConnector` | Connector | Creates a new issue via `POST /rest/api/3/issue` |
| `JiraGetIssueConnector` | Connector | Fetches a single issue by ID via `GET /rest/api/3/issue/{id}` |
| `JiraGetWorklogsConnector` | Connector | Fetches a list of worklogs by IDs via `POST /rest/api/3/worklog/list` |
| `JiraGetServicedeskOrgsBatch` | Batch | Paginates through all Service Desk organizations via `GET /rest/servicedeskapi/organization` |
| `JiraGetUpdatedWorklogIdsBatch` | Batch | Paginates through IDs of worklogs updated since a given timestamp via `GET /rest/api/3/worklog/updated` |

## Setup

### Credentials

1. Log in to your [Atlassian](https://id.atlassian.com) account.
2. Navigate to **Account Settings → Security → API tokens** and create a new API token.
3. Note your Jira instance URL (e.g. `https://yourcompany.atlassian.net`).
4. In Orchesty, open the Jira application settings and fill in:
   - **Atlassian url** — your full Jira instance URL
   - **User** — your Atlassian account email
   - **Token** — your API token
5. Also configure the issue type IDs (Bug, Task, Story) from **Jira → Project settings → Issue types**.

### API Documentation

Jira REST API v3: [https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-jira @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-jira @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import JiraApplication from '@orchesty/connector-jira/dist/JiraApplication';
import JiraCreateIssueConnector from '@orchesty/connector-jira/dist/Connector/JiraCreateIssueConnector';
import JiraGetIssueConnector from '@orchesty/connector-jira/dist/Connector/JiraGetIssueConnector';
import JiraGetWorklogsConnector from '@orchesty/connector-jira/dist/Connector/JiraGetWorklogsConnector';
import JiraGetServicedeskOrgsBatch from '@orchesty/connector-jira/dist/Batch/JiraGetServicedeskOrgsBatch';
import JiraGetUpdatedWorklogIdsBatch from '@orchesty/connector-jira/dist/Batch/JiraGetUpdatedWorklogIdsBatch';

const app = new JiraApplication();
container.setApplication(app);
container.setNode(new JiraCreateIssueConnector(), app);
container.setNode(new JiraGetIssueConnector(), app);
container.setNode(new JiraGetWorklogsConnector(), app);
container.setNode(new JiraGetServicedeskOrgsBatch(), app);
container.setNode(new JiraGetUpdatedWorklogIdsBatch(), app);
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
