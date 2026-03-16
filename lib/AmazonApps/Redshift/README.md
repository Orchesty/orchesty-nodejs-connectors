# Amazon Redshift Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-amazon-apps-redshift?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-amazon-apps-redshift)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for Amazon Redshift, a fast and cost-effective cloud data warehousing service.

## Application Type

**Basic (AWS IAM credentials)**

This connector authenticates using AWS IAM access key and secret. The application fetches cluster connection details automatically via the `DescribeClustersCommand` and connects to the cluster via the PostgreSQL wire protocol.

| Field | Description |
|---|---|
| `Key` | AWS IAM Access Key ID |
| `Secret` | AWS IAM Secret Access Key |
| `Region` | AWS region where the Redshift cluster is located (e.g. `eu-west-1`) |
| `Database Password` | Master user password for the Redshift cluster database |

## Components

| Class | Type | Description |
|---|---|---|
| `RedshiftExecuteQueryConnector` | Connector | Executes an arbitrary SQL query against the Redshift cluster. Requires `query` string in the input |

## Setup

### Credentials

1. Log in to the [AWS Management Console](https://console.aws.amazon.com).
2. Navigate to **IAM → Users** and create a user with programmatic access. Attach a policy with at minimum `redshift:DescribeClusters` and `redshift-data:ExecuteStatement` permissions.
3. Copy the **Access Key ID** and **Secret Access Key**.
4. In Orchesty, open the Amazon Redshift application settings and fill in:
   - **Key** — paste your Access Key ID
   - **Secret** — paste your Secret Access Key
   - **Region** — select the region of your Redshift cluster
   - **Database Password** — paste the master user password for your cluster

### API Documentation

Amazon Redshift API Reference: [https://docs.aws.amazon.com/redshift/latest/APIReference/](https://docs.aws.amazon.com/redshift/latest/APIReference/)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-amazon-apps-redshift @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-amazon-apps-redshift @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import RedshiftApplication from '@orchesty/connector-amazon-apps-redshift/dist/RedshiftApplication';
import RedshiftExecuteQueryConnector from '@orchesty/connector-amazon-apps-redshift/dist/Connector/RedshiftExecuteQueryConnector';

const redshiftApp = new RedshiftApplication();
container.setApplication(redshiftApp);
container.setNode(new RedshiftExecuteQueryConnector(), redshiftApp);
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
