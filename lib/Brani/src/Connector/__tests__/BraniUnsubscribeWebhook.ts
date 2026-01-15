import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import { orchestyOptions } from '@orchesty/nodejs-sdk/dist/lib/Config/Config';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import { mockOnce } from '@orchesty/nodejs-sdk/dist/test/MockServer';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as BRANI_UNSUBSCRIBE_WEBHOOK } from '../BraniUnsubscribeWebhook';

let tester: NodeTester;

describe('Tests for BraniUnsubscribeWebhook', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        mockOnce([
            {
                request: {
                    method: HttpMethods.GET, url: new RegExp(`${orchestyOptions.workerApi}\\/document\\/Webhook.*`),
                },
                response: {
                    code: 200,
                    body: [{ name: 'balic_packed' }],
                },
            }]);

        await tester.testConnector(BRANI_UNSUBSCRIBE_WEBHOOK);
    });
});
