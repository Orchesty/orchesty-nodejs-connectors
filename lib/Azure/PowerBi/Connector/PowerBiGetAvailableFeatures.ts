import ProcessDto from 'pipes-nodejs-sdk/dist/lib/Utils/ProcessDto';
import OnRepeatException from 'pipes-nodejs-sdk/dist/lib/Exception/OnRepeatException';
import { PipelineRequest } from '@azure/core-rest-pipeline';
import APowerBiObjectConnector from './APowerBiObjectConnector';
import PowerBiApplication from '../PowerBiApplication';

export default class PowerBiGetAvailableFeatures extends APowerBiObjectConnector {
  protected _getCustomId = (): string => 'get-available-features';

  async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;

    const applicationInstall = await this._getApplicationInstallFromHeaders(dto);
    const application = this._application as PowerBiApplication;
    const client = application.getClient(applicationInstall);

    try {
      const request = new PipelineRequest();
      request
        .client.sendRequest();
    } catch (e) {
      throw new OnRepeatException(60, 10, (e as Error)?.message ?? 'Unknown error.');
    }

    return dto;
  }
}
