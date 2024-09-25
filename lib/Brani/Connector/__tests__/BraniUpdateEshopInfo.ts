import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/brani';
import { container } from '../../../../test/TestAbstract';
import { NAME as UPDATE_ESHOP_INFO_CONNECTOR } from '../BraniUpdateEshopInfo';

let tester: NodeTester;

describe('Tests for BraniUpdateEshopInfo', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(UPDATE_ESHOP_INFO_CONNECTOR);
    });
});
