import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as ACTIVE_CAMPAIGN_LIST_ACCOUNTS_BATCH } from '../ActiveCampaignListAccountsBatch';

let tester: NodeTester;

describe('Tests for ActiveCampaignListAccountsBatch', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testBatch(ACTIVE_CAMPAIGN_LIST_ACCOUNTS_BATCH);
    });
});
