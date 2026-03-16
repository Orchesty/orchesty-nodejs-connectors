# Amazon S3 Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-amazon-apps-s3?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-amazon-apps-s3)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for Amazon S3, an object storage service offering industry-leading scalability, data availability, security, and performance.

## Application Type

**Basic (AWS IAM credentials)**

This connector authenticates using AWS IAM access key and secret. Requests are made through the AWS SDK `S3Client` — no HTTP Bearer token is used.

| Field | Description |
|---|---|
| `Key` | AWS IAM Access Key ID |
| `Secret` | AWS IAM Secret Access Key |
| `Bucket` | Name of the S3 bucket to operate on |
| `Region` | AWS region where the bucket is located (e.g. `eu-west-1`) |
| `Custom Endpoint` | Optional custom endpoint URL (e.g. for S3-compatible services like MinIO) |

## Components

| Class | Type | Description |
|---|---|---|
| `S3CreateObjectConnector` | Connector | Uploads an object to S3 via `PutObjectCommand`. Requires `name` (key) and `content` (body) |
| `S3DeleteObjectConnector` | Connector | Deletes an object from S3 via `DeleteObjectCommand`. Requires `name` (key) |
| `S3GetObjectConnector` | Connector | Downloads an object from S3 via `GetObjectCommand`. Requires `name` (key); returns `name` and `content` |

## Setup

### Credentials

1. Log in to the [AWS Management Console](https://console.aws.amazon.com).
2. Navigate to **IAM → Users** and create a user (or use an existing one) with programmatic access.
3. Attach a policy with the required S3 permissions (e.g. `s3:PutObject`, `s3:GetObject`, `s3:DeleteObject`).
4. Copy the **Access Key ID** and **Secret Access Key**.
5. In Orchesty, open the Amazon S3 application settings and fill in all fields. The **Custom Endpoint** field can be left empty unless you are using an S3-compatible service.

### API Documentation

Amazon S3 API Reference: [https://docs.aws.amazon.com/AmazonS3/latest/API/Welcome.html](https://docs.aws.amazon.com/AmazonS3/latest/API/Welcome.html)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-amazon-apps-s3 @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-amazon-apps-s3 @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import S3Application from '@orchesty/connector-amazon-apps-s3/dist/S3Application';
import S3CreateObjectConnector from '@orchesty/connector-amazon-apps-s3/dist/Connector/S3CreateObjectConnector';
import S3DeleteObjectConnector from '@orchesty/connector-amazon-apps-s3/dist/Connector/S3DeleteObjectConnector';
import S3GetObjectConnector from '@orchesty/connector-amazon-apps-s3/dist/Connector/S3GetObjectConnector';

const s3App = new S3Application();
container.setApplication(s3App);
container.setNode(new S3CreateObjectConnector(), s3App);
container.setNode(new S3DeleteObjectConnector(), s3App);
container.setNode(new S3GetObjectConnector(), s3App);
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
