import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import OnRepeatException from '@orchesty/nodejs-sdk/dist/lib/Exception/OnRepeatException';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import MoneyS45Base, { getGraphqlErrors, IGraphqlResponse, MONEYS_GRAPHQL_URL } from '../MoneyS45Base';

const COMPANY_FIELDS = 'CiselnaRada_ID CisloS3 CisloZRady DatumPosty DIC Email FyzickaOsoba HlavniUcet_ID HodnotaKreditu HodnotaSlevy ICO Kod KodDanovehoUradu Nazev PosilatPostu PosledniCisloOsoby PouzivatKredit Poznamka PrevzitBankovniSpojeni PrevzitObchodniPodminky PrevzitObchodniUdaje SpecifickySymbol SplatnostPohledavek SplatnostZavazku Spojeni Tel1Cislo Tel1Klapka Tel1MistniCislo Tel1Predvolba Tel1Typ Tel2Cislo Tel2Klapka Tel2MistniCislo Tel2Predvolba Tel2Typ Tel3Cislo Tel3Klapka Tel3MistniCislo Tel3Predvolba Tel3Typ Tel4Cislo Tel4Klapka Tel4MistniCislo Tel4Predvolba Tel4Typ VariabilniSymbol VlastniSleva VlastniSplatnostPohledavek VlastniSplatnostZavazku WWW Zprava FaktMisto FaktNazev FaktPsc FaktUlice ObchMisto ObchNazev ObchPsc ObchUlice ProvMisto ProvNazev ProvPsc ProvUlice FaktStat_ID ObchStat_ID ProvStat_ID OdlisnaAdresaProvozovny OdlisnaFakturacniAdresa UvadetNaDokladech PlatceDPH Tel1PredvolbaStat Tel2PredvolbaStat Tel3PredvolbaStat Tel4PredvolbaStat ICDPH ZpusobVyberuCeny EkoKomKlient DatumKontrolyDleIC DatumKontolyDIC DatovaSchrankaID DatovaSchrankaNazev DatumUkonceniCinnosti CinnostUkoncena VcetnePodrizenych FaxCislo FaxKlapka FaxMistniCislo FaxPredvolba FaxPredvolbaStat GpsLat GpsLong EmailSpojeni_ID FaxSpojeni_ID TelefonSpojeni1_ID TelefonSpojeni2_ID PrenestNazev ObchodniPodminkyDistributorLihu ObchodniPodminkyDistributorLihuRegistracniCislo DatumPosledniKontrolyPlatceDPH StavPlatceDPHVracenyWS_Stav UctyNactenyZRegistruDPH StavPlatceDPHComputed Hidden ID Group_ID Deleted Locked Create_ID Create_Date';

const GET_COMPANIES_QUERY = `query ($filter: String) { Companies(Filter: $filter) { ${COMPANY_FIELDS} } }`;

export const NAME = 'moneys4-get-companies';

export default class MoneyS45GetCompanies extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IResponse>> {
        const app = this.getApplication<MoneyS45Base>();
        const { filters } = dto.getJsonData();

        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const requestDto = await app.getRequestDto(
            dto,
            appInstall,
            HttpMethods.POST,
            MONEYS_GRAPHQL_URL,
            JSON.stringify({
                query: GET_COMPANIES_QUERY,
                variables: filters ? { filter: this.prepareFilters(filters) } : {},
            }),
        );
        /* eslint-disable @typescript-eslint/naming-convention */
        const response = await this.getSender().send<IGraphqlResponse<{ Companies?: ICompany[] }>>(requestDto, 200);
        /* eslint-enable @typescript-eslint/naming-convention */
        const body = response.getJsonBody();
        const errors = getGraphqlErrors(body);
        if (errors.length) {
            throw new OnRepeatException(60, 10, errors.join('\n'));
        }

        /* eslint-disable @typescript-eslint/naming-convention */
        return this.setJsonData<IResponse>(dto, { ...body, Data: body.Data?.Companies ?? [] } as IResponse);
        /* eslint-enable @typescript-eslint/naming-convention */
    }

    protected setJsonData<T>(dto: ProcessDto, response: T): ProcessDto<T> {
        return dto.setNewJsonData(response);
    }

    private prepareFilters(filters: IFilter[]): string {
        const outputFilters: string[] = [];

        filters.forEach((filter) => {
            outputFilters.push(`${filter.PropertyName}~${filter.Operation}~${filter.ExpectedValue}`);
        });

        return outputFilters.join('#');
    }

}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IInput {
    filters?: IFilter[];
}

