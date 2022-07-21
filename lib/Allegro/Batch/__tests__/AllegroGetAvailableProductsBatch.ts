import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { NAME as ALLEGRO_GET_AVAILABLE_PRODUCTS_BATCH } from '../AllegroGetAvailableProductsBatch';
import { allegroApp } from '../../../../test/DataProvider';
import { container } from '../../../../test/TestAbstract';

let tester: NodeTester;

describe('Tests for AllegroGetAvailableProductsBatch', () => {
  beforeEach(async () => {
    tester = new NodeTester(container, __filename);
    await allegroApp();
  });

  it('process - ok', async () => {
    await tester.testBatch(ALLEGRO_GET_AVAILABLE_PRODUCTS_BATCH);
  });
});
