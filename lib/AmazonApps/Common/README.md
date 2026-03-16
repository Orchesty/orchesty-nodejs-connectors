# Amazon Apps Common

[![npm](https://img.shields.io/npm/v/@orchesty/connector-amazon-apps-common?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-amazon-apps-common)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

Shared base library for all [Orchesty](https://orchesty.io) Amazon AWS connectors. Provides abstract application and connector classes, shared constants (regions, credential field names), and utility helpers used across all Amazon service packages.

## Contents

This is not a standalone connector — it exports abstract base classes and constants consumed by other packages:

| Export | Type | Description |
|---|---|---|
| `AAwsApplication` | Abstract class | Base application class for all AWS connectors; extends `ABasicApplication` with AWS-specific structure |
| `AAwsObjectConnector` | Abstract class | Base connector class with parameter validation helpers |
| `REGIONS` | Constant | Full list of AWS region identifiers with display names |
| `KEY`, `SECRET`, `REGION`, `ENDPOINT`, `CREDENTIALS`, `VERSION` | Constants | Shared field name constants for AWS credential forms |

## Installation

```bash
npm install @orchesty/connector-amazon-apps-common @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-amazon-apps-common @orchesty/nodejs-sdk
```

## Usage

This package is a peer dependency of the other Amazon connector packages. You do not typically install it directly — it is pulled in automatically. If you are building a custom AWS connector for Orchesty, extend the exported base classes:

```typescript
import { AAwsApplication, AAwsObjectConnector } from '@orchesty/connector-amazon-apps-common';
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
