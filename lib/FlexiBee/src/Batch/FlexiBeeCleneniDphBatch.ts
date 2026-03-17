import { FlexiBeeSimpleIterator } from './FlexiBeeSimpleIterator';

export const FLEXI_BEE_CLENENI_DPH_BATCH = 'flexi-bee-cleneni-dph-batch';

export default class FlexiBeeCleneniDphBatch extends FlexiBeeSimpleIterator<FlexiBeeCleneniDph> {

    protected endpoint = 'cleneni-dph';

    protected override batchOutput = true;

    public getName(): string {
        return FLEXI_BEE_CLENENI_DPH_BATCH;
    }

}

/* eslint-disable @typescript-eslint/naming-convention */
export interface FlexiBeeCleneniDph {
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
    'typPlneniK': string;
    'typPlneniK@showAs': string;
    'typObchoduK': string;
    'kodPlneniK': string;
    'jeDph': string;
    'poradi': string;
    'kodPlneniSH': string;
    'typPlneniEetK': string;
    'stat': string;
    'stat@ref': string;
    'stat@showAs': string;
}
/* eslint-enable @typescript-eslint/naming-convention */
