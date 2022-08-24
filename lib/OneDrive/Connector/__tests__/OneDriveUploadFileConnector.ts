import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { container } from '../../../../test/TestAbstract';
import { NAME as ONE_DRIVE_UPLOAD_FILE_CONNECTOR } from '../OneDriveUploadFileConnector';
import init from '../../../../test/Implementation/oneDrive';

let tester: NodeTester;

describe('Tests for OneDriveUploadFileConnector', () => {
  beforeEach(async () => {
    tester = new NodeTester(container, __filename);
    await init();
  });

  it('process - ok', async () => {
    await tester.testConnector(ONE_DRIVE_UPLOAD_FILE_CONNECTOR);
  });
});
