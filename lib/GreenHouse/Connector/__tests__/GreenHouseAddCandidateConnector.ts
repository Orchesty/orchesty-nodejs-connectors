import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/greenHouse';
import { container } from '../../../../test/TestAbstract';
import { NAME as GREEN_HOUSE_ADD_CANDIDATE_CONNECTOR } from '../GreenHouseAddCandidateConnector';

let tester: NodeTester;

describe('Tests for GreenHouseAddCandidateConnector', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename, true);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(GREEN_HOUSE_ADD_CANDIDATE_CONNECTOR);
    });
});
