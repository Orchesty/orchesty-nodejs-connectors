import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import OnRepeatException from '@orchesty/nodejs-sdk/dist/lib/Exception/OnRepeatException';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import ResultCode from '@orchesty/nodejs-sdk/dist/lib/Utils/ResultCode';
import { StatusCodes } from 'http-status-codes';
import MoneyS45Base, { getGraphqlErrors, IGraphqlResponse, MONEYS_GRAPHQL_URL } from '../MoneyS45Base';
import { IResponse } from './MoneyS4-5CreateCompany';

export const NAME = 'moneys4-create-issued-invoice';

export default class MoneyS45CreateIssuedInvoice extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IResponse | { body: string }>> {
        const app = this.getApplication<MoneyS45Base>();
        const data = dto.getJsonData();
        const invoices = Array.isArray(data) ? data : [data];
        if (!invoices.length) {
            return dto.setNewJsonData<IResponse>([]);
        }

        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const requestDto = await app.getRequestDto(
            dto,
            appInstall,
            HttpMethods.POST,
            MONEYS_GRAPHQL_URL,
            JSON.stringify({
                query: `mutation (${invoices.map((_, i) => `$i${i}: IssuedInvoiceInput!`).join(', ')}) { ${invoices.map((_, i) => `i${i}: CreateIssuedInvoice(IssuedInvoice: $i${i}) { ID }`).join(' ')} }`,
                variables: Object.fromEntries(invoices.map((invoice, i) => [`i${i}`, invoice])),
            }),
        );
        /* eslint-disable @typescript-eslint/naming-convention */
        const response = await this.getSender().send<IGraphqlResponse<Record<string, { ID?: string } | null>>>(
            requestDto,
            [200, 500],
        );
        /* eslint-enable @typescript-eslint/naming-convention */

        if (response.getResponseCode() === StatusCodes.INTERNAL_SERVER_ERROR) {
            if (response.getBody().includes('duplicit')) {
                dto.setStopProcess(ResultCode.DO_NOT_CONTINUE, response.getBody());
                return dto.setNewJsonData({ body: response.getBody() });
            }
            throw new OnRepeatException(60, 10, response.getBody());
        }

        const body = response.getJsonBody();
        const errors = getGraphqlErrors(body);
        if (errors.length) {
            const message = errors.join('\n');
            if (message.includes('duplicit')) {
                dto.setStopProcess(ResultCode.DO_NOT_CONTINUE, message);
                return dto.setNewJsonData({ body: message });
            }
            throw new OnRepeatException(60, 10, message);
        }

        return dto.setNewJsonData(invoices.map((_, i) => body.Data?.[`i${i}`]?.ID ?? ''));
    }

}

