import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import WflowApplication, { NAME as WFLOW_APP_NAME } from '../WflowApplication';

export const NAME = `${WFLOW_APP_NAME}-patch-vat-control-statement-lines-connector`;

export default class WflowPatchVatControlStatementLinesConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput | IInput[]>): Promise<ProcessDto<IOutput>> {
        const data = dto.getJsonData();
        const application = this.getApplication<WflowApplication>();
        const applicationInstall = await this.getApplicationInstallFromProcess(dto);

        const requestDto = application.getRequestDto(
            dto,
            applicationInstall,
            HttpMethods.PATCH,
            `/${application.getOrganization(applicationInstall)}/registers/vatcontrolstatementlines`,
            Array.isArray(data) ? data : [data],
        );

        await this.getSender().send(requestDto, [200]);

        return dto;
    }

}

export interface IInput {
    id?: string | null;
    externalId?: string | null;
    code?: string | null;
    description?: string | null;
    isValid?: boolean;
}

export type IOutput = IInput | IInput[];
