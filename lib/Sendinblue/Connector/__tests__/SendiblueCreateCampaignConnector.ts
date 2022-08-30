import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/sendinblue';
import { container } from '../../../../test/TestAbstract';
import { NAME as SENDIBLUE_CREATE_CAMPAIGN_CONNECTOR } from '../SendiblueCreateCampaignConnector';

let tester: NodeTester;

describe('Tests for SendiblueCreateCampaignConnector', () => {
    beforeAll(async () => {
        tester = new NodeTester(container, __filename);
        await init();
    });

    it('process - ok', async () => {
        await tester.testConnector(SENDIBLUE_CREATE_CAMPAIGN_CONNECTOR);
    });
});
