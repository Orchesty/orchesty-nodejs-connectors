import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/goBalik';
import { container } from '../../../../test/TestAbstract';
import { NAME as G_OBALIK_CREATE_ORDER_CONNECTOR } from '../GObalikCreateOrderConnector';

let tester: NodeTester;

describe('Tests for GObalikCreateOrderConnector', () => {
    beforeEach(async () => {
        tester = new NodeTester(container, __filename, true);
        await init();
    });

    it('process - ok', async () => {
        await tester.testConnector(G_OBALIK_CREATE_ORDER_CONNECTOR);
    });
});
