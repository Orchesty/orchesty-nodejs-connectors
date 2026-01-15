import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import { mockOnce } from '@orchesty/nodejs-sdk/dist/test/MockServer';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { readFileSync } from 'fs';
import init from '../../../test/dataProvider';
import { NAME as POHODA_POST_ISSUE_CONNECTOR } from '../PohodaPostIssueConnector';

let tester: NodeTester;

describe('Tests for PohodaPostIssueConnector', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename, false, ['']);
        init();
    });

    it('process - ok', async () => {
        mockOnce([{
            request: {
                method: HttpMethods.POST, url: /http:\/\/localhost\/xml*/,
            },
            response: {
                code: 200,
                body: readFileSync(`${__dirname}/Data/PohodaPostIssueConnector/mock.xml`),
            },
        }]);

        await tester.testConnector(POHODA_POST_ISSUE_CONNECTOR);
    });
});
