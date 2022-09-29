import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/alza';
import { container } from '../../../../test/TestAbstract';
import { NAME as ALZA_CANCEL_ORDER_CONNECTOR } from '../AlzaCancelOrderConnector';

let tester: NodeTester;

describe('Tests for AlzaCancelOrderConnector', () => {
    beforeEach(async () => {
        tester = new NodeTester(container, __filename, true);
        await init();
    });

    it('process - ok', async () => {
        await tester.testConnector(ALZA_CANCEL_ORDER_CONNECTOR);
    });
});
