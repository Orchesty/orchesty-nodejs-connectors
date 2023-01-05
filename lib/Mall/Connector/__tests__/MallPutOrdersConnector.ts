import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/mall';
import { container } from '../../../../test/TestAbstract';
import { NAME as MALL_PUT_ORDERS_CONNECTOR } from '../MallPutOrdersConnector';

let tester: NodeTester;

describe('Tests for MallPutOrdersConnector', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(MALL_PUT_ORDERS_CONNECTOR);
    });
});
