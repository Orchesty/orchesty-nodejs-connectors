import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as PIPEDRIVE_DELETE_NOTE_CONNECTOR } from '../PipedriveDeleteNoteConnector';

let tester: NodeTester;

describe('Tests for PipedriveDeleteNoteConnector', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(PIPEDRIVE_DELETE_NOTE_CONNECTOR);
    });
});
