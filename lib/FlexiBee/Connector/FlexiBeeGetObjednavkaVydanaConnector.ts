import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ResponseDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/ResponseDto';
import { IResultRanges } from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/ResultCodeRange';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import FlexiBeeApplication from '../FexiBeeApplication';
import { FlexiBeeObjednavkaVydana } from '../types/FlexiBeeObjednavkaVydana';

export const FLEXI_BEE_GET_OBJEDNAVKA_VYDANA_CONNECTOR = 'flexi-bee-get-objednavka-vydana-connector';

export default class FlexiBeeGetObjednavkaVydanaConnector extends AConnector {

    public constructor(
        protected dataKey: string | null = null,
    ) {
        super();
    }

    public getName(): string {
        return FLEXI_BEE_GET_OBJEDNAVKA_VYDANA_CONNECTOR;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<FlexiBeeObjednavkaVydana>> {
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
            application.getUrl(applicationInstall, `objednavka-vydana/${id}.json?detail=full`),
        );
        const response = await this.getSender().send<IResponse>(request, this.getCodeRanges());

        return this.handleResponse(response, dto) as ProcessDto<FlexiBeeObjednavkaVydana>;
    }

    protected getCodeRanges(): IResultRanges|null {
        return null;
    }

    protected handleResponse(response: ResponseDto<IResponse>, dto: ProcessDto): ProcessDto {
        const order = response.getJsonBody().winstrom['objednavka-vydana'][0] ?? [];

        if (this.dataKey) {
            // eslint-disable-next-line
            const data = dto.getJsonData() as any;
            data[this.dataKey] = order;
            dto.setNewJsonData(data);
        } else {
            dto.setNewJsonData(order);
        }

        return dto as unknown as ProcessDto<FlexiBeeObjednavkaVydana>;
    }

}

export interface IInput {
    id: string;
}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IResponse {
    winstrom: {
        '@version': string;
        'objednavka-vydana': FlexiBeeObjednavkaVydana[];
    }
}
/* eslint-enable @typescript-eslint/naming-convention */
