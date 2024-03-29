import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import OnRepeatException from '@orchesty/nodejs-sdk/dist/lib/Exception/OnRepeatException';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import ResultCode from '@orchesty/nodejs-sdk/dist/lib/Utils/ResultCode';
import { StatusCodes } from 'http-status-codes';
import MoneyS45Base from '../MoneyS45Base';
import { IResponse } from './MoneyS4-5CreateCompany';

const MONEYS4_CREATE_ISSUED_INVOICE = 'v2.0/IssuedInvoice';

export const NAME = 'moneys4-create-issued-invoice';

export default class MoneyS45CreateIssuedInvoice extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IResponse | { body: string }>> {
        const app = this.getApplication<MoneyS45Base>();
        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const requestDto = await app.getRequestDto(
            dto,
            appInstall,
            HttpMethods.POST,
            MONEYS4_CREATE_ISSUED_INVOICE,
            JSON.stringify(dto.getJsonData()),
        );
        const response = await this.getSender().send<IResponse>(requestDto, [200, 500]);

        if (response.getResponseCode() === StatusCodes.INTERNAL_SERVER_ERROR) {
            if (response.getBody().includes('duplicit')) {
                dto.setStopProcess(ResultCode.DO_NOT_CONTINUE, response.getBody());
                return dto.setNewJsonData({ body: response.getBody() });
            }
            throw new OnRepeatException(60, 10, response.getBody());
        }

        return dto.setNewJsonData(response.getJsonBody());
    }

}

