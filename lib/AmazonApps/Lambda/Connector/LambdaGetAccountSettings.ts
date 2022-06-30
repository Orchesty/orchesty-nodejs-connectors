import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { GetAccountSettingsCommand, GetAccountSettingsCommandInput } from '@aws-sdk/client-lambda';
import OnRepeatException from '@orchesty/nodejs-sdk/dist/lib/Exception/OnRepeatException';
import ALambdaObjectConnector from './ALambdaObjectConnector';
import LambdaApplication from '../LambdaApplication';

export default class LambdaGetAccountSettings extends ALambdaObjectConnector {
  protected _getCustomId = (): string => 'get-account-settings';

  processAction = async (_dto: ProcessDto): Promise<ProcessDto> => {
    const dto = _dto;

    const applicationInstall = await this._getApplicationInstallFromProcess(dto);
    const application = this._application as LambdaApplication;
    const client = application.getLambdaClient(applicationInstall);

    const input: GetAccountSettingsCommandInput = {};

    const command = new GetAccountSettingsCommand(input);
    try {
      await client.send(command);
    } catch (e) {
      throw new OnRepeatException(60, 10, (e as Error)?.message ?? 'Unknown error.');
    }

    return dto;
  };
}
