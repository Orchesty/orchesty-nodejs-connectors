import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { container } from '../../../test/TestAbstract';
import { NAME as ALLEGRO_GET_PRODUCT_DETAIL_BATCH } from '../AllegroGetProductDetailBatch';

let tester: NodeTester;

describe('Tests for AllegroGetProductDetailBatch', () => {
  beforeEach(async () => {
    tester = new NodeTester(container, __filename);
  });

  it('process - ok', async () => {
    await tester.testBatch(ALLEGRO_GET_PRODUCT_DETAIL_BATCH);
  });
});
