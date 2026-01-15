import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as AMAZON_GET_LISTINGS_ITEM_CONNECTOR } from '../AmazonGetListingsItemConnector';

let tester: NodeTester;

describe('Tests for AmazonGetListingsItemConnector', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename, true);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(AMAZON_GET_LISTINGS_ITEM_CONNECTOR);
    });
});
