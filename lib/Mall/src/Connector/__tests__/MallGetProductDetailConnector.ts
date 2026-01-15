import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as MALL_GET_PRODUCT_DETAIL_CONNECTOR } from '../MallGetProductDetailConnector';

let tester: NodeTester;

describe('Tests for MallGetProductDetailConnector', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(MALL_GET_PRODUCT_DETAIL_CONNECTOR);
    });
});
