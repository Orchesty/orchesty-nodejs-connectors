import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import { mockOnce } from '@orchesty/nodejs-sdk/dist/test/MockServer';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { init, mock } from '../../../../test/Implementation/woocommerce';
import { container } from '../../../../test/TestAbstract';
import { NAME as WOO_COMMERCE_GET_VARIANTS } from '../WooCommerceGetVariants';

let tester: NodeTester;

describe('Tests for WooCommerceGetVariants', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    beforeEach(() => {
        mockOnce([
            { request: {
                method: HttpMethods.POST,
                url: /http:\/\/127\.0\.0\.40\/document\/ApplicationInstall.*/ },
            response: {},
            },
        ]);
    });

    it('process - ok', async () => {
        mock();
        await tester.testBatch(WOO_COMMERCE_GET_VARIANTS);
    });
});
