import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import FlexiBeeApplication from '../FexiBeeApplication';

export const FLEXI_BEE_CREATE_SKLADOVY_POHYB = 'flexi-bee-create-skladovy-pohyb';

export default class FlexiBeeCreateSkladovyPohybConnector extends AConnector {

    public constructor(
        protected dataKey: string | null = null,
    ) {
        super();
    }

    public getName(): string {
        return FLEXI_BEE_CREATE_SKLADOVY_POHYB;
    }

    public async processAction(
        dto: ProcessDto<FlexiBeeCreateSkladovyPohybInput>,
    ): Promise<ProcessDto<FlexiBeeCreateSkladovyPohybOutput>> {
        const applicationInstall = await this.getApplicationInstallFromProcess(dto);

        let pohyb = dto.getJsonData();
        if (this.dataKey) {
            // eslint-disable-next-line
            pohyb = (pohyb as any)[this.dataKey];
        }

        const application = this.getApplication<FlexiBeeApplication>();
        const request = await application.getRequestDto(
            dto,
            applicationInstall,
            HttpMethods.POST,
            application.getUrl(applicationInstall, 'skladovy-pohyb'),
            JSON.stringify({
                winstrom: {
                    // eslint-disable-next-line
                    'skladovy-pohyb': [
                        pohyb,
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

        return dto as unknown as ProcessDto<FlexiBeeCreateSkladovyPohybOutput>;
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

export interface FlexiBeeCreateSkladovyPohybInput {
    kod: string;
    typPohybuK: string;
    typDokl: string;
    sklad: string;
    skladovePolozky: {
        cenik: string;
        sklad: string;
        mnozMj: string;
    }[];
}

export type FlexiBeeCreateSkladovyPohybOutput = ResponseResult[];
