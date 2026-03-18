# SQL Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-sql?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-sql)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector package providing application and base node classes for executing SQL queries against multiple relational databases directly from Orchesty workflows.

## Application Type

**Basic**

This package contains **six concrete application classes**, one for each supported database engine. All extend the abstract `ASqlApplication`, which uses username/password credentials and provides a `getConnection()` method returning a `Sequelize` instance (or `OracleDB.Connection` for Oracle). The `getRequestDto()` method is intentionally unsupported — SQL operations are executed via the connection directly.

| Application Class | `getName()` | Database |
|---|---|---|
| `MariaDbApplication` | `mariadb` | MariaDB |
| `MsSqlApplication` | `mssql` | Microsoft SQL Server |
| `MySqlApplication` | `mysql` | MySQL |
| `OracleDbApplication` | `oracledb` | Oracle Database |
| `PostgreSqlApplication` | `postgres` | PostgreSQL |
| `SqliteApplication` | `sqlite` | SQLite (uses `storage` path instead of host/port) |

### Credential Fields (all engines except SQLite)

| Field | Description |
|---|---|
| `host` | Database server hostname or IP |
| `port` | Database server port |
| `user` | Database username |
| `password` | Database password |
| `database` | Database name |

For **SQLite**, the `host` field is used as the file storage path.

## Components

This package provides abstract base node classes for building custom SQL connectors and batches. Concrete implementations are not included — extend these base classes in your own connector code:

| Class | Type | Description |
|---|---|---|
| `ASqlConnector` | Connector (abstract) | Base class for single SQL operation connectors |
| `ASqlBatchConnector` | Batch (abstract) | Base class for paginated SQL batch queries |

All SQL execution logic is defined in `ASqlNode`, which runs a raw SQL query against the dialect-appropriate connection returned by `getConnection()`.

## Setup

### Credentials

1. Ensure your database server is accessible from the Orchesty environment.
2. In Orchesty, open the appropriate SQL application settings (e.g. PostgreSQL) and fill in the connection fields.
3. For SQLite, provide the file path to the SQLite database in the **Host** field.

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-sql @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-sql @orchesty/nodejs-sdk
```

Extend the base classes to implement your SQL queries:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import PostgreSqlApplication from '@orchesty/connector-sql/dist/PostgreSqlApplication';
import ASqlConnector from '@orchesty/connector-sql/dist/Common/ASqlConnector';

class MyQueryConnector extends ASqlConnector {

    protected name = 'my-query';

    protected getQuery(processDto: ProcessDto): string {
        return 'SELECT * FROM my_table';
    }

    protected processResult(res: unknown, dto: ProcessDto): ProcessDto {
        dto.setJsonData(res);
        return dto;
    }

}

const app = new PostgreSqlApplication();
container.setApplication(app);
container.setNode(new MyQueryConnector(), app);
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
