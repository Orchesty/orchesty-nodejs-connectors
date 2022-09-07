import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import ResultCode from '@orchesty/nodejs-sdk/dist/lib/Utils/ResultCode';

export default abstract class AShoptetConnector extends AConnector {

    protected async doRequest(url: string, dto: ProcessDto): Promise<unknown> {
        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const requestDto = await this.getApplication().getRequestDto(
            dto,
            appInstall,
            HttpMethods.GET,
            url,
        );
        const resp = await this.getSender().send(
            requestDto,
            [200, { from: 422, to: 422, action: ResultCode.STOP_AND_FAILED }],
        );

        return resp.getJsonBody();
    }

}
