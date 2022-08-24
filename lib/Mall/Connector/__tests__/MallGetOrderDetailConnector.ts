import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { mallApp } from '../../../../test/DataProvider';
import { container } from '../../../../test/TestAbstract';
import { NAME as MALL_GET_ORDER_DETAIL_CONNECTOR } from '../MallGetOrderDetailConnector';

let tester: NodeTester;

describe('Tests for MallGetOrderDetailConnector', () => {
    beforeEach(async () => {
        tester = new NodeTester(container, __filename);
        await mallApp();
    });

    it('process - ok', async () => {
        await tester.testConnector(MALL_GET_ORDER_DETAIL_CONNECTOR);
    });
});
