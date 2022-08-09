import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { container } from '../../../test/TestAbstract';
import { NAME as RECRUITEE_LISTCANDIDATES } from '../RecruiteeListcandidates';

let tester: NodeTester;

describe('Tests for RecruiteeListcandidates', () => {
  beforeEach(async () => {
    tester = new NodeTester(container, __filename, true);
  });

  it('process - ok', async () => {
    await tester.testConnector(RECRUITEE_LISTCANDIDATES);
  });
});
