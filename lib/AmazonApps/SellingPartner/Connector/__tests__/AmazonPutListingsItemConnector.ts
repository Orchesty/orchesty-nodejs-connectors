import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { amazonApp } from '../../../../../test/DataProvider';
import { container } from '../../../../../test/TestAbstract';
import { NAME as AMAZON_PUT_LISTENINGS_ITEM_CONNECTOR } from '../AmazonPutListingsItemConnector';

let tester: NodeTester;

describe('Tests for AmazonPutListeningsItemConnector', () => {
    beforeEach(async () => {
        tester = new NodeTester(container, __filename, true);
        await amazonApp();
    });

    it('process - ok', async () => {
        await tester.testConnector(AMAZON_PUT_LISTENINGS_ITEM_CONNECTOR);
    });
});
