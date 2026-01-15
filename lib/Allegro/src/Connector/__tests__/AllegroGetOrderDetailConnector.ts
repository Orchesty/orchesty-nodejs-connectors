import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as ALLEGRO_GET_ORDER_DETAIL_CONNECTOR } from '../AllegroGetOrderDetailConnector';

let tester: NodeTester;

describe('Tests for AllegroGetOrderDetailConnector', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename, true);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(ALLEGRO_GET_ORDER_DETAIL_CONNECTOR);
    });
});
