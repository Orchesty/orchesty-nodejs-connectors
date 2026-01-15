import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as ALZA_INSETR_ORDER_CONNECTOR } from '../AlzaInsetrOrderConnector';

let tester: NodeTester;

describe('Tests for AlzaInsetrOrderConnector', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename, true);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(ALZA_INSETR_ORDER_CONNECTOR);
    });
});