interface IFilter {
    PropertyName: string;
    Operation: string;
    ExpectedValue: number | string;
}

/* eslint-enable @typescript-eslint/naming-convention */

/* eslint-disable @typescript-eslint/naming-convention */
export interface IResponse {
    PageCount: number;
    RowCount: number;
    Data: ICompany[];
    Status: number;
    Message: string;
    StackTrace: string;
}

export interface ICompany {
    CiselnaRada_ID?: string;
    CisloS3?: number;
    CisloZRady?: number;
    DatumPosty?: string;
    DIC?: string;
    Email?: string;
    FyzickaOsoba?: boolean;
    HlavniUcet_ID?: string;
    HodnotaKreditu?: number;
    HodnotaSlevy?: number;
    ICO?: string;
    Kod?: string;
    KodDanovehoUradu?: string;
    Nazev?: string;
    PosilatPostu?: boolean;
    PosledniCisloOsoby?: number;
    PouzivatKredit?: boolean;
    Poznamka?: string;
    PrevzitBankovniSpojeni?: boolean;
    PrevzitObchodniPodminky?: boolean;
    PrevzitObchodniUdaje?: boolean;
    SpecifickySymbol?: string;
    SplatnostPohledavek?: number;
    SplatnostZavazku?: number;
    Spojeni?: string;
    Tel1Cislo?: string;
    Tel1Klapka?: string;
    Tel1MistniCislo?: string;
    Tel1Predvolba?: string;
    Tel1Typ?: number;
    Tel2Cislo?: string;
    Tel2Klapka?: string;
    Tel2MistniCislo?: string;
    Tel2Predvolba?: string;
    Tel2Typ?: number;
    Tel3Cislo?: string;
    Tel3Klapka?: string;
    Tel3MistniCislo?: string;
    Tel3Predvolba?: string;
    Tel3Typ?: number;
    Tel4Cislo?: string;
    Tel4Klapka?: string;
    Tel4MistniCislo?: string;
    Tel4Predvolba?: string;
    Tel4Typ?: number;
    VariabilniSymbol?: string;
    VlastniSleva?: boolean;
    VlastniSplatnostPohledavek?: boolean;
    VlastniSplatnostZavazku?: boolean;
    WWW?: string;
    Zprava?: string;
    FaktMisto?: string;
    FaktNazev?: string;
    FaktPsc?: string;
    FaktUlice?: string;
    ObchMisto?: string;
    ObchNazev?: string;
    ObchPsc?: string;
    ObchUlice?: string;
    ProvMisto?: string;
    ProvNazev?: string;
    ProvPsc?: string;
    ProvUlice?: string;
    FaktStat_ID?: string;
    ObchStat_ID?: string;
    ProvStat_ID?: string;
    OdlisnaAdresaProvozovny?: boolean;
    OdlisnaFakturacniAdresa?: boolean;
    UvadetNaDokladech?: boolean;
    PlatceDPH?: boolean;
    Tel1PredvolbaStat?: string;
    Tel2PredvolbaStat?: string;
    Tel3PredvolbaStat?: string;
    Tel4PredvolbaStat?: string;
    ICDPH?: string;
    ZpusobVyberuCeny?: number;
    EkoKomKlient?: boolean;
    DatumKontrolyDleIC?: string;
    DatumKontolyDIC?: string;
    DatovaSchrankaID?: string;
    DatovaSchrankaNazev?: string;
    DatumUkonceniCinnosti?: string;
    CinnostUkoncena?: boolean;
    VcetnePodrizenych?: boolean;
    FaxCislo?: string;
    FaxKlapka?: string;
    FaxMistniCislo?: string;
    FaxPredvolba?: string;
    FaxPredvolbaStat?: string;
    GpsLat?: number;
    GpsLong?: number;
    EmailSpojeni_ID?: string;
    FaxSpojeni_ID?: string;
    TelefonSpojeni1_ID?: string;
    TelefonSpojeni2_ID?: string;
    PrenestNazev?: boolean;
    ObchodniPodminkyDistributorLihu?: boolean;
    ObchodniPodminkyDistributorLihuRegistracniCislo?: string;
    DatumPosledniKontrolyPlatceDPH?: string;
    StavPlatceDPHVracenyWS_Stav?: number;
    UctyNactenyZRegistruDPH?: boolean;
    StavPlatceDPHComputed?: number;
    Hidden?: boolean;
    ID?: string;
    Group_ID?: string;
    Deleted?: boolean;
    Locked?: boolean;
    Create_ID?: string;
    Create_Date?: string;
}

/* eslint-enable @typescript-eslint/naming-convention */
