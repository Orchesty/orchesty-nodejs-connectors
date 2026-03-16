# Amazon Simple Email Service Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-amazon-apps-simple-email-service?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-amazon-apps-simple-email-service)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for Amazon Simple Email Service (SES), a cloud email service provider for bulk and transactional email sending.

## Application Type

**Basic (AWS IAM credentials)**

This connector authenticates using AWS IAM access key and secret. Requests are made through the AWS SDK `SESClient`.

| Field | Description |
|---|---|
| `Key` | AWS IAM Access Key ID |
| `Secret` | AWS IAM Secret Access Key |
| `Region` | AWS region of your SES configuration (e.g. `eu-west-1`) |
| `Custom Endpoint` | Optional custom endpoint URL for SES-compatible services |

## Components

| Class | Type | Description |
|---|---|---|
| `SESSendEmail` | Connector | Sends an email via Amazon SES using `SendEmailCommand` |

## Setup

### Credentials

1. Log in to the [AWS Management Console](https://console.aws.amazon.com).
2. Navigate to **IAM → Users** and create a user with programmatic access. Attach a policy with at minimum the `ses:SendEmail` permission.
3. Copy the **Access Key ID** and **Secret Access Key**.
4. Make sure your sending domain or email address is verified in **Amazon SES → Verified identities**.
5. In Orchesty, open the Amazon SES application settings and fill in:
   - **Key** — paste your Access Key ID
   - **Secret** — paste your Secret Access Key
   - **Region** — select the AWS region where SES is configured
   - **Custom Endpoint** — leave empty unless using a custom SES-compatible endpoint

### API Documentation

Amazon SES API Reference: [https://docs.aws.amazon.com/ses/latest/APIReference/](https://docs.aws.amazon.com/ses/latest/APIReference/)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-amazon-apps-simple-email-service @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-amazon-apps-simple-email-service @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import SESApplication from '@orchesty/connector-amazon-apps-simple-email-service/dist/SESApplication';
import SESSendEmail from '@orchesty/connector-amazon-apps-simple-email-service/dist/Connector/SESSendEmail';

const sesApp = new SESApplication();
container.setApplication(sesApp);
container.setNode(new SESSendEmail(), sesApp);
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
