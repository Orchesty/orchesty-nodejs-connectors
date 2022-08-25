import AOAuth2Application from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/AOAuth2Application';
import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export default class RefreshOAuth2TokenNode extends AConnector {

    public getName(): string {
        return 'refresh-oauth2-token';
    }

    public async processAction(dto: ProcessDto): Promise<ProcessDto> {
        const applicationInstall = await this.getApplicationInstallFromProcess(dto);

        if (applicationInstall) {
            const application = this.getApplication<AOAuth2Application>();
            await application.refreshAuthorization(applicationInstall);
        }

        return dto;
    }

}
