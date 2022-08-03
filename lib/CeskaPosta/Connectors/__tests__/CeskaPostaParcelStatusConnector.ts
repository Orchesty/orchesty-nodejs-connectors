import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { container } from '../../../../test/TestAbstract';
import { NAME as CESKA_POSTA_PARCEL_STATUS_CONNECTOR } from '../CeskaPostaParcelStatusConnector';
import { ceskaPostaApp } from '../../../../test/DataProvider';

let tester: NodeTester;

describe('Tests for CeskaPostaParcelStatusConnector', () => {
  beforeEach(async () => {
    tester = new NodeTester(container, __filename, true);
    await ceskaPostaApp();
  });

  it('process - ok', async () => {
    await tester.testConnector(CESKA_POSTA_PARCEL_STATUS_CONNECTOR);
  });
});
