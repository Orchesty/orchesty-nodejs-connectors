import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { amazonApp } from '../../../../../test/DataProvider';
import { container } from '../../../../../test/TestAbstract';
import { NAME as AMAZON_CREATE_SHIPMENT_CONNECTOR } from '../AmazonCreateShipmentConnector';

let tester: NodeTester;

describe('Tests for AmazonCreateShipmentConnector', () => {
    beforeEach(async () => {
        tester = new NodeTester(container, __filename, true);
        await amazonApp();
    });

    it('process - ok', async () => {
        await tester.testConnector(AMAZON_CREATE_SHIPMENT_CONNECTOR);
    });
});
