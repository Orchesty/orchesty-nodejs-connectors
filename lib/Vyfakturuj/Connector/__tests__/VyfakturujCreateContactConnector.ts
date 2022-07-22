import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { container } from '../../../../test/TestAbstract';
import { NAME as VYFAKTURUJ_CREATE_CONTACT_CONNECTOR } from '../VyfakturujCreateContactConnector';
import { vyfakturujApp } from '../../../../test/DataProvider';

let tester: NodeTester;

describe('Tests for VyfakturujCreateContactConnector', () => {
  beforeEach(async () => {
    tester = new NodeTester(container, __filename, true);
    await vyfakturujApp();
  });

  it('process - ok', async () => {
    await tester.testConnector(VYFAKTURUJ_CREATE_CONTACT_CONNECTOR);
  });
});
