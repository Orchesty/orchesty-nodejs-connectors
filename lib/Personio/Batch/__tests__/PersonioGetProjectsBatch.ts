import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/personio';
import { container } from '../../../../test/TestAbstract';
import { NAME as PERSONIO_GET_PROJECTS_BATCH } from '../PersonioGetProjectsBatch';

let tester: NodeTester;

describe('Tests for PersonioGetProjectsBatch', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testBatch(PERSONIO_GET_PROJECTS_BATCH);
    });
});
