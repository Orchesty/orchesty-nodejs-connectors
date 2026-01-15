import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as NUTSHELL_NEW_TASK_CONNECTOR } from '../NutshellNewTaskConnector';

let tester: NodeTester;

describe('Tests for NutshellNewTaskConnector', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(NUTSHELL_NEW_TASK_CONNECTOR);
    });
});
