import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { greenHouseApp } from '../../../../test/DataProvider';
import { container } from '../../../../test/TestAbstract';
import { NAME as GREEN_HOUSE_ADD_CANDIDATE_CONNECTOR } from '../GreenHouseAddCandidateConnector';

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
