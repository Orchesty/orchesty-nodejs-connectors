import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import FlexiBeeApplication from '../FexiBeeApplication';

export const FLEXI_BEE_CREATE_OBJEDNAVKA_VYDANA = 'flexi-bee-create-objednavka-vydana';

export default class FlexiBeeCreateObjednavkaVydanaConnector extends AConnector {

    public constructor(
        protected dataKey: string | null = null,
    ) {
        super();
    }

    public getName(): string {
        return FLEXI_BEE_CREATE_OBJEDNAVKA_VYDANA;
    }

    public async processAction(
        dto: ProcessDto<FlexiBeeCreateObjednavkaVydanaInput>,
    ): Promise<ProcessDto<FlexiBeeCreateObjednavkaVydanaOutput>> {
        const applicationInstall = await this.getApplicationInstallFromProcess(dto);

        let data = dto.getJsonData();
        if (this.dataKey) {
            // eslint-disable-next-line
            data = (data as any)[this.dataKey];
        }

        const application = this.getApplication<FlexiBeeApplication>();
        const request = await application.getRequestDto(
            dto,
            applicationInstall,
            HttpMethods.POST,
            application.getUrl(applicationInstall, 'objednavka-vydana'),
            JSON.stringify({
                winstrom: {
                    // eslint-disable-next-line
                    'objednavka-vydana': [
                        data,
                    ],
                },
            }),
        );
        const resp = (await this.getSender().send<Response>(request)).getJsonBody().winstrom.results;

        if (this.dataKey) {
            // eslint-disable-next-line
            const data = dto.getJsonData() as any;
            data[this.dataKey] = resp;
            dto.setNewJsonData(data);
        } else {
            dto.setNewJsonData(resp);
        }

        return dto as unknown as ProcessDto<FlexiBeeCreateObjednavkaVydanaOutput>;
    }

}

interface ResponseResult {
    results: {
        id: string;
        ref: string;
    };
}

interface Response {
    winstrom: {
        results: ResponseResult[];
    };
}

export interface FlexiBeeCreateObjednavkaVydanaInput {
    kod: string;
}

export type FlexiBeeCreateObjednavkaVydanaOutput = ResponseResult[];
