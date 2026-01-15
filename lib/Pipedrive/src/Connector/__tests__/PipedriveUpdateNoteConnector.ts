import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as PIPEDRIVE_UPDATE_NOTE_CONNECTOR } from '../PipedriveUpdateNoteConnector';

let tester: NodeTester;

describe('Tests for PipedriveUpdateNoteConnector', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(PIPEDRIVE_UPDATE_NOTE_CONNECTOR);
    });
});
