import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import WflowApplication, { NAME as WFLOW_APPLICATION } from '../WflowApplication';

export const NAME = `${WFLOW_APPLICATION}-get-document-types-connector`;

export default class WflowGetDocumentTypesConnector extends AConnector {

    public constructor(private readonly useInForm = false) {
        super();
    }

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto): Promise<ProcessDto<IOutput[]>> {
        const application = this.getApplication<WflowApplication>();
        const applicationInstall = await this.getApplicationInstallFromProcess(dto, this.useInForm ? null : true);

        const requestDto = application.getRequestDto(
            dto,
            applicationInstall,
            HttpMethods.GET,
            `/${application.getOrganization(applicationInstall)}/documents/types?pageSize=100`,
        );

        const responseDto = await this.getSender().send<IResponse>(requestDto);

        return dto.setNewJsonData(responseDto.getJsonBody().items);
    }

}

export interface IOutput {
    id: string;
    name: string;
    kind: string;
    default: boolean;
    erpExclude: boolean;
    filesExtendName: boolean;
    docCreatingMethod: string;
    autoStamp: string;
    serie?: {
        id: string;
        externalId?: string;
        code?: string;
        description?: string;
        isValid?: boolean;
        kind?: string;
        invoiceType?: string;
    };
    sequence?: {
        id: string;
        entity?: string;
        description?: string;
        fixedPart?: string;
        counter?: string;
    };
    invoiceType?: string;
}

interface IResponse {
    items: IOutput[];
    totalItems: number;
    pageSize: number;
    page: number;
}
