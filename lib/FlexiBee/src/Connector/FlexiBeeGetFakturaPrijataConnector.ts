import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ResponseDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/ResponseDto';
import { IResultRanges } from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/ResultCodeRange';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import FlexiBeeApplication from '../FexiBeeApplication';
import { FlexiBeeFakturaPrijata } from '../types/FlexiBeeFakturaPrijata';

export const FLEXI_BEE_GET_FAKTURA_PRIJATA_CONNECTOR = 'flexi-bee-get-faktura-prijata-connector';

export default class FlexiBeeGetFakturaPrijataConnector extends AConnector {

    public constructor(
        protected dataKey: string | null = null,
    ) {
        super();
    }

    public getName(): string {
        return FLEXI_BEE_GET_FAKTURA_PRIJATA_CONNECTOR;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<FlexiBeeFakturaPrijata>> {
        const applicationInstall = await this.getApplicationInstallFromProcess(dto);
        const data = dto.getJsonData();
        // eslint-disable-next-line
        let id = data.id;
        if (this.dataKey) {
            // eslint-disable-next-line
            id = (data as any)[this.dataKey].id;
        }

        const application = this.getApplication<FlexiBeeApplication>();
        const request = await application.getRequestDto(
            dto,
            applicationInstall,
            HttpMethods.GET,
            application.getUrl(applicationInstall, `faktura-prijata/${id}.json?detail=full`),
        );
        const response = await this.getSender().send<IResponse>(request, this.getCodeRanges());

        return this.handleResponse(response, dto) as ProcessDto<FlexiBeeFakturaPrijata>;
    }

    protected getCodeRanges(): IResultRanges|null {
        return null;
    }

    protected handleResponse(response: ResponseDto<IResponse>, dto: ProcessDto): ProcessDto {
        const invoice = response.getJsonBody().winstrom['faktura-prijata'][0] ?? [];

        if (this.dataKey) {
            // eslint-disable-next-line
            const data = dto.getJsonData() as any;
            data[this.dataKey] = invoice;
            dto.setNewJsonData(data);
        } else {
            dto.setNewJsonData(invoice);
        }

        return dto as unknown as ProcessDto<FlexiBeeFakturaPrijata>;
    }

}

export interface IInput {
    id: string;
}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IResponse {
    winstrom: {
        '@version': string;
        'faktura-prijata': FlexiBeeFakturaPrijata[];
    }
}
/* eslint-enable @typescript-eslint/naming-convention */
