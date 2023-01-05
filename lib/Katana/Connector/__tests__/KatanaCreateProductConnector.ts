import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/katana';
import { container } from '../../../../test/TestAbstract';
import { NAME as KATANA_CREATE_PRODUCT_CONNECTOR } from '../KatanaCreateProductConnector';

let tester: NodeTester;

describe('Tests for KatanaCreateProductConnector', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename, true);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(KATANA_CREATE_PRODUCT_CONNECTOR);
    });
});
