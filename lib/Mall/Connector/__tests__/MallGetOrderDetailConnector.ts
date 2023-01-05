import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/mall';
import { container } from '../../../../test/TestAbstract';
import { NAME as MALL_GET_ORDER_DETAIL_CONNECTOR } from '../MallGetOrderDetailConnector';

let tester: NodeTester;

describe('Tests for MallGetOrderDetailConnector', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(MALL_GET_ORDER_DETAIL_CONNECTOR);
    });
});
