import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import FlexiBeeApplication from '../FexiBeeApplication';

export const FLEXI_BEE_SKLADOVE_KARTY_BATCH = 'flexi-bee-skladove-karty-batch';

export class FlexiBeeSkladoveKartyBatch extends ABatchNode {

    protected pageSize = 100;

    public getName(): string {
        return FLEXI_BEE_SKLADOVE_KARTY_BATCH;
    }

    public async processAction(dto: BatchProcessDto): Promise<BatchProcessDto> {
        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const app = this.getApplication<FlexiBeeApplication>();

        const page = Number(dto.getBatchCursor('0'));
        const url = `skladova-karta.json?detail=full&add-row-count=true&start=${page * this.pageSize}&limit=${this.pageSize}`;

        const request = await app.getRequestDto(
            dto,
            appInstall,
            HttpMethods.GET,
            app.getUrl(appInstall, url),
        );

        const response = await this.getSender().send<Response>(request);
        const data = response.getJsonBody().winstrom;

        const rows = Number(data['@rowCount']);
        const pages = Math.ceil(rows / this.pageSize);
        if (pages > (page + 1)) {
            dto.setBatchCursor(String(page + 1), false);
        } else {
            dto.removeBatchCursor();
        }

        return dto.setItemList(data['skladova-karta']);
    }

}

/* eslint-disable @typescript-eslint/naming-convention */
export interface FlexiBeeSkladoveKartyItemOutput {
    'id': string;
    'lastUpdate': string;
    'prumCenaTuz': string;
    'prumCenaMen': string;
    'stavMJ': string;
    'stavTuz': string;
    'stavMen': string;
    'datPosl': string;
    'pocatMJ': string;
    'pocatTuz': string;
    'pocatMen': string;
    'minMJ': string;
    'maxMJ': string;
    'rezervMJ': string;
    'datStavMJ': string;
    'datStavTuz': string;
    'datStavMen': string;
    'poslCenaTuz': string;
    'poslCenaMen': string;
    'vydExpir': string;
    'popis': string;
    'popisA': string;
    'popisB': string;
    'popisC': string;
    'poznamVelka': string;
    'nazev': string;
    'nazevA': string;
    'nazevB': string;
    'nazevC': string;
    'cenPopis': string;
    'cenPopisA': string;
    'cenPopisB': string;
    'cenPopisC': string;
    'cenPoznam': string;
    'pozadavkyMj': string;
    'stavMjSPozadavky': string;
    'dostupMj': string;
    'ucetObdobi': string;
    'ucetObdobi@ref': string;
    'ucetObdobi@showAs': string;
    'cenik': string;
    'cenik@ref': string;
    'cenik@showAs': string;
    'sklad': string;
    'sklad@ref': string;
    'sklad@showAs': string;
    'typDokl': string;
    'typDokl@ref': string;
    'typDokl@showAs': string;
    'mistnost': string;
    'regal': string;
    'police': string;
}

export interface Response {
    winstrom: {
        '@rowCount': string;
        'skladova-karta': FlexiBeeSkladoveKartyItemOutput[];
    };
}

/* eslint-enable @typescript-eslint/naming-convention */
