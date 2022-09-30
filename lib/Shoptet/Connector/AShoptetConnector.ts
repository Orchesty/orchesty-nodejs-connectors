import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { createFailRange } from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/ResultCodeRange';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export default abstract class AShoptetConnector extends AConnector {

    protected async doRequest(url: string, dto: ProcessDto, enabled?: boolean | null): Promise<unknown> {
        const appInstall = await this.getApplicationInstallFromProcess(dto, enabled);
        const requestDto = await this.getApplication().getRequestDto(
            dto,
            appInstall,
            HttpMethods.GET,
            url,
        );
        const resp = await this.getSender().send(
            requestDto,
            [200, createFailRange(422)],
        );

        return resp.getJsonBody();
    }

}
