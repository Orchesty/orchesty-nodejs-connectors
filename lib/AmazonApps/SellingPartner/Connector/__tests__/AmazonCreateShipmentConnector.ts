import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../../test/Implementation/amazon';
import { container } from '../../../../../test/TestAbstract';
import { NAME as AMAZON_CREATE_SHIPMENT_CONNECTOR } from '../AmazonCreateShipmentConnector';

let tester: NodeTester;

describe('Tests for AmazonCreateShipmentConnector', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename, true);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(AMAZON_CREATE_SHIPMENT_CONNECTOR);
    });
});
