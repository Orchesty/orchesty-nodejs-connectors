import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import FlexiBeeApplication from '../FexiBeeApplication';
import { parseFlexiBeeId } from '../FlexiBee.utils';
import { FlexiBeeGetCenikKartyOutput } from './FlexiBeeGetCenikKartyConnector';

export const FLEXI_BEE_GET_SARZE_EXPIRACE_KARTY_CONNECTOR = 'flexi-bee-get-sarze-expirace-karty-connector';

export class FlexiBeeGetSarzeExpiraceKartyConnector extends AConnector {

    public getName(): string {
        return FLEXI_BEE_GET_SARZE_EXPIRACE_KARTY_CONNECTOR;
    }

    public async processAction(
        dto: ProcessDto<FlexiBeeGetSarzeExpiraceKartyInput>,
    ): Promise<ProcessDto<FlexiBeeGetSarzeExpiraceKartyOutput>> {
        const applicationInstall = await this.getApplicationInstallFromProcess(dto);
        const data = dto.getJsonData() as FlexiBeeGetSarzeExpiraceKartyOutput;
        const cenikId = parseFlexiBeeId(data['cenik@ref']);
        const skladId = parseFlexiBeeId(data['sklad@ref']);

        const application = this.getApplication<FlexiBeeApplication>();
        const request = await application.getRequestDto(
            dto,
            applicationInstall,
            HttpMethods.GET,
            application.getUrl(applicationInstall, `sarze-expirace/(cenik=${cenikId}%20and%20sklad=${skladId}).json?detail=full`),
        );
        const response = await this.getSender().send<Response>(request);
        data.sarzeExpiraceData = response.getJsonBody().winstrom['sarze-expirace'];

        return dto.setNewJsonData(data);
    }

}

/* eslint-disable @typescript-eslint/naming-convention */
type SarzeExpirace = {
    'id': string;
    'pocet': string;
    'cenaMj': string;
    'datVyst': string;
    'datSklad': string;
    'datTrvan': string;
    'datVyroby': string;
    'expirace': string;
    'sarze': string;
    'typPohybuK': string;
    'typPohybuK@showAs': string;
    'sklad': string;
    'sklad@ref': string;
    'sklad@showAs': string;
    'cenik': string;
    'cenik@ref': string;
    'cenik@showAs': string;
}[];

interface Response {
    'winstrom': {
        '@version': string;
        'sarze-expirace': SarzeExpirace;
    };
}

export type FlexiBeeGetSarzeExpiraceKartyInput = FlexiBeeGetCenikKartyOutput;

export interface FlexiBeeGetSarzeExpiraceKartyOutput extends FlexiBeeGetCenikKartyOutput {
    sarzeExpiraceData: SarzeExpirace;
}

/* eslint-enable @typescript-eslint/naming-convention */
