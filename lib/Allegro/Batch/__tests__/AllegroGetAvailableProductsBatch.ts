import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/allegro';
import { NAME as ALLEGRO_GET_AVAILABLE_PRODUCTS_BATCH } from '../AllegroGetAvailableProductsBatch';
import { container } from '../../../../test/TestAbstract';

let tester: NodeTester;

describe('Tests for AllegroGetAvailableProductsBatch', () => {
  beforeEach(async () => {
    tester = new NodeTester(container, __filename);
    await init();
  });

  it('process - ok', async () => {
    await tester.testBatch(ALLEGRO_GET_AVAILABLE_PRODUCTS_BATCH);
  });
});
