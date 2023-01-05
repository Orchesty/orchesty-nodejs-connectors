import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/activateCampaign';
import { container } from '../../../../test/TestAbstract';
import { NAME as ACTIVATE_CAMPAIGN_CREATE_ACCOUNT_CONNECTOR } from '../ActivateCampaignCreateAccountConnector';

let tester: NodeTester;

describe('Tests for ActivateCampaignCreateAccountConnector', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(ACTIVATE_CAMPAIGN_CREATE_ACCOUNT_CONNECTOR);
    });
});
