import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as G_OBALIK_CREATE_ORDER_CONNECTOR } from '../GObalikCreateOrderConnector';

let tester: NodeTester;

describe('Tests for GObalikCreateOrderConnector', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename, true);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(G_OBALIK_CREATE_ORDER_CONNECTOR);
    });
});
