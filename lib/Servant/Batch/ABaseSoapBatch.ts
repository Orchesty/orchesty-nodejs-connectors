import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import OnRepeatException from '@orchesty/nodejs-sdk/dist/lib/Exception/OnRepeatException';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import * as soap from 'soap';
import ServantApplication from '../ServantApplication';

export default abstract class ABaseSoapBatch extends ABatchNode {

    protected async callSOAP<T extends object[]>(
        dto: BatchProcessDto,
        methodName: string,
        resultKey: string,
        args: object | null,
        lastRunKey: string | null = null,
    ): Promise<BatchProcessDto> {
        const app = this.getApplication<ServantApplication>();
        const appInstall = await this.getApplicationInstallFromProcess(dto);
        let body = args;

        if (lastRunKey) {
            const lastRun = await appInstall.getNonEncryptedSettings()[lastRunKey] ?? new Date(0).toISOString();
            body = {
                ...body,
                from: lastRun,
                to: new Date().toISOString(),
            };
        }

        const url = app.getBaseUrl(appInstall);

        soap.createClient(url, (err, client) => {
            if (err) {
                throw new OnRepeatException(60, 10, (err as Error).message);
            } else {
                // eslint-disable-next-line @typescript-eslint/dot-notation
                client[methodName]({
                    ...app.prepareArgs(appInstall),
                    ...body,
                }, async (er: unknown, result: IResult & T): Promise<BatchProcessDto> => {
                    if (er) {
                        throw new OnRepeatException(60, 10, (err as Error).message);
                    }

                    if (lastRunKey) {
                        appInstall.addNonEncryptedSettings({
                            [lastRunKey]: new Date().toISOString(),
                        });
                        await this.getDbClient().getApplicationRepository().update(appInstall);
                    }

                    return dto.setItemList(result[resultKey as unknown as number] as T);
                });
            }
        });

        return dto;
    }

}

export interface IResult {
    result: {
        resultCode: number;
        resultString: string;
    };
}
