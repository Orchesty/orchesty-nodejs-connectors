import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/goBalik';
import { container } from '../../../../test/TestAbstract';
import { NAME as GO_BALIK_ORDER_LIST_CONNECTOR } from '../GObalikOrderListConnector';

let tester: NodeTester;

describe('Tests for GObalikOrderListConnector', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename, true);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(GO_BALIK_ORDER_LIST_CONNECTOR);
    });
});
