import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import OnRepeatException from '@orchesty/nodejs-sdk/dist/lib/Exception/OnRepeatException';
import logger from '@orchesty/nodejs-sdk/dist/lib/Logger/Logger';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import ResultCode from '@orchesty/nodejs-sdk/dist/lib/Utils/ResultCode';
import * as soap from 'soap';
import ServantApplication from '../ServantApplication';

export function log<T>(
    dto: BatchProcessDto | ProcessDto,
    res: IResult & T,
    resultKey: string,
): T {
    const data = (res as never)[resultKey] as T;
    const { result } = res;

    let resultText: string | undefined = '';
    let success: boolean | undefined = true;
    if (resultKey === 'importRequestResult') {
        // eslint-disable-next-line @typescript-eslint/prefer-destructuring
        success = res?.importRequestResult?.success;
        resultText = `${res?.importRequestResult?.result}: ${res?.importRequestResult?.infoText}`;
    }

    if (result.resultCode === 1 || result.resultCode === 2) {
        logger.error(
            `Request process failed. Message: [${resultText ?? dto.getHeader(result.resultString) ?? ''}]`,
            dto,
        );

        dto.setStopProcess(ResultCode.STOP_AND_FAILED, result.resultString);
    } else {
        logger.info(
            `Request successfully processed. Message: [${resultText ?? JSON.stringify(data) ?? ''}]`,
            dto,
        );

        if (!success) {
            dto.setStopProcess(ResultCode.STOP_AND_FAILED, resultText ?? JSON.stringify(data) ?? '');
        }
    }

    return data;
}

export default abstract class ABaseServantSoapConnector extends AConnector {

    protected async callSOAP<T>(
        dto: ProcessDto,
        methodName: string,
        resultKey: string,
        args: object | null,
        forForm = false,
    ): Promise<ProcessDto<T>> {
        const app = this.getApplication<ServantApplication>();
        const appInstall = await this.getApplicationInstallFromProcess(dto, forForm ? null : true);

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
                // eslint-disable-next-line @typescript-eslint/dot-notation
                client[methodName]({
                    ...app.prepareArgs(appInstall),
                    ...args,
                }, (er: unknown, res: IResult & T): void => {
                    logger.info(client.lastRequest ?? '', {}, false);
                    if (er) {
                        reject(new OnRepeatException(60, 10, (er as Error).message));
                    }

                    const data = log(dto, res, resultKey);

                    resolve(dto.setNewJsonData<T>(data));
                });
            }
        });

        return await promise as ProcessDto<T>;
    }

}

export interface IResult {
    result: {
        resultCode: number;
        resultString: string;
    };
    importRequestResult?: {
        success: boolean;
        result: string;
        infoText: string;
    };
}
