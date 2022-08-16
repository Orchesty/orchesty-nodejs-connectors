import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import { SUBDOMAIN } from '../WorkableApplication';

export const NAME = 'workable-jobs-batch';

export default class WorkableJobsBatch extends ABatchNode {
  public getName = (): string => NAME;

  public async processAction(_dto: BatchProcessDto): Promise<BatchProcessDto> {
    const dto = _dto;
    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const subdomain = appInstall.getSettings()[AUTHORIZATION_FORM][SUBDOMAIN];
    const url = dto.getBatchCursor(`${subdomain}.workable.com/spi/v3/jobs?state=published`);
    const req = await this._application.getRequestDto(
      dto,
      appInstall,
      HttpMethods.GET,
      url,
    );
    const resp = await this._sender.send(req, [200]);
    const response = resp.jsonBody as IResponse;

    dto.setItemList(response.jobs ?? []);
    if (response.paging?.next) {
      dto.setBatchCursor(response.paging.next);
    }
    return dto;
  }
}

/* eslint-disable @typescript-eslint/naming-convention */

export interface IInput{
  subdomain: string
}

interface IResponse{
  jobs: IOutput[]
  paging: {
    next: string
  }
}

interface IOutput {
  id: string,
  title: string,
  full_title: string,
  shortcode: string,
  code: string,
  state: string,
  department: string,
  department_hierarchy:
    {
      id: number,
      name: string
    }[],
  url: string,
  application_url: string,
  shortlink: string,
  location: {
    location_str: string,
    country: string,
    country_code: string,
    region: string,
    region_code: string,
    city: string,
    zip_code: string,
    telecommuting: boolean
  },
  created_at: string
}

/* eslint-enable @typescript-eslint/naming-convention */
