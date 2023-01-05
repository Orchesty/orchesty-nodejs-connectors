import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { init, mock } from '../../../../test/Implementation/shoptet';
import { container } from '../../../../test/TestAbstract';
import { NAME as SHOPTET_GET_ESHOP_INFO } from '../ShoptetGetEshopInfo';

let tester: NodeTester;

describe('Tests for ShoptetGetEshopInfo', () => {
    beforeAll(async () => {
        tester = new NodeTester(container, __filename, true);
        await init();
    });

    it('process - ok', async () => {
        mock();
        await tester.testConnector(SHOPTET_GET_ESHOP_INFO);
    });
});
