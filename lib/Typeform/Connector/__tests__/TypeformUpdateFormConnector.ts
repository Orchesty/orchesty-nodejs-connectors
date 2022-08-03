import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import {container} from '../../../test/TestAbstract';
import {NAME as TYPEFORM_UPDATE_FORM_CONNECTOR} from '../TypeformUpdateFormConnector';

let tester: NodeTester;

describe('Tests for TypeformUpdateFormConnector', () => {

    beforeEach(async () => {
        tester = new NodeTester(container, __filename, true);
    });

    it('process - ok', async () => {
        await tester.testConnector(TYPEFORM_UPDATE_FORM_CONNECTOR);
    });
});
