import { FlexiBeeSimpleIterator } from './FlexiBeeSimpleIterator';

export const FLEXI_BEE_UCET_BATCH = 'flexi-bee-ucet-batch';

export default class FlexiBeeUcetBatch extends FlexiBeeSimpleIterator<FlexiBeeUcet> {

    protected endpoint = 'ucet';

    protected override batchOutput = true;

    public getName(): string {
        return FLEXI_BEE_UCET_BATCH;
    }

}

/* eslint-disable @typescript-eslint/naming-convention */
export interface FlexiBeeUcet {
    'id': string;
    'lastUpdate': string;
    'kod': string;
    'nazev': string;
    'nazevA': string;
    'nazevB': string;
    'nazevC': string;
    'poznam': string;
    'popis': string;
    'ucetObdobiOd': string;
    'ucetObdobiOd@ref': string;
    'ucetObdobiOd@showAs': string;
    'ucetObdobiDo': string;
    'danovy': string;
    'saldo': string;
    'typUctuK': string;
    'typUctuK@showAs': string;
    'druhUctuK': string;
    'mena': string;
    'mena@ref': string;
    'mena@showAs': string;
    'stdUcet': string;
    'typOrganizace': string;
    'typOrganizace@ref': string;
    'typOrganizace@showAs': string;
}
/* eslint-enable @typescript-eslint/naming-convention */
