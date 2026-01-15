import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as ALLEGRO_GET_PRODUCT_DETAIL_CONNECTOR } from '../AllegroGetProductDetailConnector';

let tester: NodeTester;

describe('Tests for AllegroGetProductDetailConnector', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename, true);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(ALLEGRO_GET_PRODUCT_DETAIL_CONNECTOR);
    });
});
