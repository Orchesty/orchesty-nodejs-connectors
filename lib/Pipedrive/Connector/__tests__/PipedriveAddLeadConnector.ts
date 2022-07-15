import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import {container} from '../../../test/TestAbstract';
import {NAME as PIPEDRIVE_ADD_LEAD_CONNECTOR} from '../PipedriveAddLeadConnector';

let tester: NodeTester;

describe('Tests for PipedriveAddLeadConnector', () => {

    beforeEach(async () => {
        tester = new NodeTester(container, __filename, true);
    });

    it('process - ok', async () => {
        await tester.testConnector(PIPEDRIVE_ADD_LEAD_CONNECTOR);
    });
});
