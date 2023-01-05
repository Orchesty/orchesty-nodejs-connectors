import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/clickup';
import { container } from '../../../../test/TestAbstract';
import { NAME as CLICKUP_CREATE_TASK_CONNECTOR } from '../ClickupCreateTaskConnector';

let tester: NodeTester;

describe('Tests for ClickupCreateTaskConnector', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(CLICKUP_CREATE_TASK_CONNECTOR);
    });
});
