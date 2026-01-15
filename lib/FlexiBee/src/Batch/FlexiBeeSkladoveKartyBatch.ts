import { FlexiBeeSimpleIterator } from './FlexiBeeSimpleIterator';

export const FLEXI_BEE_SKLADOVE_KARTY_BATCH = 'flexi-bee-skladove-karty-batch';

export default class FlexiBeeSkladoveKartyBatch extends FlexiBeeSimpleIterator<FlexiBeeSkladoveKartyItemOutput> {

    protected override endpoint = 'skladova-karta';

    public getName(): string {
        return FLEXI_BEE_SKLADOVE_KARTY_BATCH;
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

/* eslint-enable @typescript-eslint/naming-convention */
