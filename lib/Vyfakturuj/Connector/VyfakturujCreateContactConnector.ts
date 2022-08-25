import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'vyfakturuj-create-contact-connector';

export default class VyfakturujCreateContactConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const appInstall = await this.getApplicationInstallFromProcess(dto);

        const req = await this.getApplication().getRequestDto(
            dto,
            appInstall,
            HttpMethods.POST,
            '/contact/',
            dto.getJsonData(),
        );
        const resp = await this.getSender().send<IOutput>(req, [200]);

        return dto.setNewJsonData(resp.getJsonBody());
    }

}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IInput {
    IC: string;
    name: string;
    note: string;
    company: string;
    street: string;
    city: string;
    zip: string;
    country_code: string;
    mail_to: string;
}

export interface IOutput {
    id: number;
    IC: string;
    DIC: string;
    IDNUM3: string;
    name: string;
    note: string;
    company: string;
    firstname: string;
    lastname: string;
    street: string;
    city: string;
    zip: string;
    country_code: string;
    delivery_company: string;
    delivery_firstname: string;
    delivery_lastname: string;
    delivery_street: string;
    delivery_city: string;
    delivery_zip: string;
    delivery_country_code: string;
    delivery_tel: string;
    web: string;
    tel: string;
    mail_to: string;
    mail_cc: string;
    mail_bcc: string;
    payment_method: string;
    days_due: string;
    text_under_subscriber: string;
    text_before_items: string;
    text_invoice_footer: string;
    X_1: string;
    X_2: string;
    X_3: string;
}

/* eslint-enable @typescript-eslint/naming-convention */
