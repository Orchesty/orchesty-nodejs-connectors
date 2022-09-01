import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/wix';
import { container } from '../../../../test/TestAbstract';
import { NAME as WIX_UPDATE_PRODUCT_CONNECTOR } from '../WixUpdateProductConnector';

let tester: NodeTester;

describe('Tests for WixUpdateProductConnector', () => {
    beforeEach(async () => {
        tester = new NodeTester(container, __filename, true);
        await init();
    });

    it('process - ok', async () => {
        await tester.testConnector(WIX_UPDATE_PRODUCT_CONNECTOR);
    });
});
