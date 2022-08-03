import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import ResultCode from '@orchesty/nodejs-sdk/dist/lib/Utils/ResultCode';
import AShoptetConnector from './AShoptetConnector';

export const NAME = 'shoptet-job-finished-webhook';

export default class ShoptetJobFinishedWebhook extends AShoptetConnector {
  public getName = (): string => NAME;

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const data = dto.jsonData as IInput;
    if (data.event !== 'job:finished') {
      dto.setStopProcess(ResultCode.STOP_AND_FAILED, `Event [event=${data.event}] is not supported`);
      return dto;
    }

    const repo = await this._dbClient.getApplicationRepository();
    const appInstall = await repo.findOne({ 'nonEncryptedSettings.eshopId': data.eshopId.toString() });
    if (!appInstall) {
      dto.setStopProcess(ResultCode.DO_NOT_CONTINUE, `Shoptet with eshopId [${data.eshopId}] is not installed.`);
      return dto;
    }

    dto.user = appInstall.getUser();
    const response = await this._doRequest(`api/system/jobs/${data.eventInstance}`, dto) as IResponse;

    dto.jsonData = response.data.job;

    return dto;
  }
}

interface IInput {
  eshopId: number,
  event: string,
  eventCreated: string,
  eventInstance: string
}

interface IResponse {
  data: {
    job: IOutput
  }
}

export interface IOutput {
  jobId: string,
  endpoint: string,
  creationTime: string,
  duration: string,
  completionTime: string,
  status: string,
  resultUrl: string,
  validUntil: string,
  log: string
}
