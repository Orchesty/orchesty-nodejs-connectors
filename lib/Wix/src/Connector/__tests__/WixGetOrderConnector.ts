import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as WIX_GET_ORDER_CONNECTOR } from '../WixGetOrderConnector';

let tester: NodeTester;

describe('Tests for WixGetOrderConnector', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename, true);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(WIX_GET_ORDER_CONNECTOR);
    });
});
