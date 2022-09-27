import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/clickup';
import { container } from '../../../../test/TestAbstract';
import { NAME as CLICKUP_CREATE_SPACE_CONNECTOR } from '../ClickupCreateSpaceConnector';

let tester: NodeTester;

describe('Tests for ClickupCreateSpaceConnector', () => {
    beforeEach(async () => {
        tester = new NodeTester(container, __filename);
        await init();
    });

    it('process - ok', async () => {
        await tester.testConnector(CLICKUP_CREATE_SPACE_CONNECTOR);
    });
});
