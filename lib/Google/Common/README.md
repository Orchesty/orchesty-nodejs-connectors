# Google Common

[![npm](https://img.shields.io/npm/v/@orchesty/connector-google-common?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-google-common)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

A shared [Orchesty](https://orchesty.io) base package for all Google service connectors. It provides the abstract `AGoogle` class that centralises OAuth 2.0 authentication, form fields, and request building for Google APIs.

## Contents

This package contains no external API connector or batch node. It exports the `AGoogle` abstract base class used by all Google sub-packages:

| Export | Description |
|---|---|
| `AGoogle` | Abstract base class extending `AOAuth2Application`; provides shared OAuth 2.0 flow, `client_id`/`client_secret` form fields, and `getRequestDto` using a Bearer access token |

All concrete Google connectors (`BigQuery`, `Gmail`, `GoogleCalendar`, `GoogleCloudLogging`, `GoogleDrive`, `GoogleSheet`, `Youtube`) depend on this package and extend `AGoogle`.

## Installation

```bash
npm install @orchesty/connector-google-common @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-google-common @orchesty/nodejs-sdk
```

## Usage

```typescript
import { AGoogle } from '@orchesty/connector-google-common';

export default class MyGoogleApplication extends AGoogle {
    public getName(): string { return 'my-google-app'; }
    public getPublicName(): string { return 'My Google App'; }
    public getDescription(): string { return 'My custom Google connector'; }
    public getBaseUrl(): string { return 'https://www.googleapis.com'; }
    public getScopes(): string[] { return ['https://www.googleapis.com/auth/...'] ; }
}
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
