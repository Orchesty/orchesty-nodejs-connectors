import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as ALZA_CONFIRM_ORDER_CONNECTOR } from '../AlzaConfirmOrderConnector';

let tester: NodeTester;

describe('Tests for AlzaConfirmOrderConnector', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename, true);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(ALZA_CONFIRM_ORDER_CONNECTOR);
    });
});