export type IInput = IInvoice | IInvoice[];
/* eslint-disable @typescript-eslint/naming-convention */
export interface IInvoice {
    Hidden?: boolean;
    ID?: string;
    Parent_ID?: string;
    Root_ID?: string;
    Group_ID?: string;
    Deleted?: boolean;
    Locked?: boolean;
    Create_ID?: string;
    Create_Date?: string;
    Modify_ID?: string;
    Modify_Date?: string;
    AdresaKoncovehoPrijemceEmail?: string;
    AdresaKoncovehoPrijemceEmailSpojeni_ID?: string;
    AdresaKoncovehoPrijemceKontaktniOsoba_ID?: string;
    AdresaKoncovehoPrijemceKontaktniOsobaNazev?: string;
    AdresaKoncovehoPrijemceStat_ID?: string;
    AdresaKoncovehoPrijemceTelefon?: string;
    AdresaKoncovehoPrijemceTelefonSpojeni_ID?: string;
    AdresaKontaktniOsoba_ID?: string;
    AdresaKontaktniOsobaJmeno?: string;
    AdresaKontaktniOsobaNazev?: string;
    AdresaKontaktniOsobaPrijmeni?: string;
    AdresaMisto?: string;
    AdresaNazev?: string;
    AdresaPrijemceFakturyKontaktniOsoba_ID?: string;
    AdresaPrijemceFakturyKontaktniOsobaNazev?: string;
    AdresaPrijemceFakturyStat_ID?: string;
    AdresaPSC?: string;
    AdresaStat_ID?: string;
    AdresaUlice?: string;
    AutoRow_ID?: number;
    Banka_ID?: string;
    BankovniSpojeniCisloUctu?: string;
    BankovniSpojeniFirmy_ID?: string;
    BankovniSpojeniIBAN?: string;
    BankovniSpojeniSpecifickySymbol?: string;
    BankovniSpojeniSWIFT?: string;
    CasSkladovehoPohybu?: string;
    CelkovaCastka?: number;
    CelkovaCastkaCM?: number;
    CelkovaCastkaDual?: number;
    CenaCelkem?: number;
    Cinnost_ID?: string;
    CiselnaRada_ID?: string;
    CisloDokladu?: string;
    CisloRady?: number;
    CleneniDPH_ID?: string;
    DatumDruheUpominky?: string;
    DatumPlneni?: string;
    DatumPosledniPenalizace?: string;
    DatumPosledniUpominky?: string;
    DatumPrikazu?: string;
    DatumPrvniUpominky?: string;
    DatumSkladovehoPohybu?: string;
    DatumSplatnosti?: string;
    DatumUcetnihoPripadu?: string;
    DatumUhrady?: string;
    DatumUplatneni?: string;
    DatumVystaveni?: string;
    DIC?: string;
    DodaciAdresaFirma_ID?: string;
    DodaciAdresaMisto?: string;
    DodaciAdresaNazev?: string;
    DodaciAdresaPSC?: string;
    DodaciAdresaStat?: string;
    DodaciAdresaUlice?: string;
    DodaciPodminky_ID?: string;
    DomaciMena_ID?: string;
    Dph0Celkem?: number;
    Dph0CelkemCM?: number;
    Dph0Dan?: number;
    Dph0DanCM?: number;
    Dph0Sazba?: number;
    Dph0Zaklad?: number;
    Dph0ZakladCM?: number;
    Dph1Celkem?: number;
    Dph1CelkemCM?: number;
    Dph1Dan?: number;
    Dph1DanCM?: number;
    Dph1Sazba?: number;
    Dph1Zaklad?: number;
    Dph1ZakladCM?: number;
    Dph2Celkem?: number;
    Dph2CelkemCM?: number;
    Dph2Dan?: number;
    Dph2DanCM?: number;
    Dph2Sazba?: number;
    Dph2Zaklad?: number;
    Dph2ZakladCM?: number;
    DruhDokladu_ID?: string;
    DruhDopravy_ID?: string;
    DruhPohybu_ID?: string;
    DruhSkladovehoPohybu_ID?: string;
    FakturacniAdresaFirma_ID?: string;
    FakturacniAdresaMisto?: string;
    FakturacniAdresaNazev?: string;
    FakturacniAdresaPSC?: string;
    FakturacniAdresaStat?: string;
    FakturacniAdresaUlice?: string;
    Faze?: number;
    Firma_ID?: string;
    GenerovatSkladovyDoklad?: boolean;
    IC?: string;
    ICDPH?: string;
    IDDatum?: string;
    IDDopravaTuzemsko?: number;
    IDDopravaZahranici?: number;
    IDKrajPuvodu_ID?: string;
    IDopravniNaklady?: number;
    IDOvlivnujeIntrastat?: boolean;
    IDPovahaTransakce_ID?: string;
    IRozpousteniNakladu?: number;
    Jmeno?: string;
    KombinovanaNomenklatura_ID?: string;
    KonecnyPrijemce_ID?: string;
    KonstantniSymbol_ID?: string;
    KonstantniSymbolText?: string;
    Korekce0Celkem?: number;
    Korekce0CelkemCM?: number;
    Korekce0Dan?: number;
    Korekce0DanCM?: number;
    Korekce0Sazba?: number;
    Korekce0Zaklad?: number;
    Korekce0ZakladCM?: number;
    Korekce1Celkem?: number;
    Korekce1CelkemCM?: number;
    Korekce1Dan?: number;
    Korekce1DanCM?: number;
    Korekce1Sazba?: number;
    Korekce1Zaklad?: number;
    Korekce1ZakladCM?: number;
    Korekce2Celkem?: number;
    Korekce2CelkemCM?: number;
    Korekce2Dan?: number;
    Korekce2DanCM?: number;
    Korekce2Sazba?: number;
    Korekce2Zaklad?: number;
    Korekce2ZakladCM?: number;
    KUhrade?: number;
    KUhradeCM?: number;
    KurzMnozstvi?: number;
    Mena_ID?: string;
    MojeFirma_ID?: string;
    MojeFirmaBanka_ID?: string;
    MojeFirmaBankovniSpojeni_ID?: string;
    MojeFirmaBankovniSpojeniCisloUctu?: string;
    MojeFirmaBankovniSpojeniIBAN?: string;
    MojeFirmaBankovniSpojeniKodBanky?: string;
    MojeFirmaBankovniSpojeniSpecifickySymbol?: string;
    MojeFirmaBankovniSpojeniSWIFT?: string;
    MojeFirmaDIC?: string;
    MojeFirmaFirma_ID?: string;
    MojeFirmaIC?: string;
    MojeFirmaICDPH?: string;
    MojeFirmaKontaktniOsoba_ID?: string;
    MojeFirmaKontaktniOsobaJmeno?: string;
    MojeFirmaKontaktniOsobaNazev?: string;
    MojeFirmaKontaktniOsobaPrijmeni?: string;
    MojeFirmaKontaktyEmail?: string;
    MojeFirmaKontaktyTelefon1?: string;
    MojeFirmaKontaktyTelefon2?: string;
    MojeFirmaKontaktyTelefon3?: string;
    MojeFirmaKontaktyWWW?: string;
    MojeFirmaMisto?: string;
    MojeFirmaNazev?: string;
    MojeFirmaPSC?: string;
    MojeFirmaStat_ID?: string;
    MojeFirmaUlice?: string;
    Nazev?: string;
    NedobytnaPohledavka?: boolean;
    Obchodnik_ID?: string;
    Odkaz?: string;
    OdkazNaDoklad?: string;
    OdpoctyZaloh2010?: boolean;
    Osoba_ID?: string;
    ParovaciSymbol?: string;
    PocetPolozek?: number;
    PovahaTransakce_ID?: string;
    Poznamka?: string;
    Predkontace_ID?: string;
    PredkontaceZaokrouhleni_ID?: string;
    PreneseniDane_ID?: string;
    PreneseniDaneKombinovanaNomenklaturaKod?: string;
    PreneseniDanePomerMnozstviMJ?: number;
    PrevzitPredCenamiZFaktury?: boolean;
    PrevzitZaCenamiZFaktury?: boolean;
    PrijemceFaktury_ID?: string;
    Prikazy?: number;
    PrikazyCM?: number;
    PrikazyZbyva?: number;
    PrikazyZbyvaCM?: number;
    PrimarniUcet_ID?: string;
    PriznakVyrizeno?: boolean;
    ProcentniZisk?: number;
    Protiucet?: string;
    PuvodniDoklad?: string;
    RegistraceDPH_ID?: string;
    SazbaDPH0_ID?: string;
    SazbaDPH1_ID?: string;
    SazbaDPH2_ID?: string;
    Schvaleno?: boolean;
    Sleva?: number;
    SpecifickySymbol?: string;
    Stat_ID?: string;
    StatPuvodu_ID?: string;
    StatUrceniOdeslani_ID?: string;
    Stav?: number;
    Storno?: number;
    Stredisko_ID?: string;
    SumaCelkem?: number;
    SumaCelkemCM?: number;
    SumaDan?: number;
    SumaDanCM?: number;
    SumaZaklad?: number;
    SumaZakladCM?: number;
    Systemovy?: boolean;
    TextFakturyPredCenami?: string;
    TextFakturyZaCenami?: string;
    TextyDodaciListPredCenami?: string;
    TextyDodaciListZaCenami?: string;
    TypDokladu?: number;
    UcetDal_ID?: string;
    UcetMD_ID?: string;
    UcetniKurzKurz?: number;
    Uhrady?: number;
    UhradyCM?: number;
    UhradyZbyva?: number;
    UhradyZbyvaCM?: number;
    VariabilniSymbol?: string;
    VygenerovanPenalizaci?: boolean;
    Vyrizeno?: number;
    Vystavil?: string;
    Zakazka_ID?: string;
    Zalohy?: number;
    ZalohyCM?: number;
    ZaokrouhleniCelkovaCastka_ID?: string;
    ZaokrouhleniDPH_ID?: string;
    ZaokrouhleniDruhSazbyDPH?: number;
    ZaokrouhleniPrevazujiciSazbaDPH?: boolean;
    ZaokrouhleniSazbaDPH_ID?: string;
    ZapornyPohyb?: boolean;
    Zauctovano?: boolean;
    Zaverkovy?: boolean;
    ZiskSkutecnaPorizovaciCena?: number;
    ZiskZaDoklad?: number;
    ZjednodusenyDanovyDoklad?: boolean;
    ZpusobDopravy_ID?: string;
    ZpusobPlatby_ID?: string;
    ZpusobUplatneniOdpoctuDPH?: number;
    ZvlastniPohyb_ID?: string;
    Polozky?: IPolozka[];
}

