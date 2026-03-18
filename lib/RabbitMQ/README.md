# RabbitMQ Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-rabbit-mq?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-rabbit-mq)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for RabbitMQ, a distributed message broker system that is fast, scalable, and durable and uses AMQP for secure transfer of messages.

## Application Type

**Basic**

This connector authenticates using an AMQP connection string (DSN). Unlike HTTP-based connectors, it communicates directly over the AMQP protocol using the `@cloudamqp/amqp-client` library. Connections are cached per application installation to minimize reconnection overhead.

| Field | Description |
|---|---|
| `dsn` | AMQP connection string (e.g. `amqp://user:password@host:5672/vhost`) |

## Components

| Class | Type | Description |
|---|---|---|
| `RabbitMqSendMessageCustomNode` | Custom Node | Publishes a JSON message to a specified RabbitMQ queue over AMQP |

## Setup

### Credentials

1. Ensure your RabbitMQ instance is running and accessible from Orchesty.
2. Create a dedicated user with publish permissions on the target virtual host.
3. Construct the AMQP **DSN** in the format: `amqp://username:password@hostname:5672/vhost`
4. In Orchesty, open the RabbitMQ application settings and paste the DSN.

### API Documentation

RabbitMQ Documentation: [https://www.rabbitmq.com/docs/](https://www.rabbitmq.com/docs/)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-rabbit-mq @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-rabbit-mq @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import RabbitMqApplication from '@orchesty/connector-rabbit-mq/dist/RabbitMqApplication';
import RabbitMqSendMessageCustomNode from '@orchesty/connector-rabbit-mq/dist/CustomNode/RabbitMqSendMessageCustomNode';

const app = new RabbitMqApplication();
container.setApplication(app);
container.setNode(new RabbitMqSendMessageCustomNode(), app);
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
