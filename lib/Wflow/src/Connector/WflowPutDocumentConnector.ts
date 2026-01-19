import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { NAME as WFLOW_APP_NAME, ORGANIZATION, ORGANIZATION_FORM } from '../WflowApplication';

export const NAME = `${WFLOW_APP_NAME}-put-document-connector`;

export default class WflowPutDocumentConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto> {
        const app = this.getApplication();
        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const { id, tag } = dto.getJsonData();

        const organization: string | undefined
            = appInstall.getSettings()[ORGANIZATION_FORM]?.[ORGANIZATION];

        const request = await app.getRequestDto(
            dto,
            appInstall,
            HttpMethods.PUT,
            `/${organization}/documents`,
            {
                id,
                tag,
            },
        );

        await this.getSender().send(request, [200]);
        return dto;
    }

}

export interface IInput {
    id: string;
    tag?: string;
}
