import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import { mockOnce } from '@orchesty/nodejs-sdk/dist/test/MockServer';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { readFileSync } from 'fs';
import init from '../../../../test/Implementation/pohoda';
import { container } from '../../../../test/TestAbstract';
import { NAME as POHODA_POST_RECEIPT_CONNECTOR } from '../PohodaPostReceiptConnector';

let tester: NodeTester;

describe('Tests for PohodaPostReceiptConnector', () => {
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
                body: readFileSync(`${__dirname}/Data/PohodaPostReceiptConnector/mock.xml`),
            },
        }]);

        await tester.testConnector(POHODA_POST_RECEIPT_CONNECTOR);
    });
});
