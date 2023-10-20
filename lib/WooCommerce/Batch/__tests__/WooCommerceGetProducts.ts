import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import { mockOnce } from '@orchesty/nodejs-sdk/dist/test/MockServer';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { devIp } from '../../../../.jest/testEnvs';
import { init, mock } from '../../../../test/Implementation/woocommerce';
import { container } from '../../../../test/TestAbstract';
import { NAME as WOO_COMMERCE_GET_PRODUCTS } from '../WooCommerceGetProducts';

let tester: NodeTester;

describe('Tests for WooCommerceGetProducts', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    beforeEach(() => {
        mockOnce([
            { request: {
                method: HttpMethods.POST,
                url: new RegExp(`http:\\/\\/${devIp}\\/document\\/ApplicationInstall.*`),
            },
            response: {},
            },
        ]);
    });

    it('process - ok', async () => {
        mock();
        await tester.testBatch(WOO_COMMERCE_GET_PRODUCTS);
    });

    it('process - with after', async () => {
        mock({ productLastRun: '2022-09-22T08:21:27.000Z' });
        await tester.testBatch(WOO_COMMERCE_GET_PRODUCTS, 'withAfter');
    });
});
