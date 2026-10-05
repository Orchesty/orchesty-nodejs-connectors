import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { IWflowApplication, NAME as WFLOW_APP_NAME } from '../WflowApplication';

export const NAME = `${WFLOW_APP_NAME}-patch-cost-centers-connector`;

export default class WflowPatchCostCentersConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput | IInput[]>): Promise<ProcessDto<IOutput>> {
        const data = dto.getJsonData();
        const application = this.getApplication<IWflowApplication>();
        const applicationInstall = await this.getApplicationInstallFromProcess(dto);

        const requestDto = await application.getRequestDto(
            dto,
            applicationInstall,
            HttpMethods.PATCH,
            `/${application.getOrganization(applicationInstall)}/registers/costcenters`,
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
