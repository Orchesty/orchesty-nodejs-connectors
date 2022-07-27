import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { container } from '../../../../test/TestAbstract';
import { NAME as FAKTURAONLINE_GET_INVOICE_CONNECTOR } from '../FakturaonlineGetInvoiceConnector';
import { fakturaonlineApp } from '../../../../test/DataProvider';

let tester: NodeTester;

describe('Tests for FakturaonlineGetInvoiceConnector', () => {
  beforeEach(async () => {
    tester = new NodeTester(container, __filename, true);
    await fakturaonlineApp();
  });

  it('process - ok', async () => {
    await tester.testConnector(FAKTURAONLINE_GET_INVOICE_CONNECTOR);
  });
});
