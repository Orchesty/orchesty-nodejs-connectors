import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import FormData from 'form-data';

export const SUCCESS = 'SUCCESS';

export default abstract class ABaseConnector<T, K> extends AConnector {

    protected abstract getMethod(): string;

    public async processAction(dto: ProcessDto<T>): Promise<ProcessDto<K>> {
        const req = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.POST,
            undefined,
            this.prepareBody(this.getMethod(), await this.getParameters(dto)),
        );
        const resp = await this.getSender().send<IResponse>(req, [200]);
        const { status, ...jsonBody } = resp.getJsonBody();
        if (status !== SUCCESS) {
            throw new Error(`Request failed. Reason: ${resp.getBody()}`);
        }

        return this.processOutputData(dto, jsonBody);
    }

    // eslint-disable-next-line @typescript-eslint/require-await
    protected async getParameters(_dto: ProcessDto<T>): Promise<object> {
        return [];
    }

    protected prepareBody(method: string, parameters: object): FormData {
        const body = new FormData();
        body.append('method', method);
        body.append('parameters', JSON.stringify(parameters));

        return body;
    }

    // eslint-disable-next-line @typescript-eslint/require-await
    protected async processOutputData(dto: ProcessDto<T>, jsonBody: object): Promise<ProcessDto<K>> {
        return dto.setNewJsonData(jsonBody as K);
    }

}

export interface IResponse {
    status: string;
}
