import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { container } from '../../../../test/TestAbstract';
import { NAME as GET_RESPONSE_GET_CONTACT } from '../GetResponseGetContact';
import init from '../../../../test/Implementation/GetResponse';

let tester: NodeTester;

describe('Tests for GetResponseGetContact', () => {
  beforeAll(async () => {
    tester = new NodeTester(container, __filename);
    await init();
  });

  it('process - ok', async () => {
    await tester.testBatch(GET_RESPONSE_GET_CONTACT);
  });
});
