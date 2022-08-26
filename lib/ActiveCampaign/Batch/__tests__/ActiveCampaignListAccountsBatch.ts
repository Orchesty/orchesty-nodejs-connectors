import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/activateCampaign';
import { container } from '../../../../test/TestAbstract';
import { NAME as ACTIVE_CAMPAIGN_LIST_ACCOUNTS_BATCH } from '../ActiveCampaignListAccountsBatch';

let tester: NodeTester;

describe('Tests for ActiveCampaignListAccountsBatch', () => {
    beforeEach(async () => {
        tester = new NodeTester(container, __filename);
        await init();
    });

    it('process - ok', async () => {
        await tester.testBatch(ACTIVE_CAMPAIGN_LIST_ACCOUNTS_BATCH);
    });
});
