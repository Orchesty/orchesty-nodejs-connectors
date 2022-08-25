import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { gobalikApp } from '../../../../test/DataProvider';
import { container } from '../../../../test/TestAbstract';
import { NAME as GO_BALIK_ORDER_DETAIL_CONNECTOR } from '../GObalikOrderDetailConnector';

let tester: NodeTester;

describe('Tests for GObalikOrderDetailConnector', () => {
    beforeEach(async () => {
        tester = new NodeTester(container, __filename, true);
        await gobalikApp();
    });

    it('process - ok', async () => {
        await tester.testConnector(GO_BALIK_ORDER_DETAIL_CONNECTOR);
    });
});
