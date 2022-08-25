import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { calendlyApp } from '../../../../test/DataProvider';
import { container } from '../../../../test/TestAbstract';
import { NAME as CALENDLY_GET_USER_CONNECTOR } from '../CalendlyGetUserConnector';

let tester: NodeTester;

describe('Tests for CalendlyGetUserConnector', () => {
    beforeEach(async () => {
        tester = new NodeTester(container, __filename, true);
        await calendlyApp();
    });

    it('process - ok', async () => {
        await tester.testConnector(CALENDLY_GET_USER_CONNECTOR);
    });
});
