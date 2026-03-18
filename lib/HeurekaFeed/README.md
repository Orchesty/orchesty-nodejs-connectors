# Heureka Feed Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-heureka-feed?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-heureka-feed)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for Heureka, the largest shopping portal and price comparison site on the Czech Internet.

## Application Type

**Basic (feed URL)**

This connector does not authenticate against Heureka's API. Instead, it fetches XML product and availability feed files from user-provided URLs and parses the XML data for further processing in Orchesty.

| Field | Description |
|---|---|
| `product-feed` | Full URL of your Heureka product XML feed |
| `availability-feed` | Full URL of your Heureka availability XML feed |

## Components

| Class | Type | Description |
|---|---|---|
| `HeurekaProductFeedConnector` | Connector | Fetches and parses the Heureka product XML feed from the configured URL |
| `HeurekaAvailabilityFeedConnector` | Connector | Fetches and parses the Heureka availability XML feed from the configured URL |

## Setup

### Credentials

1. Generate your Heureka product feed and availability feed URLs in your e-shop or feed management tool.
2. In Orchesty, open the Heureka Feed application settings and fill in:
   - **Product feed url** — full URL to your product XML feed
   - **Availability feed url** — full URL to your availability XML feed

### Feed Format Documentation

Heureka XML Feed Format: [https://sluzby.heureka.cz/napoveda/xml-feed/](https://sluzby.heureka.cz/napoveda/xml-feed/)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-heureka-feed @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-heureka-feed @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import HeurekaFeedApplication from '@orchesty/connector-heureka-feed/dist/HeurekaFeedApplication';
import HeurekaProductFeedConnector from '@orchesty/connector-heureka-feed/dist/Connector/HeurekaProductFeedConnector';
import HeurekaAvailabilityFeedConnector from '@orchesty/connector-heureka-feed/dist/Connector/HeurekaAvailabilityFeedConnector';

const app = new HeurekaFeedApplication();
container.setApplication(app);
container.setNode(new HeurekaProductFeedConnector(), app);
container.setNode(new HeurekaAvailabilityFeedConnector(), app);
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
