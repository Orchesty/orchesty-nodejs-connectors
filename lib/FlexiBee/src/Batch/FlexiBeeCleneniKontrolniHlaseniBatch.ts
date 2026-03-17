import { FlexiBeeSimpleIterator } from './FlexiBeeSimpleIterator';

export const FLEXI_BEE_CLENENI_KONTROLNI_HLASENI_BATCH = 'flexi-bee-cleneni-kontrolni-hlaseni-batch';

export default class FlexiBeeCleneniKontrolniHlaseniBatch extends FlexiBeeSimpleIterator<
    FlexiBeeCleneniKontrolniHlaseni
> {

    protected endpoint = 'cleneni-kontrolni-hlaseni';

    protected override batchOutput = true;

    public getName(): string {
        return FLEXI_BEE_CLENENI_KONTROLNI_HLASENI_BATCH;
    }

}

/* eslint-disable @typescript-eslint/naming-convention */
export interface FlexiBeeCleneniKontrolniHlaseni {
    'id': string;
    'lastUpdate': string;
    'kod': string;
    'nazev': string;
    'nazevA': string;
    'nazevB': string;
    'nazevC': string;
    'poznam': string;
    'popis': string;
    'platiOd': string;
    'platiDo': string;
    'vyplnCisKod': string;
    'vyplnDruh': string;
    'kodTransakce': string;
    'typPohybuK': string;
    'uuid': string;
    'stat': string;
    'stat@ref': string;
    'stat@showAs': string;
}
/* eslint-enable @typescript-eslint/naming-convention */
