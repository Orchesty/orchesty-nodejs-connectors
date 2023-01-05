import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/typeform';
import { container } from '../../../../test/TestAbstract';
import { NAME as TYPEFORM_CREATE_FORM_CONNECTOR } from '../TypeformCreateFormConnector';

let tester: NodeTester;

describe('Tests for TypeformCreateFormConnector', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(TYPEFORM_CREATE_FORM_CONNECTOR);
    });
});
