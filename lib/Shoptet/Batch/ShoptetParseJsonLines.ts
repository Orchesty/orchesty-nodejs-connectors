import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import Zlib from 'zlib';
import { IOutput } from '../Connector/ShoptetJobFinishedWebhook';

export const NAME = 'shoptet-parse-json-lines';

export default class ShoptetParseJsonLines extends ABatchNode {
  public getName = (): string => NAME;

  public processAction = async (_dto: BatchProcessDto): Promise<BatchProcessDto> => {
    const dto = _dto;

    let data: string[];

    const cursor = dto.getBatchCursor('');
    if (cursor) {
      data = JSON.parse(cursor);
    } else {
      const { resultUrl } = dto.jsonData as IOutput;
      const applicationInstall = await this._getApplicationInstallFromProcess(dto);
      const requestDto = (await this._application.getRequestDto(
        dto,
        applicationInstall,
        HttpMethods.GET,
        resultUrl,
      )).addHeaders({ 'Accept-Encoding': 'gzip,deflate' });

      const response = await this._sender.send(requestDto, [200]);
      data = Zlib.gunzipSync(response.body).toString().split('\n');
    }

    const slicedData = data.splice(0, 100);
    if (data.length > 0) {
      dto.setBatchCursor(JSON.stringify(data));
    }

    slicedData.forEach((jsonLine) => {
      if (jsonLine) {
        dto.addItem(JSON.parse(jsonLine), dto.user);
      }
    });

    return dto;
  };
}
