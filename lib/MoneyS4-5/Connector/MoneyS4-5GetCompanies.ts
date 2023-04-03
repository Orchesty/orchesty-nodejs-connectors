import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import MoneyS45BaseApplication from '../MoneyS4-5BaseApplication';

const MONEYS4_GET_COMPANIES = 'v2.0/Company';

export const NAME = 'moneys4-get-companies';

export default class MoneyS45GetCompanies extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IResponse>> {
        const app = this.getApplication<MoneyS45BaseApplication>();
        const { filters } = dto.getJsonData();

        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const requestDto = await app.getRequestDto(dto, appInstall, HttpMethods.GET, `${MONEYS4_GET_COMPANIES}${filters ? `/Filters=${JSON.stringify(filters)}` : ''}`);
        const response = await this.getSender().send<IResponse>(requestDto, 200);
        return dto.setNewJsonData(response.getJsonBody());
    }

}

// TODO rich doplnit az se otestuje
/* eslint-disable @typescript-eslint/naming-convention */
export interface IInput {
    filters?: {
        PropertyName: string;
        Operation: number;
        ExpectedValue: number | string;
    }[];
}

/* eslint-enable @typescript-eslint/naming-convention */

/* eslint-disable @typescript-eslint/naming-convention */
export type IResponse = IResponseJson[];
export interface IResponseJson {
    attachmentsList?: {
        name?: string;
        id?: string;
    }[];
    isNew?: boolean;
    hidden?: boolean;
    id?: string;
    parent_ID?: string;
    root_ID?: string;
    group_ID?: string;
    deleted?: boolean;
    locked?: boolean;
    create_ID?: string;
    create_Date?: string;
    modify_ID?: string;
    modify_Date?: string;
    ciselnaRada_ID?: string;
    cisloS3?: number;
    cisloZRady?: number;
    datumPosty?: string;
    dic?: string;
    email?: string;
    fyzickaOsoba?: boolean;
    hlavniOsoba_ID?: string;
    hlavniUcet_ID?: string;
    hodnotaKreditu?: number;
    hodnotaSlevy?: number;
    ico?: string;
    kod?: string;
    kodDanovehoUradu?: string;
    nadrazenaFirma_ID?: string;
    nazev?: string;
    posilatPostu?: boolean;
    posledniCisloOsoby?: number;
    pouzivatKredit?: boolean;
    poznamka?: string;
    prevzitBankovniSpojeni?: boolean;
    prevzitObchodniPodminky?: boolean;
    prevzitObchodniUdaje?: boolean;
    specifickySymbol?: string;
    splatnostPohledavek?: number;
    splatnostZavazku?: number;
    spojeni?: string;
    tel1Cislo?: string;
    tel1Klapka?: string;
    tel1MistniCislo?: string;
    tel1Predvolba?: string;
    tel1Typ?: number;
    tel2Cislo?: string;
    tel2Klapka?: string;
    tel2MistniCislo?: string;
    tel2Predvolba?: string;
    tel2Typ?: number;
    tel3Cislo?: string;
    tel3Klapka?: string;
    tel3MistniCislo?: string;
    tel3Predvolba?: string;
    tel3Typ?: number;
    tel4Cislo?: string;
    tel4Klapka?: string;
    tel4MistniCislo?: string;
    tel4Predvolba?: string;
    tel4Typ?: number;
    variabilniSymbol?: string;
    vlastniSleva?: boolean;
    vlastniSplatnostPohledavek?: boolean;
    vlastniSplatnostZavazku?: boolean;
    www?: string;
    zprava?: string;
    faktMisto?: string;
    faktNazev?: string;
    faktPsc?: string;
    faktStat?: string;
    faktUlice?: string;
    obchMisto?: string;
    obchNazev?: string;
    obchPsc?: string;
    obchStat?: string;
    obchUlice?: string;
    provMisto?: string;
    provNazev?: string;
    provPsc?: string;
    provStat?: string;
    provUlice?: string;
    faktStat_ID?: string;
    obchStat_ID?: string;
    provStat_ID?: string;
    faktPsc_ID?: string;
    obchPsc_ID?: string;
    odlisnaAdresaProvozovny?: boolean;
    odlisnaFakturacniAdresa?: boolean;
    provPsc_ID?: string;
    uvadetNaDokladech?: boolean;
    platceDPH?: boolean;
    tel1PredvolbaStat?: string;
    tel2PredvolbaStat?: string;
    tel3PredvolbaStat?: string;
    tel4PredvolbaStat?: string;
    icdph?: string;
    tel1StatID?: string;
    tel2StatID?: string;
    tel3StatID?: string;
    tel4StatID?: string;
    zpusobVyberuCeny?: number;
    primarniUcetPohledavky_ID?: string;
    primarniUcetZavazky_ID?: string;
    primarniUcetPrijataZaloha_ID?: string;
    primarniUcetPoskytnutaZaloha_ID?: string;
    mojeFirmabankovniSpojeni_ID?: string;
    zpusobDopravy_ID?: string;
    zpusobPlatby_ID?: string;
    ekoKomKlient?: boolean;
    datumKontrolyDleIC?: string;
    datumKontolyDIC?: string;
    datovaSchrankaID?: string;
    datovaSchrankaNazev?: string;
    datumUkonceniCinnosti?: string;
    cinnostUkoncena?: boolean;
    vcetnePodrizenych?: boolean;
    faxCislo?: string;
    faxKlapka?: string;
    faxMistniCislo?: string;
    faxPredvolba?: string;
    faxPredvolbaStat?: string;
    faxStatID?: string;
    attachments?: boolean;
    logo_ID?: string;
    gpsLat?: number;
    gpsLong?: number;
    kraj_ID?: string;
    region_ID?: string;
    datovaSchrankaSpojeni_ID?: string;
    emailSpojeni_ID?: string;
    faxSpojeni_ID?: string;
    telefonSpojeni1_ID?: string;
    telefonSpojeni2_ID?: string;
    telefonSpojeni3_ID?: string;
    telefonSpojeni4_ID?: string;
    wwwSpojeni_ID?: string;
    prenestNazev?: boolean;
    obchodniPodminkyDistributorLihu?: boolean;
    obchodniPodminkyDistributorLihuRegistracniCislo?: string;
    datumPosledniKontrolyPlatceDPH?: string;
    stavPlatceDPHVracenyWS_Stav?: number;
    posledniStavZHistorieRegistru_Id?: string;
    uctyNactenyZRegistruDPH?: boolean;
    stavPlatceDPHComputed?: number;
}

/* eslint-enable @typescript-eslint/naming-convention */
