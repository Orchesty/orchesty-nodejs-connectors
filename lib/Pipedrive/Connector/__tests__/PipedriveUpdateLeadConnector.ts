import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import {container} from '../../../test/TestAbstract';
import {NAME as PIPEDRIVE_UPDATE_LEAD_CONNECTOR} from '../PipedriveUpdateLeadConnector';

let tester: NodeTester;

describe('Tests for PipedriveUpdateLeadConnector', () => {

    beforeEach(async () => {
        tester = new NodeTester(container, __filename, true);
    });

    it('process - ok', async () => {
        await tester.testConnector(PIPEDRIVE_UPDATE_LEAD_CONNECTOR);
    });
});