export interface IPolozka {
    CelkovaCena?: number;
    CelkovaCenaCM?: number;
    Cinnost_ID?: string;
    CisloPolozky?: number;
    CleneniDPH_ID?: string;
    DphCelkem?: number;
    DphCelkemCM?: number;
    DphDan?: number;
    DphDanCM?: number;
    DphSazba?: number;
    DphZaklad?: number;
    DphZakladCM?: number;
    DruhPolozky_ID?: string;
    DruhSazbyDPH?: number;
    FormatPolozky?: number;
    ICO?: string;
    JednCena?: number;
    JednCenaCM?: number;
    Jednotka?: string;
    Katalog?: string;
    Mnozstvi?: number;
    Nazev?: string;
    ParentObject_ID?: string;
    ParovaciSymbol?: string;
    Poradi?: number;
    Poznamka?: string;
    Predkontace_ID?: string;
    SazbaDPH_ID?: string;
    Sleva?: number;
    Stredisko_ID?: string;
    TypCeny?: number;
    TypPolozky?: number;
    UcetDal_ID?: string;
    UcetMD_ID?: string;
    Vyrizeno?: number;
    Vzor_ID?: string;
    Zakazka_ID?: string;
    ZarukaTypZaruky?: number;
    ZarukaZarucniDoba?: number;
    Zbyva?: number;
    CelkovaCenaBezSlevy?: number;
    CelkovaCenaBezSlevyCM?: number;
    DokladObjectName?: string;
    ObsahPolozky_ID?: string;
    TypObsahu?: number;
    IPHmotnost?: number;
    IPMnozstvi?: number;
    IPOvlivnujeIntrastat?: boolean;
    PovahaTransakce_ID?: string;
    StatUrceniOdeslani_ID?: string;
    ZvlastniPohyb_ID?: string;
    NepodlehatSleveDokladu?: boolean;
    PriznakVyrizeno?: boolean;
    PredkontaceSkladovePolozky_ID?: string;
    DruhPohybu_ID?: string;
    DruhSkladovehoPohybu_ID?: string;
    DPHEditovanoRucne?: boolean;
    UcetDalSkladovePolozky_ID?: string;
    UcetMDSkladovePolozky_ID?: string;
    Vratka?: boolean;
    JednotkovaCenaBezSlevy?: number;
    JednotkovaCenaBezSlevyCM?: number;
    ZdrojovaPolozkaKopirovani_ID?: string;
    DodaciPodminky_ID?: string;
    DruhDopravy_ID?: string;
    KombinovanaNomenklatura_ID?: string;
    StatistickyZnak_ID?: string;
    StatPuvodu_ID?: string;
    KrajPuvodu_ID?: string;
    IDopravniNaklady?: number;
    IstatNeslucovat?: boolean;
    AutoRow_ID?: number;
    IPCisloZasilky?: string;
    PuvodniDoklad?: string;
    PreneseniDane_ID?: string;
    PreneseniDaneKombinovanaNomenklatura_ID?: string;
    PreneseniDaneMnozstvi?: number;
    PreneseniDaneKombinovanaNomenklaturaKod?: string;
    PreneseniDanePomerMnozstviMJ?: number;
    VychoziJednotkovaCena?: number;
    VychoziCelkovaCena?: number;
    ZmenaCeny?: number;
    DphSazbaZvlastniRezim?: number;
    DruhSazbyDPHZvlastniRezim?: number;
    SazbaDPHZvlastniRezim_ID?: string;
    ZvlastniRezimDPH?: number;
    Obchodnik_ID?: string;
    JednCenaBezDPH?: number;
    JednCenaBezDPHCM?: number;
    GenerateSubItems?: boolean;
    ObsahPolozky?: {
        Artikl_ID?: string;
        Sklad_ID?: string;
        Jednotka_ID?: string;
        Cenik_ID?: string;
        CenovaHladina_ID?: string;
        Mnozstvi?: number;
        PocetJednotek?: number;
        PocetZakladnichJednotek?: number;
        VyberDodavek?: boolean;
        Zasoba_ID?: string;
        VazbaPocetPodrizene?: number;
        VazbaPocetNadrizene?: number;
        VazbaZobrazovatNaVystupu?: boolean;
        VazbaTypVazby?: string;
        PocitatCenuZKomponent?: boolean;
        SkladovaPozice_ID?: string;
        DruhPolozky_ID?: string;
        JednotkaZdroj_ID?: string;
        VazbaPricitatCenu?: boolean;
        TypArtiklu?: string;
        DruhPrislusenstvi_ID?: string;
        DruhPolozky2_ID?: string;
        PodrizenePrebiratSklad?: boolean;
        MinuleMnozstviRezervace?: number;
        Objednano?: number;
        Rezervovano?: number;
        OvlivnujeObaloveKonto?: boolean;
        BeznaCena?: number;
        TypBezneCeny?: string;
        OdchyleniCeny?: number;
        CenikBezneCeny_ID?: string;
        ArtiklJednotkaBeznaCena_ID?: string;
        AutoRow_ID?: number;
        PartnerskyKod?: string;
        PartnerskyNazev?: string;
        VazbaIgnorovatPomer?: boolean;
        VyberDodavekPrebranim?: boolean;
    };
}
/* eslint-enable @typescript-eslint/naming-convention */
