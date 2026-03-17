import { FlexiBeeSimpleIterator } from './FlexiBeeSimpleIterator';

export const FLEXI_BEE_PREDPIS_ZAUCTOVANI_BATCH = 'flexi-bee-predpis-zauctovani-batch';

export default class FlexiBeePredpisZauctovaniBatch extends FlexiBeeSimpleIterator<FlexiBeePredpisZauctovani> {

    protected endpoint = 'predpis-zauctovani';

    protected override batchOutput = true;

    public getName(): string {
        return FLEXI_BEE_PREDPIS_ZAUCTOVANI_BATCH;
    }

}

export interface FlexiBeePredpisZauctovani {
    id: string;
    lastUpdate: string;
    kod: string;
    nazev: string;
    nazevA: string;
    nazevB: string;
    nazevC: string;
    poznam: string;
    popis: string;
    ucetObdobiOd: string;
    ucetObdobiDo: string;
    modulFav: string;
    modulFap: string;
    modulPhl: string;
    modulZav: string;
    modulTxz: string;
    modulBanP: string;
    modulBanV: string;
    modulPokP: string;
    modulPokV: string;
    modulSklP: string;
    modulSklV: string;
    modulInt: string;
    kodPlneniK: string;
    protiUcetPrijem: string;
    protiUcetVydej: string;
    dphSnizUcet: string;
    dphSniz2Ucet: string;
    dphZaklUcet: string;
}
