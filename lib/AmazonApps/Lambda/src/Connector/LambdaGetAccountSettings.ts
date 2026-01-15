import { GetAccountSettingsCommand, GetAccountSettingsCommandInput } from '@aws-sdk/client-lambda';
import OnRepeatException from '@orchesty/nodejs-sdk/dist/lib/Exception/OnRepeatException';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import LambdaApplication from '../LambdaApplication';
import ALambdaObjectConnector from './ALambdaObjectConnector';

export default class LambdaGetAccountSettings extends ALambdaObjectConnector {

    public async processAction(dto: ProcessDto): Promise<ProcessDto> {
        const applicationInstall = await this.getApplicationInstallFromProcess(dto);
        const application = this.getApplication<LambdaApplication>();
        const client = application.getLambdaClient(applicationInstall);

        const input: GetAccountSettingsCommandInput = {};

        const command = new GetAccountSettingsCommand(input);
        try {
            await client.send(command);
        } catch (e) {
            throw new OnRepeatException(60, 10, (e as Error)?.message ?? 'Unknown error.');
        }

        return dto;
    }

    protected getCustomId(): string {
        return 'get-account-settings';
    }

}
