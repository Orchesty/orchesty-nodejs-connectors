import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as ALLEGRO_GET_AVAILABLE_PRODUCTS_BATCH } from '../AllegroGetAvailableProductsBatch';

let tester: NodeTester;

describe('Tests for AllegroGetAvailableProductsBatch', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testBatch(ALLEGRO_GET_AVAILABLE_PRODUCTS_BATCH);
    });
});
