import { FlexiBeeSimpleIterator } from './FlexiBeeSimpleIterator';

export const FLEXI_BEE_TYP_FAKTURY_PRIJATE_BATCH = 'flexi-bee-typ-faktury-prijate-batch';

export default class FlexiBeeTypFakturyPrijateBatch extends FlexiBeeSimpleIterator<FlexiBeeTypFakturyPrijate> {

    protected endpoint = 'typ-faktury-prijate';

    protected override batchOutput = true;

    public getName(): string {
        return FLEXI_BEE_TYP_FAKTURY_PRIJATE_BATCH;
    }

}

/* eslint-disable @typescript-eslint/naming-convention */
export interface FlexiBeeTypFakturyPrijate {
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
    'ucetObdobiDo': string;
    'platiOd': string;
    'platiDo': string;
    'modul': string;
    'ucetni': string;
    'typDoklK': string;
    'typDoklK@showAs': string;
    'splatDny': string;
    'formaUhradyCis': string;
    'doprava': string;
    'popisDoklad': string;
    'radaVydej': string;
    'radaVydej@ref': string;
    'radaVydej@showAs': string;
    'stredisko': string;
    'stredisko@ref': string;
    'stredisko@showAs': string;
    'cinnost': string;
    'bspBan': string;
    'bspBan@ref': string;
    'bspBan@showAs': string;
    'typProtiDokladuPrijem': string;
    'typProtiDokladuPrijem@ref': string;
    'typProtiDokladuPrijem@showAs': string;
    'typProtiDokladuVydej': string;
    'primUcet': string;
    'primUcet@ref': string;
    'primUcet@showAs': string;
    'typUcOpVydej': string;
    'typUcOpVydej@ref': string;
    'typUcOpVydej@showAs': string;
    'mena': string;
    'mena@ref': string;
    'mena@showAs': string;
    'statDph': string;
    'statDph@ref': string;
    'statDph@showAs': string;
    'tiskAutomat': string;
    'workFlow': string;
    'statOdesl': string;
    'statUrc': string;
    'statPuvod': string;
    'dodPodm': string;
    'zvlPoh': string;
    'obchTrans': string;
    'druhDopr': string;
    'krajUrc': string;
    'generovatSkl': string;
    'razeniProTiskK': string;
    'primarni': string;
    'uhrAuto': string;
    'zapAuto': string;
    'formaDopravy': string;
    'emailTxt': string;
    'ekokomK': string;
    'vsCisObj': string;
    'eanAkceNahrat': string;
    'eanAkcePopis': string;
    'clenKonVykDph': string;
    'sablonaMail': string;
    'generovatRecyklacniPoplatky': string;
    'autoTisky': unknown[];
}
/* eslint-enable @typescript-eslint/naming-convention */