export type IInput = IInvoice[];
/* eslint-disable @typescript-eslint/naming-convention */
export interface IInvoice {
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
    adresaKoncovehoPrijemceEmail?: string;
    adresaKoncovehoPrijemceEmailSpojeni_ID?: string;
    adresaKoncovehoPrijemceKontaktniOsoba_ID?: string;
    adresaKoncovehoPrijemceKontaktniOsobaNazev?: string;
    adresaKoncovehoPrijemceStat_ID?: string;
    adresaKoncovehoPrijemceTelefon?: string;
    adresaKoncovehoPrijemceTelefonSpojeni_ID?: string;
    adresaKontaktniOsoba_ID?: string;
    adresaKontaktniOsobaJmeno?: string;
    adresaKontaktniOsobaNazev?: string;
    adresaKontaktniOsobaPrijmeni?: string;
    adresaMisto?: string;
    adresaNazev?: string;
    adresaPrijemceFakturyKontaktniOsoba_ID?: string;
    adresaPrijemceFakturyKontaktniOsobaNazev?: string;
    adresaPrijemceFakturyStat_ID?: string;
    adresaPSC?: string;
    adresaStat?: string;
    adresaStat_ID?: string;
    adresaUlice?: string;
    attachments?: boolean;
    autoRow_ID?: number;
    banka_ID?: string;
    bankovniSpojeniCisloUctu?: string;
    bankovniSpojeniFirmy_ID?: string;
    bankovniSpojeniIBAN?: string;
    bankovniSpojeniSpecifickySymbol?: string;
    bankovniSpojeniSWIFT?: string;
    casSkladovehoPohybu?: string;
    celkovaCastka?: number;
    celkovaCastkaCM?: number;
    celkovaCastkaDual?: number;
    cenaCelkem?: number;
    cinnost_ID?: string;
    ciselnaRada_ID?: string;
    cisloDokladu?: string;
    cisloRady?: number;
    cleneniDPH_ID?: string;
    datumDruheUpominky?: string;
    datumPlneni?: string;
    datumPosledniPenalizace?: string;
    datumPosledniUpominky?: string;
    datumPrikazu?: string;
    datumPrvniUpominky?: string;
    datumSkladovehoPohybu?: string;
    datumSplatnosti?: string;
    datumUcetnihoPripadu?: string;
    datumUhrady?: string;
    datumUplatneni?: string;
    datumVystaveni?: string;
    dic?: string;
    dodaciAdresaFirma_ID?: string;
    dodaciAdresaMisto?: string;
    dodaciAdresaNazev?: string;
    dodaciAdresaPSC?: string;
    dodaciAdresaStat?: string;
    dodaciAdresaUlice?: string;
    dodaciPodminky_ID?: string;
    domaciMena_ID?: string;
    dph0Celkem?: number;
    dph0CelkemCM?: number;
    dph0Dan?: number;
    dph0DanCM?: number;
    dph0Sazba?: number;
    dph0Zaklad?: number;
    dph0ZakladCM?: number;
    dph1Celkem?: number;
    dph1CelkemCM?: number;
    dph1Dan?: number;
    dph1DanCM?: number;
    dph1Sazba?: number;
    dph1Zaklad?: number;
    dph1ZakladCM?: number;
    dph2Celkem?: number;
    dph2CelkemCM?: number;
    dph2Dan?: number;
    dph2DanCM?: number;
    dph2Sazba?: number;
    dph2Zaklad?: number;
    dph2ZakladCM?: number;
    druhDokladu_ID?: string;
    druhDopravy_ID?: string;
    druhPohybu_ID?: string;
    druhSkladovehoPohybu_ID?: string;
    fakturacniAdresaFirma_ID?: string;
    fakturacniAdresaMisto?: string;
    fakturacniAdresaNazev?: string;
    fakturacniAdresaPSC?: string;
    fakturacniAdresaStat?: string;
    fakturacniAdresaUlice?: string;
    faze?: number;
    firma_ID?: string;
    generovatSkladovyDoklad?: boolean;
    ic?: string;
    icdph?: string;
    idDatum?: string;
    idDopravaTuzemsko?: number;
    idDopravaZahranici?: number;
    idKrajPuvodu_ID?: string;
    iDopravniNaklady?: number;
    idOvlivnujeIntrastat?: boolean;
    idPovahaTransakce_ID?: string;
    iRozpousteniNakladu?: number;
    jmeno?: string;
    kombinovanaNomenklatura_ID?: string;
    konecnyPrijemce_ID?: string;
    konstantniSymbol_ID?: string;
    konstantniSymbolText?: string;
    korekce0Celkem?: number;
    korekce0CelkemCM?: number;
    korekce0Dan?: number;
    korekce0DanCM?: number;
    korekce0Sazba?: number;
    korekce0Zaklad?: number;
    korekce0ZakladCM?: number;
    korekce1Celkem?: number;
    korekce1CelkemCM?: number;
    korekce1Dan?: number;
    korekce1DanCM?: number;
    korekce1Sazba?: number;
    korekce1Zaklad?: number;
    korekce1ZakladCM?: number;
    korekce2Celkem?: number;
    korekce2CelkemCM?: number;
    korekce2Dan?: number;
    korekce2DanCM?: number;
    korekce2Sazba?: number;
    korekce2Zaklad?: number;
    korekce2ZakladCM?: number;
    kUhrade?: number;
    kUhradeCM?: number;
    kurzMnozstvi?: number;
    mena_ID?: string;
    mojeFirma_ID?: string;
    mojeFirmaBanka_ID?: string;
    mojeFirmaBankovniSpojeni_ID?: string;
    mojeFirmaBankovniSpojeniCisloUctu?: string;
    mojeFirmaBankovniSpojeniIBAN?: string;
    mojeFirmaBankovniSpojeniKodBanky?: string;
    mojeFirmaBankovniSpojeniSpecifickySymbol?: string;
    mojeFirmaBankovniSpojeniSWIFT?: string;
    mojeFirmaDIC?: string;
    mojeFirmaFirma_ID?: string;
    mojeFirmaIC?: string;
    mojeFirmaICDPH?: string;
    mojeFirmaKontaktniOsoba_ID?: string;
    mojeFirmaKontaktniOsobaJmeno?: string;
    mojeFirmaKontaktniOsobaNazev?: string;
    mojeFirmaKontaktniOsobaPrijmeni?: string;
    mojeFirmaKontaktyEmail?: string;
    mojeFirmaKontaktyTelefon1?: string;
    mojeFirmaKontaktyTelefon2?: string;
    mojeFirmaKontaktyTelefon3?: string;
    mojeFirmaKontaktyWWW?: string;
    mojeFirmaMisto?: string;
    mojeFirmaNazev?: string;
    mojeFirmaPSC?: string;
    mojeFirmaStat?: string;
    mojeFirmaStat_ID?: string;
    mojeFirmaUlice?: string;
    nazev?: string;
    nedobytnaPohledavka?: boolean;
    obchodnik_ID?: string;
    odkaz?: string;
    odkazNaDoklad?: string;
    odpoctyZaloh2010?: boolean;
    osoba_ID?: string;
    parovaciSymbol?: string;
    pocetPolozek?: number;
    povahaTransakce_ID?: string;
    poznamka?: string;
    predkontace_ID?: string;
    predkontaceZaokrouhleni_ID?: string;
    preneseniDane_ID?: string;
    preneseniDaneKombinovanaNomenklaturaKod?: string;
    preneseniDanePomerMnozstviMJ?: number;
    prevzitPredCenamiZFaktury?: boolean;
    prevzitZaCenamiZFaktury?: boolean;
    prijemceFaktury_ID?: string;
    prikazy?: number;
    prikazyCM?: number;
    prikazyZbyva?: number;
    prikazyZbyvaCM?: number;
    primarniUcet_ID?: string;
    priznakVyrizeno?: boolean;
    procentniZisk?: number;
    protiucet?: string;
    puvodniDoklad?: string;
    registraceDPH_ID?: string;
    sazbaDPH0_ID?: string;
    sazbaDPH1_ID?: string;
    sazbaDPH2_ID?: string;
    schvaleno?: boolean;
    sleva?: number;
    specifickySymbol?: string;
    stat_ID?: string;
    statPuvodu_ID?: string;
    statUrceniOdeslani_ID?: string;
    stav?: number;
    storno?: number;
    stredisko_ID?: string;
    sumaCelkem?: number;
    sumaCelkemCM?: number;
    sumaDan?: number;
    sumaDanCM?: number;
    sumaZaklad?: number;
    sumaZakladCM?: number;
    systemovy?: boolean;
    textFakturyPredCenami?: string;
    textFakturyZaCenami?: string;
    textyDodaciListPredCenami?: string;
    textyDodaciListZaCenami?: string;
    typDokladu?: number;
    ucetDal_ID?: string;
    ucetMD_ID?: string;
    ucetniKurzKurz?: number;
    uhrady?: number;
    uhradyCM?: number;
    uhradyZbyva?: number;
    uhradyZbyvaCM?: number;
    variabilniSymbol?: string;
    vygenerovanPenalizaci?: boolean;
    vyrizeno?: number;
    vystavil?: string;
    zakazka_ID?: string;
    zalohy?: number;
    zalohyCM?: number;
    zaokrouhleniCelkovaCastka_ID?: string;
    zaokrouhleniDPH_ID?: string;
    zaokrouhleniDruhSazbyDPH?: number;
    zaokrouhleniPrevazujiciSazbaDPH?: boolean;
    zaokrouhleniSazbaDPH_ID?: string;
    zapornyPohyb?: boolean;
    zauctovano?: boolean;
    zaverkovy?: boolean;
    ziskSkutecnaPorizovaciCena?: number;
    ziskZaDoklad?: number;
    zjednodusenyDanovyDoklad?: boolean;
    zpusobDopravy_ID?: string;
    zpusobPlatby_ID?: string;
    zpusobUplatneniOdpoctuDPH?: number;
    zvlastniPohyb_ID?: string;
    polozky?: IPolozka[];
}

