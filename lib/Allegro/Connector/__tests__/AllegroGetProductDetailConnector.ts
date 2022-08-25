import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/allegro';
import { container } from '../../../../test/TestAbstract';
import { NAME as ALLEGRO_GET_PRODUCT_DETAIL_CONNECTOR } from '../AllegroGetProductDetailConnector';

let tester: NodeTester;

describe('Tests for AllegroGetProductDetailConnector', () => {
    beforeEach(async () => {
        tester = new NodeTester(container, __filename, true);
        await init();
    });

    it('process - ok', async () => {
        await tester.testConnector(ALLEGRO_GET_PRODUCT_DETAIL_CONNECTOR);
    });
});
