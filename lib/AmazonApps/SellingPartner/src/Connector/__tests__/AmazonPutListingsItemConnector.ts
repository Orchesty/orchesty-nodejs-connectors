import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
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
