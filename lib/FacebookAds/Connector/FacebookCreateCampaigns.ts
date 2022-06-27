import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import { checkParams } from '@orchesty/nodejs-sdk/dist/lib/Utils/Validations';
import FacebookAdsApplication from '../FacebookAdsApplication';

const FACEBOOK_CREATE_CAMPAINGS = '/v12.0/act_REPLACE_ME/campaigns';

interface IFacebookCampaigns {
  name: string,
  objective: string,
  status: number,
  specialAdCategories: string[],
  accountId: string,
  userName: string,
}

export default class FacebookCreateCampaigns extends AConnector {
  public getName = (): string => 'facebook-create-campaigns';

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    checkParams(
      dto.jsonData as Record<string, unknown>,
      ['name', 'objective', 'status', 'specialAdCategories', 'accountId', 'userName'],
    );

    const {
      name,
      objective,
      status,
      specialAdCategories,
      accountId,
      userName,
    } = dto.jsonData as IFacebookCampaigns;

    const application = this._application as FacebookAdsApplication;
    const applicationInstall = await this._getApplicationInstall(userName);
    const data = {
      name,
      objective,
      status,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      special_ad_categories: specialAdCategories,
    };

    const request = await application.getRequestDto(
      dto,
      applicationInstall,
      HttpMethods.POST,
      FACEBOOK_CREATE_CAMPAINGS.replace('REPLACE_ME', accountId),
      JSON.stringify(data),
    );

    const response = await this._sender.send(request, [200]);
    dto.data = response.body;
    return dto;
  }
}
