import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { NAME as ALLEGRO_GET_ORDER_DETAIL_CONNECTOR } from '../AllegroGetOrderDetailConnector';
import { allegroApp } from '../../../../test/DataProvider';
import { container } from '../../../../test/TestAbstract';

let tester: NodeTester;

describe('Tests for AllegroGetOrderDetailConnector', () => {
  beforeEach(async () => {
    tester = new NodeTester(container, __filename, true);
    await allegroApp();
  });

  it('process - ok', async () => {
    await tester.testConnector(ALLEGRO_GET_ORDER_DETAIL_CONNECTOR);
  });
});
