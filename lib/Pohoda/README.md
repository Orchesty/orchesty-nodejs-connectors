# Pohoda Connector

[![npm](https://img.shields.io/npm/v/@orchesty/connector-pohoda?color=15ba68)](https://www.npmjs.com/package/@orchesty/connector-pohoda)
[![License](https://img.shields.io/badge/license-Apache--2.0-15ba68)](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE)

An [Orchesty](https://orchesty.io) connector for POHODA, a popular Czech accounting and ERP software for small, medium, and larger companies.

## Application Type

**Basic**

This connector communicates with the POHODA mServer via XML over HTTP. Authentication uses a custom `STW-Authorization: Basic {base64(user:password)}` header. All requests send XML payloads (`text/xml`) to the configured mServer URL. The connector uses `fast-xml-parser` for XML serialization and deserialization.

| Field | Description |
|---|---|
| `user` | POHODA user name |
| `password` | POHODA user password |
| `mServerUrl` | Full URL of your POHODA mServer instance (e.g. `http://192.168.1.10:8080`) |
| `ico` | Company registration number (IČO) for the POHODA company file |

## Components

| Class | Type | Description |
|---|---|---|
| `PohodaPostInvoiceConnector` | Connector | Creates a new issued invoice (`issuedInvoice`) via `POST {mServerUrl}/xml` |
| `PohodaPostIssueConnector` | Connector | Creates a new issue slip (`vydejka`) via `POST {mServerUrl}/xml` |
| `PohodaPostReceiptConnector` | Connector | Creates a new stock receipt (`prijemka`) via `POST {mServerUrl}/xml` |
| `PohodaPutStockConnector` | Connector | Updates an existing stock item via `POST {mServerUrl}/xml` |
| `PohodaGetActivityListBatch` | Batch | Lists all activity codes |
| `PohodaGetAddressBookListBatch` | Batch | Lists all address book entries (contacts/companies) |
| `PohodaGetCentreListBatch` | Batch | Lists all cost centres |
| `PohodaGetIssueListBatch` | Batch | Lists all issue slips (`vydejky`) |
| `PohodaGetIssuedInvoiceListBatch` | Batch | Lists all issued invoices |
| `PohodaGetIssuedOrderListBatch` | Batch | Lists all issued orders |
| `PohodaGetOrderParameterListBatch` | Batch | Lists custom parameter definitions for orders |
| `PohodaGetPaymentListBatch` | Batch | Lists all payment methods |
| `PohodaGetReceiptListBatch` | Batch | Lists all stock receipts (`prijemky`) |
| `PohodaGetReceivedInvoiceListBatch` | Batch | Lists all received invoices |
| `PohodaGetReceivedOrderListBatch` | Batch | Lists all received orders |
| `PohodaGetStockListBatch` | Batch | Lists all stock items |
| `PohodaGetStoreListBatch` | Batch | Lists all warehouses/stores |
| `PohodaGetUserCodeListBatch` | Batch | Lists user-defined code lists |

## Setup

### Credentials

1. In POHODA, navigate to **Settings → mServer** and enable the mServer on a specific port.
2. Note the mServer URL (e.g. `http://your-server:8080`).
3. Use your POHODA **username** and **password** for authentication.
4. Find your company **IČO** in the POHODA company settings.
5. In Orchesty, open the POHODA application settings and fill in all four fields.

### API Documentation

POHODA mServer XML API: [https://www.stormware.cz/pohoda/xml/mserver/](https://www.stormware.cz/pohoda/xml/mserver/)

## Installation & Usage

Install the package:

```bash
npm install @orchesty/connector-pohoda @orchesty/nodejs-sdk
# or
pnpm add @orchesty/connector-pohoda @orchesty/nodejs-sdk
```

Register the application and nodes in your Orchesty DI container:

```typescript
import { container } from '@orchesty/nodejs-sdk';
import PohodaApplication from '@orchesty/connector-pohoda/dist/PohodaApplication';
import PohodaPostInvoiceConnector from '@orchesty/connector-pohoda/dist/Connector/PohodaPostInvoiceConnector';
import PohodaPostIssueConnector from '@orchesty/connector-pohoda/dist/Connector/PohodaPostIssueConnector';
import PohodaPostReceiptConnector from '@orchesty/connector-pohoda/dist/Connector/PohodaPostReceiptConnector';
import PohodaPutStockConnector from '@orchesty/connector-pohoda/dist/Connector/PohodaPutStockConnector';
import PohodaGetIssuedInvoiceListBatch from '@orchesty/connector-pohoda/dist/Batch/PohodaGetIssuedInvoiceListBatch';
import PohodaGetAddressBookListBatch from '@orchesty/connector-pohoda/dist/Batch/PohodaGetAddressBookListBatch';
import PohodaGetStockListBatch from '@orchesty/connector-pohoda/dist/Batch/PohodaGetStockListBatch';
// Register additional batch nodes as needed

const app = new PohodaApplication();
container.setApplication(app);
container.setNode(new PohodaPostInvoiceConnector(), app);
container.setNode(new PohodaPostIssueConnector(), app);
container.setNode(new PohodaPostReceiptConnector(), app);
container.setNode(new PohodaPutStockConnector(), app);
container.setNode(new PohodaGetIssuedInvoiceListBatch(), app);
container.setNode(new PohodaGetAddressBookListBatch(), app);
container.setNode(new PohodaGetStockListBatch(), app);
```

## License

This connector is released under the **Apache License 2.0**. See the [LICENSE](https://github.com/Orchesty/orchesty-nodejs-connectors/blob/master/LICENSE) file for the full license text.

## Contributing

Contributions are welcome! This connector is part of the open-source [Orchesty Node.js Connectors](https://github.com/Orchesty/orchesty-nodejs-connectors) monorepo.

For guidelines on how to create or update connectors — including project setup, coding conventions, and how to write tests — please refer to the **[Contributing to Connectors](https://orchesty.io/community/contributing-to-connectors)** guide.

All contributions should include:
- Source code in `src/` following the existing connector structure
- Tests in `src/**/__tests__/` with `input.json`, `mock.xml`, and `output.json` fixtures
- An updated `CHANGELOG.md` entry