export interface IPolozka {
    celkovaCena?: number;
    celkovaCenaCM?: number;
    cinnost_ID?: string;
    cisloPolozky?: number;
    cleneniDPH_ID?: string;
    dphCelkem?: number;
    dphCelkemCM?: number;
    dphDan?: number;
    dphDanCM?: number;
    dphSazba?: number;
    dphZaklad?: number;
    dphZakladCM?: number;
    druhPolozky_ID?: string;
    druhSazbyDPH?: number;
    formatPolozky?: number;
    ico?: string;
    jednCena?: number;
    jednCenaCM?: number;
    jednotka?: string;
    katalog?: string;
    mnozstvi?: number;
    nazev?: string;
    parentObject_ID?: string;
    parovaciSymbol?: string;
    poradi?: number;
    poznamka?: string;
    predkontace_ID?: string;
    sazbaDPH_ID?: string;
    sleva?: number;
    stredisko_ID?: string;
    typCeny?: number;
    typPolozky?: number;
    ucetDal_ID?: string;
    ucetMD_ID?: string;
    vyrizeno?: number;
    vzor_ID?: string;
    zakazka_ID?: string;
    zarukaTypZaruky?: number;
    zarukaZarucniDoba?: number;
    zbyva?: number;
    celkovaCenaBezSlevy?: number;
    celkovaCenaBezSlevyCM?: number;
    dokladObjectName?: string;
    obsahPolozky_ID?: string;
    typObsahu?: number;
    ipHmotnost?: number;
    ipMnozstvi?: number;
    ipOvlivnujeIntrastat?: boolean;
    povahaTransakce_ID?: string;
    statUrceniOdeslani_ID?: string;
    zvlastniPohyb_ID?: string;
    nepodlehatSleveDokladu?: boolean;
    priznakVyrizeno?: boolean;
    predkontaceSkladovePolozky_ID?: string;
    druhPohybu_ID?: string;
    druhSkladovehoPohybu_ID?: string;
    dphEditovanoRucne?: boolean;
    ucetDalSkladovePolozky_ID?: string;
    ucetMDSkladovePolozky_ID?: string;
    vratka?: boolean;
    jednotkovaCenaBezSlevy?: number;
    jednotkovaCenaBezSlevyCM?: number;
    zdrojovaPolozkaKopirovani_ID?: string;
    dodaciPodminky_ID?: string;
    druhDopravy_ID?: string;
    kombinovanaNomenklatura_ID?: string;
    statistickyZnak_ID?: string;
    statPuvodu_ID?: string;
    krajPuvodu_ID?: string;
    iDopravniNaklady?: number;
    istatNeslucovat?: boolean;
    attachments?: boolean;
    autoRow_ID?: number;
    ipCisloZasilky?: string;
    puvodniDoklad?: string;
    preneseniDane_ID?: string;
    preneseniDaneKombinovanaNomenklatura_ID?: string;
    preneseniDaneMnozstvi?: number;
    preneseniDaneKombinovanaNomenklaturaKod?: string;
    preneseniDanePomerMnozstviMJ?: number;
    vychoziJednotkovaCena?: number;
    vychoziCelkovaCena?: number;
    zmenaCeny?: number;
    dphSazbaZvlastniRezim?: number;
    druhSazbyDPHZvlastniRezim?: number;
    sazbaDPHZvlastniRezim_ID?: string;
    zvlastniRezimDPH?: number;
    obchodnik_ID?: string;
    jednCenaBezDPH?: number;
    jednCenaBezDPHCM?: number;
    generateSubItems?: boolean;
    obsahPolozky?: {
        artikl_ID?: string;
        sklad_ID?: string;
        jednotka_ID?: string;
        cenik_ID?: string;
        cenovaHladina_ID?: string;
        mnozstvi?: number;
        pocetJednotek?: number;
        pocetZakladnichJednotek?: number;
        vyberDodavek?: boolean;
        zasoba_ID?: string;
        vazbaPocetPodrizene?: number;
        vazbaPocetNadrizene?: number;
        vazbaZobrazovatNaVystupu?: boolean;
        vazbaTypVazby?: string;
        pocitatCenuZKomponent?: boolean;
        skladovaPozice_ID?: string;
        druhPolozky_ID?: string;
        jednotkaZdroj_ID?: string;
        vazbaPricitatCenu?: boolean;
        typArtiklu?: string;
        druhPrislusenstvi_ID?: string;
        druhPolozky2_ID?: string;
        podrizenePrebiratSklad?: boolean;
        minuleMnozstviRezervace?: number;
        objednano?: number;
        rezervovano?: number;
        ovlivnujeObaloveKonto?: boolean;
        beznaCena?: number;
        typBezneCeny?: string;
        odchyleniCeny?: number;
        vlastniDruhSazbyDphBezneCeny?: boolean;
        druhSazbyDphBezneCeny?: string;
        cenikBezneCeny_ID?: string;
        artiklJednotkaBeznaCena_ID?: string;
        attachments?: boolean;
        autoRow_ID?: number;
        partnerskyKod?: string;
        partnerskyNazev?: string;
        vazbaIgnorovatPomer?: boolean;
        vyberDodavekPrebranim?: boolean;
    };
}
/* eslint-enable @typescript-eslint/naming-convention */
