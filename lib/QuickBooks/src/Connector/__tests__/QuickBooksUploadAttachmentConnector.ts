import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as QUICK_BOOKS_UPLOAD_ATTACHMENT_CONNECTOR } from '../QuickBooksUploadAttachmentConnector';

let tester: NodeTester;

describe('Tests for QuickBooksUploadAttachmentConnector', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(QUICK_BOOKS_UPLOAD_ATTACHMENT_CONNECTOR);
    });
});
