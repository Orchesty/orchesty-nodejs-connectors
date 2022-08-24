import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { mergadoApp } from '../../../../test/DataProvider';
import { container } from '../../../../test/TestAbstract';
import { NAME as MERGADO_LIST_APPS_BATCH } from '../MergadoListAppsBatch';

let tester: NodeTester;

describe('Tests for MergadoListAppsBatch', () => {
    beforeEach(async () => {
        tester = new NodeTester(container, __filename);
        await mergadoApp();
    });

    it('process - ok', async () => {
        await tester.testBatch(MERGADO_LIST_APPS_BATCH);
    });
});
