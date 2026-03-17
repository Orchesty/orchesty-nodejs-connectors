import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import { CommonHeaders } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import FlexiBeeApplication, { FLEXI_BEE_APPLICATION } from '../FexiBeeApplication';

export const NAME = `${FLEXI_BEE_APPLICATION}-create-zavazek-priloha-connector`;

export default class FlexiBeeCreateZavazekPrilohaConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput[]>> {
        const { id, file } = dto.getJsonData();
        const application = this.getApplication<FlexiBeeApplication>();
        const applicationInstall = await this.getApplicationInstallFromProcess(dto);

        const requestDto = (await application.getRequestDto(
            dto,
            applicationInstall,
            HttpMethods.PUT,
            application.getUrl(applicationInstall, `zavazek/${id}/prilohy/new/${id}.pdf`),
        ))
            .addHeaders({ [CommonHeaders.CONTENT_TYPE]: 'application/pdf' })
            .setBody(Buffer.from(file, 'base64'));

        const responseDto = await this.getSender().send<IResponse>(requestDto);

        return dto.setNewJsonData(responseDto.getJsonBody().winstrom.results);
    }

}

export interface IInput {
    id: string;
    file: string;
}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IResponse {
    winstrom: {
        '@version': string;
        success: string;
        stats: {
            created: string;
            updated: string;
            deleted: string;
            skipped: string;
            failed: string;
        };
        results: IOutput[];
    };
}

export interface IOutput {
    id: string;
    'request-id': `ext:${string}`;
    ref: string;
}
/* eslint-enable @typescript-eslint/naming-convention */
