import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { container } from '../../../../test/TestAbstract';
import { NAME as ONESIGNAL_CREATE_APP_CONNECTOR } from '../OnesignalCreateAppConnector';
import { onesignalApp } from '../../../../test/DataProvider';

let tester: NodeTester;

describe('Tests for OnesignalCreateAppConnector', () => {
  beforeEach(async () => {
    await onesignalApp();
    tester = new NodeTester(container, __filename, false, ['test']);
  });

  it('process - ok', async () => {
    await tester.testConnector(ONESIGNAL_CREATE_APP_CONNECTOR, 'test');
  });
});
