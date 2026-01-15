import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as PIPEDRIVE_ADD_LEAD_CONNECTOR } from '../PipedriveAddLeadConnector';

let tester: NodeTester;

describe('Tests for PipedriveAddLeadConnector', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(PIPEDRIVE_ADD_LEAD_CONNECTOR);
    });
});
