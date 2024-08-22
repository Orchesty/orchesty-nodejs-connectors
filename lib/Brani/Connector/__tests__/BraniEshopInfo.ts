import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/brani';
import { container } from '../../../../test/TestAbstract';
import { NAME as ESHOP_INFO_CONNECTOR } from '../BraniEshopInfo';

let tester: NodeTester;

describe('Tests for BraniEshopInfo', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(ESHOP_INFO_CONNECTOR);
    });
});
