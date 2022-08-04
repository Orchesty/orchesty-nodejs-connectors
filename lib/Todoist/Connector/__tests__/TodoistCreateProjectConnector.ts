import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import {container} from '../../../test/TestAbstract';
import {NAME as TODOIST_CREATE_PROJECT_CONNECTOR} from '../TodoistCreateProjectConnector';

let tester: NodeTester;

describe('Tests for TodoistCreateProjectConnector', () => {

    beforeEach(async () => {
        tester = new NodeTester(container, __filename, true);
    });

    it('process - ok', async () => {
        await tester.testConnector(TODOIST_CREATE_PROJECT_CONNECTOR);
    });
});