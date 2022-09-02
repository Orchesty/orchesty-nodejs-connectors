import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import ResultCode from '@orchesty/nodejs-sdk/dist/lib/Utils/ResultCode';
import AShoptetConnector from './AShoptetConnector';

export const NAME = 'shoptet-job-finished-webhook';

export default class ShoptetJobFinishedWebhook extends AShoptetConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IInput> | ProcessDto<IOutput>> {
        const data = dto.getJsonData();
        if (data.event !== 'job:finished') {
            dto.setStopProcess(ResultCode.STOP_AND_FAILED, `Event [event=${data.event}] is not supported`);

            return dto;
        }

        const repo = await this.getDbClient().getApplicationRepository();
        const appInstall = await repo.findOne({ 'nonEncryptedSettings.eshopId': data.eshopId.toString() }); // eslint-disable-line
        if (!appInstall) {
            dto.setStopProcess(ResultCode.DO_NOT_CONTINUE, `Shoptet with eshopId [${data.eshopId}] is not installed.`);

            return dto;
        }

        dto.setUser(appInstall.getUser());
        const response = await this.doRequest(`api/system/jobs/${data.eventInstance}`, dto) as IResponse;

        return dto.setNewJsonData(response.data.job);
    }

}

interface IInput {
    eshopId: number;
    event: string;
    eventCreated: string;
    eventInstance: string;
}

interface IResponse {
    data: {
        job: IOutput;
    };
}

export interface IOutput {
    eventInstance: string;
    endpoint: string;
    creationTime: string;
    duration: string;
    completionTime: string;
    status: string;
    resultUrl: string;
    validUntil: string;
    log: string;
}
