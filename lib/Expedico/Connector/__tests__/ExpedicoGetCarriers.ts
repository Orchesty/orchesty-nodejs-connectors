import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/expedico';
import { container } from '../../../../test/TestAbstract';
import { NAME as EXPEDICO_GET_CARRIERS } from '../ExpedicoGetCarriers';

let tester: NodeTester;

describe('Tests for ExpedicoGetCarriers', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename, true);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(EXPEDICO_GET_CARRIERS);
    });
});
