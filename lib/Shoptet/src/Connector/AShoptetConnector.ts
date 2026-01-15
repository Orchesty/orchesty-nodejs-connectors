import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export default abstract class AShoptetConnector extends AConnector {

    protected async doRequest(
        url: string,
        dto: ProcessDto,
        enabled?: boolean | null,
        applicationInstall?: ApplicationInstall,
    ): Promise<unknown> {
        const appInstall = applicationInstall ?? await this.getApplicationInstallFromProcess(dto, enabled);
        const requestDto = await this.getApplication().getRequestDto(
            dto,
            appInstall,
            HttpMethods.GET,
            url,
        );
        const resp = await this.getSender().send(
            requestDto,
            { success: 200, stopAndFail: '404-422' },
        );

        return resp.getJsonBody();
    }

}
