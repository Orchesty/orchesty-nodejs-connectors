import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';

export const NAME = 'get-response-get-contact';

export default class GetResponseGetContact extends ABatchNode {
  public getName = (): string => NAME;

  public async processAction(_dto: BatchProcessDto): Promise<BatchProcessDto> {
    const dto = _dto;

    const page = dto.getBatchCursor('1');
    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const req = await this._application.getRequestDto(
      dto,
      appInstall,
      HttpMethods.GET,
      `contacts?page=${page}&perPage=100&filter=basic`,
    );
    const resp = await this._sender.send(req, [200]);
    const response = resp.jsonBody as IOutput[];

    dto.setItemList(response ?? []);
    if (response.length >= 100) {
      dto.setBatchCursor((Number(page) + 1).toString());
    }
    return dto;
  }
}

export interface IOutput{
      contactId: string,
      name: string,
      origin: string,
      timeZone: string,
      activities: string,
      changedOn: string,
      createdOn: string,
      campaign: {
        campaignId: string,
        href: string,
        name: string
      },
      email: string,
      dayOfCycle: string,
      scoring: number,
      engagementScore: number,
      href: string,
      note: string,
      ipAddress: string
}
