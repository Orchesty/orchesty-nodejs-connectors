import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/mergado';
import { container } from '../../../../test/TestAbstract';
import { NAME as MERGADO_LIST_APPS_BATCH } from '../MergadoListAppsBatch';

let tester: NodeTester;

describe('Tests for MergadoListAppsBatch', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testBatch(MERGADO_LIST_APPS_BATCH);
    });
});
