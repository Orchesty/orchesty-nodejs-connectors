import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/nutshell';
import { container } from '../../../../test/TestAbstract';
import { NAME as NUTSHELL_NEW_LEAD_CONNECTOR } from '../NutshellNewLeadConnector';

let tester: NodeTester;

describe('Tests for NutshellNewLeadConnector', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(NUTSHELL_NEW_LEAD_CONNECTOR);
    });
});
