import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { NAME as ALLEGRO_GET_PRODUCT_DETAIL_CONNECTOR } from '../AllegroGetProductDetailConnector';
import { container } from '../../../../test/TestAbstract';
import { allegroApp } from '../../../../test/DataProvider';

let tester: NodeTester;

describe('Tests for AllegroGetProductDetailConnector', () => {
  beforeEach(async () => {
    tester = new NodeTester(container, __filename, true);
    await allegroApp();
  });

  it('process - ok', async () => {
    await tester.testConnector(ALLEGRO_GET_PRODUCT_DETAIL_CONNECTOR);
  });
});
