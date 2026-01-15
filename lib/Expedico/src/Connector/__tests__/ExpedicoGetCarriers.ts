import { container } from '@orchesty/nodejs-sdk';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
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
