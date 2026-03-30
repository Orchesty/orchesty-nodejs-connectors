# Orchesty Common Nodes

[![npm](https://img.shields.io/npm/v/@orchesty/connector-common?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-common)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

A shared [Orchesty](https://orchesty.io) package providing reusable utility nodes for use across any topology — user listing, OAuth2 token refresh, topology triggering, event filtering, and rate-limiter management.

## Contents

This package contains no external API connector — it provides general-purpose processing nodes:

| Class | Type | Description |
|---|---|---|
| `ListUsers` | Batch | Queries all enabled application installs for a given app and emits one batch item per user, with optional rate-limiter keys |
| `GetApplicationForRefreshBatchConnector` | Batch | Finds all enabled OAuth2 applications expiring within 5 minutes and emits them as batch items for downstream token refresh |
| `RefreshOAuth2TokenNode` | Connector | Refreshes the OAuth2 access token for the application named in the incoming message |
| `RunTopology` | Connector | Triggers a named Orchesty topology and node via `TopologyRunner` |
| `EventStatusFilter` | Node | Filters messages by event type; stops processing if the type does not match the configured value |
| `UniversalRemoveLimiterNode` | Node | Removes the rate-limiter from the current process message |

## Installation

```bash
npm install @orchesty/connector-common @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-common @orchesty/nodejs-sdk
```

## Usage

```typescript
import { container } from '@orchesty/nodejs-sdk';
import TopologyRunner from '@orchesty/nodejs-sdk/dist/lib/Topology/TopologyRunner';
import ListUsers from '@orchesty/connector-common/dist/ListUsers/ListUsers';
import GetApplicationForRefreshBatchConnector from '@orchesty/connector-common/dist/OAuth2/GetApplicationForRefreshBatchConnector';
import RefreshOAuth2TokenNode from '@orchesty/connector-common/dist/OAuth2/RefreshOAuth2TokenNode';
import RunTopology from '@orchesty/connector-common/dist/RunTopology/RunTopology';
import EventStatusFilter from '@orchesty/connector-common/dist/EventStatusFilter/EventStatusFilter';

container.setNode(new ListUsers());
container.setNode(new GetApplicationForRefreshBatchConnector());
container.setNode(new RefreshOAuth2TokenNode(container));
container.setNode(new RunTopology(container.get(TopologyRunner), 'my-topology', 'start-node'));
container.setNode(new EventStatusFilter('processSuccess'));
```

## License

This package is released under the **Apache License 2.0**. See the [LICENSE](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE) file for the full license text.

## Contributing

Contributions are welcome! This package is part of the open-source [Orchesty Node.js Connectors](https://github.com/Orchesty/orchesty-nodejs-connectors) monorepo.

For guidelines on how to create or update connectors — including project setup, coding conventions, and how to write tests — please refer to the **[Contributing to Connectors](https://orchesty.io/community/contributing-to-connectors)** guide.

All contributions should include:
- Source code in `src/` following the existing connector structure
- Tests in `src/**/__tests__/` with `input.json`, `mock.json`, and `output.json` fixtures
- An updated `CHANGELOG.md` entry
