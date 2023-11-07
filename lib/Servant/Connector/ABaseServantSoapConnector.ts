import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import OnRepeatException from '@orchesty/nodejs-sdk/dist/lib/Exception/OnRepeatException';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import * as soap from 'soap';
import ServantApplication from '../ServantApplication';

export default abstract class ABaseServantSoapConnector extends AConnector {

    protected async callSOAP<T>(
        dto: ProcessDto,
        methodName: string,
        resultKey: string,
        args: object | null,
    ): Promise<ProcessDto<T>> {
        const app = this.getApplication<ServantApplication>();
        const appInstall = await this.getApplicationInstallFromProcess(dto);

        const url = app.getBaseUrl(appInstall);

        soap.createClient(url, (err, client) => {
            if (err) {
                throw new OnRepeatException(60, 10, (err as Error).message);
            } else {
                // eslint-disable-next-line @typescript-eslint/dot-notation
                client[methodName]({
                    ...app.prepareArgs(appInstall),
                    ...args,
                }, (er: unknown, result: IResult & T): ProcessDto => {
                    if (er) {
                        throw new OnRepeatException(60, 10, (err as Error).message);
                    }

                    return dto.setNewJsonData<T>((result as never)[resultKey] as T);
                });
            }
        });

        return dto as ProcessDto<T>;
    }

}

export interface IResult {
    result: {
        resultCode: number;
        resultString: string;
    };
}
