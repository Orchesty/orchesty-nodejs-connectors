import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import OnRepeatException from '@orchesty/nodejs-sdk/dist/lib/Exception/OnRepeatException';
import logger from '@orchesty/nodejs-sdk/dist/lib/Logger/Logger';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import * as soap from 'soap';
import { log } from '../Connector/ABaseServantSoapConnector';
import ServantApplication from '../ServantApplication';

export default abstract class ABaseSoapBatch extends ABatchNode {

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
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
                interval: {
                    from: lastRun,
                    to: new Date().toISOString(),
                },
            };
        }

        const url = app.getBaseUrl();

        let resolve: CallableFunction;
        let reject: CallableFunction;
        const promise = new Promise((res, rej) => {
            resolve = res;
            reject = rej;
        });

        soap.createClient(url, (err, client) => {
            if (err) {
                reject(new OnRepeatException(60, 10, (err as Error).message));
            } else {
                client[methodName]({
                    ...app.prepareArgs(appInstall),
                    ...body,
                }, async (er: unknown, res: IResult & T): Promise<void> => {
                    logger.info(client.lastRequest ?? '', {}, false);
                    if (er) {
                        reject(new OnRepeatException(60, 10, (er as Error).message));
                    }

                    const data = log(dto, res, resultKey);

                    if (lastRunKey) {
                        appInstall.addNonEncryptedSettings({
                            [lastRunKey]: new Date().toISOString(),
                        });
                        await this.getDbClient().getApplicationRepository().update(appInstall);
                    }

                    resolve(dto.setItemList(data ?? []));
                });
            }
        });

        return await promise as BatchProcessDto<T>;
    }

}

export interface IResult {
    result: {
        resultCode: number;
        resultString: string;
    };
}
