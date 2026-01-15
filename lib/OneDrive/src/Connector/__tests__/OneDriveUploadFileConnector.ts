import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as ONE_DRIVE_UPLOAD_FILE_CONNECTOR } from '../OneDriveUploadFileConnector';

let tester: NodeTester;

describe('Tests for OneDriveUploadFileConnector', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(ONE_DRIVE_UPLOAD_FILE_CONNECTOR);
    });
});
