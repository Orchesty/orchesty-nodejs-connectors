import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/xero';
import { container } from '../../../../test/TestAbstract';
import { NAME as XERO_FILE_ASSOCIATION } from '../XeroFileAssociation';

let tester: NodeTester;

describe('Tests for XeroFileAssociation', () => {
    beforeAll(async () => {
        tester = new NodeTester(container, __filename);
        await init();
    });

    it('process - ok', async () => {
        await tester.testConnector(XERO_FILE_ASSOCIATION);
    });
});
