import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import AOAuth2Application from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/AOAuth2Application';

export default class RefreshOAuth2TokenNode extends AConnector {
  public getName = (): string => 'refresh-oauth2-token';

  public async processAction(dto: ProcessDto): Promise<ProcessDto> {
    const { applicationId } = dto.jsonData as { applicationId: string };
    const applicationInstall = await this._getApplicationInstall(applicationId);

    if (applicationInstall) {
      const application = this._application as AOAuth2Application;
      await application.refreshAuthorization(applicationInstall);
    }

    return dto;
  }
}
