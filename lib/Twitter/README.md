# Twitter Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-twitter?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-twitter)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for Twitter (X), the microblogging and social networking service for posting tweets, reading timelines, and managing followers.

## Application Type

**OAuth 2.0**

This connector uses the Twitter OAuth 2.0 authorization flow. After entering your credentials in Orchesty, you will be redirected to Twitter to authorize access.

| Field | Description |
|---|---|
| `client_id` | Your Twitter app Client ID |
| `client_secret` | Your Twitter app Client Secret |

## Components

| Class | Type | Description |
|---|---|---|
| `TwitterPostATweetConnector` | Connector | Posts a new tweet via `POST /2/tweets` |
| `TwitterDeleteTweetConnector` | Connector | Deletes a tweet by ID via `POST /2/tweets/{id}` |
| `TwitterGetFollowersBatch` | Batch | Paginates through followers of a user (100 per page) via `GET /2/users/{id}/followers` |

## Setup

### Credentials

1. Apply for a [Twitter Developer account](https://developer.twitter.com/en/apply-for-access) and create a project and app.
2. In **Keys and tokens**, copy the **Client ID** and **Client Secret** (OAuth 2.0 credentials).
3. Add the Orchesty redirect URL to the **Callback URI / Redirect URL** list.
4. In Orchesty, open the Twitter application settings, enter both values, and complete the OAuth authorization flow.

### API Documentation

Twitter API v2: [https://developer.twitter.com/en/docs/twitter-api](https://developer.twitter.com/en/docs/twitter-api)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-twitter @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-twitter @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import { OAuth2Provider } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import TwitterApplication from '@orchesty/connector-twitter/dist/TwitterApplication';
import TwitterPostATweetConnector from '@orchesty/connector-twitter/dist/Connector/TwitterPostATweetConnector';
import TwitterDeleteTweetConnector from '@orchesty/connector-twitter/dist/Connector/TwitterDeleteTweetConnector';
import TwitterGetFollowersBatch from '@orchesty/connector-twitter/dist/Batch/TwitterGetFollowersBatch';

const app = new TwitterApplication(container.get(OAuth2Provider));
container.setApplication(app);
container.setNode(new TwitterPostATweetConnector(), app);
container.setNode(new TwitterDeleteTweetConnector(), app);
container.setNode(new TwitterGetFollowersBatch(), app);
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
