import ProcessDto from 'pipes-nodejs-sdk/dist/lib/Utils/ProcessDto';
import { GetAccountSettingsCommand, GetAccountSettingsCommandInput } from '@aws-sdk/client-lambda';
import OnRepeatException from 'pipes-nodejs-sdk/dist/lib/Exception/OnRepeatException';
import ALambdaObjectConnector from './ALambdaObjectConnector';
import PowerBiApplication from '../../../Azure/PowerBi/PowerBiApplication';

export default class LambdaGetAccountSettings extends ALambdaObjectConnector {
  protected _getCustomId = (): string => 'get-account-settings';

  processAction = async (_dto: ProcessDto): Promise<ProcessDto> => {
    const dto = _dto;

    const applicationInstall = await this._getApplicationInstall();
    const application = this._application as PowerBiApplication;
    const client = application.getClient(applicationInstall);

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
