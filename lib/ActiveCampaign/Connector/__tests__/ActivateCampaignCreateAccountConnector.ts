import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { container } from '../../../test/TestAbstract';
import { NAME as ACTIVATE_CAMPAIGN_CREATE_ACCOUNT_CONNECTOR } from '../ActivateCampaignCreateAccountConnector';

let tester: NodeTester;

describe('Tests for ActivateCampaignCreateAccountConnector', () => {
  beforeEach(async () => {
    tester = new NodeTester(container, __filename, true);
  });

  it('process - ok', async () => {
    await tester.testConnector(ACTIVATE_CAMPAIGN_CREATE_ACCOUNT_CONNECTOR);
  });
});
