import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as WIX_UPDATE_PRODUCT_CONNECTOR } from '../WixUpdateProductConnector';

let tester: NodeTester;

describe('Tests for WixUpdateProductConnector', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename, true);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(WIX_UPDATE_PRODUCT_CONNECTOR);
    });
});
