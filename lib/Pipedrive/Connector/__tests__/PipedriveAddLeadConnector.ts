import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/pipedrive';
import { container } from '../../../../test/TestAbstract';
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
