import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as ALZA_CANCEL_ORDER_CONNECTOR } from '../AlzaCancelOrderConnector';

let tester: NodeTester;

describe('Tests for AlzaCancelOrderConnector', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename, true);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(ALZA_CANCEL_ORDER_CONNECTOR);
    });
});
