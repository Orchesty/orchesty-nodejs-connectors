import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/pipedrive';
import { container } from '../../../../test/TestAbstract';
import { NAME as PIPEDRIVE_GET_LEAD_CONNECTOR } from '../PipedriveGetLeadConnector';

let tester: NodeTester;

describe('Tests for PipedriveGetLeadConnector', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(PIPEDRIVE_GET_LEAD_CONNECTOR);
    });
});
