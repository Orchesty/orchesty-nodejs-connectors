import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/alza';
import { container } from '../../../../test/TestAbstract';
import { NAME as ALZA_CREATE_SHIPMENT_CONNECTOR } from '../AlzaCreateShipmentConnector';

let tester: NodeTester;

describe('Tests for AlzaCreateShipmentConnector', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename, true);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(ALZA_CREATE_SHIPMENT_CONNECTOR);
    });
});
