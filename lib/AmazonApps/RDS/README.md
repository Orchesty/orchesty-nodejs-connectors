# Amazon RDS Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-amazon-apps-rds?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-amazon-apps-rds)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for Amazon RDS (Relational Database Service), a distributed relational database service supporting multiple database engines in the cloud.

## Application Type

**Basic (AWS IAM credentials)**

This connector authenticates using AWS IAM access key and secret. Requests are made through the AWS SDK `RDSClient`.

| Field | Description |
|---|---|
| `Key` | AWS IAM Access Key ID |
| `Secret` | AWS IAM Secret Access Key |
| `Region` | AWS region where your RDS instances are located (e.g. `eu-west-1`) |

## Components

| Class | Type | Description |
|---|---|---|
| `RDSAddRoleToDBCluster` | Connector | Associates an IAM role with an RDS DB cluster via `AddRoleToDBClusterCommand`. Requires `DBClusterIdentifier` and `RoleArn`; `FeatureName` is optional |

## Setup

### Credentials

1. Log in to the [AWS Management Console](https://console.aws.amazon.com).
2. Navigate to **IAM → Users** and create a user with programmatic access. Attach a policy with the required RDS permissions (e.g. `rds:AddRoleToDBCluster`).
3. Copy the **Access Key ID** and **Secret Access Key**.
4. In Orchesty, open the Amazon RDS application settings and fill in:
   - **Key** — paste your Access Key ID
   - **Secret** — paste your Secret Access Key
   - **Region** — select the AWS region of your RDS instances

### API Documentation

Amazon RDS API Reference: [https://docs.aws.amazon.com/AmazonRDS/latest/APIReference/](https://docs.aws.amazon.com/AmazonRDS/latest/APIReference/)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-amazon-apps-rds @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-amazon-apps-rds @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import RDSApplication from '@orchesty/connector-amazon-apps-rds/dist/RDSApplication';
import RDSAddRoleToDBCluster from '@orchesty/connector-amazon-apps-rds/dist/Connector/RDSAddRoleToDBCluster';

const rdsApp = new RDSApplication();
container.setApplication(rdsApp);
container.setNode(new RDSAddRoleToDBCluster(), rdsApp);
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
