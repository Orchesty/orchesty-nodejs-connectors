import { FlexiBeeSimpleIterator } from './FlexiBeeSimpleIterator';

export const FLEXI_BEE_STREDISKO_BATCH = 'flexi-bee-stredisko-batch';

export default class FlexiBeeStrediskoBatch extends FlexiBeeSimpleIterator<FlexiBeeStredisko> {

    protected endpoint = 'stredisko';

    protected override batchOutput = true;

    public getName(): string {
        return FLEXI_BEE_STREDISKO_BATCH;
    }

}

export interface FlexiBeeStredisko {
    id: string;
    lastUpdate: string;
    kod: string;
    nazev: string;
    nazevA: string;
    nazevB: string;
    nazevC: string;
    poznam: string;
    popis: string;
    platiOd: string;
    platiDo: string;
    ulice: string;
    mesto: string;
    psc: string;
    tel: string;
    mobil: string;
    fax: string;
    email: string;
    www: string;
    stat: string;
    region: string;
    tisknout: string;
    nazev2: string;
    nazev2A: string;
    nazev2B: string;
    nazev2C: string;
    stitky: string;
}
