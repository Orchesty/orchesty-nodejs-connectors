import { FlexiBeeSimpleIterator } from './FlexiBeeSimpleIterator';

export const FLEXI_BEE_ZAKAZKA_BATCH = 'flexi-bee-zakazka-batch';

export default class FlexiBeeZakazkaBatch extends FlexiBeeSimpleIterator<FlexiBeeZakazka> {

    protected endpoint = 'zakazka';

    protected override batchOutput = true;

    public getName(): string {
        return FLEXI_BEE_ZAKAZKA_BATCH;
    }

}

export interface FlexiBeeZakazka {
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
    datZahaj: string;
    datKonec: string;
    procVyh: string;
    termin: string;
    splatDny: string;
    rozsah: string;
    nakladyPredpoklad: string;
    ziskPredpoklad: string;
    pocetPriloh: string;
    varSym: string;
    stitky: string;
    cisObj: string;
    cisSml: string;
    datZahajPlan: string;
    datPredaniPlan: string;
    datPredani: string;
    zaruka: string;
    datZaruky: string;
    createdDate: string;
    firma: string;
    mistUrc: string;
    stredisko: string;
    stavZakazky: string;
    typZakazky: string;
    zodpPrac: string;
    vyhZakazky: string;
    kontaktOsoba: string;
    mena: string;
    updatedBy: string;
    createdBy: string;
}
