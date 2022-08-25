import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/typeform';
import { container } from '../../../../test/TestAbstract';
import { NAME as TYPEFORM_UPDATE_FORM_CONNECTOR } from '../TypeformUpdateFormConnector';

let tester: NodeTester;

describe('Tests for TypeformUpdateFormConnector', () => {
    beforeEach(async () => {
        tester = new NodeTester(container, __filename, true);
        await init();
    });

    it('process - ok', async () => {
        await tester.testConnector(TYPEFORM_UPDATE_FORM_CONNECTOR);
    });
});
