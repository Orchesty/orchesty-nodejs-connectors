# Mailchimp Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-mailchimp?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-mailchimp)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for Mailchimp, a mail marketing automation service that lets you send out professional-looking newsletters and manage your audience.

## Application Type

**OAuth 2.0**

This connector uses the Mailchimp OAuth 2.0 authorization flow. After entering your credentials in Orchesty, you will be redirected to Mailchimp to authorize access. The connector also supports webhook subscriptions for real-time audience events.

| Field | Description |
|---|---|
| `client_id` | OAuth Client ID from the Mailchimp Developer Portal |
| `client_secret` | OAuth Client Secret from the Mailchimp Developer Portal |
| `audience_id` | ID of the Mailchimp audience (list) to work with |

## Components

| Class | Type | Description |
|---|---|---|
| `MailchimpCreateContactConnector` | Connector | Creates a new contact (member) in the configured audience via `POST /3.0/lists/{audienceId}/members/` |
| `MailchimpTagContactConnector` | Connector | Adds a contact to a segment (tag) within the audience via `POST /3.0/lists/{audienceId}/segments/{segmentId}/members` |

## Setup

### Credentials

1. Log in to [Mailchimp](https://mailchimp.com/) and navigate to **Account → Extras → Registered apps**.
2. Click **Register an app** and provide a name and redirect URL.
3. Copy the **Client ID** and **Client Secret**.
4. Find your **Audience ID** in **Audience → All contacts → Settings → Audience name and defaults**.
5. In Orchesty, open the Mailchimp application settings, enter the credentials, and complete the OAuth authorization flow.

### API Documentation

Mailchimp Marketing API: [https://mailchimp.com/developer/marketing/api/](https://mailchimp.com/developer/marketing/api/)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-mailchimp @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-mailchimp @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import CurlSender from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/CurlSender';
import { OAuth2Provider } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import MailchimpApplication from '@orchesty/connector-mailchimp/dist/MailchimpApplication';
import MailchimpCreateContactConnector from '@orchesty/connector-mailchimp/dist/Connector/MailchimpCreateContactConnector';
import MailchimpTagContactConnector from '@orchesty/connector-mailchimp/dist/Connector/MailchimpTagContactConnector';

const app = new MailchimpApplication(container.get(CurlSender), container.get(OAuth2Provider));
container.setApplication(app);
container.setNode(new MailchimpCreateContactConnector(), app);
container.setNode(new MailchimpTagContactConnector(), app);
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
