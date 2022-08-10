import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import { SUBDOMAIN } from '../WorkableApplication';

export const NAME = 'workable-get-accounts-batch';

export default class WorkableGetAccountsBatch extends ABatchNode {
  public getName = (): string => NAME;

  public async processAction(_dto: BatchProcessDto): Promise<BatchProcessDto> {
    const dto = _dto;
    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const subdomain = appInstall.getSettings()[AUTHORIZATION_FORM][SUBDOMAIN];
    const req = await this._application.getRequestDto(
      dto,
      appInstall,
      HttpMethods.GET,
      `${subdomain}.workable.com/spi/v3/accounts`,
    );
    const resp = await this._sender.send(req, [200]);
    const response = resp.jsonBody as IResponse;

    dto.setItemList(response.accounts ?? []);
    dto.removeBatchCursor();
    return dto;
  }
}

/* eslint-disable @typescript-eslint/naming-convention */
interface IResponse{
  accounts: IOutput[]

}

export interface IOutput
{
  id: string,
  name: string,
  subdomain: string,
  description: string,
  summary: string,
  website_url: string
}
/* eslint-enable @typescript-eslint/naming-convention */
