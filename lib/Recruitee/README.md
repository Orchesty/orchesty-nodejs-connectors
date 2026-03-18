# Recruitee Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-recruitee?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-recruitee)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for Recruitee, an applicant tracking system for managing job applications, employer branding, and recruitment sourcing.

## Application Type

**Basic**

This connector authenticates using a personal API token sent as a Bearer token in the `Authorization` header.

| Field | Description |
|---|---|
| `api token` | Your Recruitee personal API token |
| `your_company` | Your Recruitee company subdomain (e.g. `my-company`) |

## Components

| Class | Type | Description |
|---|---|---|
| `RecruiteeGetOffersBatch` | Batch | Fetches all job offers for the configured company via `GET /{yourCompany}.recruitee.com/api/offers/` |
| `RecruiteeListCandidatesBatch` | Batch | Paginates through all candidates (100 per page) via `GET /api.recruitee.com/c/{companyId}/search/new/candidates` |

## Setup

### Credentials

1. Log in to your [Recruitee](https://app.recruitee.com/) account.
2. Navigate to **Settings → Apps and plugins → API tokens** and click **Add new token**.
3. Copy the generated token.
4. Your **company subdomain** is visible in the Recruitee URL (e.g. `my-company` from `my-company.recruitee.com`).
5. In Orchesty, open the Recruitee application settings and fill in both fields.

### API Documentation

Recruitee API Reference: [https://docs.recruitee.com/reference/getting-started](https://docs.recruitee.com/reference/getting-started)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-recruitee @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-recruitee @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import RecruiteeApplication from '@orchesty/connector-recruitee/dist/RecruiteeApplication';
import RecruiteeGetOffersBatch from '@orchesty/connector-recruitee/dist/Batch/RecruiteeGetOffersBatch';
import RecruiteeListCandidatesBatch from '@orchesty/connector-recruitee/dist/Batch/RecruiteeListCandidatesBatch';

const app = new RecruiteeApplication();
container.setApplication(app);
container.setNode(new RecruiteeGetOffersBatch(), app);
container.setNode(new RecruiteeListCandidatesBatch(), app);
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
