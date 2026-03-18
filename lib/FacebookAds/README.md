# Facebook Ads Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-facebook-ads?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-facebook-ads)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for Facebook Ads, the Meta advertising platform that allows businesses to create and manage ad campaigns across Facebook, Instagram, Messenger, and WhatsApp.

## Application Type

**OAuth 2.0**

This connector uses the Facebook OAuth 2.0 authorization flow with the `ads_management` and `ads_read` scopes. After entering your credentials in Orchesty, you will be redirected to Facebook to authorize access.

| Field | Description |
|---|---|
| `client_id` | Your Meta app Client ID from the Meta Developer Portal |
| `client_secret` | Your Meta app Client Secret from the Meta Developer Portal |

## Components

| Class | Type | Description |
|---|---|---|
| `FacebookCreateCampaigns` | Connector | Creates a new ad campaign for an ad account via `POST /v12.0/act_{accountId}/campaigns` |

## Setup

### Credentials

1. Go to [Meta for Developers](https://developers.facebook.com/apps) and create a new app (type: **Business**).
2. Add the **Marketing API** product to your app.
3. Under **Settings → Basic**, note the **App ID** (Client ID) and **App Secret** (Client Secret).
4. Under **App Review**, request access to the `ads_management` and `ads_read` permissions.
5. Add the Orchesty OAuth callback URL to **Valid OAuth Redirect URIs** under **Facebook Login → Settings**.
6. In Orchesty, open the Facebook Ads application settings, fill in the Client ID and Client Secret, then complete the OAuth authorization flow.

### API Documentation

Meta Marketing API: [https://developers.facebook.com/docs/marketing-api/](https://developers.facebook.com/docs/marketing-api/)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-facebook-ads @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-facebook-ads @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import { OAuth2Provider } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import FacebookAdsApplication from '@orchesty/connector-facebook-ads/dist/FacebookAdsApplication';
import FacebookCreateCampaigns from '@orchesty/connector-facebook-ads/dist/Connector/FacebookCreateCampaigns';

const app = new FacebookAdsApplication(container.get(OAuth2Provider));
container.setApplication(app);
container.setNode(new FacebookCreateCampaigns(), app);
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
