import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/mall';
import { container } from '../../../../test/TestAbstract';
import { NAME as MALL_PUT_PRODUCT_CONNECTOR } from '../MallPutProductConnector';

let tester: NodeTester;

describe('Tests for MallPutProductConnector', () => {
    beforeEach(async () => {
        tester = new NodeTester(container, __filename);
        await init();
    });

    it('process - ok', async () => {
        await tester.testConnector(MALL_PUT_PRODUCT_CONNECTOR);
    });
});
