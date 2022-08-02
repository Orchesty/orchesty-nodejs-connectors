import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { container } from '../../../../test/TestAbstract';
import { NAME as CALENDLY_INVITE_USER_CONNECTOR } from '../CalendlyInviteUserConnector';
import { calendlyApp } from '../../../../test/DataProvider';

let tester: NodeTester;

describe('Tests for CalendlyInviteUserConnector', () => {
  beforeEach(async () => {
    tester = new NodeTester(container, __filename, true);
    await calendlyApp();
  });

  it('process - ok', async () => {
    await tester.testConnector(CALENDLY_INVITE_USER_CONNECTOR);
  });
});
