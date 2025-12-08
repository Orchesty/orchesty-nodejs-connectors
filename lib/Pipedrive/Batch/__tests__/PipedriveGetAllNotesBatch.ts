import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/pipedrive';
import { container } from '../../../../test/TestAbstract';
import { NAME as PIPEDRIVE_GET_ALL_NOTES_BATCH } from '../PipedriveGetAllNotesBatch';

let tester: NodeTester;

describe('Tests for PipedriveGetAllNotesBatch', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testBatch(PIPEDRIVE_GET_ALL_NOTES_BATCH);
    });
});
