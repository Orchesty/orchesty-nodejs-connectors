import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as ORDER_PAYMENTS_HISTORY } from '../OrderPaymentsHistory';

let tester: NodeTester;

describe('Tests for OrderPaymentsHistory', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(ORDER_PAYMENTS_HISTORY);
    });
});
