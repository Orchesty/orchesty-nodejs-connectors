import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import Zlib from 'zlib';
import ResultCode from '@orchesty/nodejs-sdk/dist/lib/Utils/ResultCode';
import { CommonHeaders } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';
import { IOutput } from '../Connector/ShoptetJobFinishedWebhook';

export const NAME = 'shoptet-parse-json-lines';

export default class ShoptetParseJsonLines extends ABatchNode {
  public getName = (): string => NAME;

  public processAction = async (_dto: BatchProcessDto): Promise<BatchProcessDto> => {
    const dto = _dto;

    const { resultUrl, status, jobId } = dto.jsonData as IOutput;

    if (status !== 'completed') {
      dto.setStopProcess(ResultCode.STOP_AND_FAILED, `Job [jobId=${jobId}] from shoptet is not completed.`);
      return dto;
    }

    const applicationInstall = await this._getApplicationInstallFromProcess(dto);
    const requestDto = (await this._application.getRequestDto(
      dto,
      applicationInstall,
      HttpMethods.GET,
      resultUrl,
    )).addHeaders({ [CommonHeaders.ACCEPT_ENCODING]: 'gzip,deflate' });

    const response = await this._sender.send(requestDto, [200]);
    const data = Zlib.gunzipSync(response.body).toString().split('\n');

    do {
      const slicedData = data.splice(0, 100);

      const batchItem: unknown[] = [];
      slicedData.forEach((jsonLine) => {
        if (jsonLine) {
          batchItem.push(JSON.parse(jsonLine));
        }
      });

      if (batchItem.length > 0) {
        dto.addItem(batchItem, dto.user);
      }
    } while (data.length > 0);

    return dto;
  };
}
