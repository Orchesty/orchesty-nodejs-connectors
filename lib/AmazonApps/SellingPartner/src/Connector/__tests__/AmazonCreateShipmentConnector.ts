import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
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
