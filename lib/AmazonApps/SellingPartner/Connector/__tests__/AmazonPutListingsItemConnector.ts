import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../../test/Implementation/amazon';
import { container } from '../../../../../test/TestAbstract';
import { NAME as AMAZON_PUT_LISTENINGS_ITEM_CONNECTOR } from '../AmazonPutListingsItemConnector';

let tester: NodeTester;

describe('Tests for AmazonPutListeningsItemConnector', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename, true);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(AMAZON_PUT_LISTENINGS_ITEM_CONNECTOR);
    });
});
