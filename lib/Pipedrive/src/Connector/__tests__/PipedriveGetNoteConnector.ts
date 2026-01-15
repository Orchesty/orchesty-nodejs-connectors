import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as PIPEDRIVE_GET_NOTE_CONNECTOR } from '../PipedriveGetNoteConnector';

let tester: NodeTester;

describe('Tests for PipedriveGetNoteConnector', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(PIPEDRIVE_GET_NOTE_CONNECTOR);
    });
});
