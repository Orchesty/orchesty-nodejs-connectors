import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as BIG_COMMERCE_CREATE_ORDER } from '../BigcommerceCreateOrderConnector';

let tester: NodeTester;

describe('Tests for BigcommerceCreateOrderConnector', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename, true);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(BIG_COMMERCE_CREATE_ORDER);
    });
});
