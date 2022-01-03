import CurlSender from 'pipes-nodejs-sdk/dist/lib/Transport/Curl/CurlSender';
import Metrics from 'pipes-nodejs-sdk/dist/lib/Metrics/Metrics';
import ProcessDto from 'pipes-nodejs-sdk/dist/lib/Utils/ProcessDto';
import GoogleDriveUploadFileConnector from '../GoogleDriveUploadFileConnector';

xdescribe('google drive upload file connector', () => {
  xit('processAction', async () => {
    const conn = new GoogleDriveUploadFileConnector();
    conn.setSender(new CurlSender({ sendCurlMetrics: jest.fn() } as unknown as Metrics));

    const dto = new ProcessDto();
    dto.data = 'test';

    await conn.processAction(dto);
  });
});
