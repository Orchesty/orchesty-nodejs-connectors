import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { FlexiBeeSkladoveKartyItemOutput } from '../Batch/FlexiBeeSkladoveKartyBatch';
import FlexiBeeApplication from '../FexiBeeApplication';
import { parseFlexiBeeUri } from '../FlexiBee.utils';

export const FLEXI_BEE_GET_CENIK_KARTY_CONNECTOR = 'flexi-bee-get-cenik-karty-connector';

export default class FlexiBeeGetCenikKartyConnector extends AConnector {

    public getName(): string {
        return FLEXI_BEE_GET_CENIK_KARTY_CONNECTOR;
    }

    public async processAction(
        dto: ProcessDto<FlexiBeeGetCenikKartyInput>,
    ): Promise<ProcessDto<FlexiBeeGetCenikKartyOutput>> {
        const applicationInstall = await this.getApplicationInstallFromProcess(dto);
        const data = dto.getJsonData() as FlexiBeeGetCenikKartyOutput;

        const application = this.getApplication<FlexiBeeApplication>();
        const request = await application.getRequestDto(
            dto,
            applicationInstall,
            HttpMethods.GET,
            application.getUrl(applicationInstall, parseFlexiBeeUri(data['cenik@ref'])),
        );
        const response = await this.getSender().send<Response>(request);
        data.cenikData = response.getJsonBody().winstrom.cenik;

        return dto.setNewJsonData(data);
    }

}

/* eslint-disable @typescript-eslint/naming-convention */
type Cenik = {
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
    'eanKod': string;
    'kodPlu': string;
    'typCenyDphK': string;
    'typCenyDphK@showAs': string;
    'procZakl': string;
    'individCena': string;
    'limMnoz2': string;
    'limMnoz3': string;
    'limMnoz4': string;
    'limMnoz5': string;
    'procento2': string;
    'procento3': string;
    'procento4': string;
    'procento5': string;
    'cena2': string;
    'cena3': string;
    'cena4': string;
    'cena5': string;
    'zaokrJakK': string;
    'zaokrJakK@showAs': string;
    'zaokrNaK': string;
    'zaokrNaK@showAs': string;
    'typSzbDphK': string;
    'typSzbDphK@showAs': string;
    'desetinMj': string;
    'nakupCena': string;
    'cenJednotka': string;
    'typCenyVychoziK': string;
    'typCenyVychoziK@showAs': string;
    'typVypCenyK': string;
    'typVypCenyK@showAs': string;
    'typCenyVychozi25K': string;
    'typCenyVychozi25K@showAs': string;
    'typVypCeny25K': string;
    'typVypCeny25K@showAs': string;
    'evidVyrCis': string;
    'unikVyrCis': string;
    'zaruka': string;
    'mjZarukyK': string;
    'mjKoef2': string;
    'mjKoef3': string;
    'prodejMj': string;
    'hmotMj': string;
    'hmotObal': string;
    'objem': string;
    'zatrid': string;
    'skladove': string;
    'typZasobyK': string;
    'typZasobyK@showAs': string;
    'baleniNazev1': string;
    'baleniNazev2': string;
    'baleniNazev3': string;
    'baleniNazev4': string;
    'baleniNazev5': string;
    'baleniMj1': string;
    'baleniMj2': string;
    'baleniMj3': string;
    'baleniMj4': string;
    'baleniMj5': string;
    'baleniEan1': string;
    'baleniEan2': string;
    'baleniEan3': string;
    'baleniEan4': string;
    'baleniEan5': string;
    'inEvid': string;
    'inKoefMj': string;
    'inKoefStat': string;
    'inKodSled': string;
    'popisA': string;
    'popisB': string;
    'popisC': string;
    'cenaBezna': string;
    'stitky': string;
    'stavy': string;
    'pocetPriloh': string;
    'exportNaEshop': string;
    'minMarzeCenik': string;
    'minMarze': string;
    'evidSarze': string;
    'evidExpir': string;
    'sada': string;
    'dnyTrvanPoExpir': string;
    'neseskupovatObj': string;
    'kratkyPopis': string;
    'klicSlova': string;
    'techParam': string;
    'dodaciLhuta': string;
    'prodejKasa': string;
    'skupZboz': string;
    'skupZboz@ref': string;
    'skupZboz@showAs': string;
    'mj1': string;
    'mj1@ref': string;
    'mj1@showAs': string;
    'mj2': string;
    'mj2@ref': string;
    'mj2@showAs': string;
    'mj3': string;
    'mj3@ref': string;
    'mj3@showAs': string;
    'mjHmot': string;
    'mjHmot@ref': string;
    'mjHmot@showAs': string;
    'mjObj': string;
    'mjObj@ref': string;
    'mjObj@showAs': string;
    'stat': string;
    'nomen': string;
    'dodavatel': string;
    'dodavatel@ref': string;
    'dodavatel@showAs': string;
    'vyrobce': string;
    'vyrobce@ref': string;
    'vyrobce@showAs': string;
    'dphPren': string;
    'mjDodaciLhuta': string;
    'mjDodaciLhuta@ref': string;
    'mjDodaciLhuta@showAs': string;
    'sumStavMj': string;
    'sumRezerMj': string;
    'sumPozadavkyMj': string;
    'sumDostupMj': string;
    'cenaZaklBezDph': string;
    'cenaZaklVcDph': string;
    'cenaZakl': string;
    'sady-a-komplety': unknown[];
    'poplatky': unknown[];
    'dodavatele': {
        'id': string;
        'lastUpdate': string;
        'kodIndi': string;
        'nakupCena': string;
        'poznam': string;
        'primarni': string;
        'stavMJ': string;
        'dodaciLhuta': string;
        'stitky': string;
        'limMnoz2': string;
        'limMnoz3': string;
        'limMnoz4': string;
        'limMnoz5': string;
        'nakupCena2': string;
        'nakupCena3': string;
        'nakupCena4': string;
        'nakupCena5': string;
        'cenik': string;
        'cenik@ref': string;
        'cenik@showAs': string;
        'firma': string;
        'firma@ref': string;
        'firma@showAs': string;
        'mjDodaciLhuta': string;
        'mena': string;
    }[],
    'odberatele': {
        'id': string;
        'lastUpdate': string;
        'kodIndi': string;
        'prodejCena': string;
        'poznam': string;
        'platiOdData': string;
        'platiDoData': string;
        'rucneVybrat': string;
        'limMnoz2': string;
        'limMnoz3': string;
        'limMnoz4': string;
        'limMnoz5': string;
        'prodejCena2': string;
        'prodejCena3': string;
        'prodejCena4': string;
        'prodejCena5': string;
        'cenik': string;
        'cenik@ref': string;
        'cenik@showAs': string;
        'firma': string;
        'firma@ref': string;
        'firma@showAs': string;
        'skupCen': string;
        'stredisko': string;
        'mena': string;
    }[]
    'typy-sazeb-dph': unknown[];
    'szbDph': string;
}[];

interface Response {
    'winstrom': {
        '@version': string;
        'cenik': Cenik;
    };
}

export type FlexiBeeGetCenikKartyInput = FlexiBeeSkladoveKartyItemOutput;

export interface FlexiBeeGetCenikKartyOutput extends FlexiBeeSkladoveKartyItemOutput {
    cenikData: Cenik;
}

/* eslint-enable @typescript-eslint/naming-convention */
