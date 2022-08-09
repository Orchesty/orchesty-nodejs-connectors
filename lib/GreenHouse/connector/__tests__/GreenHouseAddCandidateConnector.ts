import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { container } from '../../../../test/TestAbstract';
import { NAME as GREEN_HOUSE_ADD_CANDIDATE_CONNECTOR } from '../GreenHouseAddCandidateConnector';
import { greenHouseApp } from '../../../../test/DataProvider';

let tester: NodeTester;

describe('Tests for GreenHouseAddCandidateConnector', () => {
  beforeEach(async () => {
    tester = new NodeTester(container, __filename, true);
    await greenHouseApp();
  });

  it('process - ok', async () => {
    await tester.testConnector(GREEN_HOUSE_ADD_CANDIDATE_CONNECTOR);
  });
});
