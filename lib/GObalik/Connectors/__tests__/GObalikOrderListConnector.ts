import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { gobalikApp } from '../../../../test/DataProvider';
import { container } from '../../../../test/TestAbstract';
import { NAME as GO_BALIK_ORDER_LIST_CONNECTOR } from '../GObalikOrderListConnector';

let tester: NodeTester;

describe('Tests for GObalikOrderListConnector', () => {
    beforeEach(async () => {
        tester = new NodeTester(container, __filename, true);
        await gobalikApp();
    });

    it('process - ok', async () => {
        await tester.testConnector(GO_BALIK_ORDER_LIST_CONNECTOR);
    });
});
