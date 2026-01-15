import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as SENDIBLUE_CREATE_CAMPAIGN_CONNECTOR } from '../SendiblueCreateCampaignConnector';

let tester: NodeTester;

describe('Tests for SendiblueCreateCampaignConnector', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(SENDIBLUE_CREATE_CAMPAIGN_CONNECTOR);
    });
});
