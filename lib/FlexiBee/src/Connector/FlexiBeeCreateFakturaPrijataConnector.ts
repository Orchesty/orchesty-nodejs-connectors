import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import FlexiBeeApplication, { FLEXI_BEE_APPLICATION } from '../FexiBeeApplication';

export const NAME = `${FLEXI_BEE_APPLICATION}-create-faktura-prijata`;

export default class FlexiBeeCreateFakturaPrijataConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<Record<string, string>>): Promise<ProcessDto> {
        const applicationInstall = await this.getApplicationInstallFromProcess(dto);
        const application = this.getApplication<FlexiBeeApplication>();

        const request = await application.getRequestDto(
            dto,
            applicationInstall,
            HttpMethods.POST,
            application.getUrl(applicationInstall, 'faktura-prijata'),
            dto.getJsonData(),
        );

        const response = await this.getSender().send(request);

        dto.setData(response.getBody());

        return dto;
    }

}

export interface IResponse {
    winstrom: {
        ['faktura-prijata']: {
            id: string;
            lastUpdate: string;
            updatedBy: string;
            ['updatedBy@ref']: string;
            ['updatedBy@showAs']: string;
            createdBy: string;
            ['createdBy@ref']: string;
            ['createdBy@showAs']: string;
            createdDate: string;
            kod: string;
            zamekK: string;
            ['zamekK@showAs']: string;
            cisDosle: string;
            varSym: string;
            cisSml: string;
            cisObj: string;
            datObj: string;
            cisDodak: string;
            doprava: string;
            datVyst: string;
            duzpPuv: string;
            duzpUcto: string;
            datSplat: string;
            datUhr: string;
            datTermin: string;
            datReal: string;
            datSazbyDph: string;
            popis: string;
            poznam: string;
            sumOsv: string;
            sumZklSniz: string;
            sumZklSniz2: string;
            sumZklZakl: string;
            sumZklCelkem: string;
            sumDphSniz: string;
            sumDphSniz2: string;
            sumDphZakl: string;
            sumDphCelkem: string;
            sumCelkSniz: string;
            sumCelkSniz2: string;
            sumCelkZakl: string;
            sumCelkem: string;
            sumOsvMen: string;
            sumZklSnizMen: string;
            sumZklSniz2Men: string;
            sumZklZaklMen: string;
            sumZklCelkemMen: string;
            sumDphZaklMen: string;
            sumDphSnizMen: string;
            sumDphSniz2Men: string;
            sumDphCelkemMen: string;
            sumCelkSnizMen: string;
            sumCelkSniz2Men: string;
            sumCelkZaklMen: string;
            sumCelkemMen: string;
            slevaDokl: string;
            kurz: string;
            kurzMnozstvi: string;
            stavUzivK: string;
            nazFirmy: string;
            ulice: string;
            mesto: string;
            psc: string;
            eanKod: string;
            ic: string;
            dic: string;
            pocetPriloh: string;
            buc: string;
            iban: string;
            bic: string;
            specSym: string;
            bezPolozek: string;
            ucetni: string;
            szbDphSniz: string;
            szbDphSniz2: string;
            szbDphZakl: string;
            uzpTuzemsko: string;
            zuctovano: string;
            datUcto: string;
            vyloucitSaldo: string;
            storno: string;
            stitky: string;
            typDokl: string;
            ['typDokl@ref']: string;
            ['typDokl@showAs']: string;
            mena: string;
            ['mena@ref']: string;
            ['mena@showAs']: string;
            konSym: string;
            firma: string;
            ['firma@ref']: string;
            ['firma@showAs']: string;
            stat: string;
            ['stat@ref']: string;
            ['stat@showAs']: string;
            region: string;
            banSpojDod: string;
            ['banSpojDod@if-not-found']: string;
            bankovniUcet: string;
            typDoklBan: string;
            typDoklSkl: string;
            ['typDoklSkl@ref']: string;
            ['typDoklSkl@showAs']: string;
            typUcOp: string;
            primUcet: string;
            ['primUcet@ref']: string;
            ['primUcet@showAs']: string;
            protiUcet: string;
            dphZaklUcet: string;
            dphSnizUcet: string;
            dphSniz2Ucet: string;
            smerKod: string;
            statDph: string;
            ['statDph@ref']: string;
            ['statDph@showAs']: string;
            clenDph: string;
            ['clenDph@ref']: string;
            ['clenDph@showAs']: string;
            stredisko: string;
            ['stredisko@ref']: string;
            ['stredisko@showAs']: string;
            cinnost: string;
            ['cinnost@ref']: string;
            ['cinnost@showAs']: string;
            zakazka: string;
            ['zakazka@ref']: string;
            ['zakazka@showAs']: string;
            statOdesl: string;
            statUrc: string;
            statPuvod: string;
            dodPodm: string;
            obchTrans: string;
            druhDopr: string;
            zvlPoh: string;
            krajUrc: string;
            uzivatel: string;
            ['uzivatel@ref']: string;
            ['uzivatel@showAs']: string;
            zodpOsoba: string;
            ['zodpOsoba@ref']: string;
            ['zodpOsoba@showAs']: string;
            kontaktOsoba: string;
            kontaktJmeno: string;
            kontaktEmail: string;
            kontaktTel: string;
            rada: string;
            ['rada@showAs']: string;
            ['rada@if-not-found']: string;
            ['rada@ref']: string;
            sazbaDphOsv: string;
            ['sazbaDphOsv@ref']: string;
            ['sazbaDphOsv@showAs']: string;
            sazbaDphSniz: string;
            ['sazbaDphSniz@ref']: string;
            ['sazbaDphSniz@showAs']: string;
            sazbaDphSniz2: string;
            sazbaDphZakl: string;
            ['sazbaDphZakl@ref']: string;
            ['sazbaDphZakl@showAs']: string;
            smlouva: string;
            formaDopravy: string;
            uuid: string;
            source: string;
            ekokomK: string;
            dodatNa: string;
            clenKonVykDph: string;
            datUp1: string;
            datUp2: string;
            datSmir: string;
            datPenale: string;
            podpisPrik: string;
            prikazSum: string;
            prikazSumMen: string;
            juhSum: string;
            juhSumMen: string;
            juhDat: string;
            juhDatMen: string;
            zbyvaUhradit: string;
            zbyvaUhraditMen: string;
            formaUhradyCis: string;
            ['formaUhradyCis@ref']: string;
            ['formaUhradyCis@showAs']: string;
            stavUhrK: string;
            juhSumPp: string;
            juhSumPpMen: string;
            sumPrepl: string;
            sumPreplMen: string;
            sumZalohy: string;
            sumZalohyMen: string;
            stavOdpocetK: string;
            generovatSkl: string;
            hromFakt: string;
            zdrojProSkl: string;
            zakazPlatba: string;
            dobropisovano: string;
            sumCelkemBezZaloh: string;
            sumCelkemBezZalohMen: string;
            osobUpravaDph: string;
            osobUpravaDphDodavatel: string;
        }[];
    };
}
