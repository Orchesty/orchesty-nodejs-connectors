# Toggl Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-toggl?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-toggl)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for Toggl Track, a time tracking tool for boosting team performance and billing every minute of work.

## Application Type

**Basic**

This connector authenticates using HTTP Basic auth with your Toggl username and password (Base64-encoded).

| Field | Description |
|---|---|
| `user` | Your Toggl account username (email) |
| `password` | Your Toggl account password |

## Components

| Class | Type | Description |
|---|---|---|
| `TimeEntriesBatch` | Batch | Fetches time entries for a given date range via `GET /me/time_entries?start_date={start}&end_date={end}` |

## Setup

### Credentials

1. Log in to your [Toggl Track](https://track.toggl.com/) account.
2. In Orchesty, open the Toggl application settings and enter your Toggl **username** (email) and **password**.

> Alternatively, Toggl supports API token authentication — to use your API token as the password, use the literal string `api_token` as the username and your API token as the password.

### API Documentation

Toggl Track API: [https://engineering.toggl.com/docs/](https://engineering.toggl.com/docs/)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-toggl @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-toggl @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import TogglApplication from '@orchesty/connector-toggl/dist/TogglApplication';
import TimeEntriesBatch from '@orchesty/connector-toggl/dist/Batch/TimeEntriesBatch';

const app = new TogglApplication();
container.setApplication(app);
container.setNode(new TimeEntriesBatch(), app);
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
