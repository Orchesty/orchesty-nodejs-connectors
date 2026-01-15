import { IOAuth2Application } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import DIContainer from '@orchesty/nodejs-sdk/dist/lib/DIContainer/Container';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { IOutput as IInput } from './GetApplicationForRefreshBatchConnector';

export const NAME = 'refresh-oauth2-token';

export default class RefreshOAuth2TokenNode extends AConnector {

    public constructor(private readonly container: DIContainer) {
        super();
    }

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto> {
        const { app } = dto.getJsonData();
        const repo = this.getDbClient().getApplicationRepository();

        const user = dto.getUser();

        const applicationInstall = await repo.findOne({
            names: [app], users: user ? [user] : undefined, enabled: true,
        });

        if (applicationInstall) {
            const application = this.container.getApplication(app) as IOAuth2Application;
            await application.refreshAuthorization(applicationInstall);
            await this.getDbClient().getApplicationRepository().update(applicationInstall);
        }

        return dto;
    }

}
